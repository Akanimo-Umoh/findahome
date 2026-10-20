import type { EscrowKind, EscrowState } from "./types"

export const KIND_LABEL: Record<EscrowKind, string> = {
  inspection: "Inspection",
  purchase: "Purchase",
}

export const STATE_LABEL: Record<EscrowState, string> = {
  pending: "Pending",
  in_escrow: "In escrow",
  released: "Released",
  disputed: "Disputed",
  refunded: "Refunded",
}

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—"

export const titleCase = (v: string) =>
  v.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())
