import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Filters, SortKey, StatusFilter } from "./filterProperties"

const STATUSES: StatusFilter[] = [
  "all",
  "approved",
  "pending",
  "rejected",
  "flagged",
]
const TYPES = ["all", "apartment", "duplex", "bungalow", "land"] as const
const LISTINGS = ["all", "sale", "rent"] as const
const SORTS: SortKey[] = ["newest", "oldest", "price-high", "price-low"]

const pick = <T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T
): T => (allowed.includes(value as T) ? (value as T) : fallback)

// Filters live in the URL, so going to a listing and pressing Back keeps your
// search, filters and page.
export function usePropertyFilters() {
  const [params, setParams] = useSearchParams()
  // bumped by "Clear" so the uncontrolled search box empties too
  const [resetKey, setResetKey] = useState(0)

  const filters: Filters = useMemo(
    () => ({
      q: params.get("q") ?? "",
      status: pick(params.get("status"), STATUSES, "all"),
      type: pick(params.get("type"), TYPES, "all"),
      listing: pick(params.get("listing"), LISTINGS, "all"),
      sort: pick(params.get("sort"), SORTS, "newest"),
      page: Math.max(1, Math.floor(Number(params.get("page"))) || 1),
    }),
    [params]
  )

  const update = useCallback(
    (patch: Partial<Filters>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(patch)) {
            const isDefault =
              value === "" ||
              value === "all" ||
              (key === "sort" && value === "newest") ||
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

  const hasActive =
    filters.q !== "" ||
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.listing !== "all"

  return { filters, update, clear, hasActive, resetKey }
}
