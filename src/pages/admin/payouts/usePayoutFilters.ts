import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Filters, StatusFilter } from "./payoutMeta"

const STATUSES: StatusFilter[] = ["all", "pending", "completed", "failed"]

// Search, tab and page live in the URL, so a link like /admin/payouts?payout=<id> opens straight to that payout.
export function usePayoutFilters() {
  const [params, setParams] = useSearchParams()
  // bumped by "Clear" so the uncontrolled search box empties too
  const [resetKey, setResetKey] = useState(0)

  const filters: Filters = useMemo(() => {
    const status = params.get("status") as StatusFilter
    return {
      q: params.get("q") ?? "",
      status: STATUSES.includes(status) ? status : "all",
      page: Math.max(1, Math.floor(Number(params.get("page"))) || 1),
      payout: params.get("payout") ?? "",
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

  const hasActive =
    filters.q !== "" || filters.status !== "all" || filters.payout !== ""

  return { filters, update, clear, hasActive, resetKey }
}
