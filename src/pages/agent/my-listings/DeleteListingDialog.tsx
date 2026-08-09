import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type DeleteListingDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
  listingTitle: string
}

export default function DeleteListingDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  listingTitle,
}: DeleteListingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-48px)] max-w-sm rounded-2xl p-6 font-ssPro text-text-primary">
        <DialogTitle className="font-raleway text-[16px] font-semibold tracking-[1px]">
          Delete this listing?
        </DialogTitle>

        <DialogDescription className="mt-2 text-[13px] text-text-secondary">
          Are you sure you want to delete "{listingTitle}"? This action can't be
          undone.
        </DialogDescription>

        <div className="mt-6 flex gap-3">
          <Button
            variant="app-secondary"
            size="full"
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            size="full"
            className="flex-1 cursor-pointer bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
