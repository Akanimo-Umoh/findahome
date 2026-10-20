import type { EscrowRow } from "@/pages/admin/escrow/types"
import type { RawDispute, RawLinkedRecord } from "@/types/adminEscrow"
import type { AdminUser } from "@/types/adminUser"

// There is no user code on the backend, so derive a short one from the id.
export const userCode = (u: AdminUser) => `USR-${u._id.slice(-6).toUpperCase()}`

const OPEN = new Set(["opened", "under_review", "escalated"])
export const isOpenDispute = (d: RawDispute) => OPEN.has(d.status)

export const DISPUTE_LABEL: Record<string, string> = {
  opened: "Open",
  under_review: "Under review",
  escalated: "Escalated",
  resolved: "Resolved",
  closed: "Closed",
}

export const DISPUTE_TONE: Record<string, string> = {
  opened: "bg-amber-50 text-amber-700",
  under_review: "bg-blue-50 text-blue-700",
  escalated: "bg-red-50 text-red-700",
  resolved: "bg-emerald-50 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
}

export const disputeUserId = (d: RawDispute) =>
  typeof d.user === "string" ? d.user : d.user?._id

// Every figure is null when its source didn't load, so the page shows "—"
// instead of a false zero.
export function buyerSummary(input: {
  rows?: EscrowRow[]
  disputes?: RawDispute[]
  inspections?: RawLinkedRecord[]
}) {
  const { rows, disputes, inspections } = input
  const open = disputes?.filter(isOpenDispute).length ?? null

  return {
    transactions: rows?.length ?? null,
    completed: rows ? rows.filter((r) => r.status === "released").length : null,
    totalPaid: rows ? rows.reduce((sum, r) => sum + r.amount, 0) : null,
    disputes: disputes?.length ?? null,
    openDisputes: open,
    resolvedDisputes: disputes && open !== null ? disputes.length - open : null,
    cancelledInspections: inspections
      ? inspections.filter((i) => i.status === "inspection_cancelled").length
      : null,
    disputeRate:
      rows && disputes && rows.length > 0
        ? (disputes.length / rows.length) * 100
        : null,
    refunds: rows ? rows.filter((r) => r.status === "refunded").length : null,
  }
}

export type BuyerSummary = ReturnType<typeof buyerSummary>

export type BuyerActivity = {
  transactions: number
  disputes: number
  openDisputes: number
}

// Per-buyer counts from the escrow data (transactions) and the disputes list.
export function buyerActivity(
  rows: EscrowRow[] = [],
  disputes: RawDispute[] = []
) {
  const map = new Map<string, BuyerActivity>()
  const entry = (id: string) => {
    let e = map.get(id)
    if (!e) {
      e = { transactions: 0, disputes: 0, openDisputes: 0 }
      map.set(id, e)
    }
    return e
  }
  for (const r of rows) if (r.buyer.id) entry(r.buyer.id).transactions += 1
  for (const d of disputes) {
    const id = disputeUserId(d)
    if (!id) continue
    const e = entry(id)
    e.disputes += 1
    if (isOpenDispute(d)) e.openDisputes += 1
  }
  return map
}
