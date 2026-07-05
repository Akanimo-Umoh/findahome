import agentAvatar from "@/assets/images/agentAvatar.jpg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"

export default function AgentReviews() {
  const reviews = [
    {
      id: 1,
      name: "Maryann Kikomu",
      date: "2 days ago",
      rating: 4,
      comment:
        "John was exceptional throughout the entire process. Very professional, responsive, and helped us find exactly what we were looking for. The escrow process was smooth and secure.",
    },
    {
      id: 2,
      name: "Maryann Kikomu",
      date: "2 days ago",
      rating: 3,
      comment:
        "John was exceptional throughout the entire process. Very professional, responsive, and helped us find exactly what we were looking for. The escrow process was smooth and secure.",
    },
  ]

  return (
    <div>
      <p className="md:font-semibold">Reviews({reviews.length})</p>

      <div className="mt-3 space-y-4 md:space-y-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src={agentAvatar}
                  alt=""
                  className="h-7.5 w-7.5 rounded-full object-cover"
                />
                <div>
                  <p className="text-[12px] font-semibold">{review.name}</p>
                  <p className="text-[12px] leading-4">{review.date}</p>
                </div>
              </div>

              {/* dynamic stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={index < review.rating ? yellowStar : starIcon}
                    alt=""
                    className="h-3.5 w-3.5"
                  />
                ))}
              </div>
            </div>

            {/* review text */}
            <p className="mt-1 text-[12px] leading-4.25 text-text-secondary">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
