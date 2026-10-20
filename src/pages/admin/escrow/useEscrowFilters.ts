// (tab, search and page live in the URL; pagination is client-side)
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { EscrowRow, EscrowTab } from "./types"

export const PAGE_SIZE = 10
const TABS: EscrowTab[] = ["pending", "in_escrow", "released", "disputed"]

export function useEscrowFilters(rows: EscrowRow[]) {
  const [params, setParams] = useSearchParams()
  const rawTab = params.get("tab") as EscrowTab | null
  const tab: EscrowTab = rawTab && TABS.includes(rawTab) ? rawTab : "all"
  const q = params.get("q") ?? ""
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
      if (!term) return true
      return [
        r.propertyTitle,
        r.code,
        r.reference,
        r.buyer.name,
        r.buyer.email,
        r.agent.name,
        r.agent.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    })
  }, [rows, tab, q])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)

  return {
    tab,
    q,
    page: current,
    pageCount,
    total: filtered.length,
    items: filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    setTab: (t: EscrowTab) =>
      update({ tab: t === "all" ? null : t, page: null }),
    setQuery: (v: string) => update({ q: v || null, page: null }),
    setPage: (p: number) => update({ page: p <= 1 ? null : String(p) }),
  }
}
