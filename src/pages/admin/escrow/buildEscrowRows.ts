// buildEscrowRows.ts
import { isPropertyTakenCancel } from "@/lib/refundFee"
import { buildPropertyOffers, otherOfferFor } from "./propertyOffers"
import type {
  RawDispute,
  RawEscrow,
  RawLinkedRecord,
  RawUser,
} from "@/types/adminEscrow"
import type {
  EscrowKind,
  EscrowRow,
  EscrowState,
  EscrowStatsData,
  Party,
} from "./types"

const OPEN_DISPUTE = new Set(["opened", "under_review", "escalated"])

const idOf = (v: unknown): string | null =>
  !v ? null : typeof v === "string" ? v : ((v as { _id?: string })._id ?? null)

function toParty(a?: RawUser | null, b?: RawUser | null): Party {
  return {
    id: a?._id ?? b?._id ?? null,
    name: a?.name ?? b?.name ?? "Unknown user",
    email: a?.email ?? b?.email ?? "",
    // phone only comes from the purchase/inspection populate
    phone: b?.phoneNumber ?? a?.phoneNumber ?? null,
  }
}

interface Input {
  escrows: RawEscrow[]
  purchases: RawLinkedRecord[]
  inspections: RawLinkedRecord[]
  disputes: RawDispute[]
}

export function buildEscrowRows({
  escrows,
  purchases,
  inspections,
  disputes,
}: Input): EscrowRow[] {
  // Escrow.reference === Purchase.reference / Inspection.reference
  const linkedByRef = new Map<
    string,
    { record: RawLinkedRecord; kind: EscrowKind }
  >()
  purchases.forEach((p) => {
    if (p.reference)
      linkedByRef.set(p.reference, { record: p, kind: "purchase" })
  })
  inspections.forEach((i) => {
    if (i.reference)
      linkedByRef.set(i.reference, { record: i, kind: "inspection" })
  })

  // One dispute per purchase/inspection, preferring one that is still open
  const disputeByRecord = new Map<string, RawDispute>()
  for (const d of disputes) {
    const key = idOf(d.purchase) ?? idOf(d.inspection)
    if (!key) continue
    const existing = disputeByRecord.get(key)
    if (
      !existing ||
      (!OPEN_DISPUTE.has(existing.status) && OPEN_DISPUTE.has(d.status))
    ) {
      disputeByRecord.set(key, d)
    }
  }

  const offers = buildPropertyOffers(purchases)

  return escrows.map((e) => {
    const hit = e.reference ? linkedByRef.get(e.reference) : undefined
    const linked = hit?.record ?? null
    const kind: EscrowKind =
      e.type === "purchase" || e.type === "inspection"
        ? e.type
        : (hit?.kind ?? "inspection")
    const dispute = linked ? (disputeByRecord.get(linked._id) ?? null) : null
    const openDispute = !!dispute && OPEN_DISPUTE.has(dispute.status)
    const released = e.status === "released" // anything else counts as held
    const status: EscrowState = released
      ? "released"
      : e.status === "refunded"
        ? "refunded"
        : e.status === "refund_pending"
          ? "refund_pending"
          : openDispute
            ? "disputed"
            : "in_escrow"
    const property = e.property ?? linked?.property ?? null
    const linkedComplete =
      !!linked &&
      (kind === "inspection"
        ? linked.status === "inspection_completed"
        : ["handover_completed", "funds_released"].includes(linked.status))
    // The platform doesn't charge for inspections: the agent is paid the full
    // amount, so there is no fee to read and no payout for the backend to confirm.
    const noFee = kind === "inspection"
    const platformFee = noFee
      ? 0
      : (e.platformFee ?? linked?.platformFee ?? null)

    const netPayoutConfirmed = noFee || typeof e.netPayout === "number"

    return {
      id: e._id,
      code: e.code ?? `TXN-${e._id.slice(-6).toUpperCase()}`,
      reference: e.reference ?? "—",
      kind,
      status,
      released,
      releaseReady:
        status !== "refund_pending" &&
        !!linked?.feePaid &&
        linkedComplete &&
        !openDispute &&
        netPayoutConfirmed,
      amount: e.amount ?? 0,
      platformFee,
      netPayout: noFee
        ? (e.amount ?? 0)
        : (e.netPayout ??
          (platformFee == null ? null : (e.amount ?? 0) - platformFee)),
      netPayoutConfirmed,
      createdAt: e.createdAt,
      releasedAt: e.releasedAt ?? null,
      reason: e.reason ?? null,
      refundedAt: e.refundedAt ?? null,
      refundedAmount: e.refundedAmount ?? null,
      transferReference: e.transferReference ?? null,
      refundNote: e.refundNote ?? null,
      refundFeeWaived: !!e.refundFeeWaived || isPropertyTakenCancel(linked),
      // only matters while the money is still here to refund or release
      otherOffer:
        status === "released" || status === "refunded"
          ? null
          : otherOfferFor(offers, {
              _id: linked?._id ?? e._id,
              property,
              buyer: e.buyer ?? linked?.buyer ?? linked?.user,
            }),
      propertyId: property?._id ?? null,
      propertyTitle:
        property?.title ?? linked?.property?.title ?? "Unknown property",
      propertyAddress: linked?.property?.address ?? null,
      buyer: toParty(e.buyer, linked?.buyer ?? linked?.user),
      agent: toParty(e.seller, linked?.owner),
      linked,
      dispute,
      openDispute,
    }
  })
}

// In escrow + Released + Disputed + Refund pending + Refunded add up to Total
export function buildEscrowStats(rows: EscrowRow[]): EscrowStatsData {
  const sum = (s?: EscrowState) =>
    rows.filter((r) => !s || r.status === s).reduce((t, r) => t + r.amount, 0)
  const count = (s?: EscrowState) =>
    rows.filter((r) => !s || r.status === s).length

  return {
    total: sum(),
    inEscrow: sum("in_escrow"),
    released: sum("released"),
    disputed: sum("disputed"),
    refundPending: sum("refund_pending"),
    refunded: sum("refunded"),
    platformRevenue: rows.reduce(
      (total, row) =>
        total + (row.linked?.feePaid ? (row.platformFee ?? 0) : 0),
      0
    ),
    count: {
      all: count(),
      in_escrow: count("in_escrow"),
      released: count("released"),
      disputed: count("disputed"),
      refund_pending: count("refund_pending"),
      refunded: count("refunded"),
    },
  }
}
