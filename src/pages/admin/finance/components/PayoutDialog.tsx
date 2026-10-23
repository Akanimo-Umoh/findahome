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
import type { PayoutRow } from "../types"

type PayoutDialogProps = {
  payout: PayoutRow
  pending: boolean
  onConfirm: () => void
  onClose: () => void
}

// "Process now" and "Retry payout" both end here. Payouts are paid by hand, outside FindaHome: the admin sends the money from their bank, then marks it as paid so it is tracked on the platform. Mount it only while a payout is chosen.
export default function PayoutDialog({
  payout,
  pending,
  onConfirm,
  onClose,
}: PayoutDialogProps) {
  const { bank } = payout

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark this payout as paid?</DialogTitle>
          <DialogDescription>
            {payout.agent.name} requested {formatNaira(payout.amount)}. Send the
            money from your bank to the account below, then mark it as paid so
            it is tracked here.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-bg-accent p-3 text-[14px]">
          {bank ? (
            <dl className="space-y-1.5">
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Bank</dt>
                <dd className="font-semibold text-text-primary">
                  {bank.bankName}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Account number</dt>
                <dd className="font-semibold text-text-primary tabular-nums">
                  {bank.accountNumber}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Account name</dt>
                <dd className="text-right font-semibold text-text-primary">
                  {bank.accountName}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-text-secondary">
              No bank account was found for this agent.
            </p>
          )}
        </div>

        {bank && (
          <p className="text-[12.5px] text-text-secondary">
            This is the agent&rsquo;s {bank.isDefault ? "default" : "saved"}{" "}
            account. The account chosen in the request isn&rsquo;t stored
            {payout.bankCount > 1
              ? `, and they have ${payout.bankCount} accounts saved, so confirm with them if unsure.`
              : "."}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button variant="app-primary" onClick={onConfirm} disabled={pending}>
            {pending ? "Saving…" : "Mark as paid"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
