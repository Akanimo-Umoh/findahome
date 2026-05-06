import locationIcon from "@/assets/images/icon-location.svg";
import bedIcon from "@/assets/images/bed.svg";
import tubIcon from "@/assets/images/tubs.svg";
import activeIcon from "@/assets/agentImages/icon-active-white.svg";
import visibilityIcon from "@/assets/agentImages/icon-visibility.svg";
import chatIcon from "@/assets/agentImages/icon-chats.svg";
import editIcon from "@/assets/agentImages/icon-edit.svg";
import deleteIcon from "@/assets/agentImages/icon-delete-listing.svg";
import shareIcon from "@/assets/agentImages/icon-share.svg";
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import pendingIcon from "@/assets/agentImages/icon-pending-listing.svg";
import pendingApprovalIcon from "@/assets/agentImages/icon-pending-approval.svg";
import soldIcon from "@/assets/agentImages/icon-sold.svg";
import checkboxIcon from "@/assets/agentImages/icon-filled-checkbox.svg";
import cancelIcon from "@/assets/agentImages/icon-filled-cancel.svg";
import rejectedIcon from "@/assets/agentImages/icon-cancel.svg";
import type { FilterStatus, ListingStatus } from "./MyListings";
import type { AgentListing } from "@/hooks/useAgentListings";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

interface ListingsCardProps {
  activeFilter: FilterStatus;
  activeTab: "apartment" | "land";
  listings: AgentListing[];
  isLoading: boolean;
  error: string | null;
}

const statusConfig: Record<
  ListingStatus,
  { label: string; bg: string; icon: string }
> = {
  active: { label: "Active", bg: "bg-[#10B981]", icon: activeIcon },
  pending: { label: "Pending", bg: "bg-[#F39C12]", icon: pendingIcon },
  sold: { label: "Sold", bg: "bg-button-bg", icon: soldIcon },
  rejected: { label: "Rejected", bg: "bg-[#D02727]", icon: rejectedIcon },
};

function StatusBanner({ status }: { status: ListingStatus }) {
  if (status === "active") return null; // active has no bottom banner
  if (status === "pending")
    return (
      <div className="bg-[#F39C12] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto md:mt-4 md:ml-0">
        <img
          src={pendingApprovalIcon}
          alt=""
          className="w-4 h-4 md:w-6 md:h-6"
        />
        <p className="text-[12px] leading-4 text-white md:text-[14px] md:leading-5.25">
          Your property is pending approval
        </p>
      </div>
    );

  if (status === "sold")
    return (
      <div className="bg-[#E2EEFF] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto md:mt-4 md:ml-0">
        <img src={checkboxIcon} alt="" className="w-4 h-4 md:w-6 md:h-6" />
        <p className="text-[12px] leading-4 text-button-bg md:text-[14px] md:leading-5.25">
          Congratulations! This property has been sold
        </p>
      </div>
    );

  if (status === "rejected")
    return (
      <div className="bg-[#D0272733] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto md:mt-4 md:ml-0">
        <img src={cancelIcon} alt="" className="w-4 h-4 md:w-6 md:h-6" />
        <p className="text-[12px] leading-4 text-[#D02727] md:text-[14px] md:leading-5.25">
          This listing was rejected. Please review and resubmit.
        </p>
      </div>
    );

  return null;
}

const handleShare = async (listing: AgentListing) => {
  const url = `${window.location.origin}/properties/${listing._id}`;

  if (navigator.share) {
    // native share sheet on mobile
    try {
      await navigator.share({
        title: listing.title,
        text: `Check out this property on FindaHome: ${listing.title} - ₦${listing.price.toLocaleString()}`,
        url,
      });
    } catch {
      // user cancelled — do nothing
    }
  } else {
    // fallback for desktop: copy link to clipboard
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  }
};

