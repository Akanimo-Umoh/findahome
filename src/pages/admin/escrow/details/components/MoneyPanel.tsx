// (amount + paid -> held -> released bar)
import { cn } from "@/lib/utils"
import { formatNaira } from "@/lib/adminFormat"
import { EscrowStatusBadge } from "../../components/EscrowStatusBadge"
import { formatDate } from "../../format"
import type { EscrowRow } from "../../types"
import { Panel } from "./Panel"

function Line({
  label,
  value,
  strong,
}: {
  label: string
  value: number
  strong?: boolean
}) {
  return (
    <div
      className={cn(
        "flex justify-between py-2 text-sm",
        strong && "font-semibold text-slate-900"
      )}
    >
      <dt className={strong ? "" : "text-slate-500"}>{label}</dt>
      <dd className="tabular-nums">{formatNaira(value)}</dd>
    </div>
  )
}

export function MoneyPanel({ row }: { row: EscrowRow }) {
  const steps = [
    {
      label: "Buyer paid",
      done: true,
      date: row.linked?.paidAt ?? row.createdAt,
      bar: "bg-[#274ad0]",
    },
    {
      label: "Approved and held",
      done: row.status !== "pending",
      date: row.createdAt,
      bar: "bg-[#274ad0]",
    },
    {
      label: "Released to agent",
      done: row.released,
      date: null, // backend does not record a release date yet
      bar: "bg-emerald-500",
    },
  ]
  const property = row.linked?.property

  return (
    <Panel title="Payment" aside={<EscrowStatusBadge state={row.status} />}>
      <p className="font-raleway text-3xl font-semibold text-slate-900 tabular-nums">
        {formatNaira(row.amount)}
      </p>

      <ol className="mt-5 grid grid-cols-3 gap-2">
        {steps.map((s) => (
          <li key={s.label} className="space-y-1.5">
            <div
              className={cn(
                "h-1.5 rounded-full",
                s.done ? s.bar : "bg-slate-200"
              )}
            />
            <p
              className={cn(
                "text-xs font-medium",
                s.done ? "text-slate-800" : "text-slate-400"
              )}
            >
              {s.label}
            </p>
            <p className="text-xs text-slate-400">
              {s.date
                ? formatDate(s.date)
                : s.done
                  ? "Date not recorded"
                  : "Waiting"}
            </p>
          </li>
        ))}
      </ol>

      <dl className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
        {row.kind === "purchase" && property ? (
          <>
            <Line label="Property price" value={property.price ?? 0} />
            <Line label="Escrow fee" value={property.escrowFee ?? 0} />
            <Line label="Service charge" value={property.serviceCharge ?? 0} />
            <Line label="Total paid by buyer" value={row.amount} strong />
          </>
        ) : (
          <Line
            label={row.kind === "inspection" ? "Inspection fee" : "Amount"}
            value={row.amount}
            strong
          />
        )}
      </dl>
      {row.kind === "purchase" && property && (
        <p className="mt-2 text-xs text-slate-400">
          Breakdown uses the property's current price and fees.
        </p>
      )}
    </Panel>
  )
}
