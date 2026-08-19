import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type PauseAdDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isPausing: boolean
  propertyTitle: string
}

export default function PauseAdDialog({
  isOpen,
  onClose,
  onConfirm,
  isPausing,
  propertyTitle,
}: PauseAdDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-48px)] max-w-sm rounded-2xl p-6 font-ssPro text-text-primary">
        <DialogTitle className="font-raleway text-[16px] font-semibold tracking-[1px]">
          Pause this ad?
        </DialogTitle>

        <DialogDescription className="mt-2 text-[13px] text-text-secondary">
          Your ad for "{propertyTitle}" will stop being shown to buyers until
          you resume it. You can resume anytime from this page.
        </DialogDescription>

        <div className="mt-6 flex gap-3">
          <Button
            variant="app-secondary"
            size="full"
            type="button"
            onClick={onClose}
            disabled={isPausing}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            variant="app-primary"
            type="button"
            onClick={onConfirm}
            disabled={isPausing}
            size="full"
            className="flex-1"
          >
            {isPausing ? "Pausing..." : "Pause Ad"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
