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
import { calculateRefundFee } from "@/lib/refundFee"
import type { RefundSent } from "@/services/admin/escrow.service"

type RefundSentDialogProps = {
  // what the buyer paid; the refund is this minus the processing fee
  amountPaid: number
  buyerName: string
  propertyTitle: string
  pending: boolean
  onConfirm: (sent: RefundSent) => void
  onClose: () => void
}

// Refunds are sent outside the platform (a bank transfer by the admin). This
// records the transfer so the buyer is told and the books show it. The buyer
// pays a processing fee on refunds, unless the admin waives it.
export function RefundSentDialog({
  amountPaid,
  buyerName,
  propertyTitle,
  pending,
  onConfirm,
  onClose,
}: RefundSentDialogProps) {
  const standardFee = calculateRefundFee(amountPaid)
  const [waiveFee, setWaiveFee] = useState(false)
  const processingFee = waiveFee ? 0 : standardFee
  const amountOwed = amountPaid - processingFee

  const [amountInput, setAmountInput] = useState(String(amountOwed))
  const [amountEdited, setAmountEdited] = useState(false)
  const [transferReference, setTransferReference] = useState("")
  const [note, setNote] = useState("")
  const [differenceConfirmed, setDifferenceConfirmed] = useState(false)

  const toggleWaive = (waive: boolean) => {
    setWaiveFee(waive)
    setDifferenceConfirmed(false)
    // follow the new amount owed unless the admin typed their own
    if (!amountEdited) {
      setAmountInput(String(amountPaid - (waive ? 0 : standardFee)))
    }
  }

  const amount = Number(amountInput)
  const validAmount = Number.isFinite(amount) && amount > 0
  const differs = validAmount && amount !== amountOwed
  const canSubmit =
    validAmount &&
    !!transferReference.trim() &&
    (!differs || differenceConfirmed) &&
    !pending

  const submit = () =>
    onConfirm({
      amountSent: amount,
      processingFee,
      waiveProcessingFee: waiveFee,
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
            {propertyTitle}.
          </DialogDescription>
        </DialogHeader>

        {/* what the buyer is owed */}
        <dl className="space-y-1.5 rounded-lg bg-bg-accent p-3 text-[13px]">
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Amount paid</dt>
            <dd className="tabular-nums">{formatNaira(amountPaid)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Processing fee</dt>
            <dd className="tabular-nums">
              {waiveFee ? (
                <span>
                  <s className="text-text-secondary">
                    {formatNaira(standardFee)}
                  </s>{" "}
                  {formatNaira(0)}
                </span>
              ) : (
                `− ${formatNaira(standardFee)}`
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-slate-200 pt-1.5 font-semibold">
            <dt>Amount to send</dt>
            <dd className="tabular-nums">{formatNaira(amountOwed)}</dd>
          </div>
        </dl>

        <label className="flex items-start gap-2 text-[13px]">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={waiveFee}
            onChange={(e) => toggleWaive(e.target.checked)}
            disabled={pending}
          />
          <span>
            Waive the processing fee
            <span className="block text-[12px] text-text-secondary">
              When the refund isn&apos;t the buyer&apos;s fault, e.g. a
              duplicate payment, a property already taken, or an agent who
              didn&apos;t show up.
            </span>
          </span>
        </label>

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
                setAmountEdited(true)
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
                This is {formatNaira(Math.abs(amount - amountOwed))}{" "}
                {amount > amountOwed ? "more" : "less"} than the amount to send.
                Tick to confirm it is correct.
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
