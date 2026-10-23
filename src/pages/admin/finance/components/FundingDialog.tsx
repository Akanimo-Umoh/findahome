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
import type { LedgerRow } from "../types"

type FundingDialogProps = {
  row: LedgerRow
  pending: boolean
  onConfirm: () => void
  onClose: () => void
}

// Wallet funding only counts once an admin confirms it. Confirming checks the payment with Paystack, then adds the money to the person's wallet.
// Mount it only while a payment is chosen.
export default function FundingDialog({
  row,
  pending,
  onConfirm,
  onClose,
}: FundingDialogProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm this payment?</DialogTitle>
          <DialogDescription>
            {row.party.name} paid {formatNaira(row.amount)} into their wallet.
            We&rsquo;ll check it with Paystack, then add the money to their
            wallet.
          </DialogDescription>
        </DialogHeader>

        <dl className="rounded-lg bg-bg-accent p-3 text-[14px]">
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Reference</dt>
            <dd className="font-semibold break-all text-text-primary">
              {row.reference ?? "—"}
            </dd>
          </div>
        </dl>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant="app-primary"
            onClick={onConfirm}
            disabled={pending || !row.reference}
          >
            {pending ? "Confirming…" : "Confirm payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
