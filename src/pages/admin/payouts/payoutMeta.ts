import type { PayoutRow } from "../finance/types"

export const PAGE_SIZE = 10

export type StatusFilter = "all" | "pending" | "completed" | "failed"

export type Filters = {
  q: string
  status: StatusFilter
  page: number
  // show only this payout (used by links from Financial Reports)
  payout: string
}

export type StatusCounts = Record<StatusFilter, number>

const matchesSearch = (p: PayoutRow, q: string) => {
  if (!q) return true
  const haystack = `${p.code} ${p.agent.name} ${p.agent.email} ${p.bank?.bankName ?? ""}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

const matchesStatus = (p: PayoutRow, status: StatusFilter) =>
  status === "all" || p.status === status

export function summarizePayouts(list: PayoutRow[]) {
  const pick = (match: (p: PayoutRow) => boolean) => {
    const hit = list.filter(match)
    return {
      amount: hit.reduce((sum, p) => sum + p.amount, 0),
      count: hit.length,
    }
  }
  return {
    pending: pick((p) => p.status === "pending"),
    completed: pick((p) => p.status === "completed"),
    failed: pick((p) => p.status === "failed"),
    total: pick(() => true),
  }
}

export type PayoutSummary = ReturnType<typeof summarizePayouts>

// Everything the page shows, derived in one pure step. Tab counts follow the search, so they match what you'd see.
export function selectPayouts(all: PayoutRow[], f: Filters) {
  const scoped = all
    .filter((p) => !f.payout || p.id === f.payout)
    .filter((p) => matchesSearch(p, f.q))
  // a linked payout is shown whatever tab is selected
  const filtered = scoped.filter((p) =>
    f.payout ? true : matchesStatus(p, f.status)
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  const counts: StatusCounts = {
    all: scoped.length,
    pending: scoped.filter((p) => matchesStatus(p, "pending")).length,
    completed: scoped.filter((p) => matchesStatus(p, "completed")).length,
    failed: scoped.filter((p) => matchesStatus(p, "failed")).length,
  }

  return {
    counts,
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}
