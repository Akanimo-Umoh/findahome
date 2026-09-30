import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg"
import heartIcon from "@/assets/images/icon-heart.svg"
import { Link } from "react-router-dom"
import type { Property } from "@/types/property"
import { useFavorite } from "@/hooks/useFavorite"

type AgentPropertyCardProps = {
  property: Property
}

// Same visual structure as PropertyCard, minus the "listed by" agent row — used wherever a single agent's own listings are shown, so their name/avatar would just be redundant.
export default function AgentPropertyCard({
  property,
}: AgentPropertyCardProps) {
  const { isSaved, isLoading, toggleFavorite } = useFavorite(property._id)
  const isLand = property.propertyType === "land"
  const to = `/property/${property._id}`

  return (
    <Link
      to={to}
      className="block max-w-112.5 overflow-hidden rounded-2xl border border-bg-accent transition hover:shadow-lg"
    >
      <div className="relative">
        {property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-50 w-full object-cover md:h-62.5"
          />
        ) : (
          <div className="h-50 w-full bg-bg-accent md:h-62.5" />
        )}

        <button
          type="button"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite()
          }}
          className="absolute top-3 right-3 cursor-pointer disabled:opacity-50"
        >
          <img
            src={isSaved ? heartIcon : favoriteIcon}
            alt={isSaved ? "Remove from favorites" : "Add to favorites"}
          />
        </button>
      </div>

      <div className="space-y-2 px-4 py-3 md:p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="line-clamp-1 flex-1 font-raleway text-[12px] font-semibold tracking-[1px] text-black md:text-[16px]">
            {property.title}
          </p>
          <div className="flex w-fit items-center font-raleway text-[12px] font-semibold tracking-[1px] text-[#274AD0] md:text-[16px]">
            <img src={naira} alt="naira" />
            <p className="line-clamp-1">{property.price.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1 md:flex-1">
            <img src={location} alt="" className="h-4 w-4" />
            <p className="line-clamp-1 text-[12px] text-text-secondary md:text-[14px]">
              {property.address}
            </p>
          </div>

          {isLand ? (
            property.landType && (
              <div className="flex h-5 items-center text-[12px] text-text-secondary md:text-[14px]">
                Type:&nbsp;
                <span className="capitalize">{property.landType}</span>
              </div>
            )
          ) : (
            <div className="flex h-5 items-center gap-2 text-[12px] text-text-secondary md:text-[14px]">
              <div className="flex items-center gap-1">
                <img src={bed} alt="" className="h-4 w-4" />
                <p>
                  <span className="md:font-semibold">{property.bedroom}</span>{" "}
                  Beds
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={tubs} alt="" className="h-4 w-4" />
                <p>
                  <span className="md:font-semibold">{property.bathroom}</span>{" "}
                  Baths
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-1">
          <span className="flex h-[45px] w-full items-center justify-center rounded-lg border border-button-bg bg-button-sec font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary md:hidden">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}
