import { titleCase } from "@/pages/admin/escrow/format"
import type { AdminDispute } from "@/types/adminDispute"

export const PAGE_SIZE = 6

const ACTIVE = new Set(["opened", "under_review", "escalated"])
export const isActive = (d: AdminDispute) => ACTIVE.has(d.status)
export const isResolved = (d: AdminDispute) =>
  d.status === "resolved" || d.status === "closed"

export const STATUS_LABEL: Record<string, string> = {
  opened: "Pending review",
  under_review: "Under review",
  escalated: "Escalated",
  resolved: "Resolved",
  closed: "Closed",
}

export const STATUS_TONE: Record<string, string> = {
  opened: "bg-amber-50 text-amber-700",
  under_review: "bg-blue-50 text-blue-700",
  escalated: "bg-red-50 text-red-700",
  resolved: "bg-emerald-50 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
}

const CATEGORY_LABEL: Record<string, string> = {
  refund_request: "Refund request",
  property_mismatch: "Property doesn't match listing",
  agent_misconduct: "Agent misconduct",
  payment_issue: "Payment issue",
  other: "Other",
}

export const categoryLabel = (c: string) => CATEGORY_LABEL[c] ?? titleCase(c)

// The purchase price or the inspection fee, whichever this dispute is about.
export const disputeAmount = (d: AdminDispute) =>
  d.purchase?.price ?? d.inspection?.fee ?? null

export type View = "active" | "pending" | "resolved" | "all"

export type Filters = {
  q: string
  view: View
  page: number
  // show only this dispute (used by links from the buyer profile)
  dispute: string
}

export type ViewCounts = Record<View, number>

const DAY = 86_400_000
const time = (iso?: string) => (iso ? new Date(iso).getTime() || 0 : 0)
const finishedAt = (d: AdminDispute) =>
  time(d.resolvedAt ?? d.closedAt ?? d.updatedAt)

const inView = (d: AdminDispute, view: View) => {
  if (view === "active") return isActive(d)
  if (view === "pending") return d.status === "opened"
  if (view === "resolved") return isResolved(d)
  return true
}

const matchesSearch = (d: AdminDispute, q: string) => {
  if (!q) return true
  const haystack = [
    d.property?.title,
    d.referenceId,
    d.user?.name,
    d.agent?.name,
    categoryLabel(d.category),
  ]
    .join(" ")
    .toLowerCase()
  return haystack.includes(q.toLowerCase())
}

export function summarize(list: AdminDispute[]) {
  const now = Date.now()
  const active = list.filter(isActive)
  return {
    active: active.length,
    pending: list.filter((d) => d.status === "opened").length,
    resolved30: list.filter(
      (d) => isResolved(d) && now - finishedAt(d) <= 30 * DAY
    ).length,
    amountInDispute: active.reduce(
      (sum, d) => sum + (disputeAmount(d) ?? 0),
      0
    ),
  }
}

// Everything the page shows, derived in one pure step. Tab counts follow the search, so they match what you'd see.
export function selectDisputes(all: AdminDispute[], f: Filters) {
  const scoped = all
    .filter((d) => !f.dispute || d._id === f.dispute)
    .filter((d) => matchesSearch(d, f.q))
  // a linked dispute is shown whatever tab is selected
  const filtered = scoped
    .filter((d) => (f.dispute ? true : inView(d, f.view)))
    .sort((a, b) => time(b.updatedAt) - time(a.updatedAt))

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  const counts: ViewCounts = {
    active: scoped.filter((d) => inView(d, "active")).length,
    pending: scoped.filter((d) => inView(d, "pending")).length,
    resolved: scoped.filter((d) => inView(d, "resolved")).length,
    all: scoped.length,
  }

  return {
    counts,
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}

// Downloads what the filters currently show (all pages), as a CSV.
export function exportDisputesCsv(list: AdminDispute[]) {
  const head = [
    "Reference",
    "Property",
    "Category",
    "Status",
    "Amount (NGN)",
    "Buyer",
    "Agent",
    "Created",
    "Updated",
  ]
  const rows = list.map((d) => [
    d.referenceId,
    d.property?.title ?? "",
    categoryLabel(d.category),
    STATUS_LABEL[d.status] ?? d.status,
    disputeAmount(d) ?? "",
    d.user?.name ?? "",
    d.agent?.name ?? "",
    d.createdAt,
    d.updatedAt,
  ])
  const csv = [head, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n")

  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" })
  )
  const link = document.createElement("a")
  link.href = url
  link.download = `disputes-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
