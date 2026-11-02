import { Link } from "react-router-dom"
import {
  EllipsisVertical,
  Eye,
  Flag,
  ShieldAlert,
  UserRoundX,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminUser } from "@/types/adminUser"

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

type BuyerRowActionsProps = {
  buyer: AdminUser
  onModerate: (action: "flag" | "suspend" | "ban", value: boolean) => void
}

export default function BuyerRowActions({
  buyer,
  onModerate,
}: BuyerRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${buyer.name}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
        <DropdownMenuItem asChild className={item}>
          <Link to={`/admin/users/${buyer._id}`}>
            <Eye aria-hidden />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={item}
          onSelect={() => onModerate("flag", !buyer.isFlagged)}
        >
          <Flag aria-hidden />
          {buyer.isFlagged ? "Remove flag" : "Flag account"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={item}
          onSelect={() => onModerate("suspend", !buyer.isSuspended)}
        >
          <ShieldAlert aria-hidden />
          {buyer.isSuspended ? "Unsuspend" : "Suspend"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={item}
          onSelect={() => onModerate("ban", !buyer.isBanned)}
        >
          <UserRoundX aria-hidden />
          {buyer.isBanned ? "Unban" : "Ban"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
