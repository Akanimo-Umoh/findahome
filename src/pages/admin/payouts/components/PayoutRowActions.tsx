import { Link } from "react-router-dom"
import { CircleCheck, CircleX, EllipsisVertical, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { PayoutRow } from "../../finance/types"

type PayoutRowActionsProps = {
  payout: PayoutRow
  onProcess: (payout: PayoutRow) => void
  onDecline: (payout: PayoutRow) => void
}

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

export default function PayoutRowActions({
  payout,
  onProcess,
  onDecline,
}: PayoutRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${payout.code}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
        {payout.agent.id && (
          <DropdownMenuItem asChild className={item}>
            <Link to={`/admin/agents/${payout.agent.id}`}>
              <Eye aria-hidden />
              View Agent
            </Link>
          </DropdownMenuItem>
        )}
        {payout.status === "pending" && (
          <DropdownMenuItem className={item} onSelect={() => onProcess(payout)}>
            <CircleCheck aria-hidden />
            Process now
          </DropdownMenuItem>
        )}
        {/* A declined/failed withdrawal is final: its money is already back
            in the agent's wallet, so there's no "retry"; they request again. */}
        {payout.status === "pending" && (
          <DropdownMenuItem
            className={`${item} text-red-600 focus:text-red-600`}
            onSelect={() => onDecline(payout)}
          >
            <CircleX aria-hidden />
            Decline
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
