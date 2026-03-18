import propertyImg from "@/assets/images/property.jpg";
import locationIcon from "@/assets/images/icon-location.svg";
import bedIcon from "@/assets/images/bed.svg";
import tubIcon from "@/assets/images/tubs.svg";
import verifiedIcon from "@/assets/images/icon-verified.svg";
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

interface ListingsCardProps {
  activeFilter: FilterStatus;
}

const listings = [
  {
    id: 1,
    status: "active" as ListingStatus,
    title: "4 Bedroom Apartment",
    price: "800k",
    type: "For Sale",
    location: "Lekki Phase 1, Lagos",
    beds: 4,
    baths: 2,
    views: 123,
    chats: 5,
  },
  {
    id: 2,
    status: "pending" as ListingStatus,
    title: "3 Bedroom Flat",
    price: "500k",
    type: "For Rent",
    location: "Ikeja, Lagos",
    beds: 3,
    baths: 2,
    views: 45,
    chats: 2,
  },
  {
    id: 3,
    status: "sold" as ListingStatus,
    title: "2 Bedroom Bungalow",
    price: "1.2M",
    type: "For Sale",
    location: "Abuja, FCT",
    beds: 2,
    baths: 1,
    views: 210,
    chats: 8,
  },
  {
    id: 4,
    status: "rejected" as ListingStatus,
    title: "Studio Apartment",
    price: "200k",
    type: "For Rent",
    location: "Surulere, Lagos",
    beds: 1,
    baths: 1,
    views: 30,
    chats: 0,
  },
];

const statusConfig = {
  active: {
    label: "Active",
    bg: "bg-[#10B981]",
    icon: verifiedIcon,
    messageBg: null,
  },
  pending: {
    label: "Pending",
    bg: "bg-[#F39C12]",
    icon: pendingIcon,
    messageBg: null,
  },
  sold: { label: "Sold", bg: "bg-button-bg", icon: soldIcon, messageBg: null },
  rejected: {
    label: "Rejected",
    bg: "bg-[#D02727]",
    icon: rejectedIcon,
    messageBg: null,
  },
};

function StatusBanner({ status }: { status: ListingStatus }) {
  if (status === "active") return null; // active has no bottom banner
  if (status === "pending")
    return (
      <div className="bg-[#F39C12] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto">
        <img src={pendingApprovalIcon} alt="" />
        <p className="text-[12px] leading-4 text-white">
          Your property is pending approval
        </p>
      </div>
    );
  if (status === "sold")
    return (
      <div className="bg-[#E2EEFF] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto">
        <img src={checkboxIcon} alt="" />
        <p className="text-[12px] leading-4 text-button-bg">
          Congratulations! This property has been sold
        </p>
      </div>
    );
  if (status === "rejected")
    return (
      <div className="bg-[#D0272733] p-2 rounded-lg flex items-center justify-center gap-1 mt-2 w-fit mx-auto">
        <img src={cancelIcon} alt="" />
        <p className="text-[12px] leading-4 text-[#D02727]">
          This listing was rejected. Please review and resubmit.
        </p>
      </div>
    );
  return null;
}

export default function ListingsCard({ activeFilter }: ListingsCardProps) {
  const filtered =
    activeFilter === "all"
      ? listings
      : listings.filter((l) => l.status === activeFilter);

  if (filtered.length === 0) {
    return (
      <p className="text-center text-text-secondary text-[14px] mt-10">
        No listings found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {filtered.map((listing) => {
        const { label, bg, icon } = statusConfig[listing.status];
        return (
          <div
            key={listing.id}
            className="rounded-t-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
          >
            <div className="relative">
              <div
                className={`rounded-lg p-2 flex items-center gap-1 ${bg} absolute top-[11px] left-[11px]`}
              >
                <img src={icon} alt="" />
                <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
                  {label}
                </p>
              </div>

              <img
                src={propertyImg}
                alt=""
                className="h-50.5 w-full object-cover rounded-t-2xl"
              />
            </div>

            <div className="p-3">
              <div className="space-y-2">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-2 h-10">
                    <p className="font-raleway font-semibold text-[18px] tracking-[1px] flex-1 line-clamp-2 leading-5">
                      {listing.title}
                    </p>
                    <p className="flex items-center">
                      <img src={nairaIcon} alt="" />
                      <span className="font-raleway font-semibold text-[18px] tracking-[1px] text-button-bg">
                        {listing.price}
                      </span>
                    </p>
                  </div>

                  <p className="text-[12px] leading-4 text-[#10B98199]">
                    {listing.type}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <img src={locationIcon} alt="" className="w-6 h-6" />
                    <p className="text-[14px] text-text-secondary line-clamp-1">
                      {listing.location}
                    </p>
                  </div>

                  <div className="text-[12px] text-text-secondary leading-4 flex items-center gap-6">
                    {/* bedrooms */}
                    <div className="flex items-center gap-1">
                      <img src={bedIcon} alt="" className="w-6 h-6" />
                      <p className="">{listing.beds} Beds</p>
                    </div>

                    {/* bathrooms */}
                    <div className="flex items-center gap-1">
                      <img src={tubIcon} alt="" className="w-6 h-6" />
                      <p className="">{listing.baths} Baths</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-2" />

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center justify-center gap-2">
                  {/* number of views */}
                  <div className="flex items-center gap-0.5">
                    <img src={visibilityIcon} alt="" className="" />
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {listing.views}
                    </p>
                  </div>

                  {/* number of chats for that property */}
                  <div className="flex items-center justify-center gap-0.5">
                    <img src={chatIcon} alt="" className="" />
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {listing.chats}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button className="py-1 px-0.5">
                    <img src={editIcon} alt="" />
                  </button>
                  <button className="py-1 px-0.5">
                    <img src={deleteIcon} alt="" />
                  </button>
                  <button
                    className="py-1 px-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={listing.status === "rejected"}
                  >
                    <img src={shareIcon} alt="" />
                  </button>
                </div>
              </div>

              <StatusBanner status={listing.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
