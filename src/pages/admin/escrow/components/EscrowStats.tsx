// (one divided strip + held/released/disputed bar)
import { formatNairaCompact } from "@/lib/adminFormat"
import type { EscrowStatsData } from "../types"

interface Props {
  stats: EscrowStatsData | null
  loading: boolean
}

export function EscrowStats({ stats, loading }: Props) {
  const cells = [
    {
      label: "Total escrow",
      value: stats?.total,
      dot: "",
      hint: `${stats?.count.all ?? 0} transactions`,
    },
    {
      label: "Pending approval",
      value: stats?.pending,
      dot: "bg-amber-500",
      hint: `${stats?.count.pending ?? 0} waiting`,
    },
    {
      label: "In escrow",
      value: stats?.inEscrow,
      dot: "bg-[#274ad0]",
      hint: `${stats?.count.in_escrow ?? 0} holding`,
    },
    {
      label: "Released",
      value: stats?.released,
      dot: "bg-emerald-500",
      hint: `${stats?.count.released ?? 0} paid out`,
    },
    {
      label: "Disputed",
      value: stats?.disputed,
      dot: "bg-rose-500",
      hint: `${stats?.count.disputed ?? 0} on hold`,
    },
    // no backend source yet
    {
      label: "Platform revenue",
      value: null,
      dot: "",
      hint: "Not tracked yet",
    },
  ]

  const total = stats?.total ?? 0
  const pct = (n = 0) => (total ? (n / total) * 100 : 0)

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <dl className="grid grid-cols-2 divide-slate-200 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        {cells.map((c) => (
          <div key={c.label} className="p-4">
            <dt className="flex items-center gap-2 text-sm text-slate-500">
              {c.dot && <span className={`size-2 rounded-full ${c.dot}`} />}
              {c.label}
            </dt>
            <dd className="mt-1 font-raleway text-xl font-semibold text-slate-900 tabular-nums">
              {loading ? (
                <span className="inline-block h-6 w-20 animate-pulse rounded bg-slate-100" />
              ) : c.value == null ? (
                "—"
              ) : (
                formatNairaCompact(c.value)
              )}
            </dd>
            <p className="mt-0.5 text-xs text-slate-400">{c.hint}</p>
          </div>
        ))}
      </dl>
      <div
        className="mx-4 mb-4 flex h-1.5 overflow-hidden rounded-full bg-slate-100"
        role="img"
        aria-label="Share of escrow held, released and disputed"
      >
        <div
          className="bg-[#274ad0]"
          style={{ width: `${pct(stats?.inEscrow)}%` }}
        />
        <div
          className="bg-emerald-500"
          style={{ width: `${pct(stats?.released)}%` }}
        />
        <div
          className="bg-rose-500"
          style={{ width: `${pct(stats?.disputed)}%` }}
        />
      </div>
    </section>
  )
}
