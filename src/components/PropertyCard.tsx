import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import verified from "@/assets/images/icon-verified.svg";
import { Link } from "react-router-dom";

type PropertyCardProps = {
  id: string;
  property_image: string;
  title: string;
  value: string;
  location: string;
  bedroom: string;
  bathroom: string;
  avatar: string;
  listed_by: string;
  is_verified: boolean;
};

export default function PropertyCard({
  id,
  property_image,
  title,
  value,
  location: propertyLocation,
  bedroom,
  bathroom,
  avatar,
  listed_by,
  is_verified,
}: PropertyCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="relative">
        <img src={property_image} alt="" />

        {is_verified && (
          <div className="p-2 rounded-lg bg-[#10B981] absolute top-2.75 left-2.75 flex items-center justify-center gap-1">
            <img src={verified} alt="" />
            <p className="font-raleway text-[14px] tracking-[1px] text-white">
              Verified
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] text-black line-clamp-1">
              {title}
            </p>
            <div className="flex items-center text-[#274AD0] font-raleway font-semibold text-[12px] tracking-[1px]">
              <img src={naira} alt="naira" /> <p>{value}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <img src={location} alt="" className="w-4 h-4" />
                <p className="line-clamp-1 text-[12px]">{propertyLocation}</p>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                <div className="flex items-center gap-1">
                  <img src={bed} alt="" className="w-4 h-4" />
                  <p>{bedroom} Beds</p>
                </div>

                <div className="flex items-center gap-1">
                  <img src={tubs} alt="" className="w-4 h-4" />
                  <p>{bathroom} Baths</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div>
                <img
                  src={avatar}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover"
                />
              </div>

              <p className="text-[12px] text-text-secondary flex items-center justify-center gap-0.5">
                Listed by
                <span className="font-semibold text-black">{listed_by}</span>
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/property/${id}`}
          className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary rounded-lg border border-button-bg bg-button-sec h-[45px] flex items-center justify-center w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
