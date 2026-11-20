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
import { Textarea } from "@/components/ui/textarea"
import { formatNaira } from "@/lib/adminFormat"
import { KIND_LABEL, formatDate } from "../format"
import type { PendingPayment } from "../pendingPayments"
import { OtherOfferNote } from "./OtherOfferNote"
import { useConfirmPayment, useRejectPayment } from "../useEscrow"

const PREVIEW_COUNT = 5

type Decision = { payment: PendingPayment; action: "approve" | "reject" }

function MismatchNote({ p }: { p: PendingPayment }) {
  if (!p.amountMismatch) return null
  return (
    <p className="flex items-center gap-1 text-[12.5px] font-semibold text-amber-700">
      <AlertTriangle className="size-3.5" />
      Paystack received{" "}
      {p.paidAmount != null ? formatNaira(p.paidAmount) : "a different amount"},
      expected {formatNaira(p.amount)}
    </p>
  )
}

export function PendingPayments({ items }: { items: PendingPayment[] }) {
  const [decision, setDecision] = useState<Decision | null>(null)
  const [reason, setReason] = useState("")
  const [showAll, setShowAll] = useState(false)
  const approve = useConfirmPayment()
  const reject = useRejectPayment()

  if (items.length === 0) return null

  // oldest first; only the first few show until the admin asks for the rest
  const visible = showAll ? items : items.slice(0, PREVIEW_COUNT)
  const pending = approve.isPending || reject.isPending

  const open = (payment: PendingPayment, action: Decision["action"]) => {
    setReason("")
    setDecision({ payment, action })
  }
  const close = () => !pending && setDecision(null)

  const submit = () => {
    if (!decision) return
    const { payment } = decision
    const done = { onSuccess: () => setDecision(null) }
    if (decision.action === "approve") {
      approve.mutate(
        { kind: payment.kind, id: payment.id, reference: payment.reference },
        done
      )
    } else {
      reject.mutate(
        { kind: payment.kind, id: payment.id, reason: reason.trim() },
        done
      )
    }
  }

  const selected = decision?.payment
  const rejecting = decision?.action === "reject"

  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/50">
      <header className="px-4 pt-4 pb-2">
        <h2 className="font-raleway text-[15px] font-bold text-text-primary">
          Payments awaiting confirmation ({items.length})
        </h2>
        <p className="text-[13px] text-text-secondary">
          Find the reference on Paystack first. Approve only once you can see
          the payment there. Reject it if it&apos;s wrong or a duplicate.
        </p>
      </header>

      <ul className="divide-y divide-amber-100">
        {visible.map((p) => (
          <li
            key={`${p.kind}-${p.id}`}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-text-primary">
                {p.propertyTitle}
              </p>
              <p className="truncate text-[12.5px] text-text-secondary">
                {KIND_LABEL[p.kind]} · {p.buyerName}
                {p.buyerEmail && ` (${p.buyerEmail})`}
              </p>
              <p className="text-[12.5px] text-text-secondary">
                Reference:{" "}
                <span className="font-mono select-all">{p.reference}</span>
              </p>
              <MismatchNote p={p} />
              <OtherOfferNote
                offer={p.otherOffer}
                kind={p.kind}
                state="pending"
                className="mt-2"
              />
            </div>

            <div className="text-right">
              <p className="text-[14px] font-semibold text-text-primary">
                {formatNaira(p.amount)}
              </p>
              <p className="text-[12.5px] text-text-secondary">
                Paid {formatDate(p.startedAt)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => open(p, "reject")}>
                Reject
              </Button>
              <Button
                onClick={() => open(p, "approve")}
                className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
              >
                Approve
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {items.length > PREVIEW_COUNT && (
        <div className="border-t border-amber-100 px-4 py-2 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="cursor-pointer text-[13px] font-semibold text-button-bg hover:underline"
          >
            {showAll ? "Show fewer" : `Show all ${items.length}`}
          </button>
        </div>
      )}

      {selected && (
        <Dialog open onOpenChange={(isOpen) => !isOpen && close()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {rejecting ? "Reject this payment?" : "Approve this payment?"}
              </DialogTitle>
              <DialogDescription>
                {formatNaira(selected.paidAmount ?? selected.amount)} from{" "}
                {selected.buyerName} for {selected.propertyTitle}. Reference{" "}
                {selected.reference}.{" "}
                {rejecting
                  ? "The deal is cancelled and the buyer is told a refund is coming. You then send the money back and mark the refund as sent."
                  : "This creates the escrow and lets the agent continue. The server also checks the reference with Paystack and refuses if it isn't a successful payment."}
              </DialogDescription>
            </DialogHeader>

            <MismatchNote p={selected} />

            {rejecting && (
              <div className="space-y-1.5">
                <label
                  htmlFor="reject-reason"
                  className="text-[13px] font-semibold"
                >
                  Reason (the buyer sees this)
                </label>
                <Textarea
                  id="reject-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="E.g. The amount paid doesn't match the fee."
                  maxLength={300}
                  disabled={pending}
                />
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={close} disabled={pending}>
                Cancel
              </Button>
              <Button
                onClick={submit}
                disabled={pending || (rejecting && !reason.trim())}
                className={
                  rejecting
                    ? "bg-red-600 text-white hover:bg-red-600/90"
                    : "bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
                }
              >
                {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
                {rejecting ? "Reject payment" : "Approve payment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
