// import agentAvatar from "@/assets/images/agentAvatar.jpg"
// import yellowStar from "@/assets/images/icon-yellow-star.svg"
// import starIcon from "@/assets/images/icon-normal-star.svg"

// export default function AgentReviews() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Maryann Kikomu",
//       date: "2 days ago",
//       rating: 4,
//       comment:
//         "John was exceptional throughout the entire process. Very professional, responsive, and helped us find exactly what we were looking for. The escrow process was smooth and secure.",
//     },
//     {
//       id: 2,
//       name: "Maryann Kikomu",
//       date: "2 days ago",
//       rating: 3,
//       comment:
//         "John was exceptional throughout the entire process. Very professional, responsive, and helped us find exactly what we were looking for. The escrow process was smooth and secure.",
//     },
//   ]

//   return (
//     <div>
//       <p className="md:font-semibold">Reviews({reviews.length})</p>

//       <div className="mt-3 space-y-4 md:space-y-6">
//         {reviews.map((review) => (
//           <div key={review.id}>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">
//                 <img
//                   src={agentAvatar}
//                   alt=""
//                   className="h-7.5 w-7.5 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="text-[12px] font-semibold">{review.name}</p>
//                   <p className="text-[12px] leading-4">{review.date}</p>
//                 </div>
//               </div>

//               {/* dynamic stars */}
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, index) => (
//                   <img
//                     key={index}
//                     src={index < review.rating ? yellowStar : starIcon}
//                     alt=""
//                     className="h-3.5 w-3.5"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* review text */}
//             <p className="mt-1 text-[12px] leading-4.25 text-text-secondary">
//               {review.comment}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

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
