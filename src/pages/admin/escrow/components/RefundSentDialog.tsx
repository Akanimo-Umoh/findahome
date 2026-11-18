import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatNaira } from "@/lib/adminFormat"
import type { RefundSent } from "@/services/admin/escrow.service"

type RefundSentDialogProps = {
  // what the buyer is owed
  expectedAmount: number
  buyerName: string
  propertyTitle: string
  pending: boolean
  onConfirm: (sent: RefundSent) => void
  onClose: () => void
}

// Refunds are sent outside the platform (a bank transfer by the admin). This
// records the transfer so the buyer is told and the books show it.
export function RefundSentDialog({
  expectedAmount,
  buyerName,
  propertyTitle,
  pending,
  onConfirm,
  onClose,
}: RefundSentDialogProps) {
  const [amountInput, setAmountInput] = useState(String(expectedAmount))
  const [transferReference, setTransferReference] = useState("")
  const [note, setNote] = useState("")
  const [differenceConfirmed, setDifferenceConfirmed] = useState(false)

  const amount = Number(amountInput)
  const validAmount = Number.isFinite(amount) && amount > 0
  const differs = validAmount && amount !== expectedAmount
  const canSubmit =
    validAmount &&
    !!transferReference.trim() &&
    (!differs || differenceConfirmed) &&
    !pending

  const submit = () =>
    onConfirm({
      amountSent: amount,
      transferReference: transferReference.trim(),
      note: note.trim() || undefined,
    })

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark refund as sent</DialogTitle>
          <DialogDescription>
            Only do this after you have sent the money to {buyerName} for{" "}
            {propertyTitle}. {buyerName} is owed {formatNaira(expectedAmount)}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label
              htmlFor="refund-amount"
              className="text-[13px] font-semibold"
            >
              Amount sent (₦)
            </label>
            <Input
              id="refund-amount"
              inputMode="numeric"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value.replace(/[^\d.]/g, ""))
                setDifferenceConfirmed(false)
              }}
              disabled={pending}
            />
          </div>

          {differs && (
            <label className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={differenceConfirmed}
                onChange={(e) => setDifferenceConfirmed(e.target.checked)}
                disabled={pending}
              />
              <span>
                <AlertTriangle className="mr-1 inline size-4" />
                This is {formatNaira(Math.abs(amount - expectedAmount))}{" "}
                {amount > expectedAmount ? "more" : "less"} than the buyer is
                owed. Tick to confirm it is correct.
              </span>
            </label>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="refund-transfer-ref"
              className="text-[13px] font-semibold"
            >
              Bank transfer reference
            </label>
            <Input
              id="refund-transfer-ref"
              value={transferReference}
              onChange={(e) => setTransferReference(e.target.value)}
              placeholder="From your bank's transfer receipt"
              maxLength={100}
              disabled={pending}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="refund-note" className="text-[13px] font-semibold">
              Note (optional)
            </label>
            <Textarea
              id="refund-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              disabled={pending}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={!canSubmit}
            className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
          >
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Mark as sent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
