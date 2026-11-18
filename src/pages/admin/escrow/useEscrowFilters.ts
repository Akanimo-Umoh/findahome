// (tab, search and page live in the URL; pagination is client-side)
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { EscrowRow, EscrowTab } from "./types"
import { needsRelease } from "./useEscrowAttention"

export const PAGE_SIZE = 10
const TABS: EscrowTab[] = [
  "in_escrow",
  "released",
  "disputed",
  "refund_pending",
  "refunded",
]

export function useEscrowFilters(rows: EscrowRow[]) {
  const [params, setParams] = useSearchParams()
  const rawTab = params.get("tab") as EscrowTab | null
  const tab: EscrowTab = rawTab && TABS.includes(rawTab) ? rawTab : "all"
  const q = params.get("q") ?? ""
  const ready = params.get("ready") === "1"
  const page = Math.max(1, Number(params.get("page")) || 1)

  const update = (patch: Record<string, string | null>) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(patch).forEach(([k, v]) =>
          v ? next.set(k, v) : next.delete(k)
        )
        return next
      },
      { replace: true }
    )

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return rows.filter((r) => {
      if (tab !== "all" && r.status !== tab) return false
      if (ready && !needsRelease(r)) return false
      if (!term) return true
      // anything an admin might have in hand: the TXN code, the Paystack
      // reference, the record ids, a name, email or phone number, the amount
      return [
        r.propertyTitle,
        r.propertyAddress,
        r.code,
        r.id,
        r.reference,
        r.linked?._id,
        r.linked?.code,
        r.buyer.name,
        r.buyer.email,
        r.buyer.phone,
        r.agent.name,
        r.agent.email,
        r.agent.phone,
        String(r.amount),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    })
  }, [rows, tab, q, ready])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)

  return {
    tab,
    q,
    ready,
    page: current,
    pageCount,
    total: filtered.length,
    items: filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    setTab: (t: EscrowTab) =>
      update({ tab: t === "all" ? null : t, page: null }),
    setQuery: (v: string) => update({ q: v || null, page: null }),
    setReady: (v: boolean) => update({ ready: v ? "1" : null, page: null }),
    setPage: (p: number) => update({ page: p <= 1 ? null : String(p) }),
  }
}
