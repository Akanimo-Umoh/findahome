import type { AdminUser } from "@/types/adminUser"
import { userCode, type BuyerActivity } from "./buyerMeta"

export const PAGE_SIZE = 10

export type BuyerView = "all" | "verified" | "unverified" | "disputed"

export type Filters = {
  q: string
  view: BuyerView
  page: number
}

export type ViewCounts = Record<BuyerView, number>

const time = (iso: string) => new Date(iso).getTime() || 0

const matchesSearch = (u: AdminUser, q: string) => {
  if (!q) return true
  const haystack = `${u.name} ${u.email} ${u.phoneNumber ?? ""} ${userCode(u)}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

const matchesView = (
  u: AdminUser,
  view: BuyerView,
  activity: Map<string, BuyerActivity>
) => {
  if (view === "verified") return !!u.isVerified
  if (view === "unverified") return !u.isVerified
  if (view === "disputed") return (activity.get(u._id)?.openDisputes ?? 0) > 0
  return true
}

export const countViews = (
  list: AdminUser[],
  activity: Map<string, BuyerActivity>
): ViewCounts => ({
  all: list.length,
  verified: list.filter((u) => matchesView(u, "verified", activity)).length,
  unverified: list.filter((u) => matchesView(u, "unverified", activity)).length,
  disputed: list.filter((u) => matchesView(u, "disputed", activity)).length,
})

// Everything the list shows, derived in one pure step. Tab counts follow the
// search, so they match what you'd see.
export function selectBuyers(
  all: AdminUser[],
  f: Filters,
  activity: Map<string, BuyerActivity>
) {
  const scoped = all.filter((u) => matchesSearch(u, f.q))
  const filtered = scoped
    .filter((u) => matchesView(u, f.view, activity))
    .sort((a, b) => time(b.createdAt) - time(a.createdAt))

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  return {
    tabCounts: countViews(scoped, activity),
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}
