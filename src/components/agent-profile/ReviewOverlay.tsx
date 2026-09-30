import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import { createRating, type EligibleDeal } from "@/services/rating.service"
import StarRating from "../shared/StarRating"
import Avatar from "../Avatar"

const MAX_CHARS = 500

interface ReviewOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agentId: string
  agentName: string
  agentAvatar?: string
  isVerified: boolean
  deals: EligibleDeal[]
  existingReviews: Record<string, { rating: number; comment?: string }>
  initialRating: number
  initialPropertyId?: string
}

export default function ReviewOverlay({
  open,
  onOpenChange,
  agentId,
  agentName,
  agentAvatar,
  isVerified,
  deals,
  existingReviews,
  initialRating,
  initialPropertyId,
}: ReviewOverlayProps) {
  const queryClient = useQueryClient()
  const [propertyId, setPropertyId] = useState("")
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const applyProperty = (id: string, fallbackRating: number) => {
    const existing = existingReviews[id]
    setPropertyId(id)
    setRating(existing?.rating ?? fallbackRating)
    setReview(existing?.comment ?? "")
  }

  useEffect(() => {
    if (!open) return
    const id =
      initialPropertyId ?? (deals.length === 1 ? deals[0].property._id : "")
    applyProperty(id, initialRating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const isEdit = !!existingReviews[propertyId]
  const canPost = rating > 0 && !!propertyId && !isSubmitting
  const charsLeft = MAX_CHARS - review.length

  const handlePost = async () => {
    setIsSubmitting(true)
    try {
      await createRating({
        propertyId,
        rating,
        comment: review.trim() || undefined,
      })
      queryClient.invalidateQueries({ queryKey: ["agentReviews", agentId] })
      toast.success(isEdit ? "Review updated" : "Review posted")
      onOpenChange(false)
    } catch (err) {
      const message = axios.isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined
      toast.error(message ?? "Couldn't save your review. Please try again.")
      console.error("createRating error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full gap-0 overflow-y-auto rounded-2xl px-6 py-8 font-ssPro text-text-primary [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:cursor-pointer [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-bg-accent">
        <DialogTitle className="sr-only">
          {isEdit ? "Edit your review" : "Rate this Agent"}
        </DialogTitle>

        <div className="mt-4 flex items-center gap-3">
          <Avatar
            name={agentName}
            src={agentAvatar}
            size="md"
            className="h-12.5 w-12.5"
          />
          <div>
            <div className="flex items-center gap-1">
              <p className="line-clamp-1 flex-1 text-[14px] font-semibold">
                {agentName}
              </p>
              {isVerified && (
                <div className="flex items-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
                  <p className="text-[12px] leading-4">Verified</p>
                  <img src={verifiedIcon} alt="" className="h-4 w-4" />
                </div>
              )}
            </div>
            <p className="text-[12px] leading-4 text-text-secondary">
              {isEdit ? "Edit your review" : "Rate this Agent"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[12px] text-text-secondary">
            Which deal is this review about?
          </p>
          <Select
            value={propertyId}
            onValueChange={(id) => applyProperty(id, rating)}
          >
            <SelectTrigger className="w-full cursor-pointer rounded-xl border border-bg-accent">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              {deals.map((deal) => (
                <SelectItem key={deal.property._id} value={deal.property._id}>
                  {deal.property.title} ·{" "}
                  {deal.purchaseId ? "Purchase" : "Inspection"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <textarea
            value={review}
            onChange={(e) =>
              e.target.value.length <= MAX_CHARS && setReview(e.target.value)
            }
            placeholder="Share your experience with this agent..."
            rows={5}
            className="w-full resize-none rounded-xl border border-bg-accent p-3 text-[12px] leading-4 outline-none focus:ring-2 focus:ring-bg-accent"
          />
          <p
            className={`text-right text-[12px] leading-4 ${charsLeft <= 50 ? "text-destructive" : "text-text-secondary"}`}
          >
            {charsLeft} characters remaining
          </p>
        </div>

        <div className="mt-6">
          <Button
            variant="app-primary"
            size="full"
            disabled={!canPost}
            onClick={handlePost}
          >
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update Review"
                : "Post Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
