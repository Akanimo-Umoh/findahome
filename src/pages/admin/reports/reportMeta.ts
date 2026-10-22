import { KIND_LABEL, STATUS_LABEL } from "../finance/financeMeta"
import type { LedgerKind, LedgerRow, LedgerStatus } from "../finance/types"

export const PAGE_SIZE = 10

export type Period = "all" | "today" | "7d" | "30d"
export type RoleFilter = "all" | "user" | "agent"

export type Filters = {
  q: string
  period: Period
  role: RoleFilter
  kind: LedgerKind | "all"
  status: LedgerStatus | "all"
  page: number
}

export const PERIOD_LABEL: Record<Period, string> = {
  all: "All time",
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
}

const DAY = 86_400_000

// The date is when the record was created: the backend doesn't store when an escrow was released or a payout was paid.
function inPeriod(iso: string, period: Period) {
  if (period === "all") return true
  const t = new Date(iso).getTime()
  if (!t) return false
  if (period === "today") {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return t >= start.getTime()
  }
  return Date.now() - t <= (period === "7d" ? 7 : 30) * DAY
}

const matchesSearch = (r: LedgerRow, q: string) => {
  if (!q) return true
  const haystack = `${r.code} ${r.title} ${r.party.name} ${r.party.email} ${KIND_LABEL[r.kind]}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

// Everything the page shows, derived in one pure step. The totals use the period only, so they don't jump around while you search the table.
export function selectLedger(all: LedgerRow[], f: Filters) {
  const periodRows = all.filter((r) => inPeriod(r.date, f.period))
  const filtered = periodRows.filter(
    (r) =>
      matchesSearch(r, f.q) &&
      (f.role === "all" || r.party.role === f.role) &&
      (f.kind === "all" || r.kind === f.kind) &&
      (f.status === "all" || r.status === f.status)
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  return {
    periodRows,
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}

export function summarizeLedger(rows: LedgerRow[]) {
  const pick = (match: (r: LedgerRow) => boolean) => {
    const hit = rows.filter(match)
    return {
      amount: hit.reduce((sum, r) => sum + r.amount, 0),
      count: hit.length,
    }
  }
  const payment = (r: LedgerRow) => r.kind === "escrow_payment"

  return {
    held: pick(
      (r) => payment(r) && (r.status === "pending" || r.status === "in_escrow")
    ),
    awaiting: pick((r) => payment(r) && r.status === "pending"),
    released: pick((r) => r.kind === "escrow_release"),
    pendingPayouts: pick((r) => r.kind === "payout" && r.status === "pending"),
    payoutsSent: pick((r) => r.kind === "payout" && r.status === "completed"),
    disputed: pick((r) => payment(r) && r.status === "disputed"),
  }
}

export type LedgerSummary = ReturnType<typeof summarizeLedger>

// Downloads what the filters currently show (all pages), as a CSV.
export function exportLedgerCsv(list: LedgerRow[]) {
  const head = [
    "Code",
    "Description",
    "Person",
    "Email",
    "Type",
    "Amount (NGN)",
    "Status",
    "Date",
  ]
  const rows = list.map((r) => [
    r.code,
    r.title,
    r.party.name,
    r.party.email,
    KIND_LABEL[r.kind],
    r.amount,
    STATUS_LABEL[r.status],
    r.date,
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
  link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
