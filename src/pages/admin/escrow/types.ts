import type { RawDispute, RawLinkedRecord } from "@/types/adminEscrow"
import type { PropertyOffer } from "./propertyOffers"

export type EscrowKind = "inspection" | "purchase"
// refund_pending: a refund was approved and the admin still has to send the
// money (offline) and record it
export type EscrowState =
  | "in_escrow"
  | "released"
  | "disputed"
  | "refund_pending"
  | "refunded"
export type EscrowTab = "all" | EscrowState
// refund = approve the refund; complete_refund = record that it was sent
export type EscrowAction = "release" | "hold" | "refund" | "complete_refund"

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
  // filled in once an offline refund is recorded as sent
  refundedAt: string | null
  refundedAmount: number | null
  transferReference: string | null
  refundNote: string | null
  // the refund carries no processing fee (property secured by another buyer)
  refundFeeWaived: boolean
  // another buyer's purchase holds this property (under review or approved);
  // only set while this escrow still has money in it
  otherOffer: PropertyOffer | null
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
  refundPending: number
  refunded: number
  platformRevenue: number
  count: Record<EscrowTab, number>
}

// A refund can be approved while the funds are still held (in escrow or
// disputed), but not after they were released to the agent or once a refund
// is already approved or sent.
export function isEscrowRefundable(row: EscrowRow): boolean {
  return row.status === "in_escrow" || row.status === "disputed"
}

// a refund has been approved and is waiting for the admin to send the money
export function isRefundAwaitingTransfer(row: EscrowRow): boolean {
  return row.status === "refund_pending"
}

export function isEscrowReleaseReady(row: EscrowRow): boolean {
  if (
    row.released ||
    row.status === "refunded" ||
    row.status === "refund_pending" ||
    row.openDispute
  )
    return false
  if (!row.linked?.feePaid) return false
  if (!row.netPayoutConfirmed) return false

  const completed =
    row.kind === "inspection"
      ? row.linked.status === "inspection_completed"
      : row.linked.status === "handover_completed" ||
        row.linked.status === "funds_released"

  return completed
}
