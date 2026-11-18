import type { RawLinkedRecord } from "@/types/adminEscrow"
import type { EscrowKind } from "./types"

export interface PendingPayment {
  id: string
  kind: EscrowKind
  reference: string
  // what the buyer should have paid
  amount: number
  // set when Paystack received a different amount; the admin decides
  // whether to approve or reject before any escrow exists
  amountMismatch: boolean
  paidAmount: number | null
  propertyTitle: string
  buyerName: string
  buyerEmail: string
  startedAt?: string
}

const toRow = (r: RawLinkedRecord, kind: EscrowKind): PendingPayment => {
  const buyer = r.buyer ?? r.user
  return {
    id: r._id,
    kind,
    reference: r.reference ?? "",
    amount: (kind === "inspection" ? r.fee : r.price) ?? 0,
    amountMismatch: !!r.amountMismatch,
    paidAmount: r.paidAmount ?? null,
    propertyTitle: r.property?.title ?? "Unknown property",
    buyerName: buyer?.name ?? "Unknown user",
    buyerEmail: buyer?.email ?? "",
    startedAt: r.paystackPaidAt ?? r.initializedAt,
  }
}

// Payments that Paystack confirmed but no admin has approved or rejected yet.
// Approving creates the escrow and sets feePaid; rejecting cancels the deal.
export function buildPendingPayments(
  inspections: RawLinkedRecord[] = [],
  purchases: RawLinkedRecord[] = []
): PendingPayment[] {
  const pendingInspections = inspections
    .filter((i) => i.status === "inspection_payment_review" && !i.feePaid)
    .map((i) => toRow(i, "inspection"))

  const pendingPurchases = purchases
    .filter((p) => p.status === "property_payment_review" && !p.feePaid)
    .map((p) => toRow(p, "purchase"))

  // first come, first served
  return [...pendingInspections, ...pendingPurchases].sort((a, b) =>
    (a.startedAt ?? "").localeCompare(b.startedAt ?? "")
  )
}

export interface RefundDue {
  id: string
  kind: EscrowKind
  reference: string
  amount: number
  propertyTitle: string
  buyerName: string
  buyerEmail: string
}

// Rejected payments whose money the admin still has to send back. A refunded
// escrow also marks its record refundDue, but that one is handled from the
// escrow row (refund_pending), so records with an escrow are left out here
// to avoid showing the same refund twice.
export function buildRefundsDue(
  inspections: RawLinkedRecord[] = [],
  purchases: RawLinkedRecord[] = [],
  escrowReferences: Set<string>
): RefundDue[] {
  const toDue = (r: RawLinkedRecord, kind: EscrowKind): RefundDue => {
    const buyer = r.buyer ?? r.user
    return {
      id: r._id,
      kind,
      reference: r.reference ?? "",
      amount:
        r.refundAmount ||
        r.paidAmount ||
        (kind === "inspection" ? r.fee : r.price) ||
        0,
      propertyTitle: r.property?.title ?? "Unknown property",
      buyerName: buyer?.name ?? "Unknown user",
      buyerEmail: buyer?.email ?? "",
    }
  }
  const due = (r: RawLinkedRecord) =>
    !!r.refundDue && !(r.reference && escrowReferences.has(r.reference))

  return [
    ...inspections.filter(due).map((i) => toDue(i, "inspection")),
    ...purchases.filter(due).map((p) => toDue(p, "purchase")),
  ]
}

export function filterPendingPayments<
  T extends {
    id: string
    reference: string
    propertyTitle: string
    buyerName: string
    buyerEmail: string
    amount: number
  },
>(items: T[], query: string): T[] {
  const term = query.trim().toLowerCase()
  if (!term) return items
  return items.filter((p) =>
    [
      p.id,
      p.reference,
      p.propertyTitle,
      p.buyerName,
      p.buyerEmail,
      String(p.amount),
    ]
      .join(" ")
      .toLowerCase()
      .includes(term)
  )
}
