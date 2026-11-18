import { useState } from "react"
import { AlertTriangle, Copy, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { formatNaira } from "@/lib/adminFormat"
import { KIND_LABEL } from "../format"
import type { EscrowRow } from "../types"
import { describeError, useApproveRefund } from "../useEscrow"

export function EscrowRefundDialog({
  row,
  onClose,
}: {
  row: EscrowRow
  onClose: () => void
}) {
  const [reason, setReason] = useState("")
  const mutation = useApproveRefund()

  const confirm = () =>
    mutation.mutate(
      { id: row.id, reason: reason.trim() },
      { onSuccess: onClose }
    )

  const failure = mutation.error ? describeError(mutation.error) : null
  const copyFailure = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify({ escrowId: row.id, ...failure }, null, 2)
    )
    toast.success("Error details copied")
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => !open && !mutation.isPending && onClose()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Approve a refund?</DialogTitle>
          <DialogDescription>
            The {KIND_LABEL[row.kind].toLowerCase()} will be cancelled and{" "}
            {row.agent.name} will not be paid. You then send{" "}
            {formatNaira(row.amount)} to {row.buyer.name} yourself and mark the
            refund as sent. The platform doesn&apos;t move the money.
          </DialogDescription>
        </DialogHeader>

        {row.releaseReady && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              This {KIND_LABEL[row.kind].toLowerCase()} is complete, so
              releasing the funds to the agent is normally the right choice.
            </p>
          </div>
        )}

        {row.openDispute && (
          <p className="text-sm text-text-secondary">
            There is an open dispute ({row.dispute?.referenceId}). Refunding
            does not close it.
          </p>
        )}

        <div className="space-y-1.5">
          <label htmlFor="refund-reason" className="text-[13px] font-semibold">
            Reason for the refund
          </label>
          <Textarea
            id="refund-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="E.g. The inspection did not take place."
            maxLength={300}
            disabled={mutation.isPending}
          />
        </div>

        {failure && (
          <div
            role="alert"
            className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <p className="font-semibold">Refund approval failed</p>
            <p className="font-mono text-[12px] break-words select-all">
              {failure.status ?? "no response"} {failure.method} {failure.url}
              <br />
              {failure.message}
            </p>
            <Button variant="outline" size="sm" onClick={copyFailure}>
              <Copy className="mr-2 size-3.5" /> Copy error details
            </Button>
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
            disabled={mutation.isPending || !reason.trim()}
            className="bg-red-600 text-white hover:bg-red-600/90"
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Approve refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
