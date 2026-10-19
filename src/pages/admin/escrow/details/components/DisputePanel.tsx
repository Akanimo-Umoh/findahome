import { formatDate, titleCase } from "../../format"
import type { EscrowRow } from "../../types"
import { Panel } from "./Panel"

export function DisputePanel({ row }: { row: EscrowRow }) {
  const d = row.dispute
  return (
    <Panel
      title="Dispute"
      aside={
        d && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              row.openDispute
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {titleCase(d.status)}
          </span>
        )
      }
    >
      {!d ? (
        <p className="text-sm text-slate-500">
          No dispute on this transaction.
        </p>
      ) : (
        <div className="space-y-2 text-sm">
          <p className="font-medium text-slate-900 tabular-nums">
            {d.referenceId}
          </p>
          <p className="text-slate-500">
            {titleCase(d.category)} · opened {formatDate(d.createdAt)}
          </p>
          <p className="line-clamp-3 text-slate-600">{d.description}</p>
        </div>
      )}
    </Panel>
  )
}
