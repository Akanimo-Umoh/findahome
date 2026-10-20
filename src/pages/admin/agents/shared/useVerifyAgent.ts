import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import { usersKey } from "@/pages/admin/users/useAdminUsers"
import { setAgentVerification } from "@/services/admin/users.service"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"

// Update the cached list and the open profile from what we just did, so the page never needs a refetch to show the new badge.
export function useVerifyAgent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
      reason,
    }: {
      id: string
      status: VerificationDecision
      reason?: string
    }) => setAgentVerification(id, status, reason),
    onSuccess: (_saved, { id, status, reason }) => {
      qc.setQueryData<AdminUser[]>(usersKey, (old) =>
        old?.map((u) =>
          u._id === id
            ? {
                ...u,
                verificationStatus: status,
                verificationNote: status === "rejected" ? reason : undefined,
                verifiedAt: new Date().toISOString(),
              }
            : u
        )
      )
      toast.success(
        status === "verified" ? "Agent verified" : "Verification rejected"
      )
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't save the decision. Please try again.")
      ),
  })
}
