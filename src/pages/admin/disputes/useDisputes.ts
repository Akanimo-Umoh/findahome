import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import {
  getAdminDisputeList,
  setDisputeStatus,
} from "@/services/admin/disputes.service"
import type { AdminDispute, DisputeStatus } from "@/types/adminDispute"

export const disputesKey = ["admin", "disputes"] as const

export function useAdminDisputes() {
  return useQuery({
    queryKey: disputesKey,
    queryFn: getAdminDisputeList,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
}

// Update the cached card from what we just did, so the list never needs a refetch.
export function useSetDisputeStatus() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
      notes,
    }: {
      id: string
      status: DisputeStatus
      notes?: string
    }) => setDisputeStatus(id, status, notes),
    onSuccess: (_res, { id, status, notes }) => {
      const now = new Date().toISOString()
      qc.setQueryData<AdminDispute[]>(disputesKey, (old) =>
        old?.map((d) =>
          d._id === id
            ? {
                ...d,
                status,
                resolutionNotes: notes ?? d.resolutionNotes,
                updatedAt: now,
                resolvedAt: status === "resolved" ? now : d.resolvedAt,
              }
            : d
        )
      )
      toast.success(
        status === "resolved" ? "Dispute resolved" : "Dispute moved to review"
      )
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update the dispute. Please try again.")
      ),
  })
}
