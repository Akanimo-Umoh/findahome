import StarRatingDisplay from "@/components/shared/StarRatingDisplay"
import { timeAgo } from "@/lib/agents"
import type { AgentReview } from "@/services/rating.service"
import Avatar from "../Avatar"

type Props = {
  reviews: AgentReview[]
  currentUserId?: string
  onEdit: (review: AgentReview) => void
}

export default function AgentReviews({
  reviews,
  currentUserId,
  onEdit,
}: Props) {
  return (
    <div>
      <p className="md:font-semibold">Reviews ({reviews.length})</p>

      {reviews.length === 0 && (
        <p className="mt-3 text-[12px] text-text-secondary">No reviews yet.</p>
      )}

      <div className="mt-3 space-y-4 md:space-y-6">
        {reviews.map((review) => {
          const reviewer =
            review.user && typeof review.user !== "string" ? review.user : null
          const property =
            review.property && typeof review.property !== "string"
              ? review.property
              : null
          const name = reviewer?.name ?? "Anonymous"
          const isMine = !!currentUserId && reviewer?._id === currentUserId

          return (
            <div key={review._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Avatar name={name} size="sm" className="h-7.5 w-7.5" />

                  <div>
                    <p className="text-[12px] font-semibold">
                      {isMine ? `${name} (You)` : name}
                    </p>
                    <p className="text-[12px] leading-4">
                      {timeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>

                <StarRatingDisplay rating={review.rating} size="h-3.5 w-3.5" />
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <p className="text-[12px] leading-4 text-text-secondary">
                  {property ? property.title : "a property"}
                </p>
                <span className="rounded-2xl bg-bg-accent px-2 py-0.5 text-[11px] leading-4">
                  {review.purchase ? "Purchase" : "Inspection"}
                </span>
              </div>

              {review.comment && (
                <p className="mt-1 text-[12px] leading-4.25 text-text-secondary">
                  {review.comment}
                </p>
              )}

              {isMine && (
                <button
                  onClick={() => onEdit(review)}
                  className="mt-1 cursor-pointer text-[12px] leading-4 text-button-bg"
                >
                  Edit review
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
