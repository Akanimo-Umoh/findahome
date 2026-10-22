import { cn } from "@/lib/utils"
import { STATUS_LABEL } from "../financeMeta"
import type { LedgerStatus } from "../types"

const STYLE: Record<LedgerStatus, { pill: string; dot: string }> = {
  completed: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  pending: { pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  failed: { pill: "bg-red-50 text-red-700", dot: "bg-red-500" },
  declined: { pill: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  in_escrow: { pill: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  released: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  disputed: { pill: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
  refunded: { pill: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
}

export default function FinanceStatusBadge({
  status,
}: {
  status: LedgerStatus
}) {
  const style = STYLE[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold whitespace-nowrap",
        style.pill
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
      {STATUS_LABEL[status]}
    </span>
  )
}
