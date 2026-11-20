import { Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { offerAdvice, type PropertyOffer } from "../propertyOffers"

type OtherOfferNoteProps = {
  offer: PropertyOffer | null
  kind: "inspection" | "purchase"
  state: "pending" | "escrow" | "completed"
  // the table only has room for the short label
  compact?: boolean
  className?: string
}

// Tells the admin that another buyer's purchase holds this property, so they
// can decide whether to refund now or wait for that purchase to be decided.
export function OtherOfferNote({
  offer,
  kind,
  state,
  compact = false,
  className,
}: OtherOfferNoteProps) {
  if (!offer) return null
  const label =
    offer.stage === "secured"
      ? "Property secured by another buyer"
      : "Another buyer's payment in review"

  if (compact)
    return (
      <p
        className={cn(
          "flex items-center gap-1 text-xs font-medium text-amber-700",
          className
        )}
      >
        <Home className="size-3.5 shrink-0" />
        <span className="truncate">{label}</span>
      </p>
    )

  return (
    <div
      className={cn(
        "rounded-lg border border-amber-200 bg-amber-50 p-3 text-[13px] text-amber-800",
        className
      )}
    >
      <p className="flex items-center gap-1 font-semibold">
        <Home className="size-4 shrink-0" />
        {label}
      </p>
      <p className="mt-1">{offerAdvice(offer, kind, state)}</p>
    </div>
  )
}
