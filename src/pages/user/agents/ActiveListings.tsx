import property from "@/assets/images/property.jpg"
import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"

export default function ActiveListings() {
  const featured = [
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
  ]
  return (
    <div>
      <p className="px-6">Active Listings</p>

      <div className="mt-2">
        <div className="hideScroll flex w-full gap-8 overflow-x-auto overscroll-x-contain px-6">
          {featured.map((feature, index) => (
            <div key={index} className="min-w-[146px]">
              <div className="h-[130px] w-full overflow-hidden rounded-t-2xl">
                <img
                  src={feature.property_image}
                  alt="property"
                  className="h-[130px] w-[146px] object-cover"
                />
              </div>

              <div className="mt-1 space-y-2">
                <div className="space-y-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                  <p className="line-clamp-2 h-9 text-black">{feature.title}</p>
                  <p className="flex items-center text-text-primary">
                    <img src={naira} alt="naira" /> {feature.value}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col justify-center gap-2 font-ssPro text-[12px] text-text-secondary">
                    <div className="flex h-9 items-center gap-1">
                      <img src={location} alt="" />
                      <p className="line-clamp-2">{feature.location}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <img src={bed} alt="" /> <p>{feature.bedroom} Beds</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <img src={tubs} alt="" />{" "}
                        <p>{feature.bathroom} Baths</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-2 h-11.25 w-full cursor-pointer rounded-lg border border-button-bg bg-button-disabled font-raleway text-sm font-semibold tracking-[1px] text-text-primary">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
