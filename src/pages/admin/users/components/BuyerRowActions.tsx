import { Link } from "react-router-dom"
import { EllipsisVertical, Eye, Flag, ShieldAlert } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminUser } from "@/types/adminUser"

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

export default function BuyerRowActions({ buyer }: { buyer: AdminUser }) {
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
        {/* need account status endpoints on the backend */}
        <DropdownMenuItem className={item} disabled>
          <Flag aria-hidden />
          Restrict account
          <span className="ml-auto text-[10px] uppercase">Soon</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={item} disabled>
          <ShieldAlert aria-hidden />
          Suspend
          <span className="ml-auto text-[10px] uppercase">Soon</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
