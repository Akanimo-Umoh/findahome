import property from "@/assets/images/property.jpg";
import landImg from "@/assets/images/img-land.jpg";
import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg";
// import heartIcon from "@/assets/images/icon-heart.svg";

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
        <p className="font-raleway font-semibold text-[18px] tracking-[1px] md:text-[36px]">
          Featured Properties
        </p>
        <p className="text-xs font-ssPro text-text-secondary md:text-sm">
          Handpicked for you
        </p>
      </div>

      {/* featured container */}
      <div className="mt-6 md:mt-12">
        <div className="flex gap-8 w-full px-6 overflow-x-auto overscroll-x-contain hideScroll md:overflow-hidden md:grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:px-8 md:justify-center">
          {featured.map((feature, index) => (
            <div key={index} className="min-w-36.5 md:max-w-85 md:w-full">
              <div className="w-full h-32.5 overflow-hidden rounded-t-2xl md:h-62.5">
                <img
                  src={feature.property_image}
                  alt="property"
                  className="w-36.5 h-32.5 object-cover md:h-full md:w-full"
                />
              </div>

              <div className="space-y-2 mt-1 md:mt-0 md:p-3 md:border md:border-bg-accent md:rounded-b-2xl">
                <div className="font-raleway text-[12px] font-semibold space-y-1 tracking-[1px] md:text-[16px] md:font-medium md:flex md:items-center md:justify-between md:gap-1 md:space-y-0">
                  <p className="text-black line-clamp-2 h-9 md:h-auto md:line-clamp-1 md:flex-1">
                    {feature.title}
                  </p>
                  <p className="flex items-center text-button-bg md:w-fit">
                    <img src={naira} alt="naira" /> {feature.value}
                  </p>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <div className="flex flex-col justify-center text-text-secondary font-ssPro text-[12px] gap-2 md:flex-row md:justify-between md:gap-4 md:text-[14px]">
                    <div className="flex items-center gap-1 h-9 md:h-auto md:flex-1">
                      <img src={location} alt="" />
                      <p className="line-clamp-2 md:line-clamp-1">
                        {feature.location}
                      </p>
                    </div>

                    {feature.landType ? (
                      <div className="flex items-center">
                        <p>{feature.landType}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <img src={bed} alt="" />{" "}
                          <p>
                            <span className="font-semibold text-text-primary">
                              {feature.bedroom}
                            </span>{" "}
                            Beds
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <img src={tubs} alt="" />{" "}
                          <p>
                            <span className="font-semibold text-text-primary">
                              {feature.bathroom}
                            </span>{" "}
                            Baths
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:flex md:items-end md:justify-between">
                    <div className="flex items-center gap-0.5 md:flex-col md:justify-center md:items-start">
                      <img
                        src={feature.avatar}
                        alt="agent"
                        className="w-5 h-5 rounded-full object-cover shrink-0 md:w-12.5 md:h-12.5"
                      />

                      <div className="font-ssPro text-[12px] md:text-[14px]">
                        <p className="text-text-secondary">
                          <span className="md:hidden">Listed by</span>
                          <span className="hidden md:flex">Agent</span>
                        </p>
                        <p className="font-semibold text-black">
                          {feature.listed_by}
                        </p>
                      </div>
                    </div>

                    <img
                      src={favoriteIcon}
                      alt=""
                      className="hidden md:flex cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button className="font-raleway text-sm font-semibold tracking-[1px] text-text-primary border border-button-bg h-11.25 w-full rounded-lg mt-2 bg-button-disabled cursor-pointer md:hidden">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
