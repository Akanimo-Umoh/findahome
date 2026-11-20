import { useEffect } from "react"
import { useQueryClient, type QueryClient } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import { getSocket } from "@/services/socket"
import { myVerificationKey } from "@/hooks/useMyVerification"

// Events that mean a listing changed. `property_viewed` is left out on
// purpose: it fires on every page view and would trigger refetches for everyone.
const LISTING_EVENTS = new Set([
  "property_created",
  "property_updated",
  "property_deleted",
  "property_approved",
  "property_rejected",
  "property_pending",
  // the buyer completed the handover (off the market), or that deal was undone
  "property_sold",
  "property_available",
])

// An inspection or purchase moved to a new stage.
const DEAL_EVENTS = new Set([
  "inspection_requested",
  "inspection_payment_started",
  "inspection_payment_review",
  "inspection_status_changed",
  "inspection_fee_paid",
  "inspection_scheduled",
  "inspection_reschedule_requested",
  "inspection_confirmed",
  "inspection_completed",
  // the admin rejected the payment, or a refund was recorded
  "inspection_cancelled",
  "inspection_refund_sent",
  "purchase_requested",
  "purchase_payment_initialized",
  "property_payment_review",
  "purchase_payment_verified",
  "purchase_status_changed",
  "purchase_cancelled",
  "purchase_refund_sent",
  "handover_scheduled",
  "handover_reschedule_requested",
  "handover_confirmed",
  "handover_completed",
])

// Money moved in or out of an agent's wallet (funding, payouts, withdrawals).
const WALLET_EVENTS = new Set([
  "wallet_funding_pending",
  "wallet_funded",
  "agent_payment",
  "withdrawal_requested",
  "transaction_status_changed",
])

// Everything that reads a deal's stage: the chat mini actions, the transaction
// lists and detail pages, and the admin escrow page.
const DEAL_KEYS = [
  ["userPurchasesAndInspections"],
  ["agentPurchasesAndInspections"],
  ["user-inspections"],
  ["inspectionDetails"],
  ["purchaseDetails"],
  ["transactionDetails"],
  ["agentTransactionDetails"],
  ["agentVisitDetails"],
  ["admin", "escrow"],
]

// Marks every query that shows a deal's stage as stale. Also used by the
// Paystack return pages, so the chat and lists show the new status straight away.
export function invalidateDealQueries(queryClient: QueryClient) {
  DEAL_KEYS.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
  queryClient.invalidateQueries({ queryKey: ["notifications"] })
}

type NotificationEvent = {
  type?: string
  propertyId?: string
  meta?: { verificationStatus?: string }
}

type IncomingMessage = { chat?: string }

// Keeps cached data in step with changes made by someone else (an admin
// approving a listing, a buyer rejecting a date, a new chat message). The
// server tells the browser, and we only mark the matching queries stale, so
// React Query refetches the ones on screen. Nothing from an event is shown,
// because some are broadcast to everyone.
export function useRealtimeSync() {
  const { user, token } = useAuthContext()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!user?._id || !token) return

    const socket = getSocket()

    // Register on every connection. After a reconnect the server has forgotten
    // this browser, so a single emit at mount isn't enough.
    const register = () => socket.emit("user_connected", user._id)
    socket.on("connect", register)
    if (socket.connected) register()
    else socket.connect()

    const onNotification = (event: NotificationEvent) => {
      if (event.type && LISTING_EVENTS.has(event.type)) {
        queryClient.invalidateQueries({ queryKey: ["agentListings"] })
        queryClient.invalidateQueries({ queryKey: ["agentApprovedListings"] })
        queryClient.invalidateQueries({ queryKey: ["properties"] })
        queryClient.invalidateQueries({ queryKey: ["notifications"] })
        if (event.propertyId) {
          queryClient.invalidateQueries({
            queryKey: ["property", event.propertyId],
          })
          // the owner's preview page and edit form
          queryClient.invalidateQueries({
            queryKey: ["property-owner", event.propertyId],
          })
        }
      }

      if (
        event.type &&
        (DEAL_EVENTS.has(event.type) || event.type.startsWith("escrow_"))
      ) {
        invalidateDealQueries(queryClient)
        // an escrow release changes the agent's balance, which is read from
        // their account
        queryClient.invalidateQueries({ queryKey: myVerificationKey })
      }

      if (event.type && WALLET_EVENTS.has(event.type)) {
        queryClient.invalidateQueries({ queryKey: ["agentActivities"] })
        queryClient.invalidateQueries({ queryKey: ["admin", "finance"] })
        queryClient.invalidateQueries({ queryKey: ["notifications"] })
        queryClient.invalidateQueries({ queryKey: myVerificationKey })
      }

      // Notifications sent only to this user (a verification decision) arrive
      // as the saved notification itself, with no `type`. `meta` is not
      // reliable because the Notification schema drops it.
      if (!event.type || event.meta?.verificationStatus) {
        queryClient.invalidateQueries({ queryKey: myVerificationKey })
        queryClient.invalidateQueries({ queryKey: ["notifications"] })
      }
    }

    // a chat message from someone else: refresh the chat list and, if that
    // chat is open, its messages
    const onMessage = (message: IncomingMessage) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] })
      if (message.chat) {
        queryClient.invalidateQueries({ queryKey: ["messages", message.chat] })
      }
    }

    socket.on("notification", onNotification)
    socket.on("receive_message", onMessage)
    return () => {
      socket.off("connect", register)
      socket.off("notification", onNotification)
      socket.off("receive_message", onMessage)
      // The server picks the user's room from the token sent at connect time,
      // so after a logout or account switch the old connection must go. The
      // next run connects again with the new token.
      socket.disconnect()
    }
  }, [user?._id, token, queryClient])
}
