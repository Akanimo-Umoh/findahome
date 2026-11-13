import type { RawDispute, RawLinkedRecord } from "@/types/adminEscrow"

export type EscrowKind = "inspection" | "purchase"
export type EscrowState = "in_escrow" | "released" | "disputed" | "refunded"
export type EscrowTab = "all" | EscrowState
export type EscrowAction = "release" | "hold" | "refund"

export interface Party {
  id: string | null
  name: string
  email: string
  phone: string | null
}

export interface EscrowRow {
  id: string
  code: string
  reference: string
  kind: EscrowKind
  status: EscrowState
  released: boolean
  releaseReady: boolean
  amount: number
  platformFee: number | null
  netPayout: number | null
  netPayoutConfirmed: boolean
  createdAt: string
  releasedAt: string | null
  reason: string | null
  propertyId: string | null
  propertyTitle: string
  propertyAddress: string | null
  buyer: Party
  agent: Party
  linked: RawLinkedRecord | null
  dispute: RawDispute | null
  openDispute: boolean
}

export interface EscrowStatsData {
  total: number
  inEscrow: number
  released: number
  disputed: number
  refunded: number
  platformRevenue: number
  count: Record<EscrowTab, number>
}

// Funds can be returned to the buyer while they are still held (in escrow or
// disputed), but not after they were released to the agent or already refunded.
export function isEscrowRefundable(row: EscrowRow): boolean {
  return !row.released && row.status !== "refunded"
}

export function isEscrowReleaseReady(row: EscrowRow): boolean {
  if (row.released || row.status === "refunded" || row.openDispute) return false
  if (!row.linked?.feePaid) return false
  if (!row.netPayoutConfirmed) return false

  const completed =
    row.kind === "inspection"
      ? row.linked.status === "inspection_completed"
      : row.linked.status === "handover_completed" ||
        row.linked.status === "funds_released"

  return completed
}
