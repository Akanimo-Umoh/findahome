import api from "@/services/api"
import type { AdminDispute, DisputeStatus } from "@/types/adminDispute"

export const getAdminDisputeList = async (): Promise<AdminDispute[]> => {
  const { data } = await api.get("/dispute/admin/all")
  return data.disputes ?? []
}

// Moves a dispute along: opened -> under_review -> resolved. Resolving does not touch the escrow, so money is released or refunded from Escrow Transactions.
export const setDisputeStatus = async (
  id: string,
  status: DisputeStatus,
  resolutionNotes?: string
) => {
  const { data } = await api.put(`/dispute/${id}/status`, {
    status,
    resolutionNotes,
  })
  return data
}
