import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { KIND_LABEL, STATUS_LABEL } from "../finance/financeMeta"
import type { LedgerKind, LedgerStatus } from "../finance/types"
import type { Filters, Period, RoleFilter } from "./reportMeta"

const PERIODS: Period[] = ["all", "today", "7d", "30d"]
const ROLES: RoleFilter[] = ["all", "user", "agent"]
const KINDS = Object.keys(KIND_LABEL) as LedgerKind[]
const STATUSES = Object.keys(STATUS_LABEL) as LedgerStatus[]

// Every filter lives in the URL, so opening a transaction and pressing Back keeps your place.
export function useReportFilters() {
  const [params, setParams] = useSearchParams()
  // bumped by "Clear" so the uncontrolled search box empties too
  const [resetKey, setResetKey] = useState(0)

  const filters: Filters = useMemo(() => {
    const period = params.get("period") as Period
    const role = params.get("role") as RoleFilter
    const kind = params.get("kind") as LedgerKind
    const status = params.get("status") as LedgerStatus
    return {
      q: params.get("q") ?? "",
      period: PERIODS.includes(period) ? period : "all",
      role: ROLES.includes(role) ? role : "all",
      kind: KINDS.includes(kind) ? kind : "all",
      status: STATUSES.includes(status) ? status : "all",
      page: Math.max(1, Math.floor(Number(params.get("page"))) || 1),
    }
  }, [params])

  const update = useCallback(
    (patch: Partial<Filters>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(patch)) {
            const isDefault =
              value === "" || value === "all" || (key === "page" && value === 1)
            if (isDefault) next.delete(key)
            else next.set(key, String(value))
          }
          // any filter change goes back to page 1
          if (!("page" in patch)) next.delete("page")
          return next
        },
        { replace: true }
      )
    },
    [setParams]
  )

  const clear = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true })
    setResetKey((k) => k + 1)
  }, [setParams])

  // the period isn't a "filter to clear": it has its own control above
  const hasActive =
    filters.q !== "" ||
    filters.role !== "all" ||
    filters.kind !== "all" ||
    filters.status !== "all"

  return { filters, update, clear, hasActive, resetKey }
}
