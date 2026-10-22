import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNairaCompact } from "@/lib/adminFormat"
import type { LedgerSummary } from "../reportMeta"

type ReportStatsProps = {
  summary: LedgerSummary
  loading: boolean
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`

export default function ReportStats({ summary, loading }: ReportStatsProps) {
  const cells = [
    {
      label: "Total Escrow Held",
      value: summary.held.amount,
      hint: `${plural(summary.awaiting.count, "payment")} awaiting approval`,
      dot: "bg-blue-500",
    },
    {
      label: "Escrow Released",
      value: summary.released.amount,
      hint: plural(summary.released.count, "release"),
      dot: "bg-emerald-500",
    },
    {
      label: "Pending Payouts",
      value: summary.pendingPayouts.amount,
      hint: plural(summary.pendingPayouts.count, "request"),
      dot: "bg-amber-500",
    },
    {
      label: "Payouts Sent",
      value: summary.payoutsSent.amount,
      hint: plural(summary.payoutsSent.count, "payout"),
      dot: "bg-emerald-500",
    },
    {
      label: "Disputed / Frozen",
      value: summary.disputed.amount,
      hint: plural(summary.disputed.count, "payment"),
      dot: "bg-rose-500",
    },
    // the backend stores no platform fee yet
    {
      label: "Platform Revenue",
      value: null,
      hint: "Not tracked yet",
      dot: "",
    },
  ]

  return (
    <section
      aria-label="Financial totals"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <dl className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
        {cells.map((c) => (
          <div key={c.label} className="bg-white px-4 py-4">
            <dt className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
              {c.dot && (
                <span aria-hidden className={`size-2 rounded-full ${c.dot}`} />
              )}
              {c.label}
            </dt>
            <dd>
              <MetricValue
                value={c.value}
                loading={loading}
                format={formatNairaCompact}
                skeletonClassName="mt-2 h-7 w-20"
                className="mt-2 block font-raleway text-[22px] leading-7 font-bold text-text-primary"
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
