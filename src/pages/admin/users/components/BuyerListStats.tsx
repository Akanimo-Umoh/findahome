import {
  Gavel,
  MailCheck,
  MailWarning,
  Users,
  type LucideIcon,
} from "lucide-react"
import MetricValue from "@/components/admin/ui/MetricValue"
import { cn } from "@/lib/utils"
import type { BuyerView, ViewCounts } from "../buyerFilters"

type BuyerListStatsProps = {
  counts: ViewCounts
  active: BuyerView
  loading: boolean
  // false when the disputes request failed, so the figure shows "—"
  disputesKnown: boolean
  onSelect: (view: BuyerView) => void
}

const CELLS: { view: BuyerView; label: string; icon: LucideIcon }[] = [
  { view: "all", label: "Total Buyers", icon: Users },
  { view: "verified", label: "Email Verified", icon: MailCheck },
  { view: "unverified", label: "Email Not Verified", icon: MailWarning },
  { view: "disputed", label: "With Open Disputes", icon: Gavel },
]

// Each figure is also a shortcut: click one to filter the table to it.
export default function BuyerListStats({
  counts,
  active,
  loading,
  disputesKnown,
  onSelect,
}: BuyerListStatsProps) {
  return (
    <section
      aria-label="Buyer totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {CELLS.map(({ view, label, icon: Icon }) => (
          <button
            key={view}
            type="button"
            aria-pressed={active === view}
            onClick={() => onSelect(view)}
            className={cn(
              "cursor-pointer px-5 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40 focus-visible:ring-inset",
              active === view ? "bg-bg-accent" : "bg-white hover:bg-slate-50"
            )}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
              <Icon size={15} aria-hidden />
              {label}
            </span>
            <MetricValue
              value={
                view === "disputed" && !disputesKnown ? null : counts[view]
              }
              loading={loading}
              skeletonClassName="mt-2 h-8 w-14"
              className="mt-2 block font-raleway text-[26px] leading-8 font-bold text-text-primary"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
