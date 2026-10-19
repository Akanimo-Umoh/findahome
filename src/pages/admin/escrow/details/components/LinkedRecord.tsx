import { formatDate, KIND_LABEL, titleCase } from "../../format"
import type { EscrowRow } from "../../types"
import { Panel } from "./Panel"

export function LinkedRecord({ row }: { row: EscrowRow }) {
  const l = row.linked
  const title = `${KIND_LABEL[row.kind]} progress`

  if (!l) {
    return (
      <Panel title={title}>
        <p className="text-sm text-slate-500">
          No {row.kind} found with reference {row.reference}.
        </p>
      </Panel>
    )
  }

  const steps = [
    ["Payment started", l.initializedAt],
    ["Payment received", l.paidAt],
    ["Scheduled", l.scheduledAt],
    ["Confirmed", l.confirmedAt],
    ["Completed", l.completedAt],
  ] as const

  return (
    <Panel
      title={title}
      aside={
        <span className="text-xs text-slate-500">{titleCase(l.status)}</span>
      }
    >
      <ol className="space-y-3">
        {steps.map(([label, date]) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span
              className={`size-2 rounded-full ${date ? "bg-[#274ad0]" : "bg-slate-200"}`}
            />
            <span className={date ? "text-slate-800" : "text-slate-400"}>
              {label}
            </span>
            <span className="ml-auto text-xs text-slate-500 tabular-nums">
              {formatDate(date)}
            </span>
          </li>
        ))}
      </ol>
    </Panel>
  )
}
