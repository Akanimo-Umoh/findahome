import { Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PropertyStatus } from "@/types/adminProperty"
import { STATUS_LABEL, STATUS_LABEL_LONG } from "./propertyMeta"

const STYLE: Record<PropertyStatus, { pill: string; dot: string }> = {
  approved: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  pending: { pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  rejected: { pill: "bg-red-50 text-red-700", dot: "bg-red-500" },
}

type StatusBadgeProps = {
  status: PropertyStatus
  flagged?: boolean
  // "Pending review" instead of "Pending"
  long?: boolean
}

export default function StatusBadge({
  status,
  flagged,
  long,
}: StatusBadgeProps) {
  const style = STYLE[status] ?? STYLE.pending
  const label = (long ? STATUS_LABEL_LONG : STATUS_LABEL)[status] ?? status

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold",
          style.pill
        )}
      >
        <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
        {label}
      </span>
      {flagged && (
        <span
          title="Flagged"
          className="flex size-5 items-center justify-center rounded-full bg-orange-50 text-orange-600"
        >
          <Flag size={11} aria-label="Flagged" />
        </span>
      )}
    </span>
  )
}
