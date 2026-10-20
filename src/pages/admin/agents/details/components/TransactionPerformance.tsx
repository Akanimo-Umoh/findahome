import AdminSection from "@/components/admin/ui/AdminSection"
import MetricValue from "@/components/admin/ui/MetricValue"
import { formatNaira } from "@/lib/adminFormat"
import type { EscrowRow } from "@/pages/admin/escrow/types"

type TransactionPerformanceProps = {
  // this agent's escrow transactions; undefined when they failed to load
  rows?: EscrowRow[]
  loading: boolean
}

export default function TransactionPerformance({
  rows,
  loading,
}: TransactionPerformanceProps) {
  const count = (state: EscrowRow["status"]) =>
    rows ? rows.filter((r) => r.status === state).length : null
  const released = count("released")
  const total = rows?.length ?? null
  const value = rows ? rows.reduce((sum, r) => sum + r.amount, 0) : null
  const pct = total && released !== null ? (released / total) * 100 : 0

  const tiles = [
    { label: "Released", value: released, color: "text-emerald-700" },
    { label: "In escrow", value: count("in_escrow"), color: "text-button-bg" },
    { label: "Disputed", value: count("disputed"), color: "text-red-600" },
  ]

  return (
    <AdminSection title="Transaction Performance">
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-xl border border-slate-200 px-2 py-3 text-center"
          >
            <p className="text-[12.5px] text-text-secondary">{t.label}</p>
            <MetricValue
              value={t.value}
              loading={loading}
              skeletonClassName="mx-auto mt-1 h-7 w-8"
              className={`block font-raleway text-[22px] leading-8 font-bold ${t.color}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-[14px]">
        <span className="text-text-secondary">Total transaction value</span>
        <MetricValue
          value={value}
          loading={loading}
          format={formatNaira}
          skeletonClassName="h-5 w-24"
          className="font-semibold text-text-primary"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-text-secondary">Released so far</span>
          <span className="font-semibold text-emerald-700 tabular-nums">
            {total ? `${Math.round(pct)}%` : "—"}
          </span>
        </div>
        <div
          className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"
          role="img"
          aria-label="Share of this agent's transactions already released"
        >
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1.5 text-[12.5px] text-text-secondary">
          {total === null
            ? "Transactions didn't load."
            : `${released ?? 0} of ${total} transactions released to the agent.`}
        </p>
      </div>
    </AdminSection>
  )
}
