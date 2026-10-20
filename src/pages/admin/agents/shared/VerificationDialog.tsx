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
  verified: {
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
  const needsReason = action === "rejected" && reason.trim() === ""

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.body(agentName)}</DialogDescription>
        </DialogHeader>

        {action === "rejected" && (
          <div>
            <label
              htmlFor="reject-reason"
              className="mb-1.5 block text-[13px] font-semibold text-text-primary"
            >
              Reason
            </label>
            <Textarea
              id="reject-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="What does the agent need to fix?"
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
            disabled={pending || needsReason}
            onClick={() => onConfirm(reason.trim() || undefined)}
          >
            {pending ? copy.busy : copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
