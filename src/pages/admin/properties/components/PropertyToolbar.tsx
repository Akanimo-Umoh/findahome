import { useEffect, useRef } from "react"
import { Download, Search, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type {
  Filters,
  SortKey,
  StatusCounts,
  StatusFilter,
} from "../filterProperties"

type PropertyToolbarProps = {
  filters: Filters
  counts: StatusCounts
  resetKey: number
  hasActive: boolean
  exportDisabled: boolean
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
  onExport: () => void
}

const TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "approved", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "flagged", label: "Flagged" },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price-high", label: "Price: high to low" },
  { value: "price-low", label: "Price: low to high" },
]

const selectTrigger =
  "h-9 w-auto min-w-34 gap-2 bg-white text-[13px] font-semibold"

export default function PropertyToolbar({
  filters,
  counts,
  resetKey,
  hasActive,
  exportDisabled,
  onChange,
  onClear,
  onExport,
}: PropertyToolbarProps) {
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // wait for a pause in typing before filtering
  const onSearch = (value: string) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => onChange({ q: value.trim() }), 250)
  }

  return (
    <div className="space-y-3 border-b border-slate-100 px-5 pb-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-60 flex-1">
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary"
          />
          <input
            key={resetKey}
            type="search"
            defaultValue={filters.q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search listings, agents or codes"
            aria-label="Search listings"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-[14px] text-text-primary outline-none placeholder:text-text-secondary focus:border-button-bg focus:ring-2 focus:ring-button-bg/20"
          />
        </div>

        <button
          type="button"
          onClick={onExport}
          disabled={exportDisabled}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[14px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={15} aria-hidden />
          Export
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-1.5"
        >
          {TABS.map((tab) => {
            const selected = filters.status === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ status: tab.value })}
                className={cn(
                  "flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
                  selected
                    ? "bg-bg-accent text-button-bg"
                    : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[11.5px] tabular-nums",
                    selected
                      ? "bg-white text-button-bg"
                      : "bg-slate-100 text-text-secondary"
                  )}
                >
                  {counts[tab.value]}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filters.type}
            onValueChange={(v) => onChange({ type: v as Filters["type"] })}
          >
            <SelectTrigger aria-label="Property type" className={selectTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="duplex">Duplex</SelectItem>
              <SelectItem value="bungalow">Bungalow</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.listing}
            onValueChange={(v) =>
              onChange({ listing: v as Filters["listing"] })
            }
          >
            <SelectTrigger aria-label="Sale or rent" className={selectTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sale and rent</SelectItem>
              <SelectItem value="sale">For sale</SelectItem>
              <SelectItem value="rent">For rent</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(v) => onChange({ sort: v as SortKey })}
          >
            <SelectTrigger aria-label="Sort listings" className={selectTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActive && (
            <button
              type="button"
              onClick={onClear}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-semibold text-button-bg outline-none hover:bg-bg-accent focus-visible:ring-2 focus-visible:ring-button-bg/40"
            >
              <X size={14} aria-hidden />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
