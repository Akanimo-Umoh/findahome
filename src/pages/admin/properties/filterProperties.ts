import type {
  AdminProperty,
  ListingKind,
  PropertyKind,
  PropertyStatus,
} from "@/types/adminProperty"
import { propertyCode } from "./shared/propertyMeta"

export const PAGE_SIZE = 10

export type StatusFilter = "all" | PropertyStatus | "flagged"
export type SortKey = "newest" | "oldest" | "price-high" | "price-low"

export type Filters = {
  q: string
  status: StatusFilter
  type: PropertyKind | "all"
  listing: ListingKind | "all"
  sort: SortKey
  page: number
}

export type StatusCounts = Record<StatusFilter, number>

const time = (iso: string) => new Date(iso).getTime() || 0

const SORTERS: Record<SortKey, (a: AdminProperty, b: AdminProperty) => number> =
  {
    newest: (a, b) => time(b.createdAt) - time(a.createdAt),
    oldest: (a, b) => time(a.createdAt) - time(b.createdAt),
    "price-high": (a, b) => b.price - a.price,
    "price-low": (a, b) => a.price - b.price,
  }

const matchesSearch = (p: AdminProperty, q: string) => {
  if (!q) return true
  const haystack = `${p.title} ${p.address} ${p.owner?.name ?? ""} ${propertyCode(p)}`
  return haystack.toLowerCase().includes(q.toLowerCase())
}

const matchesStatus = (p: AdminProperty, status: StatusFilter) =>
  status === "all"
    ? true
    : status === "flagged"
      ? !!p.isFlagged
      : p.status === status

export const countStatuses = (list: AdminProperty[]): StatusCounts => ({
  all: list.length,
  approved: list.filter((p) => p.status === "approved").length,
  pending: list.filter((p) => p.status === "pending").length,
  rejected: list.filter((p) => p.status === "rejected").length,
  flagged: list.filter((p) => p.isFlagged).length,
})

// Everything the list page shows, derived in one pure step.
// Tab counts reflect search / type / listing filters, so they match what you'd see.
export function selectListings(all: AdminProperty[], f: Filters) {
  const scoped = all.filter(
    (p) =>
      matchesSearch(p, f.q) &&
      (f.type === "all" || p.propertyType === f.type) &&
      (f.listing === "all" || p.listingType === f.listing)
  )
  const filtered = scoped
    .filter((p) => matchesStatus(p, f.status))
    .sort(SORTERS[f.sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(f.page, pageCount)

  return {
    tabCounts: countStatuses(scoped),
    filtered,
    pageCount,
    page,
    rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  }
}
