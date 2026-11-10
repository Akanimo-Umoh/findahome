import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
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
])

type NotificationEvent = {
  type?: string
  propertyId?: string
  meta?: { verificationStatus?: string }
}

type IncomingMessage = { chat?: string }

// Keeps cached data in step with changes made by someone else (an admin
// approving a listing, a new chat message). The server tells the browser, and
// we only mark the matching queries stale so React Query refetches the ones on
// screen. Nothing from an event is shown, because some are broadcast to everyone.
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
    }
  }, [user?._id, token, queryClient])
}
