import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"

const MAX_CHARS = 500

interface ReviewOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rating: number
  onRatingChange: (rating: number) => void
}

export default function ReviewOverlay({
  open,
  onOpenChange,
  rating,
  onRatingChange,
}: ReviewOverlayProps) {
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")

  const handleClose = () => {
    onOpenChange(false)
    setHover(0)
    setReview("")
  }

  const handlePost = () => {
    // TODO: fire mutation with { rating, review } once endpoint exists
    handleClose()
  }

  const charsLeft = MAX_CHARS - review.length
  const canPost = rating > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full gap-0 rounded-2xl px-6 py-8 font-ssPro text-text-primary [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:cursor-pointer [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-bg-accent">
        <DialogTitle className="sr-only">Rate this Agent</DialogTitle>

        {/* agent info */}
        <div className="mt-4 flex items-center gap-3">
          <img
            src={agentAvatar}
            alt=""
            className="h-12.5 w-12.5 shrink-0 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <p className="line-clamp-1 flex-1 text-[14px] font-semibold">
                Maryann Kikomu
              </p>
              <div className="flex items-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
                <p className="text-[12px] leading-4">Verified</p>
                <img src={verifiedIcon} alt="" className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[12px] leading-4 text-text-secondary">
              Rate this Agent
            </p>
          </div>
        </div>

        {/* stars */}
        <div className="mt-6 flex items-center gap-2">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1
            const isActive = starIndex <= (hover || rating)
            return (
              <button
                key={starIndex}
                onClick={() => onRatingChange(starIndex)}
                onMouseEnter={() => setHover(starIndex)}
                onMouseLeave={() => setHover(0)}
                className="cursor-pointer"
              >
                <img
                  src={isActive ? yellowStar : starIcon}
                  alt={`${starIndex} star`}
                  className="h-6 w-6"
                />
              </button>
            )
          })}
        </div>

        {/* review input */}
        <div className="mt-4 flex flex-col gap-1">
          <textarea
            value={review}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setReview(e.target.value)
              }
            }}
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

        {/* actions */}
        <div className="mt-6">
          <Button
            variant="app-primary"
            size="full"
            disabled={!canPost}
            onClick={handlePost}
          >
            Post Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
