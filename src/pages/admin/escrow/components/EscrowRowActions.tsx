import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, Eye, MoreVertical, RotateCcw, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EscrowActionDialog } from "./EscrowActionDialog"
import type { EscrowAction, EscrowRow } from "../types"

export function EscrowRowActions({ row }: { row: EscrowRow }) {
  const navigate = useNavigate()
  const [action, setAction] = useState<EscrowAction | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${row.code}`}
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem
            onSelect={() => navigate(`/admin/transactions/${row.id}`)}
          >
            <Eye className="size-4" /> View details
          </DropdownMenuItem>

          {row.status === "pending" && (
            <DropdownMenuItem onSelect={() => setAction("approve")}>
              <CheckCircle2 className="size-4" /> Approve payment
            </DropdownMenuItem>
          )}
          {!row.released && row.status !== "pending" && (
            <DropdownMenuItem onSelect={() => setAction("release")}>
              <CheckCircle2 className="size-4" /> Release funds
            </DropdownMenuItem>
          )}
          {row.released && (
            <DropdownMenuItem onSelect={() => setAction("hold")}>
              <Undo2 className="size-4" /> Move back to hold
            </DropdownMenuItem>
          )}
          {!row.released && (
            // needs a refund endpoint on the backend
            <DropdownMenuItem disabled>
              <RotateCcw className="size-4" /> Refund buyer
              <span className="ml-auto text-[10px] text-slate-400 uppercase">
                Soon
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EscrowActionDialog
        row={row}
        action={action}
        onClose={() => setAction(null)}
      />
    </>
  )
}
