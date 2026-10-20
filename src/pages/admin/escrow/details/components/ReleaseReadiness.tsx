// (advisory only; the backend does not enforce it yet)
import { Check, Minus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EscrowRow } from "../../types"
import { Panel } from "./Panel"

export function ReleaseReadiness({ row }: { row: EscrowRow }) {
  const l = row.linked
  const completed = !l
    ? null
    : row.kind === "inspection"
      ? l.status === "inspection_completed"
      : ["handover_completed", "funds_released"].includes(l.status)

  const checks: { label: string; ok: boolean | null }[] = [
    { label: "Buyer payment confirmed", ok: l ? !!l.feePaid : null },
    {
      label:
        row.kind === "inspection"
          ? "Inspection completed"
          : "Handover completed",
      ok: completed,
    },
    { label: "No open dispute", ok: !row.openDispute },
  ]
  const ready = checks.every((c) => c.ok === true)

  return (
    <Panel title="Release readiness">
      <ul className="space-y-2.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2.5 text-sm">
            <span
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-full",
                c.ok === true && "bg-emerald-100 text-emerald-700",
                c.ok === false && "bg-rose-100 text-rose-700",
                c.ok === null && "bg-slate-100 text-slate-400"
              )}
            >
              {c.ok === true ? (
                <Check className="size-3" />
              ) : c.ok === false ? (
                <X className="size-3" />
              ) : (
                <Minus className="size-3" />
              )}
            </span>
            <span className="text-slate-700">{c.label}</span>
            {c.ok === null && (
              <span className="ml-auto text-xs text-slate-400">Unknown</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
        {row.status === "refunded"
          ? "This payment was refunded to the buyer."
          : row.released
            ? "Funds have already been released."
            : row.status === "pending"
              ? "This payment is waiting for your approval before it is held in escrow."
              : ready
                ? "Everything checks out. This escrow is ready to release."
                : "Review the items above before releasing."}
      </p>
    </Panel>
  )
}
