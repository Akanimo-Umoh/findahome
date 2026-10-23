import { cn } from "@/lib/utils"
import { STATE_LABEL, type AdState } from "../adMeta"

const STYLE: Record<AdState, { pill: string; dot: string }> = {
  active: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  paused: { pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  pending_review: { pill: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  awaiting_payment: {
    pill: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
  completed: { pill: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
  rejected: { pill: "bg-red-50 text-red-700", dot: "bg-red-500" },
}

export default function AdStatusBadge({ state }: { state: AdState }) {
  const style = STYLE[state]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold whitespace-nowrap",
        style.pill
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
      {STATE_LABEL[state]}
    </span>
  )
}
