import {
  Banknote,
  CircleCheck,
  Clock,
  Gavel,
  type LucideIcon,
} from "lucide-react"
import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNairaCompact } from "@/lib/adminFormat"
import { cn } from "@/lib/utils"
import type { View } from "../disputeMeta"

type DisputeStatsProps = {
  summary: {
    active: number
    pending: number
    resolved30: number
    amountInDispute: number
  }
  active: View
  loading: boolean
  onSelect: (view: View) => void
}

const cell =
  "px-5 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40 focus-visible:ring-inset"
const label =
  "flex items-center gap-2 text-[13px] font-semibold text-text-secondary"
const figure =
  "mt-2 block font-raleway text-[26px] leading-8 font-bold text-text-primary"

export default function DisputeStats({
  summary,
  active,
  loading,
  onSelect,
}: DisputeStatsProps) {
  const cells: {
    view: View
    label: string
    icon: LucideIcon
    value: number
  }[] = [
    {
      view: "active",
      label: "Active Disputes",
      icon: Gavel,
      value: summary.active,
    },
    {
      view: "pending",
      label: "Pending Review",
      icon: Clock,
      value: summary.pending,
    },
    {
      view: "resolved",
      label: "Resolved (30d)",
      icon: CircleCheck,
      value: summary.resolved30,
    },
  ]

  return (
    <section
      aria-label="Dispute totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {cells.map(({ view, label: text, icon: Icon, value }) => (
          <button
            key={view}
            type="button"
            aria-pressed={active === view}
            onClick={() => onSelect(view)}
            className={cn(
              cell,
              "cursor-pointer",
              active === view ? "bg-bg-accent" : "bg-white hover:bg-slate-50"
            )}
          >
            <span className={label}>
              <Icon size={15} aria-hidden />
              {text}
            </span>
            <MetricValue
              value={value}
              loading={loading}
              skeletonClassName="mt-2 h-8 w-14"
              className={figure}
            />
          </button>
        ))}

        <div className={cn(cell, "bg-white")}>
          <span className={label}>
            <Banknote size={15} aria-hidden />
            Amount in Dispute
          </span>
          <MetricValue
            value={summary.amountInDispute}
            loading={loading}
            format={formatNairaCompact}
            skeletonClassName="mt-2 h-8 w-24"
            className={figure}
          />
        </div>
      </div>
    </section>
  )
}