export default function ListingsCard({
  activeFilter,
  activeTab,
  listings,
  isLoading,
  error,
}: ListingsCardProps) {
  if (isLoading)
    return (
      <div className="-mt-20">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-text-secondary text-[14px] mt-10">
        {error}
      </p>
    );

  const filtered = listings.filter((listing) => {
    const matchesStatus =
      activeFilter === "all" || listing.status === activeFilter;
    const matchesType = listing.propertyType === activeTab;
    return matchesStatus && matchesType;
  });

  if (filtered.length === 0) {
    return (
      <p className="text-center text-text-secondary text-[14px] mt-10">
        No {activeFilter === "all" ? "" : activeFilter} {activeTab} listings
        found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {filtered.map((listing) => {
        const status = listing.status as ListingStatus;
        const { label, bg, icon } = statusConfig[listing.status];
        const isLand = listing.propertyType === "land";

        return (
          <div
            key={listing._id}
            className="rounded-t-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
          >
            <div className="relative">
              {/* status */}
              <div
                className={`rounded-lg p-2 flex items-center gap-1 ${bg} absolute top-[11px] left-[11px]`}
              >
                <img src={icon} alt="" className="w-4 h-4 md:h-6 md:w-6" />
                <p className="text-[12px] md:text-[14px] tracking-[1px] text-white leading-4 md:leading-5.25">
                  {label}
                </p>
              </div>

              {/* property image */}
              {listing.images?.[0] ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-50.5 w-full object-cover rounded-t-2xl md:h-67.5"
                />
              ) : (
                <div className="h-50.5 w-full bg-bg-accent rounded-t-2xl md:h-67.5" />
              )}
            </div>

            <div className="p-3">
              <div className="space-y-2">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-2 h-10 md:h-12">
                    {/* title */}
                    <p className="font-raleway font-semibold tracking-[1px] flex-1 line-clamp-2 md:text-[16px] text-[12px]">
                      {listing.title}
                    </p>

                    {/* price */}
                    <p className="flex items-center">
                      <img src={nairaIcon} alt="" className="w-4 h-4" />
                      <span className="font-raleway font-semibold tracking-[1px] text-button-bg text-[12px] md:text-[16px]">
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
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="text-text-secondary line-clamp-1 text-[12px] leading-4.25 md:text-[14px]">
                      {listing.address}
                    </p>
                  </div>

                  {/* bed/bath for apartment only */}
                  {!isLand && (
                    <div className="text-[12px] text-text-secondary leading-4 flex items-center gap-2 md:text-[14px] md:leading-5.25">
                      {listing.bedroom != null && (
                        <div className="flex items-center gap-1">
                          <img
                            src={bedIcon}
                            alt=""
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          <p>{listing.bedroom} Beds</p>
                        </div>
                      )}
                      {listing.bathroom != null && (
                        <div className="flex items-center gap-1">
                          <img
                            src={tubIcon}
                            alt=""
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          <p>{listing.bathroom} Baths</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* land size for land only */}
                  {isLand && listing.landSize && (
                    <p className="text-[12px] text-text-secondary md:text-[14px]">
                      {listing.landSize} {listing.landUnit}
                    </p>
                  )}
                </div>
              </div>

              <hr className="mt-2 md:mt-4" />

              <div className="flex items-center justify-between mt-1 md:mt-2.5">
                <div className="flex items-center justify-center gap-2">
                  {/* number of views */}
                  <div className="flex items-center gap-0.5">
                    <img
                      src={visibilityIcon}
                      alt=""
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] msd:leading-5.25">
                      0
                    </p>
                  </div>

                  {/* number of chats for that property */}
                  <div className="flex items-center justify-center gap-0.5">
                    <img
                      src={chatIcon}
                      alt=""
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] msd:leading-5.25">
                      0
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  {/* edit icon */}
                  <button className="py-1 px-0.5 cursor-pointer">
                    <img
                      src={editIcon}
                      alt=""
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </button>

                  {/* delete icon */}
                  <button className="py-1 px-0.5 cursor-pointer">
                    <img
                      src={deleteIcon}
                      alt=""
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </button>

                  {/* share button */}
                  <button
                    onClick={() => handleShare(listing)}
                    className="py-1 px-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={listing.status === "rejected"}
                  >
                    <img
                      src={shareIcon}
                      alt=""
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </button>
                </div>
              </div>

              <StatusBanner status={status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
