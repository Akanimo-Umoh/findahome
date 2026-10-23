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
import { formatNaira } from "@/lib/adminFormat"
import { formatDate } from "@/pages/admin/escrow/format"
import type { AdminAd } from "@/types/adminAd"
import type { AdAction } from "../useAds"
import { OBJECTIVE_LABEL, adCode } from "../adMeta"

type AdReviewDialogProps = {
  ad: AdminAd
  // which decision is being saved, if any
  pending: AdAction | null
  onDecide: (action: "approve" | "reject", note?: string) => void
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
  const [note, setNote] = useState("")
  const busy = pending !== null
  const clean = note.trim() || undefined

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

        <div>
          <label
            htmlFor="ad-note"
            className="mb-1.5 block text-[13px] font-semibold text-text-primary"
          >
            Admin note (optional)
          </label>
          <Textarea
            id="ad-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write something…"
            className="min-h-20"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={busy}
            onClick={() => onDecide("reject", clean)}
          >
            {pending === "reject" ? "Rejecting…" : "Reject"}
          </Button>
          <Button
            variant="app-primary"
            disabled={busy}
            onClick={() => onDecide("approve", clean)}
          >
            {pending === "approve" ? "Publishing…" : "Approve & Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
