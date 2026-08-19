import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { updateAd } from "@/services/ad.service"
import type { Ad } from "@/types/ad"

type ExtendAdModalProps = {
  ad: Ad
  isOpen: boolean
  onClose: () => void
}

export default function ExtendAdModal({
  ad,
  isOpen,
  onClose,
}: ExtendAdModalProps) {
  const queryClient = useQueryClient()
  const [extraDays, setExtraDays] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const newDuration = ad.duration + extraDays
  const additionalCost = ad.dailyBudget * extraDays

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await updateAd(ad._id, {
        duration: newDuration,
        adBudget: ad.dailyBudget * newDuration,
      })
      queryClient.invalidateQueries({ queryKey: ["ad", ad._id] })
      queryClient.invalidateQueries({ queryKey: ["agentAds"] })
      toast.success(
        `Ad extended by ${extraDays} day${extraDays > 1 ? "s" : ""}`
      )
      onClose()
    } catch (err) {
      toast.error("Failed to extend ad. Please try again.")
      console.error("extendAd error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-48px)] max-w-sm rounded-2xl p-6 font-ssPro text-text-primary">
        <DialogTitle className="font-raleway text-[16px] font-semibold tracking-[1px]">
          Extend Ad Duration
        </DialogTitle>
        <DialogDescription className="mt-1 text-[12px] text-text-secondary">
          Add more days to keep this campaign running longer.
        </DialogDescription>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setExtraDays((d) => Math.max(d - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-bg-accent text-[18px]"
          >
            −
          </button>
          <div className="text-center">
            <p className="font-raleway text-[24px] font-semibold">
              {extraDays}
            </p>
            <p className="text-[12px] text-text-secondary">
              extra day{extraDays > 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExtraDays((d) => Math.min(d + 1, 30))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-bg-accent text-[18px]"
          >
            +
          </button>
        </div>

        <div className="mt-6 space-y-2 rounded-lg bg-bg-accent p-3">
          <div className="flex items-center justify-between text-[13px]">
            <p className="text-text-secondary">New duration</p>
            <p className="font-semibold">{newDuration} days</p>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <p className="text-text-secondary">Additional cost</p>
            <p className="font-semibold text-button-bg">
              ₦{additionalCost.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="app-secondary"
            size="full"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="app-primary"
            size="full"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Extending..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
