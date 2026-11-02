import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import { dashboardQueryKey } from "@/pages/admin/dashboard/useDashboardOverview"
import { moderateUserAccount } from "@/services/admin/users.service"
import type { AdminUser } from "@/types/adminUser"
import { usersKey } from "./useAdminUsers"

export type UserModerationAction = "flag" | "suspend" | "ban"

export function useUserModeration() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: {
      id: string
      action: UserModerationAction
      value: boolean
    }) => moderateUserAccount(input.id, input.action, input.value),
    onSuccess: (saved, { id, action, value }) => {
      qc.setQueryData<AdminUser[]>(usersKey, (old) =>
        old?.map((user) => (user._id === id ? { ...user, ...saved } : user))
      )
      qc.invalidateQueries({ queryKey: dashboardQueryKey })
      const verb = value ? "updated" : "removed"
      toast.success(`Account ${action} ${verb}`)
    },
    onError: (error) =>
      toast.error(
        requestError(error, "Couldn't update this account. Please try again.")
      ),
  })
}
