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
  // The server checks the reference with Paystack itself, then creates the
  // escrow and marks the record as paid.
  async confirmInspectionPayment(inspectionId: string, reference: string) {
    const { data } = await api.post("/inspection/verify-payment", {
      inspectionId,
      reference,
    })
    return data
  },
  async confirmPurchasePayment(purchaseId: string, reference: string) {
    const { data } = await api.post("/purchase/verify-payment", {
      purchaseId,
      reference,
    })
    return data
  },
  async setStatus(escrowId: string, status: "on_hold" | "released") {
    const { data } = await api.patch("/escrow/status", { escrowId, status })
    return data
  },
}
