import api from "@/services/api"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"

// The only admin-readable user list. The public agent endpoints leave out the
// onboarding documents, so the agent screens read from here too.
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data } = await api.get("/user/users")
  return data.data ?? []
}

// ---- not on the backend yet (see the backend list) ----

export const setAgentVerification = async (
  id: string,
  status: VerificationDecision,
  reason?: string
) => {
  const { data } = await api.patch(`/user/agents/${id}/verification`, {
    status,
    reason,
  })
  return data.data as AdminUser | undefined
}
