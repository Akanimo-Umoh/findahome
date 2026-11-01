import { MapPin, BedDouble, Bath, LandPlot, Heart } from "lucide-react"

/* ---------- Types ----------
 * A discriminated union: `kind` tells TypeScript which extra fields exist.
 * If kind === "apartment" you get beds/baths; if "land" you get landType.
 */
type BaseListing = {
  id: string
  title: string
  price: number
  location: string
  imageUrl: string
  agent: { name: string; avatarUrl: string }
}

export type ApartmentListing = BaseListing & {
  kind: "apartment"
  beds: number
  baths: number
}

export type LandListing = BaseListing & {
  kind: "land"
  landType: "Residential" | "Commercial" | "Agricultural" | "Industrial"
}

export type Listing = ApartmentListing | LandListing

type ListingCardProps = {
  listing: Listing
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  className?: string
}

/* ---------- Helpers ---------- */
const priceFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  notation: "compact",
  maximumFractionDigits: 1,
})

/* ---------- Component ---------- */
export function ListingCard({
  listing,
  isFavorite = false,
  onToggleFavorite,
  className = "",
}: ListingCardProps) {
  const { id, title, price, location, imageUrl, agent } = listing

  return (
    <article
      className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}
    >
      {/* Image: fixed aspect ratio keeps every card the same height at any width */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(id)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? "Remove from favourites" : "Add to favourites"
            }
            className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
          {title}
        </h3>

        <p className="text-sm font-semibold text-blue-600 sm:text-base">
          {priceFormatter.format(price)}
        </p>

        <p className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{location}</span>
        </p>

        {/* Meta row: the ONLY part that differs between apartment and land */}
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 sm:text-sm">
          {listing.kind === "apartment" ? (
            <>
              <li className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" aria-hidden />
                {listing.beds} {listing.beds === 1 ? "Bed" : "Beds"}
              </li>
              <li className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" aria-hidden />
                {listing.baths} {listing.baths === 1 ? "Bath" : "Baths"}
              </li>
            </>
          ) : (
            <li className="flex items-center gap-1.5">
              <LandPlot className="h-4 w-4" aria-hidden />
              Type:{" "}
              <span className="font-medium text-gray-700">
                {listing.landType}
              </span>
            </li>
          )}
        </ul>

        {/* mt-auto pushes the agent row to the bottom so cards in a row align */}
        <div className="mt-auto flex items-center gap-2 border-t border-gray-200 pt-3">
          <img
            src={agent.avatarUrl}
            alt=""
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
            {agent.name}
          </span>
        </div>
      </div>
    </article>
  )
}

/* ---------- Usage ----------
 *
 * 1) Grid (works for both land and apartments):
 *
 * <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 *   {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
 * </div>
 *
 * 2) Horizontal carousel (your first screenshot):
 *
 * <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
 *   {listings.map((l) => (
 *     <ListingCard
 *       key={l.id}
 *       listing={l}
 *       className="w-[80%] shrink-0 snap-start sm:w-[320px]"
 *     />
 *   ))}
 * </div>
 */
