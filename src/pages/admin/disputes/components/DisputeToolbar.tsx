import { useEffect, useRef } from "react"
import { Download, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Filters, View, ViewCounts } from "../disputeMeta"

type DisputeToolbarProps = {
  filters: Filters
  counts: ViewCounts
  resetKey: number
  hasActive: boolean
  canExport: boolean
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
  onExport: () => void
}

const TABS: { value: View; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending review" },
  { value: "resolved", label: "Resolved" },
  { value: "all", label: "All" },
]

export default function DisputeToolbar({
  filters,
  counts,
  resetKey,
  hasActive,
  canExport,
  onChange,
  onClear,
  onExport,
}: DisputeToolbarProps) {
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // wait for a pause in typing before filtering
  const onSearch = (value: string) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => onChange({ q: value.trim() }), 250)
  }

  return (
    <div className="space-y-3">
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
            placeholder="Search by property, agent, buyer or reference"
            aria-label="Search disputes"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-[14px] text-text-primary outline-none placeholder:text-text-secondary focus:border-button-bg focus:ring-2 focus:ring-button-bg/20"
          />
        </div>
        <Button variant="outline" onClick={onExport} disabled={!canExport}>
          <Download size={15} aria-hidden />
          Export
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter disputes"
          className="flex flex-wrap gap-1.5"
        >
          {TABS.map((tab) => {
            const selected = !filters.dispute && filters.view === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ view: tab.value, dispute: "" })}
                className={cn(
                  "flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
                  selected
                    ? "bg-bg-accent text-button-bg"
                    : "text-text-secondary hover:bg-white hover:text-text-primary"
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
