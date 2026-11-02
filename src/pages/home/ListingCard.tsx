import {
  MapPin,
  BedDouble,
  Bath,
  LandPlot,
  Heart,
  BadgeCheck,
} from "lucide-react"
import { Link } from "react-router-dom"
import type { Property } from "@/types/property"
import { useFavorite } from "@/hooks/useFavorite"
import naira from "@/assets/images/naira.svg"
// Adjust this path: it's wherever Avatar lives relative to your PropertyCard ("./Avatar")
import Avatar from "@/components/Avatar"

/* Same props as PropertyCard, so the two are drop-in interchangeable */
type ListingCardProps = {
  property: Property
  to: string
  className?: string
}

/* 800000 -> "800k", 1500000 -> "1.5M" */
function formatPrice(n: number) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

export function ListingCard({
  property,
  to,
  className = "",
}: ListingCardProps) {
  // Same hook PropertyCard uses, so favoriting hits the same endpoint
  const { isSaved, isLoading, toggleFavorite } = useFavorite(property._id)
  const isLand = property.propertyType === "land"

  const avatarSrc = Array.isArray(property.owner.profilePicture)
    ? property.owner.profilePicture[0]
    : property.owner.profilePicture

  return (
    <article
      className={`relative flex h-full w-full max-w-112.5 flex-col overflow-hidden rounded-2xl border border-bg-accent bg-white transition hover:shadow-lg ${className}`}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden md:h-62.5">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {/* z-20 keeps the button above the card-wide link */}
        <button
          type="button"
          disabled={isLoading}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite()
          }}
          className="absolute top-2 right-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur transition hover:bg-white disabled:opacity-50"
        >
          <Heart
            className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <h3 className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-black md:text-[16px]">
          {property.title}
        </h3>

        <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
          <img src={naira} alt="naira" />
          <span>{formatPrice(property.price)}</span>
        </p>

        <p className="flex items-center gap-1.5 text-[12px] text-text-secondary md:text-[14px]">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="line-clamp-1">{property.address}</span>
        </p>

        {/* Meta row: the only part that differs between land and buildings */}
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-text-secondary md:text-[14px]">
          {isLand ? (
            property.landType && (
              <li className="flex items-center gap-1.5">
                <LandPlot className="h-4 w-4" aria-hidden />
                Type:{" "}
                <span className="font-semibold capitalize">
                  {property.landType}
                </span>
              </li>
            )
          ) : (
            <>
              <li className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" aria-hidden />
                {property.bedroom} {property.bedroom === 1 ? "Bed" : "Beds"}
              </li>
              <li className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" aria-hidden />
                {property.bathroom} {property.bathroom === 1 ? "Bath" : "Baths"}
              </li>
            </>
          )}
        </ul>

        {/* mt-auto pins the agent row to the bottom so cards in a row line up */}
        <div className="mt-auto flex items-center gap-2 border-t border-bg-accent pt-3">
          <Avatar name={property.owner.name ?? "?"} src={avatarSrc} size="xs" />
          <span className="line-clamp-1 text-[12px] font-semibold text-black md:text-[14px]">
            {property.owner.name}
          </span>
          {property.owner.isVerified && (
            <BadgeCheck
              className="h-4 w-4 shrink-0 text-green-600 md:h-5 md:w-5"
              aria-label="verified"
            />
          )}
        </div>
      </div>

      {/* Card-wide link */}
      <Link
        to={to}
        aria-label={`View ${property.title} details`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-bg"
      />
    </article>
  )
}
