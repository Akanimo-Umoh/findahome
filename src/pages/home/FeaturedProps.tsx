import property from "@/assets/images/property.jpg";
import landImg from "@/assets/images/img-land.jpg";
import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";

export default function FeaturedProps() {
  const featured = [
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: landImg,
      title: "800 Sqm of Land",
      value: "30M",
      location: "Lekki Phase 1, Lagos",
      landType: "Residential Land",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
  ];

  return (
    <div className="text-text-100">
      <div className="flex flex-col items-center justify-center">
        <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
          Featured Properties
        </p>
        <p className="text-xs font-ssPro text-text-secondary">
          Handpicked for you
        </p>
      </div>

      {/* featured container */}
      <div className="mt-6">
        <div className="flex gap-8 w-full px-6 overflow-x-auto overscroll-x-contain hideScroll">
          {featured.map((feature, index) => (
            <div key={index} className="min-w-[146px]">
              <div className="w-full h-[130px] overflow-hidden rounded-t-2xl">
                <img
                  src={feature.property_image}
                  alt="property"
                  className="w-[146px] h-[130px] object-cover"
                />
              </div>

              <div className="space-y-2 mt-1">
                <div className="font-raleway text-[12px] font-semibold space-y-1 tracking-[1px]">
                  <p className="text-black line-clamp-2 h-9">{feature.title}</p>
                  <p className="flex items-center text-text-primary">
                    <img src={naira} alt="naira" /> {feature.value}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col justify-center text-text-secondary font-ssPro text-[12px] gap-2">
                    <div className="flex items-center gap-1 h-9">
                      <img src={location} alt="" />
                      <p className="line-clamp-2">{feature.location}</p>
                    </div>

                    {feature.landType ? (
                      <div className="flex items-center">
                        <p>{feature.landType}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <img src={bed} alt="" /> <p>{feature.bedroom} Beds</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <img src={tubs} alt="" />{" "}
                          <p>{feature.bathroom} Baths</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-0.5">
                    <div>
                      <img
                        src={feature.avatar}
                        alt="agent"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    </div>

                    <div className="font-ssPro text-[12px]">
                      <p className="text-text-secondary">Listed by</p>
                      <p className="font-semibold text-black">
                        {feature.listed_by}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="font-raleway text-sm font-semibold tracking-[1px] text-text-primary border border-button-bg h-11.25 w-full rounded-lg mt-2 bg-button-disabled cursor-pointer">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
