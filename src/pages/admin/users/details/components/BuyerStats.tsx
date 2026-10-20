import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNairaCompact } from "@/lib/adminFormat"
import type { BuyerSummary } from "../../buyerMeta"

type BuyerStatsProps = {
  summary: BuyerSummary
  loading: boolean
}

const value =
  "block font-raleway text-[24px] leading-9 font-bold text-text-primary"

export default function BuyerStats({ summary, loading }: BuyerStatsProps) {
  const tiles = [
    {
      label: "Completed Transactions",
      value: summary.completed,
      className: "text-emerald-700",
    },
    {
      label: "Total Paid",
      value: summary.totalPaid,
      format: formatNairaCompact,
      className: "text-button-bg",
    },
    {
      label: "Disputes Raised",
      value: summary.disputes,
      className: "text-amber-600",
    },
    {
      label: "Disputes Resolved",
      value: summary.resolvedDisputes,
      className: "text-emerald-700",
    },
    {
      label: "Cancelled Inspections",
      value: summary.cancelledInspections,
      className: "text-red-600",
    },
  ]

  return (
    <section
      aria-label="Buyer totals"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {tiles.map((t) => (
        <div
          key={t.label}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-center"
        >
          <p className="text-[12.5px] text-text-secondary">{t.label}</p>
          <MetricValue
            value={t.value}
            loading={loading}
            format={t.format}
            skeletonClassName="mx-auto mt-1 h-8 w-12"
            className={`${value} ${t.className}`}
          />
        </div>
      ))}
    </section>
  )
}
