import propertyImg from "@/assets/images/img-apartment.png";
import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import { Link } from "react-router-dom";

export default function Properties() {
  const properties = [
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
  ];
  return (
    <div className="font-ssPro mx-6">
      <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
        Available Properties
      </p>

      {/* main properties ctn */}
      <div className="mt-6 space-y-8">
        {/* properties ctn */}
        {properties.map((property, index) => (
          <div key={index} className="rounded-2xl overflow-hidden">
            <div>
              <img src={property.property_image} alt="" />
            </div>

            <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-raleway font-semibold text-[12px] tracking-[1px] text-black line-clamp-1">
                    {property.title}
                  </p>
                  <p className="flex items-center text-[#274AD0] font-raleway font-semibold text-[12px] tracking-[1px]">
                    <img src={naira} alt="naira" /> <p>800k</p>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <img src={location} alt="" className="w-4 h-4" />
                      <p className="line-clamp-1 text-[12px]">
                        {property.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                      <div className="flex items-center gap-1">
                        <img src={bed} alt="" className="w-4 h-4" />
                        <p>{property.bedroom} Beds</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <img src={tubs} alt="" className="2-4 h-4" />
                        <p>{property.bathroom} Baths</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <div>
                      <img
                        src={property.avatar}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    </div>

                    <p className="text-[12px] text-text-secondary flex items-center justify-center gap-0.5">
                      Listed by
                      <span className="font-semibold text-black">
                        {property.listed_by}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary rounded-lg border border-button-bg bg-button-sec h-[45px] flex items-center justify-center w-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-2">
        <Link to="/properties" className="text-text-secondary text-center">
          See More
        </Link>
      </div>
    </div>
  );
}
