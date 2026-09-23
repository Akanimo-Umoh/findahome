import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export default function StarRating({
  value,
  onChange,
  max = 5,
}: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const highlightedValue = hover || value

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1
        const isHighlighted = starValue <= highlightedValue

        return (
          <button
            key={starValue}
            type="button"
            aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
            aria-pressed={value === starValue}
            className="cursor-pointer"
            onClick={() => onChange(value === starValue ? 0 : starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                isHighlighted
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-text-secondary"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
