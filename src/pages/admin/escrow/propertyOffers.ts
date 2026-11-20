import type { RawLinkedRecord } from "@/types/adminEscrow"

// A purchase that holds a property: its payment is under review ("review"),
// or the admin has approved it and the deal is going ahead ("secured").
// Same statuses the backend treats as taken.
export interface PropertyOffer {
  stage: "review" | "secured"
  purchaseId: string
  buyerId: string | null
  buyerName: string
}

const SECURED = new Set([
  "property_payment_made",
  "handover_requested",
  "handover_scheduled",
  "handover_rescheduled",
  "handover_confirmed",
  "handover_completed",
  "funds_released",
])

const idOf = (v: unknown): string | null =>
  !v ? null : typeof v === "string" ? v : ((v as { _id?: string })._id ?? null)

// property id → the offer holding it. an approved one wins over one in review
export function buildPropertyOffers(
  purchases: RawLinkedRecord[] = []
): Map<string, PropertyOffer> {
  const offers = new Map<string, PropertyOffer>()
  for (const p of purchases) {
    const stage = SECURED.has(p.status)
      ? "secured"
      : p.status === "property_payment_review"
        ? "review"
        : null
    const propertyId = idOf(p.property)
    if (!stage || !propertyId) continue
    if (offers.get(propertyId)?.stage === "secured") continue
    offers.set(propertyId, {
      stage,
      purchaseId: p._id,
      buyerId: idOf(p.buyer),
      buyerName: p.buyer?.name ?? p.buyer?.email ?? "another buyer",
    })
  }
  return offers
}

// The offer on this record's property made by someone else, if any. A
// buyer's own purchase (or the purchase itself) doesn't count.
export function otherOfferFor(
  offers: Map<string, PropertyOffer>,
  record: { _id: string; property?: unknown; buyer?: unknown; user?: unknown }
): PropertyOffer | null {
  const propertyId = idOf(record.property)
  const offer = propertyId ? offers.get(propertyId) : undefined
  if (!offer || offer.purchaseId === record._id) return null
  const buyerId = idOf(record.buyer ?? record.user)
  if (buyerId && buyerId === offer.buyerId) return null
  return offer
}

// an escrow's state for the advice: a completed inspection is still owed to
// the agent, anything else is money that may need to go back
export const escrowOfferState = (row: {
  kind: "inspection" | "purchase"
  linked: { status: string } | null
}): "escrow" | "completed" =>
  row.kind === "inspection" && row.linked?.status === "inspection_completed"
    ? "completed"
    : "escrow"

// What the admin should make of it, for the record's kind and state
export function offerAdvice(
  offer: PropertyOffer,
  kind: "inspection" | "purchase",
  state: "pending" | "escrow" | "completed"
): string {
  const who = offer.buyerName
  if (offer.stage === "review") {
    if (kind === "inspection" && state !== "completed")
      return `${who}'s payment for this property is under review. If you approve it, this inspection is cancelled and refunded in full automatically, so there's no need to refund it yourself.`
    return `${who}'s payment for this property is under review. Wait for that decision before refunding or releasing.`
  }
  if (kind === "inspection" && state === "completed")
    return `Property secured by ${who}. This inspection was completed, so its fee is still the agent's to release.`
  if (kind === "inspection" && state === "pending")
    return `Property secured by ${who}. This buyer can't go ahead, so reject the payment, and waive the processing fee when you send the refund.`
  return `Property secured by ${who}. This buyer can't go ahead with the property.`
}
