import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Filters, Period, StateFilter } from "./adMeta"

const STATES: StateFilter[] = [
  "all",
  "active",
  "paused",
  "pending_review",
  "awaiting_payment",
  "completed",
  "rejected",
]
const PERIODS: Period[] = ["7d", "30d", "year", "all"]

// Search, tab, period and page live in the URL, so going Back keeps your place.
export function useAdFilters() {
  const [params, setParams] = useSearchParams()
  // bumped by "Clear" so the uncontrolled search box empties too
  const [resetKey, setResetKey] = useState(0)

  const filters: Filters = useMemo(() => {
    const state = params.get("state") as StateFilter
    const period = params.get("period") as Period
    return {
      q: params.get("q") ?? "",
      state: STATES.includes(state) ? state : "all",
      period: PERIODS.includes(period) ? period : "30d",
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
              value === "" ||
              value === "all" ||
              (key === "period" && value === "30d") ||
              (key === "page" && value === 1)
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

  // the period has its own control, so it isn't a filter to clear
  const hasActive = filters.q !== "" || filters.state !== "all"

  return { filters, update, clear, hasActive, resetKey }
}
