import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EscrowStatsData, EscrowTab } from "../types"

const TABS: { id: EscrowTab; label: string }[] = [
  { id: "all", label: "All transactions" },
  { id: "in_escrow", label: "In escrow" },
  { id: "released", label: "Released" },
  { id: "disputed", label: "Disputed" },
]

interface Props {
  tab: EscrowTab
  query: string
  counts?: EscrowStatsData["count"]
  onTab: (t: EscrowTab) => void
  onQuery: (v: string) => void
}

export function EscrowToolbar({ tab, query, counts, onTab, onQuery }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div
        role="tablist"
        className="inline-flex w-full overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1 md:w-auto"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => onTab(t.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              tab === t.id
                ? "bg-white text-[#274ad0] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {t.label}
            <span className="ml-1.5 text-slate-400 tabular-nums">
              {counts?.[t.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-80">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search property, buyer, agent or code"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm outline-none focus:border-[#274ad0] focus:ring-2 focus:ring-[#274ad0]/15"
        />
      </div>
    </div>
  )
}
