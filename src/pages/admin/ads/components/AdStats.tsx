import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNairaCompact } from "@/lib/adminFormat"
import { PERIOD_LABEL, type AdSummary, type Period } from "../adMeta"

type AdStatsProps = {
  summary: AdSummary
  period: Period
  loading: boolean
}

export default function AdStats({ summary, period, loading }: AdStatsProps) {
  const cells = [
    {
      label: "Active Ads",
      value: summary.active,
      hint: "running now",
      dot: "bg-emerald-500",
    },
    {
      label: "Pending Requests",
      value: summary.pendingReview,
      hint: "waiting for review",
      dot: "bg-blue-500",
    },
    // ads have no start / end date yet, so nothing can be "expiring"
    {
      label: "Expiring Soon",
      value: null as number | null,
      hint: "Needs end dates",
      dot: "bg-amber-500",
    },
    // the backend has no rejected status yet
    {
      label: "Rejected Ads",
      value: summary.rejected > 0 ? summary.rejected : null,
      hint: summary.rejected > 0 ? "turned down" : "Not tracked yet",
      dot: "bg-red-500",
    },
    {
      label: "Ad Revenue",
      value: summary.revenue.amount,
      hint: `${summary.revenue.count} paid ${summary.revenue.count === 1 ? "ad" : "ads"} · ${PERIOD_LABEL[period].toLowerCase()}`,
      dot: "bg-violet-500",
      money: true,
    },
  ]

  return (
    <section
      aria-label="Ad totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <dl className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
        {cells.map((c) => (
          <div key={c.label} className="bg-white px-4 py-4">
            <dt className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
              <span aria-hidden className={`size-2 rounded-full ${c.dot}`} />
              {c.label}
            </dt>
            <dd>
              <MetricValue
                value={c.value}
                loading={loading}
                format={"money" in c ? formatNairaCompact : undefined}
                skeletonClassName="mt-2 h-7 w-16"
                className="mt-2 block font-raleway text-[24px] leading-8 font-bold text-text-primary"
              />
              <span className="mt-0.5 block text-[12px] text-text-secondary">
                {c.hint}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
