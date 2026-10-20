import type { AdminUser } from "@/types/adminUser"
import { reviewState, type ReviewState } from "./agentMeta"

export const PAGE_SIZE = 10

export type StatusFilter = "all" | ReviewState

export type Filters = {
  q: string
  status: StatusFilter
  page: number
}

export type StatusCounts = Record<StatusFilter, number>

const time = (iso: string) => new Date(iso).getTime() || 0

const matchesSearch = (a: AdminUser, q: string) => {
  if (!q) return true
  const haystack = `${a.name} ${a.email} ${a.phoneNumber ?? ""} ${a.businessName ?? ""} ${a.licenseNumber ?? ""}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

export const countStates = (list: AdminUser[]): StatusCounts => {
  const counts: StatusCounts = {
    all: list.length,
    incomplete: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
  }
  for (const a of list) counts[reviewState(a)] += 1
  return counts
}

// Everything the list page shows, derived in one pure step.
// Tab counts reflect the search, so they match what you'd see.
export function selectAgents(all: AdminUser[], f: Filters) {
  const scoped = all.filter((a) => matchesSearch(a, f.q))
  const filtered = scoped
    .filter((a) => f.status === "all" || reviewState(a) === f.status)
    .sort((a, b) => time(b.createdAt) - time(a.createdAt))

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  return {
    tabCounts: countStates(scoped),
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}
