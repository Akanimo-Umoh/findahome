import type { AdminAd } from "@/types/adminAd"

export const PAGE_SIZE = 10

// "awaiting_payment" and "pending_review" are both status "pending" on the backend; isPaid tells them apart.
export type AdState =
  | "awaiting_payment"
  | "pending_review"
  | "active"
  | "paused"
  | "completed"
  | "rejected"

export const adState = (a: AdminAd): AdState =>
  a.status === "pending"
    ? a.isPaid
      ? "pending_review"
      : "awaiting_payment"
    : a.status

export const STATE_LABEL: Record<AdState, string> = {
  awaiting_payment: "Awaiting payment",
  pending_review: "Pending review",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  rejected: "Rejected",
}

export const OBJECTIVE_LABEL: Record<string, string> = {
  views: "Views",
  leads: "Leads",
  sales: "Sales",
}

export const adCode = (a: AdminAd) => `AD-${a._id.slice(-6).toUpperCase()}`

export type Period = "7d" | "30d" | "year" | "all"

export const PERIOD_LABEL: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  year: "This year",
  all: "All time",
}

// The backend stores no payment date, so the period counts from when the ad was created.
function inPeriod(iso: string, period: Period) {
  if (period === "all") return true
  const t = new Date(iso).getTime()
  if (!t) return false
  if (period === "year") {
    return t >= new Date(new Date().getFullYear(), 0, 1).getTime()
  }
  return Date.now() - t <= (period === "7d" ? 7 : 30) * 86_400_000
}

export type StateFilter = "all" | AdState

export type Filters = {
  q: string
  state: StateFilter
  period: Period
  page: number
}

export type StateCounts = Record<StateFilter, number>

const time = (iso: string) => new Date(iso).getTime() || 0

const matchesSearch = (a: AdminAd, q: string) => {
  if (!q) return true
  const haystack = `${adCode(a)} ${a.property?.title ?? ""} ${a.user?.name ?? ""} ${a.user?.email ?? ""}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

const STATES: AdState[] = [
  "awaiting_payment",
  "pending_review",
  "active",
  "paused",
  "completed",
  "rejected",
]

// Everything the All Ads table shows, derived in one pure step. Tab counts follow the search, so they match what you'd see.
export function selectAds(all: AdminAd[], f: Filters) {
  const scoped = all.filter((a) => matchesSearch(a, f.q))
  const filtered = scoped
    .filter((a) => f.state === "all" || adState(a) === f.state)
    .sort((a, b) => time(b.createdAt) - time(a.createdAt))

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  const counts = { all: scoped.length } as StateCounts
  for (const s of STATES)
    counts[s] = scoped.filter((a) => adState(a) === s).length

  return {
    counts,
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}

// Ads that were paid for and wait for a decision, oldest first.
export const reviewQueue = (all: AdminAd[]) =>
  all
    .filter((a) => adState(a) === "pending_review")
    .sort((a, b) => time(a.createdAt) - time(b.createdAt))

// Active / pending / rejected are what is true now. Revenue and the objective split follow the period.
export function summarizeAds(all: AdminAd[], period: Period) {
  const paid = all.filter((a) => a.isPaid && inPeriod(a.createdAt, period))
  const byObjective: Record<string, number> = { views: 0, leads: 0, sales: 0 }
  for (const a of paid) {
    byObjective[a.objective] = (byObjective[a.objective] ?? 0) + a.adBudget
  }

  return {
    active: all.filter((a) => adState(a) === "active").length,
    pendingReview: all.filter((a) => adState(a) === "pending_review").length,
    rejected: all.filter((a) => adState(a) === "rejected").length,
    revenue: {
      amount: paid.reduce((sum, a) => sum + a.adBudget, 0),
      count: paid.length,
    },
    byObjective,
  }
}

export type AdSummary = ReturnType<typeof summarizeAds>
