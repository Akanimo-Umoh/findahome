import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import { dashboardQueryKey } from "@/pages/admin/dashboard/useDashboardOverview"
import {
  addAdminNote,
  flagProperty,
  setPropertyStatus,
} from "@/services/admin/properties.service"
import type { AdminProperty } from "@/types/adminProperty"

export const propertiesKey = ["admin", "properties"] as const
export const propertyKey = (id?: string) => ["admin", "property", id] as const

// Update the list row and the open detail page from what we just did instead of
// refetching: GET /property/:id notifies the agent on every call.
function patchCaches(
  qc: QueryClient,
  id: string,
  patch: Partial<AdminProperty>
) {
  qc.setQueryData<AdminProperty>(propertyKey(id), (old) =>
    old ? { ...old, ...patch } : old
  )
  qc.setQueryData<AdminProperty[]>(propertiesKey, (old) =>
    old?.map((p) => (p._id === id ? { ...p, ...patch } : p))
  )
}

export function useReviewProperty() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: "approved" | "rejected"
    }) => setPropertyStatus(id, status),
    onSuccess: (_saved, { id, status }) => {
      patchCaches(qc, id, { status, updatedAt: new Date().toISOString() })
      // the dashboard's pending / active counts just changed
      qc.invalidateQueries({ queryKey: dashboardQueryKey })
      toast.success(
        status === "approved" ? "Listing approved" : "Listing rejected"
      )
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update this listing. Please try again.")
      ),
  })
}

export function useFlagProperty() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      flagged,
      reason,
    }: {
      id: string
      flagged: boolean
      reason?: string
    }) => flagProperty(id, flagged, reason),
    onSuccess: (_saved, { id, flagged, reason }) => {
      patchCaches(qc, id, {
        isFlagged: flagged,
        flagReason: flagged ? reason : undefined,
      })
      toast.success(flagged ? "Listing flagged" : "Flag removed")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update the flag. Please try again.")
      ),
  })
}

export function useAddNote(id: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (note: string) => addAdminNote(id, note),
    onSuccess: (note) => {
      const current = qc.getQueryData<AdminProperty>(propertyKey(id))
      patchCaches(qc, id, {
        adminNotes: [note, ...(current?.adminNotes ?? [])],
      })
      toast.success("Note saved")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't save the note. Please try again.")
      ),
  })
}
