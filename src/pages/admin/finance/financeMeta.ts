import { formatDate } from "@/pages/admin/escrow/format"
import type { LedgerKind, LedgerStatus } from "./types"

export const KIND_LABEL: Record<LedgerKind, string> = {
  wallet_funding: "Wallet funding",
  agent_payment: "Agent payment",
  payout: "Payout",
  escrow_payment: "Escrow payment",
  escrow_release: "Escrow release",
  refund: "Refund",
}

export const STATUS_LABEL: Record<LedgerStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
  declined: "Declined",
  in_escrow: "In escrow",
  released: "Released",
  disputed: "Disputed",
  refunded: "Refunded",
}

export const formatDateTime = (iso?: string | null) => {
  if (!iso) return "—"
  const time = new Date(iso).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  })
  return `${formatDate(iso)} · ${time}`
}

export const shortCode = (prefix: string, id: string) =>
  `${prefix}-${id.slice(-6).toUpperCase()}`
