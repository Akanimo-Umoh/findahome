import { Link } from "react-router-dom"
import { CircleCheck, CircleX, EllipsisVertical, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"
import { reviewState } from "../agentMeta"

type AgentRowActionsProps = {
  agent: AdminUser
  onDecide: (agent: AdminUser, action: VerificationDecision) => void
}

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

export default function AgentRowActions({
  agent,
  onDecide,
}: AgentRowActionsProps) {
  const state = reviewState(agent)
  // nothing to decide until the agent has submitted their details
  const locked = state === "incomplete"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${agent.name}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5">
        <DropdownMenuItem asChild className={item}>
          <Link to={`/admin/agents/${agent._id}`}>
            <Eye aria-hidden />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={item}
          disabled={locked || state === "verified"}
          onSelect={() => onDecide(agent, "verified")}
        >
          <CircleCheck aria-hidden />
          Verify agent
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${item} text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:text-red-600!`}
          disabled={locked || state === "rejected"}
          onSelect={() => onDecide(agent, "rejected")}
        >
          <CircleX aria-hidden />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
