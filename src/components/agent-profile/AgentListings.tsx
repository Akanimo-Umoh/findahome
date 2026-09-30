import { Link, useParams, useSearchParams } from "react-router-dom"
import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import houseIcon from "@/assets/images/icon-building.svg"
import PageHeader from "@/components/shared/PageHeader"
import Pagination from "@/components/shared/Pagination"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import {
  useAgentProfile,
  useAgentListingsQuery,
} from "@/hooks/useAgentDirectory"

const ITEMS_PER_PAGE = 6

export default function AgentListings() {
  const { agentId = "" } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const { agent } = useAgentProfile(agentId)
  const { listings, isLoading } = useAgentListingsQuery(agentId)

  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const current = listings.slice(start, start + ITEMS_PER_PAGE)

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title={agent ? `${agent.name}'s Listings` : "Agent Listings"}
          responsive
        />

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}

          {!isLoading &&
            current.map((listing) => {
              const isLand = listing.propertyType === "land"

              return (
                <Link
                  to={`/property/${listing._id}`}
                  key={listing._id}
                  className="overflow-hidden rounded-2xl border border-bg-accent hover:shadow-xl"
                >
                  <div className="h-42.5 w-full overflow-hidden rounded-t-2xl">
                    {listing.images[0] ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-42.5 w-full object-cover"
                      />
                    ) : (
                      <div className="h-42.5 w-full bg-bg-accent" />
                    )}
                  </div>

                  <div className="p-3">
                    <div className="space-y-2">
                      <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px] text-black">
                        {listing.title}
                      </p>
                      <p className="flex items-center font-raleway text-[12px] font-semibold tracking-[1px] text-button-bg">
                        <img src={naira} alt="naira" />{" "}
                        {listing.price.toLocaleString()}
                      </p>

                      <div className="flex flex-col gap-2 font-ssPro text-[12px] text-text-secondary">
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

                    <span className="mt-2 flex h-11.25 w-full cursor-pointer items-center justify-center rounded-lg border border-button-bg bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary hover:bg-bg-accent">
                      View Details
                    </span>
                  </div>
                </Link>
              )
            })}
        </div>

        {!isLoading && listings.length === 0 && (
          <p className="mt-10 text-center text-[14px] text-text-secondary">
            This agent has no active listings.
          </p>
        )}

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setSearchParams({ page: page.toString() })}
          />
        )}
      </div>
    </div>
  )
}
