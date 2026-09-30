import { Link } from "react-router-dom"
import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import houseIcon from "@/assets/images/icon-building.svg"
import type { Property } from "@/types/property"

interface ActiveListingsProps {
  agentId: string
  listings: Property[]
}

export default function ActiveListings({
  agentId,
  listings,
}: ActiveListingsProps) {
  const featured = listings.slice(0, 6)

  return (
    <div>
      <div className="mx-6 flex items-center justify-between md:mx-0">
        <p className="md:text-[18px] md:font-semibold">Active Listings</p>

        {listings.length > 0 && (
          <Link
            to={`/agents/${agentId}/listings`}
            className="text-[12px] text-button-bg underline md:text-[14px]"
          >
            See All {">"}
          </Link>
        )}
      </div>

      {listings.length === 0 && (
        <p className="mx-6 mt-2 text-[12px] text-text-secondary md:mx-0">
          No active listings yet.
        </p>
      )}

      <div className="mt-2 md:mt-6">
        <div className="grid w-full grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
          {featured.map((listing) => {
            const isLand = listing.propertyType === "land"

            return (
              <div
                key={listing._id}
                className="w-full overflow-hidden rounded-2xl border border-bg-accent hover:shadow-sm"
              >
                <div className="h-42.5 w-full overflow-hidden rounded-t-2xl">
                  {listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-bg-accent" />
                  )}
                </div>

                <div className="p-3">
                  <div className="mt-1 space-y-2">
                    <div className="space-y-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                      <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px] text-black">
                        {listing.title}
                      </p>

                      <p className="flex items-center font-raleway text-[12px] font-semibold tracking-[1px] text-button-bg">
                        <img src={naira} alt="naira" />{" "}
                        {listing.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-col justify-center gap-2 font-ssPro text-[12px] text-text-secondary">
                        <div className="flex items-center gap-1">
                          <img src={location} alt="" />
                          <p className="line-clamp-1">{listing.address}</p>
                        </div>

                        {isLand ? (
                          <div className="flex items-center gap-1">
                            <img src={houseIcon} alt="" />
                            <p className="capitalize">
                              {listing.landType} Land
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <img src={bed} alt="" />{" "}
                              <p>{listing.bedroom} Beds</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img src={tubs} alt="" />{" "}
                              <p>{listing.bathroom} Baths</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/property/${listing._id}`}
                    className="mt-2 flex h-11.25 w-full items-center justify-center rounded-lg border border-button-bg bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary hover:bg-bg-accent"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
