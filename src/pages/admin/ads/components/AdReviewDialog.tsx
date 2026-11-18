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
import { formatDate } from "@/pages/admin/escrow/format"
import type { AdminAd } from "@/types/adminAd"
import type { AdAction } from "../useAds"
import { OBJECTIVE_LABEL, adCode } from "../adMeta"

type AdReviewDialogProps = {
  ad: AdminAd
  // which decision is being saved, if any
  pending: AdAction | null
  onDecide: (action: "approve" | "reject") => void
  onClose: () => void
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-[12.5px] text-text-secondary">{label}</dt>
    <dd className="text-[14px] font-semibold text-text-primary">{value}</dd>
  </div>
)

// Review submission details before approving or rejecting. Mount it only while an ad is chosen.
export default function AdReviewDialog({
  ad,
  pending,
  onDecide,
  onClose,
}: AdReviewDialogProps) {
  const busy = pending !== null

  return (
    <Dialog open onOpenChange={(open) => !open && !busy && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Ad {adCode(ad)}</DialogTitle>
          <DialogDescription>
            Review the submission before approving or rejecting it.
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Field
            label="Listing"
            value={ad.property?.title ?? "Unknown listing"}
          />
          <Field label="Agent" value={ad.user?.name ?? "Unknown agent"} />
          <Field
            label="Goal"
            value={OBJECTIVE_LABEL[ad.objective] ?? ad.objective}
          />
          <Field label="Duration" value={`${ad.duration} days`} />
          <Field label="Budget" value={formatNaira(ad.adBudget)} />
          <Field label="Submitted" value={formatDate(ad.createdAt)} />
        </dl>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={busy}
            onClick={() => onDecide("reject")}
          >
            {pending === "reject" ? "Rejecting…" : "Reject"}
          </Button>
          <Button
            variant="app-primary"
            disabled={busy}
            onClick={() => onDecide("approve")}
          >
            {pending === "approve" ? "Approving…" : "Approve Ad"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
