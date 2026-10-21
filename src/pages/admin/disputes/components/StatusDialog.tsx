import { useState } from "react"
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
import type { AdminDispute } from "@/types/adminDispute"
import type { DisputeMode } from "./DisputeCard"

type StatusDialogProps = {
  dispute: AdminDispute
  mode: DisputeMode
  pending: boolean
  onConfirm: (notes?: string) => void
  onClose: () => void
}

// One confirm step for starting a review and for resolving. Resolving needs notes so there is a record of the decision. Mount it only while a dispute is chosen.
export default function StatusDialog({
  dispute,
  mode,
  pending,
  onConfirm,
  onClose,
}: StatusDialogProps) {
  const [notes, setNotes] = useState("")
  const resolve = mode === "resolve"
  const needsNotes = resolve && notes.trim() === ""

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {resolve
              ? "Resolve this dispute?"
              : "Start reviewing this dispute?"}
          </DialogTitle>
          <DialogDescription>
            {resolve
              ? `${dispute.referenceId} will be marked as resolved. This doesn't move any money: release or refund the payment from Escrow Transactions.`
              : `${dispute.referenceId} will move to Under review.`}
          </DialogDescription>
        </DialogHeader>

        {resolve && (
          <div>
            <label
              htmlFor="resolution-notes"
              className="mb-1.5 block text-[13px] font-semibold text-text-primary"
            >
              Resolution notes
            </label>
            <Textarea
              id="resolution-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What was decided, and why?"
              className="min-h-24"
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant="app-primary"
            disabled={pending || needsNotes}
            onClick={() => onConfirm(notes.trim() || undefined)}
          >
            {pending
              ? resolve
                ? "Resolving…"
                : "Starting…"
              : resolve
                ? "Resolve dispute"
                : "Start review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
