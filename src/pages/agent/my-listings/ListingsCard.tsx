import locationIcon from "@/assets/images/icon-location.svg"
import bedIcon from "@/assets/images/bed.svg"
import tubIcon from "@/assets/images/tubs.svg"
// import activeIcon from "@/assets/agentImages/icon-active-white.svg"
import visibilityIcon from "@/assets/agentImages/icon-visibility.svg"
import chatIcon from "@/assets/agentImages/icon-chats.svg"
import editIcon from "@/assets/agentImages/icon-edit.svg"
import deleteIcon from "@/assets/agentImages/icon-delete-listing.svg"
import shareIcon from "@/assets/agentImages/icon-share.svg"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
// import pendingIcon from "@/assets/agentImages/icon-pending-listing.svg"
import pendingApprovalIcon from "@/assets/agentImages/icon-listing-pending.svg"
import listingApprovedIcon from "@/assets/agentImages/icon-listing-approved.svg"
// import soldIcon from "@/assets/agentImages/icon-sold.svg"
import soldIcon from "@/assets/agentImages/icon-listing-sold.svg"
import rejectedIcon from "@/assets/agentImages/icon-listing-canceled.svg"
// import rejectedIcon from "@/assets/agentImages/icon-cancel.svg"
import type { FilterStatus, ListingStatus } from "./MyListings"
import type { AgentListing } from "@/hooks/useAgentListings"
import Spinner from "@/components/Spinner"
import { useState } from "react"
import ShareModal from "./ShareModal"

interface ListingsCardProps {
  activeFilter: FilterStatus
  activeTab: "apartment" | "land"
  listings: AgentListing[]
  isLoading: boolean
  error: string | null
}

