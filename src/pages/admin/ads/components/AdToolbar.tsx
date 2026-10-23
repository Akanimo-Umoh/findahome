import { useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  STATE_LABEL,
  type Filters,
  type StateCounts,
  type StateFilter,
} from "../adMeta"

type AdToolbarProps = {
  filters: Filters
  counts: StateCounts
  resetKey: number
  hasActive: boolean
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
}

const TABS: StateFilter[] = [
  "all",
  "active",
  "paused",
  "pending_review",
  "awaiting_payment",
  "completed",
  "rejected",
]

export default function AdToolbar({
  filters,
  counts,
  resetKey,
  hasActive,
  onChange,
  onClear,
}: AdToolbarProps) {
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // wait for a pause in typing before filtering
  const onSearch = (value: string) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => onChange({ q: value.trim() }), 250)
  }

  return (
    <div className="space-y-3 border-b border-slate-100 px-5 pb-4">
      <div className="relative">
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
          placeholder="Search by ad ID, listing or agent"
          aria-label="Search ads"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-[14px] text-text-primary outline-none placeholder:text-text-secondary focus:border-button-bg focus:ring-2 focus:ring-button-bg/20"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter ads"
          className="flex flex-wrap gap-1.5"
        >
          {TABS.filter(
            // rejected only shows up once the backend can reject
            (t) =>
              t !== "rejected" || counts.rejected > 0 || filters.state === t
          ).map((tab) => {
            const selected = filters.state === tab
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ state: tab })}
                className={cn(
                  "flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
                  selected
                    ? "bg-bg-accent text-button-bg"
                    : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                )}
              >
                {tab === "all" ? "All" : STATE_LABEL[tab]}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[11.5px] tabular-nums",
                    selected
                      ? "bg-white text-button-bg"
                      : "bg-slate-100 text-text-secondary"
                  )}
                >
                  {counts[tab]}
                </span>
              </button>
            )
          })}
        </div>

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
  )
}
