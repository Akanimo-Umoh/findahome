import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { VerificationDecision } from "@/types/adminUser"

const COPY: Record<
  VerificationDecision,
  {
    title: string
    body: (name: string) => string
    confirm: string
    busy: string
    button: string
  }
> = {
  approved: {
    title: "Verify this agent?",
    body: (n) => `${n} will be marked as a verified agent.`,
    confirm: "Verify agent",
    busy: "Verifying…",
    button: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  rejected: {
    title: "Reject this verification?",
    body: (n) => `${n}'s onboarding details will be marked as rejected.`,
    confirm: "Reject",
    busy: "Rejecting…",
    button: "bg-red-600 text-white hover:bg-red-700",
  },
}

type VerificationDialogProps = {
  action: VerificationDecision
  agentName: string
  pending: boolean
  onConfirm: (reason?: string) => void
  onClose: () => void
}

// One confirm step for both decisions. A rejection needs a reason so the agent can be told what to fix. Mount it only while a decision is chosen.
export default function VerificationDialog({
  action,
  agentName,
  pending,
  onConfirm,
  onClose,
}: VerificationDialogProps) {
  const copy = COPY[action]
  const [reason, setReason] = useState("")
  // a rejection needs a reason so the agent knows what to fix
  const needsReason = action === "rejected"
  const canConfirm = !pending && (!needsReason || reason.trim().length > 0)

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.body(agentName)}</DialogDescription>
        </DialogHeader>

        {needsReason && (
          <div className="space-y-1.5">
            <label
              htmlFor="rejection-reason"
              className="text-[13px] font-semibold"
            >
              What should the agent fix?
            </label>
            <Textarea
              id="rejection-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g. The ID photo is blurry. Please upload a clear copy."
              maxLength={300}
              disabled={pending}
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
            onClick={() => onConfirm(needsReason ? reason.trim() : undefined)}
          >
            {pending ? copy.busy : copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
