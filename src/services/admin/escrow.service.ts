import { api } from "@/services/api"
import type {
  RawDispute,
  RawEscrow,
  RawLinkedRecord,
} from "@/types/adminEscrow"

export const escrowService = {
  async list() {
    const { data } = await api.get<{ escrows: RawEscrow[] }>("/escrow")
    return data.escrows ?? []
  },
  async purchases() {
    const { data } = await api.get<{ purchases: RawLinkedRecord[] }>(
      "/purchase/all-purchases"
    )
    return data.purchases ?? []
  },
  async inspections() {
    const { data } = await api.get<{ inspections: RawLinkedRecord[] }>(
      "/inspection/all-inspections"
    )
    return data.inspections ?? []
  },
  async disputes() {
    const { data } = await api.get<{ disputes: RawDispute[] }>(
      "/dispute/admin/all"
    )
    return data.disputes ?? []
  },
  async setStatus(escrowId: string, status: "on_hold" | "released") {
    const { data } = await api.patch("/escrow/status", { escrowId, status })
    return data
  },
}
