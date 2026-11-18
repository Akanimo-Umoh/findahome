import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Banknote,
  CheckCircle2,
  Eye,
  MoreVertical,
  RotateCcw,
  Undo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EscrowActionDialog } from "./EscrowActionDialog"
import { EscrowRefundDialog } from "./EscrowRefundDialog"
import { RefundSentDialog } from "./RefundSentDialog"
import {
  isEscrowRefundable,
  isEscrowReleaseReady,
  isRefundAwaitingTransfer,
  type EscrowAction,
  type EscrowRow,
} from "../types"
import { useCompleteRefund } from "../useEscrow"

export function EscrowRowActions({ row }: { row: EscrowRow }) {
  const navigate = useNavigate()
  const [action, setAction] = useState<EscrowAction | null>(null)
  const completeRefund = useCompleteRefund()

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

          {(row.status === "in_escrow" || row.status === "disputed") && (
            <DropdownMenuItem
              disabled={!isEscrowReleaseReady(row)}
              title={
                row.netPayoutConfirmed
                  ? undefined
                  : "Backend net payout is not confirmed"
              }
              onSelect={() => setAction("release")}
            >
              <CheckCircle2 className="size-4" /> Release funds
            </DropdownMenuItem>
          )}
          {row.released && (
            <DropdownMenuItem onSelect={() => setAction("hold")}>
              <Undo2 className="size-4" /> Move back to hold
            </DropdownMenuItem>
          )}
          {isEscrowRefundable(row) && (
            <DropdownMenuItem onSelect={() => setAction("refund")}>
              <RotateCcw className="size-4" /> Refund buyer
            </DropdownMenuItem>
          )}
          {isRefundAwaitingTransfer(row) && (
            <DropdownMenuItem onSelect={() => setAction("complete_refund")}>
              <Banknote className="size-4" /> Mark refund sent
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EscrowActionDialog
        row={row}
        action={action}
        onClose={() => setAction(null)}
      />
      {action === "refund" && (
        <EscrowRefundDialog row={row} onClose={() => setAction(null)} />
      )}
      {action === "complete_refund" && (
        <RefundSentDialog
          expectedAmount={row.amount}
          buyerName={row.buyer.name}
          propertyTitle={row.propertyTitle}
          pending={completeRefund.isPending}
          onConfirm={(sent) =>
            completeRefund.mutate(
              { id: row.id, sent },
              { onSuccess: () => setAction(null) }
            )
          }
          onClose={() => setAction(null)}
        />
      )}
    </>
  )
}
