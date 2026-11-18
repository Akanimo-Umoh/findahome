import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { escrowService, type RefundSent } from "@/services/admin/escrow.service"
import { buildEscrowRows } from "./buildEscrowRows"
import type { EscrowKind } from "./types"

export const ESCROW_QUERY_KEY = ["admin", "escrow"] as const

const pick = <T>(r: PromiseSettledResult<T[]>): T[] =>
  r.status === "fulfilled" ? r.value : []

export function errorMessage(e: unknown) {
  if (axios.isAxiosError(e)) {
    return (
      (e.response?.data as { message?: string } | undefined)?.message ??
      e.message
    )
  }
  return "Something went wrong"
}

export function useEscrowData(opts?: { background?: boolean }) {
  return useQuery({
    queryKey: ESCROW_QUERY_KEY,
    // the escrow page always wants fresh data; the sidebar badge can use a
    // copy up to a minute old
    staleTime: opts?.background ? 60_000 : 0,
    refetchOnMount: opts?.background ? true : "always",
    queryFn: async () => {
      const [escrows, purchases, inspections, disputes] =
        await Promise.allSettled([
          escrowService.list(),
          escrowService.purchases(),
          escrowService.inspections(),
          escrowService.disputes(),
        ])
      if (escrows.status === "rejected") throw escrows.reason

      return {
        rows: buildEscrowRows({
          escrows: escrows.value,
          purchases: pick(purchases),
          inspections: pick(inspections),
          disputes: pick(disputes),
        }),
        partial: [purchases, inspections, disputes].some(
          (r) => r.status === "rejected"
        ),
        purchases:
          purchases.status === "fulfilled" ? purchases.value : undefined,
        disputes: disputes.status === "fulfilled" ? disputes.value : undefined,
        inspections:
          inspections.status === "fulfilled" ? inspections.value : undefined,
      }
    },
  })
}

export function useSetEscrowStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { id: string; status: "on_hold" | "released" }) =>
      escrowService.setStatus(v.id, v.status),
    onSuccess: (_data, v) => {
      toast.success(
        v.status === "released"
          ? "Funds released to the agent"
          : "Escrow moved back to hold"
      )
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => toast.error(errorMessage(e)),
  })
}

export function useConfirmPayment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: {
      kind: "inspection" | "purchase"
      id: string
      reference: string
    }) =>
      v.kind === "inspection"
        ? escrowService.confirmInspectionPayment(v.id, v.reference)
        : escrowService.confirmPurchasePayment(v.id, v.reference),
    onSuccess: () => {
      toast.success("Payment confirmed. The escrow has been created.")
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    // shows the server's own reason, for example when Paystack has no
    // successful payment for this reference
    onError: (e) => toast.error(errorMessage(e)),
  })
}

// Everything worth sending to the backend developer when a request fails.
export function describeError(e: unknown) {
  if (axios.isAxiosError(e)) {
    return {
      status: e.response?.status ?? null,
      method: e.config?.method?.toUpperCase() ?? null,
      url: e.config?.url ?? null,
      message:
        (e.response?.data as { message?: string } | undefined)?.message ??
        e.message,
      response: e.response?.data ?? null,
    }
  }
  return {
    status: null,
    method: null,
    url: null,
    message: e instanceof Error ? e.message : String(e),
    response: null,
  }
}

// Step 1 of a refund: the deal is cancelled and the escrow waits in
// refund_pending until the admin has sent the money.
export function useApproveRefund() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { id: string; reason: string }) =>
      escrowService.approveRefund(v.id, v.reason),
    onSuccess: () => {
      toast.success(
        "Refund approved. Send the money to the buyer, then mark it as sent."
      )
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => {
      console.error("refund approval failed:", describeError(e))
      toast.error(errorMessage(e))
    },
  })
}

// Step 2: records the offline transfer. The escrow becomes refunded.
export function useCompleteRefund() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { id: string; sent: RefundSent }) =>
      escrowService.completeRefund(v.id, v.sent),
    onSuccess: () => {
      toast.success("Refund recorded as sent. The buyer has been notified.")
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => {
      console.error("refund completion failed:", describeError(e))
      toast.error(errorMessage(e))
    },
  })
}

// Turns down a payment under review (wrong amount, duplicate, …). The deal
// is cancelled and its money shows under "Refunds to send".
export function useRejectPayment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { kind: EscrowKind; id: string; reason: string }) =>
      escrowService.rejectPayment(v.kind, v.id, v.reason),
    onSuccess: () => {
      toast.success(
        "Payment rejected. Send the refund, then mark it as sent below."
      )
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => toast.error(errorMessage(e)),
  })
}

// Records the offline refund of a rejected payment.
export function useMarkRefundSent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { kind: EscrowKind; id: string; sent: RefundSent }) =>
      escrowService.markRefundSent(v.kind, v.id, v.sent),
    onSuccess: () => {
      toast.success("Refund recorded as sent. The buyer has been notified.")
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => toast.error(errorMessage(e)),
  })
}
