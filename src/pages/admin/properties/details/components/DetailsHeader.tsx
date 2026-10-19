import { CalendarDays, CircleCheck, CircleX, Flag, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatNaira } from "@/lib/adminFormat"
import type { AdminProperty } from "@/types/adminProperty"
import type { ReviewAction } from "../../shared/ReviewDialog"
import StatusBadge from "../../shared/StatusBadge"
import { formatDate, propertyCode } from "../../shared/propertyMeta"

type DetailsHeaderProps = {
  property: AdminProperty
  onAction: (action: ReviewAction) => void
}

// Stays pinned under the topbar on wide screens, so Approve / Reject are
// always in reach while you scroll through photos, documents and notes.
export default function DetailsHeader({
  property: p,
  onAction,
}: DetailsHeaderProps) {
  return (
    <header className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 xl:sticky xl:top-18 xl:z-20">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusBadge status={p.status} flagged={p.isFlagged} long />
            <span className="text-[12.5px] font-semibold text-text-secondary">
              #{propertyCode(p)}
            </span>
          </div>
          <h2 className="mt-2 font-raleway text-[22px] leading-7 font-bold text-text-primary">
            {p.title}
          </h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-text-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden />
              {p.address}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden />
              Created {formatDate(p.createdAt)}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <p className="font-raleway text-[24px] leading-8 font-bold text-text-primary lining-nums tabular-nums">
            {formatNaira(p.price)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={p.status === "rejected"}
              onClick={() => onAction("rejected")}
            >
              <CircleX aria-hidden />
              Reject
            </Button>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={p.status === "approved"}
              onClick={() => onAction("approved")}
            >
              <CircleCheck aria-hidden />
              Approve
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onAction(p.isFlagged ? "unflagged" : "flagged")}
            >
              <Flag aria-hidden />
              {p.isFlagged ? "Remove flag" : "Flag"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
