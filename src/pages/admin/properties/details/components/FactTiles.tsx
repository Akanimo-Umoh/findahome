import {
  Banknote,
  BedDouble,
  Bath,
  Building2,
  CookingPot,
  Fence,
  FileText,
  Ruler,
  Sprout,
  Tag,
  type LucideIcon,
} from "lucide-react"
import { formatNaira } from "@/lib/adminFormat"
import type { AdminProperty } from "@/types/adminProperty"
import { LISTING_LABEL, TYPE_LABEL } from "../../shared/propertyMeta"

type Fact = { icon: LucideIcon; label: string; value: string }

const titleCase = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : ""

// Land and buildings have different facts; show only what the listing has.
function factsFor(p: AdminProperty): Fact[] {
  const facts: (Fact | null)[] = [
    {
      icon: Building2,
      label: "Type",
      value: TYPE_LABEL[p.propertyType] ?? p.propertyType,
    },
    {
      icon: Tag,
      label: "Listing",
      value: LISTING_LABEL[p.listingType] ?? p.listingType,
    },
  ]

  if (p.propertyType === "land") {
    facts.push(
      p.landSize
        ? {
            icon: Ruler,
            label: "Size",
            value: `${p.landSize} ${p.landUnit ?? ""}`.trim(),
          }
        : null,
      p.landType
        ? { icon: Sprout, label: "Land type", value: titleCase(p.landType) }
        : null,
      p.landCondition
        ? { icon: Fence, label: "Condition", value: titleCase(p.landCondition) }
        : null,
      p.landDocTitle
        ? {
            icon: FileText,
            label: "Document",
            value: titleCase(p.landDocTitle),
          }
        : null
    )
  } else {
    facts.push(
      p.bedroom != null
        ? { icon: BedDouble, label: "Bedrooms", value: String(p.bedroom) }
        : null,
      p.kitchen != null
        ? { icon: CookingPot, label: "Kitchen", value: String(p.kitchen) }
        : null,
      p.bathroom != null
        ? { icon: Bath, label: "Bathrooms", value: String(p.bathroom) }
        : null
    )
  }

  facts.push(
    p.escrowFee
      ? { icon: Banknote, label: "Escrow fee", value: formatNaira(p.escrowFee) }
      : null,
    p.inspectionFee
      ? {
          icon: Banknote,
          label: "Inspection fee",
          value: formatNaira(p.inspectionFee),
        }
      : null
  )

  return facts.filter((f): f is Fact => f !== null)
}

export default function FactTiles({ property }: { property: AdminProperty }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {factsFor(property).map(({ icon: Icon, label, value }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-accent text-button-bg">
            <Icon size={17} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] text-text-secondary">{label}</p>
            <p className="truncate text-[14px] font-semibold text-text-primary">
              {value}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
