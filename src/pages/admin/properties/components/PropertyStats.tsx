import {
  Building2,
  CircleCheck,
  Clock,
  Flag,
  type LucideIcon,
} from "lucide-react"
import MetricValue from "@/components/admin/ui/MetricValue"
import { cn } from "@/lib/utils"
import type { StatusCounts, StatusFilter } from "../filterProperties"

type PropertyStatsProps = {
  counts: StatusCounts
  active: StatusFilter
  loading: boolean
  onSelect: (status: StatusFilter) => void
}

const CELLS: { status: StatusFilter; label: string; icon: LucideIcon }[] = [
  { status: "all", label: "Total Listings", icon: Building2 },
  { status: "approved", label: "Active Listings", icon: CircleCheck },
  { status: "pending", label: "Pending Review", icon: Clock },
  { status: "flagged", label: "Flagged", icon: Flag },
]

// Each figure is also a shortcut: click one to filter the table to it.
export default function PropertyStats({
  counts,
  active,
  loading,
  onSelect,
}: PropertyStatsProps) {
  return (
    <section
      aria-label="Listing totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {CELLS.map(({ status, label, icon: Icon }) => (
          <button
            key={status}
            type="button"
            aria-pressed={active === status}
            onClick={() => onSelect(status)}
            className={cn(
              "cursor-pointer px-5 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40 focus-visible:ring-inset",
              active === status ? "bg-bg-accent" : "bg-white hover:bg-slate-50"
            )}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
              <Icon size={15} aria-hidden />
              {label}
            </span>
            <MetricValue
              value={counts[status]}
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
