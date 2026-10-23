import { useState } from "react"
import { TriangleAlert } from "lucide-react"
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
import type { AdminAd } from "@/types/adminAd"
import { adCode } from "../adMeta"
import type { AdRowMode } from "./AdRowActions"

type AdActionDialogProps = {
  ad: AdminAd
  mode: AdRowMode
  pending: boolean
  onConfirm: (note?: string) => void
  onClose: () => void
}

const COPY = {
  pause: {
    title: "Pause this ad?",
    body: "It will stop running until it is resumed.",
    confirm: "Pause ad",
    busy: "Pausing…",
    button: "app-primary" as const,
  },
  resume: {
    title: "Resume this ad?",
    body: "It will start running again.",
    confirm: "Resume ad",
    busy: "Resuming…",
    button: "app-primary" as const,
  },
  remove: {
    title: "Remove this ad?",
    body: "It will be deleted for good.",
    confirm: "Remove ad",
    busy: "Removing…",
    button: "destructive" as const,
  },
}

// One confirm step for pausing, resuming and removing. Mount it only while an ad is chosen.
export default function AdActionDialog({
  ad,
  mode,
  pending,
  onConfirm,
  onClose,
}: AdActionDialogProps) {
  const [note, setNote] = useState("")
  const copy = COPY[mode]

  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>
            {adCode(ad)} · {ad.property?.title ?? "Unknown listing"}.{" "}
            {copy.body}
          </DialogDescription>
        </DialogHeader>

        {mode === "pause" && (
          <div>
            <label
              htmlFor="pause-note"
              className="mb-1.5 block text-[13px] font-semibold text-text-primary"
            >
              Reason (optional)
            </label>
            <Textarea
              id="pause-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why is this ad being paused?"
              className="min-h-20"
            />
          </div>
        )}

        {mode === "remove" && ad.isPaid && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <p>
              The agent already paid {formatNaira(ad.adBudget)} for this ad.
              Removing it does not refund them.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant={copy.button}
            disabled={pending}
            onClick={() => onConfirm(note.trim() || undefined)}
          >
            {pending ? copy.busy : copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
