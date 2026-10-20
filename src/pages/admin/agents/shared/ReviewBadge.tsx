import { cn } from "@/lib/utils"
import { REVIEW_LABEL, type ReviewState } from "../agentMeta"

const STYLE: Record<ReviewState, { pill: string; dot: string }> = {
  verified: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  pending: { pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  rejected: { pill: "bg-red-50 text-red-700", dot: "bg-red-500" },
  incomplete: { pill: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
}

export default function ReviewBadge({ state }: { state: ReviewState }) {
  const style = STYLE[state]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold whitespace-nowrap",
        style.pill
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
      {REVIEW_LABEL[state]}
    </span>
  )
}
