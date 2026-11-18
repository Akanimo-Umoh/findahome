import { api } from "@/services/api"
import type {
  RawDispute,
  RawEscrow,
  RawLinkedRecord,
} from "@/types/adminEscrow"

export type RefundSent = {
  amountSent: number
  transferReference: string
  note?: string
}

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
  // Refunds are sent offline by the admin, so they take two steps.
  // Step 1: approve. The escrow moves to refund_pending and the deal is cancelled.
  async approveRefund(escrowId: string, reason: string) {
    const { data } = await api.patch(`/escrow/${escrowId}/refund-approval`, {
      reason,
    })
    return data
  },
  // Step 2: after sending the money, record it. The escrow becomes refunded.
  // amountSent is always sent: the server reads it before the escrow loads.
  async completeRefund(escrowId: string, sent: RefundSent) {
    const { data } = await api.patch(
      `/escrow/${escrowId}/refund-complete`,
      sent
    )
    return data
  },
  // A payment under review that shouldn't go ahead (wrong amount, duplicate).
  // The record is cancelled and marked refundDue; no escrow exists yet.
  async rejectPayment(
    kind: "inspection" | "purchase",
    id: string,
    reason: string
  ) {
    const { data } = await api.post(`/${kind}/reject-payment`, { id, reason })
    return data
  },
  // Records the offline refund for a rejected payment.
  async markRefundSent(
    kind: "inspection" | "purchase",
    id: string,
    sent: RefundSent
  ) {
    const { data } = await api.post(`/${kind}/mark-refund-sent`, {
      id,
      ...sent,
    })
    return data
  },
  async setStatus(escrowId: string, status: "on_hold" | "released") {
    const { data } = await api.patch("/escrow/status", { escrowId, status })
    return data
  },
}
