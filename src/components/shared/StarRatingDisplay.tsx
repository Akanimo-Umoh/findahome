import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"

export default function StarRatingDisplay({
  rating,
  size = "h-4 w-4",
}: {
  rating: number
  size?: string
}) {
  const rounded = Math.round(rating)
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={i < rounded ? yellowStar : starIcon}
          alt=""
          className={size}
        />
      ))}
    </div>
  )
}
