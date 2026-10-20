import { cn } from "@/lib/utils"
import { STATE_LABEL } from "../format"
import type { EscrowState } from "../types"

const TONE: Record<EscrowState, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-100",
  in_escrow: "bg-blue-50 text-[#274ad0] ring-blue-100",
  released: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  disputed: "bg-rose-50 text-rose-700 ring-rose-100",
}

export function EscrowStatusBadge({ state }: { state: EscrowState }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        TONE[state]
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {STATE_LABEL[state]}
    </span>
  )
}
