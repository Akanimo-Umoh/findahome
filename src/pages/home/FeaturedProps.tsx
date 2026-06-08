import property from "@/assets/images/property.jpg"
import landImg from "@/assets/images/img-land.jpg"
import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg"
import verifiedIcon from "@/assets/images/icon-verified.svg"
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
  ]

  return (
    <div className="text-text-100 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center">
        <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[36px]">
          Featured Properties
        </p>
        <p className="font-ssPro text-xs text-text-secondary md:text-sm">
          Handpicked for you
        </p>
      </div>

      {/* featured container */}
      <div className="mt-6 flex items-center justify-center md:mx-8 md:mt-12">
        <div className="hideScroll flex w-full gap-6 overflow-x-auto overscroll-x-contain px-6 md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:items-center md:justify-between md:overflow-hidden md:px-0 lg:grid-cols-3">
          {featured.map((feature, index) => (
            <div
              key={index}
              className="mx-auto w-36.5 max-w-112.5 shrink-0 md:w-full md:min-w-0"
            >
              <div className="h-32.5 w-full overflow-hidden rounded-t-2xl md:h-62.5">
                <img
                  src={feature.property_image}
                  alt="property"
                  className="h-32.5 w-36.5 object-cover md:h-full md:w-full"
                />
              </div>

              <div className="mt-1 space-y-2 md:mt-0 md:rounded-b-2xl md:border md:border-bg-accent md:p-3">
                <div className="space-y-1 font-raleway text-[12px] font-semibold tracking-[1px] md:flex md:items-center md:justify-between md:gap-1 md:space-y-0 md:text-[16px] md:font-medium">
                  <p className="line-clamp-2 h-9 text-black md:line-clamp-1 md:h-auto md:flex-1">
                    {feature.title}
                  </p>
                  <p className="flex items-center text-button-bg md:w-fit">
                    <img src={naira} alt="naira" /> {feature.value}
                  </p>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <div className="flex flex-col justify-center gap-2 font-ssPro text-[12px] text-text-secondary md:flex-row md:justify-between md:gap-4 md:text-[14px]">
                    <div className="flex h-9 items-center gap-1 md:h-auto md:flex-1">
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
                    <div className="flex items-center gap-0.5 md:flex-col md:items-start md:justify-center">
                      <img
                        src={feature.avatar}
                        alt="agent"
                        className="h-5 w-5 shrink-0 rounded-full object-cover md:h-12.5 md:w-12.5"
                      />

                      <div className="font-ssPro text-[12px] md:text-[14px]">
                        <p className="text-text-secondary">
                          <span className="md:hidden">Listed by</span>
                          <span className="hidden md:flex">Agent</span>
                        </p>
                        <p className="line-clamp-1 font-semibold text-black">
                          {feature.listed_by}
                        </p>
                      </div>
                    </div>

                    <img
                      src={favoriteIcon}
                      alt=""
                      className="hidden cursor-pointer md:flex"
                    />
                  </div>
                </div>
              </div>

              <button className="mt-2 h-11.25 w-full cursor-pointer rounded-lg border border-button-bg bg-button-disabled font-raleway text-sm font-semibold tracking-[1px] text-text-primary md:hidden">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
