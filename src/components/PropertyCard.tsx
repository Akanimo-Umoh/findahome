import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import verified from "@/assets/images/icon-verified.svg";
import type { Property } from "@/types/property";
// import agentAvatar from "@/assets/images/agentAvatar.jpg";
import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg";
import Avatar from "./Avatar";
import { useFavorite } from "@/hooks/useFavorite";
import heartIcon from "@/assets/images/icon-heart.svg";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isSaved, isLoading, toggleFavorite } = useFavorite(property._id);
  const isLand = property.propertyType === "land";

  return (
    <div className="rounded-2xl overflow-hidden max-w-105 hover:shadow-lg transition">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-50 object-cover md:h-62.5"
        />

        {property.owner.isVerified && (
          <div className="p-2 rounded-lg bg-[#10B981] absolute top-2.75 left-2.75 flex items-center justify-center gap-1 md:top-0 md:left-0 md:rounded-t-xl md:bg-linear-to-b md:from-[#149D18] md:to-white md:shadow-[4px_4px_4px_#00000080]">
            <img src={verified} alt="" className="md:hidden" />
            <p className="font-raleway text-[14px] tracking-[1px] text-white md:text-[16px] md:text-text-primary">
              Verified
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent md:p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] text-black line-clamp-1 flex-1 md:text-[16px]">
              {property.title}
            </p>
            <div className="flex items-center text-[#274AD0] font-raleway font-semibold text-[12px] tracking-[1px] w-fit md:text-[16px]">
              <img src={naira} alt="naira" />
              <p className="line-clamp-1">{property.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-1 md:flex-1">
                <img src={location} alt="" className="w-4 h-4" />
                <p className="line-clamp-1 text-[12px] text-text-secondary md:text-[14px]">
                  {property.address}
                </p>
              </div>

              {isLand ? (
                <div className="flex items-center h-5 text-[12px] text-text-secondary md:text-[14px]">
                  Land Type: {property.landType}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[12px] text-text-secondary h-5 md:text-[14px]">
                  <div className="flex items-center gap-1">
                    <img src={bed} alt="" className="w-4 h-4" />
                    <p>
                      <span className="md:font-semibold">
                        {property.bedroom}
                      </span>{" "}
                      Beds
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src={tubs} alt="" className="w-4 h-4" />
                    <p>
                      <span className="md:font-semibold">
                        {property.bathroom}
                      </span>{" "}
                      Baths
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="md:flex md:items-end md:justify-between">
              <div className="flex items-center gap-1 md:flex-col md:items-start">
                <div>
                  <Avatar
                    name={property.owner.name ?? "?"}
                    src={
                      Array.isArray(property.owner.profilePicture)
                        ? property.owner.profilePicture[0]
                        : property.owner.profilePicture
                    }
                    size="xs"
                  />
                </div>

                <div className="text-[12px] text-text-secondary flex items-center justify-center gap-0.5 md:flex-col md:items-start md:text-[14px]">
                  <p>
                    <span className="md:hidden">Listed by</span>
                    <span className="hidden md:flex">Agent</span>
                  </p>
                  <span className="font-semibold text-black">
                    {property.owner.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite();
                }}
                className="hidden md:flex cursor-pointer disabled:opacity-50"
              >
                <img
                  src={isSaved ? heartIcon : favoriteIcon}
                  alt={isSaved ? "Remove from favorites" : "Add to favorites"}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary rounded-lg border border-button-bg bg-button-sec h-[45px] flex items-center justify-center w-full md:hidden">
          View Details
        </div>
      </div>
    </div>
  );
}
