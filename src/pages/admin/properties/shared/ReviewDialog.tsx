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

export type ReviewAction = "approved" | "rejected" | "flagged" | "unflagged"

const COPY: Record<
  ReviewAction,
  {
    title: string
    body: (title: string) => string
    confirm: string
    busy: string
    button: string
  }
> = {
  approved: {
    title: "Approve this listing?",
    body: (t) => `“${t}” will go live for house-hunters.`,
    confirm: "Approve",
    busy: "Approving…",
    button: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  rejected: {
    title: "Reject this listing?",
    body: (t) => `“${t}” will be marked as rejected.`,
    confirm: "Reject",
    busy: "Rejecting…",
    button: "bg-red-600 text-white hover:bg-red-700",
  },
  flagged: {
    title: "Flag this listing?",
    body: (t) => `“${t}” will be marked for follow-up.`,
    confirm: "Flag listing",
    busy: "Flagging…",
    button: "bg-amber-600 text-white hover:bg-amber-700",
  },
  unflagged: {
    title: "Remove the flag?",
    body: (t) => `“${t}” will no longer be marked for follow-up.`,
    confirm: "Remove flag",
    busy: "Removing…",
    button: "bg-slate-800 text-white hover:bg-slate-900",
  },
}

type ReviewDialogProps = {
  action: ReviewAction
  propertyTitle: string
  pending: boolean
  onConfirm: (reason?: string) => void
  onClose: () => void
}

// One confirm step for every moderation action, so nothing is a one-click
// accident. Mount it only while an action is chosen (the form state resets).
export default function ReviewDialog({
  action,
  propertyTitle,
  pending,
  onConfirm,
  onClose,
}: ReviewDialogProps) {
  const copy = COPY[action]
  const [reason, setReason] = useState("")
  // a rejection must say what to fix, or the agent has nothing to act on
  const needsReason = action === "rejected"
  const canConfirm = !pending && (!needsReason || reason.trim().length > 0)

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.body(propertyTitle)}</DialogDescription>
        </DialogHeader>

        {(action === "flagged" || action === "rejected") && (
          <div>
            <label
              htmlFor="review-reason"
              className="mb-1.5 block text-[13px] font-semibold text-text-primary"
            >
              {needsReason ? "What should the agent fix?" : "Reason (optional)"}
            </label>
            <Textarea
              id="review-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                needsReason
                  ? "E.g. The photos are too dark. Please upload clearer ones."
                  : "What should be followed up?"
              }
              className="min-h-24"
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            className={copy.button}
            disabled={!canConfirm}
            onClick={() => onConfirm(reason.trim() || undefined)}
          >
            {pending ? copy.busy : copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
