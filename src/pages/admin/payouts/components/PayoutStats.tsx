import {
  CircleCheck,
  CircleX,
  Clock,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNairaCompact } from "@/lib/adminFormat"
import { cn } from "@/lib/utils"
import type { PayoutSummary, StatusFilter } from "../payoutMeta"

type PayoutStatsProps = {
  summary: PayoutSummary
  active: StatusFilter
  loading: boolean
  onSelect: (status: StatusFilter) => void
}

const CELLS: {
  status: StatusFilter
  key: keyof PayoutSummary
  label: string
  icon: LucideIcon
}[] = [
  { status: "pending", key: "pending", label: "Pending Payouts", icon: Clock },
  {
    status: "completed",
    key: "completed",
    label: "Completed",
    icon: CircleCheck,
  },
  { status: "failed", key: "failed", label: "Failed", icon: CircleX },
  { status: "all", key: "total", label: "All Requests", icon: Wallet },
]

// Each figure is also a shortcut: click one to filter the table to it.
export default function PayoutStats({
  summary,
  active,
  loading,
  onSelect,
}: PayoutStatsProps) {
  return (
    <section
      aria-label="Payout totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {CELLS.map(({ status, key, label, icon: Icon }) => (
          <button
            key={key}
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
              value={summary[key].amount}
              loading={loading}
              format={formatNairaCompact}
              skeletonClassName="mt-2 h-8 w-20"
              className="mt-2 block font-raleway text-[26px] leading-8 font-bold text-text-primary"
            />
            <span className="text-[12.5px] text-text-secondary">
              {summary[key].count}{" "}
              {summary[key].count === 1 ? "request" : "requests"}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
