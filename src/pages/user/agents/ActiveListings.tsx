import property from "@/assets/images/property.jpg";
import naira from "@/assets/images/naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";

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
  ];
  return (
    <div>
      <p className="px-6">Active Listings</p>

      <div className="mt-2">
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
                <div className="font-raleway text-[12px] font-semibold space-y-2 tracking-[1px]">
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
