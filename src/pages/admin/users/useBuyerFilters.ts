import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { BuyerView, Filters } from "./buyerFilters"

const VIEWS: BuyerView[] = ["all", "verified", "unverified", "disputed"]

// Search, tab and page live in the URL, so opening a profile and pressing Back
// keeps your place.
export function useBuyerFilters() {
  const [params, setParams] = useSearchParams()
  // bumped by "Clear" so the uncontrolled search box empties too
  const [resetKey, setResetKey] = useState(0)

  const filters: Filters = useMemo(() => {
    const view = params.get("view") as BuyerView
    return {
      q: params.get("q") ?? "",
      view: VIEWS.includes(view) ? view : "all",
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

  const hasActive = filters.q !== "" || filters.view !== "all"

  return { filters, update, clear, hasActive, resetKey }
}
