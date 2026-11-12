import type { RawLinkedRecord } from "@/types/adminEscrow"
import type { EscrowKind } from "./types"

export interface PendingPayment {
  id: string
  kind: EscrowKind
  reference: string
  amount: number
  propertyTitle: string
  buyerName: string
  buyerEmail: string
  startedAt?: string
}

// A payment the buyer started on Paystack that no admin has confirmed yet.
// Inspections move to `inspection_initialized`; purchases keep status "none"
// but get a reference. Once confirmed, `feePaid` becomes true.
export function buildPendingPayments(
  inspections: RawLinkedRecord[] = [],
  purchases: RawLinkedRecord[] = []
): PendingPayment[] {
  const toRow = (r: RawLinkedRecord, kind: EscrowKind): PendingPayment => {
    const buyer = r.buyer ?? r.user
    return {
      id: r._id,
      kind,
      reference: r.reference ?? "",
      amount: (kind === "inspection" ? r.fee : r.price) ?? 0,
      propertyTitle: r.property?.title ?? "Unknown property",
      buyerName: buyer?.name ?? "Unknown user",
      buyerEmail: buyer?.email ?? "",
      startedAt: r.initializedAt,
    }
  }

  const pendingInspections = inspections
    .filter(
      (i) =>
        i.status === "inspection_initialized" && !!i.reference && !i.feePaid
    )
    .map((i) => toRow(i, "inspection"))

  const pendingPurchases = purchases
    .filter((p) => p.status === "none" && !!p.reference && !p.feePaid)
    .map((p) => toRow(p, "purchase"))

  // first come, first served
  return [...pendingInspections, ...pendingPurchases].sort((a, b) =>
    (a.startedAt ?? "").localeCompare(b.startedAt ?? "")
  )
}

export function filterPendingPayments(items: PendingPayment[], query: string) {
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
