import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatNaira } from "@/lib/adminFormat"
import { useSetEscrowStatus, useRefundEscrow } from "../useEscrow"
import type { EscrowAction, EscrowRow } from "../types"

interface Props {
  row: EscrowRow
  action: EscrowAction | null
  onClose: () => void
}

export function EscrowActionDialog({ row, action, onClose }: Props) {
  const statusMutation = useSetEscrowStatus()
  const refundMutation = useRefundEscrow()

  if (!action) return null

  const release = action === "release"
  const refund = action === "refund"
  const isPending = statusMutation.isPending || refundMutation.isPending

  const confirm = () => {
    if (refund) {
      refundMutation.mutate(
        {
          id: row.id,
          reason: "Refund processed by admin",
        },
        { onSuccess: onClose }
      )
      return
    }

    statusMutation.mutate(
      {
        id: row.id,
        status: release ? "released" : "on_hold",
      },
      { onSuccess: onClose }
    )
  }

  return (
    <Dialog open onOpenChange={(open) => !open && !isPending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {release
              ? "Release funds to the agent?"
              : refund
                ? "Refund the buyer?"
                : "Move back to hold?"}
          </DialogTitle>

          <DialogDescription>
            {release
              ? `${formatNaira(row.netPayout ?? row.amount)} will be added to ${row.agent.name}'s wallet balance.`
              : refund
                ? `${formatNaira(row.amount)} will be returned to ${row.buyer.name}'s wallet balance.`
                : `${formatNaira(row.amount)} will be taken out of ${row.agent.name}'s wallet balance and held in escrow again.`}
          </DialogDescription>
        </DialogHeader>

        {release && (!row.releaseReady || !row.netPayoutConfirmed) && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              {!row.netPayoutConfirmed
                ? "Release is blocked because the backend has not returned a confirmed net payout."
                : row.openDispute
                  ? `There is an open dispute (${row.dispute?.referenceId}). Release is blocked until it is resolved.`
                  : "Release is blocked until payment is confirmed, the inspection or handover is complete, and no open dispute exists."}
            </p>
          </div>
        )}

        {refund && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            This action will refund the buyer's wallet. Only continue with a
            disposable staging transaction while the backend refund logic is
            being tested.
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={
              isPending ||
              (release && (!row.releaseReady || !row.netPayoutConfirmed))
            }
          >
            Cancel
          </Button>

          <Button
            onClick={confirm}
            disabled={isPending}
            className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {release
              ? "Release funds"
              : refund
                ? "Refund buyer"
                : "Move to hold"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
