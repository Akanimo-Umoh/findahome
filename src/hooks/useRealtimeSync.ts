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

// Keeps cached data in step with changes made by someone else (for example an
// admin approving a listing). We only mark the matching queries stale, so
// React Query refetches the ones on screen. Nothing from the event is shown,
// because some of these events are broadcast to every connected user.
export function useRealtimeSync() {
  const { user, token } = useAuthContext()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!user?._id || !token) return

    const socket = getSocket()
    if (!socket.connected) socket.connect()
    socket.emit("user_connected", user._id)

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
        }
      }

      // sent only to that agent when an admin decides their verification
      if (event.meta?.verificationStatus) {
        queryClient.invalidateQueries({ queryKey: myVerificationKey })
        queryClient.invalidateQueries({ queryKey: ["notifications"] })
      }
    }

    socket.on("notification", onNotification)
    return () => {
      socket.off("notification", onNotification)
    }
  }, [user?._id, token, queryClient])
}
