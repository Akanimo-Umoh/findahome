// (shared by the row menu and the details page)
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
import { useSetEscrowStatus } from "../useEscrow"
import type { EscrowAction, EscrowRow } from "../types"

interface Props {
  row: EscrowRow
  action: EscrowAction | null
  onClose: () => void
}

export function EscrowActionDialog({ row, action, onClose }: Props) {
  const mutation = useSetEscrowStatus()
  if (!action) return null

  const release = action === "release"
  const approve = action === "approve"
  const confirm = () =>
    mutation.mutate(
      {
        id: row.id,
        status: release ? "released" : "on_hold",
        approving: approve,
      },
      { onSuccess: onClose }
    )

  return (
    <Dialog
      open
      onOpenChange={(open) => !open && !mutation.isPending && onClose()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {approve
              ? "Approve this payment?"
              : release
                ? "Release funds to the agent?"
                : "Move back to hold?"}
          </DialogTitle>
          <DialogDescription>
            {approve
              ? `${formatNaira(row.amount)} from ${row.buyer.name} will be held in escrow, and ${row.agent.name} can continue with the next step.`
              : release
                ? `${formatNaira(row.amount)} will be added to ${row.agent.name}'s wallet balance. You can move it back to hold later.`
                : `${formatNaira(row.amount)} will be taken out of ${row.agent.name}'s wallet balance and held in escrow again.`}
          </DialogDescription>
        </DialogHeader>

        {release && row.openDispute && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              There is an open dispute ({row.dispute?.referenceId}). Releasing
              now pays the agent before it is resolved.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirm}
            disabled={mutation.isPending}
            className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {approve
              ? "Approve payment"
              : release
                ? "Release funds"
                : "Move to hold"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
