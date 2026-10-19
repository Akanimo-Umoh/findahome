import { Link } from "react-router-dom"
import { CircleCheck, CircleX, EllipsisVertical, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminProperty } from "@/types/adminProperty"
import type { ReviewAction } from "../shared/ReviewDialog"

type RowActionsProps = {
  property: AdminProperty
  onReview: (property: AdminProperty, action: ReviewAction) => void
}

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

export default function RowActions({ property, onReview }: RowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${property.title}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
        <DropdownMenuItem asChild className={item}>
          <Link to={`/admin/properties/${property._id}`}>
            <Eye aria-hidden />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={item}
          disabled={property.status === "approved"}
          onSelect={() => onReview(property, "approved")}
        >
          <CircleCheck aria-hidden />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${item} text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:text-red-600!`}
          disabled={property.status === "rejected"}
          onSelect={() => onReview(property, "rejected")}
        >
          <CircleX aria-hidden />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