function StatusBanner({ status }: { status: ListingStatus }) {
  if (status === "approved")
    return (
      <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-[#149D1833] p-2 md:mt-4 md:ml-0">
        <img
          src={listingApprovedIcon}
          alt=""
          className="h-4 w-4 md:h-6 md:w-6"
        />

        <p className="text-[12px] leading-4 text-success md:text-[14px] md:leading-5.25">
          Your listing is approved.
        </p>
      </div>
    )

  if (status === "pending")
    return (
      <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-[#F39C1233] p-2 md:mt-4 md:ml-0">
        <img
          src={pendingApprovalIcon}
          alt=""
          className="h-4 w-4 md:h-6 md:w-6"
        />

        <p className="text-[12px] leading-4 text-state-warning md:text-[14px] md:leading-5.25">
          Pending approval
        </p>
      </div>
    )

  if (status === "sold")
    return (
      <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-[#274AD033] p-2 md:mt-4 md:ml-0">
        <img src={soldIcon} alt="" className="h-4 w-4 md:h-6 md:w-6" />

        <p className="text-[12px] leading-4 text-button-bg md:text-[14px] md:leading-5.25">
          Congratulations! This property has been sold
        </p>
      </div>
    )

  if (status === "rejected")
    return (
      <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-[#D0272733] p-2 md:mt-4 md:ml-0">
        <img src={rejectedIcon} alt="" className="h-4 w-4 md:h-6 md:w-6" />

        <p className="text-[12px] leading-4 text-[#D02727] md:text-[14px] md:leading-5.25">
          Please review and resubmit.
        </p>
      </div>
    )

  return null
}

export default function ListingsCard({
  activeFilter,
  activeTab,
  listings,
  isLoading,
  error,
}: ListingsCardProps) {
  const [shareTarget, setShareTarget] = useState<AgentListing | null>(null)

  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  const handleShare = async (listing: AgentListing) => {
    const url = `${window.location.origin}/property/${listing._id}`

    if (navigator.share && isMobileDevice()) {
      // native share sheet on mobile
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out this property on FindaHome: ${listing.title} - ₦${listing.price.toLocaleString()}`,
          url,
        })
      } catch {
        // user cancelled — do nothing
      }
    } else {
      setShareTarget(listing)
    }
  }

  if (isLoading)
    return (
      <div className="-mt-20">
        <Spinner />
      </div>
    )

  if (error)
    return (
      <p className="mt-10 text-center text-[14px] text-text-secondary">
        {error}
      </p>
    )

  const filtered = listings.filter((listing) => {
    const matchesStatus =
      activeFilter === "all" || listing.status === activeFilter
    const matchesType = listing.propertyType === activeTab
    return matchesStatus && matchesType
  })

  if (filtered.length === 0) {
    return (
      <p className="mt-10 text-center text-[14px] text-text-secondary">
        No {activeFilter === "all" ? "" : activeFilter} {activeTab} listings
        found.
      </p>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((listing) => {
          const status = listing.status as ListingStatus
          const isLand = listing.propertyType === "land"

          return (
            <div
              key={listing._id}
              className="mx-auto w-full max-w-112.5 cursor-pointer rounded-2xl border border-bg-accent transition-shadow hover:shadow-lg sm:mx-0 md:max-w-117.5"
            >
              <div className="relative rounded-t-2xl">
                {/* property image */}
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="h-37.5 w-full rounded-t-2xl object-cover md:h-50.5 xl:h-67.5"
                  />
                ) : (
                  <div className="h-37.5 w-full rounded-t-2xl bg-bg-accent md:h-50.5 lg:h-67.5" />
                )}
              </div>

              <div className="p-3">
                <div className="space-y-2">
                  <div className="flex flex-col justify-center">
                    <div className="flex h-10 items-center justify-between gap-2 md:h-12">
                      {/* title */}
                      <p className="line-clamp-2 flex-1 font-raleway text-[12px] font-semibold tracking-[1px] md:text-[16px]">
                        {listing.title}
                      </p>

                      {/* price */}
                      <p className="flex items-center">
                        <img src={nairaIcon} alt="" className="h-4 w-4" />
                        <span className="font-raleway text-[12px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
                          {listing.price.toLocaleString()}
                        </span>
                      </p>
                    </div>

                    {/* listing type */}
                    <p className="text-[12px] leading-4 text-[#10B98199] md:text-[14px] md:leading-5.25">
                      For {listing.listingType}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* location */}
                    <div className="flex items-center gap-1">
                      <img
                        src={locationIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                      <p className="line-clamp-1 text-[12px] leading-4.25 text-text-secondary md:text-[14px]">
                        {listing.address}
                      </p>
                    </div>

                    {/* bed/bath for apartment only */}
                    {!isLand && (
                      <div className="flex items-center gap-2 text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-6">
                        {listing.bedroom != null && (
                          <div className="flex items-center gap-1">
                            <img
                              src={bedIcon}
                              alt=""
                              className="h-4 w-4 md:h-6 md:w-6"
                            />
                            <p>{listing.bedroom} Beds</p>
                          </div>
                        )}
                        {listing.bathroom != null && (
                          <div className="flex items-center gap-1">
                            <img
                              src={tubIcon}
                              alt=""
                              className="h-4 w-4 md:h-6 md:w-6"
                            />
                            <p>{listing.bathroom} Baths</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* land size for land only */}
                    {isLand && listing.landSize && (
                      <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-6">
                        {listing.landSize} {listing.landUnit}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="mt-2 md:mt-4" />

                <div className="mt-1 flex items-center justify-between md:mt-2.5">
                  <div className="flex items-center justify-center gap-2">
                    {/* number of views */}
                    <div className="flex items-center gap-0.5">
                      <img
                        src={visibilityIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                      <p className="msd:leading-5.25 text-[12px] leading-4 text-text-secondary md:text-[14px]">
                        0
                      </p>
                    </div>

                    {/* number of chats for that property */}
                    <div className="flex items-center justify-center gap-0.5">
                      <img
                        src={chatIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                      <p className="msd:leading-5.25 text-[12px] leading-4 text-text-secondary md:text-[14px]">
                        0
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {/* edit icon */}
                    <button className="cursor-pointer px-0.5 py-1">
                      <img
                        src={editIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                    </button>

                    {/* delete icon */}
                    <button className="cursor-pointer px-0.5 py-1">
                      <img
                        src={deleteIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                    </button>

                    {/* share button */}
                    <button
                      onClick={() => handleShare(listing)}
                      className="cursor-pointer px-0.5 py-1 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={
                        listing.status === "rejected" ||
                        listing.status === "pending"
                      }
                    >
                      <img
                        src={shareIcon}
                        alt=""
                        className="h-4 w-4 md:h-6 md:w-6"
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <StatusBanner status={status} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {shareTarget && (
        <ShareModal
          isOpen={!!shareTarget}
          onClose={() => setShareTarget(null)}
          url={`${window.location.origin}/property/${shareTarget._id}`}
          title={shareTarget.title}
        />
      )}
    </>
  )
}
