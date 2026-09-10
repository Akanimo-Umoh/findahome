import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type RescheduleConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isSubmitting?: boolean
}

export default function RescheduleConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: RescheduleConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full gap-0 rounded-2xl px-6 py-8 font-ssPro text-text-primary">
        <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
          Reject this schedule?
        </DialogTitle>
        <DialogDescription className="mt-2 text-center text-[13px] leading-4 text-text-secondary">
          This will let your agent know the proposed time doesn't work. You'll
          be taken to chat to suggest a new date and time directly.
        </DialogDescription>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="app-primary"
            size="full"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Rejecting..." : "Yes, suggest a new time"}
          </Button>
          <Button
            variant="app-secondary"
            size="full"
            onClick={() => onOpenChange(false)}
          >
            Keep this schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
