import api from "@/services/api"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"

// The only admin-readable user list. The public agent endpoints leave out the
// onboarding documents, so the agent screens read from here too.
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data } = await api.get("/user/users")
  return data.data ?? []
}

export const setAgentVerification = async (
  id: string,
  status: VerificationDecision,
  reason?: string
) => {
  const { data } = await api.patch(`/user/agents/${id}/verification`, {
    status,
    reason,
  })
  return data.agent as AdminUser | undefined
}

export const moderateUserAccount = async (
  id: string,
  action: "flag" | "suspend" | "ban",
  value: boolean
) => {
  const { data } = await api.patch(`/user/users/${id}/moderate`, {
    action,
    value,
  })
  const user = data.user as AdminUser
  return {
    _id: user._id,
    isFlagged: user.isFlagged,
    isSuspended: user.isSuspended,
    isBanned: user.isBanned,
  }
}
