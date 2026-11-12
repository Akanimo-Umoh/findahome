import { useState } from "react"
import { Loader2 } from "lucide-react"
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
import { KIND_LABEL, formatDate } from "../format"
import type { PendingPayment } from "../pendingPayments"
import { useConfirmPayment } from "../useEscrow"

const PREVIEW_COUNT = 5

export function PendingPayments({ items }: { items: PendingPayment[] }) {
  const [selected, setSelected] = useState<PendingPayment | null>(null)
  const [showAll, setShowAll] = useState(false)
  const mutation = useConfirmPayment()

  if (items.length === 0) return null

  // oldest first; only the first few show until the admin asks for the rest
  const visible = showAll ? items : items.slice(0, PREVIEW_COUNT)

  const confirm = () => {
    if (!selected) return
    mutation.mutate(
      { kind: selected.kind, id: selected.id, reference: selected.reference },
      { onSuccess: () => setSelected(null) }
    )
  }

  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/50">
      <header className="px-4 pt-4 pb-2">
        <h2 className="font-raleway text-[15px] font-bold text-text-primary">
          Payments awaiting confirmation ({items.length})
        </h2>
        <p className="text-[13px] text-text-secondary">
          Find the reference on Paystack first. Confirm only once you can see
          the payment there.
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
            </div>

            <div className="text-right">
              <p className="text-[14px] font-semibold text-text-primary">
                {formatNaira(p.amount)}
              </p>
              <p className="text-[12.5px] text-text-secondary">
                Started {formatDate(p.startedAt)}
              </p>
            </div>

            <Button variant="outline" onClick={() => setSelected(p)}>
              Confirm payment
            </Button>
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
        <Dialog
          open
          onOpenChange={(open) =>
            !open && !mutation.isPending && setSelected(null)
          }
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm this payment?</DialogTitle>
              <DialogDescription>
                {formatNaira(selected.amount)} from {selected.buyerName} for{" "}
                {selected.propertyTitle}. Reference {selected.reference}. This
                creates the escrow and lets the agent continue. The server also
                checks the reference with Paystack and refuses if it isn&apos;t
                a successful payment.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setSelected(null)}
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
                Confirm payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
