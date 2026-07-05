import property from "@/assets/images/property.jpg"
import naira from "@/assets/images/naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import { Link } from "react-router-dom"
import houseIcon from "@/assets/images/icon-building.svg"

type ApartmentListing = {
  isLand: false
  property_image: string
  title: string
  value: string
  location: string
  bedroom: string
  bathroom: string
}

type LandListing = {
  isLand: true
  property_image: string
  title: string
  value: string
  location: string
  landType: string
}

interface ActiveListingsProps {
  agentId: string
}

type Listing = ApartmentListing | LandListing

export default function ActiveListings({ agentId }: ActiveListingsProps) {
  const featured: Listing[] = [
    {
      isLand: false,
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      isLand: true,
      property_image: property,
      title: "800 Sqm",
      value: "900m",
      location: "Lekki Phase 1, Lagos",
      landType: "Residential Land",
    },
    {
      isLand: false,
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      isLand: false,
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      isLand: false,
      property_image: property,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "2",
      bathroom: "2",
    },
    {
      isLand: false,
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
      <div className="mx-6 flex items-center justify-between md:mx-0">
        <p className="md:text-[18px] md:font-semibold">Active Listings</p>

        <Link
          to={`/agents/${agentId}/listings`}
          className="text-[12px] text-button-bg underline md:text-[14px]"
        >
          See All
        </Link>
      </div>

      <div className="mt-2 md:mt-6">
        <div className="hideScroll flex w-full gap-8 overflow-x-auto overscroll-x-contain px-6 md:grid md:grid-cols-2 md:overflow-hidden md:px-0 lg:grid-cols-3">
          {featured.map((listing, index) => (
            <div
              key={index}
              className="min-w-36.5 overflow-hidden hover:shadow-xl md:w-full md:max-w-112.5"
            >
              <div className="h-32.5 w-full overflow-hidden rounded-t-2xl md:h-42.5">
                <img
                  src={listing.property_image}
                  alt="property"
                  className="h-32.5 w-36.5 object-cover md:h-42.5 md:w-full"
                />
              </div>

              <div className="md:rounded-b-2xl md:border md:border-t-0 md:border-bg-accent md:p-3">
                <div className="mt-1 space-y-2">
                  <div className="space-y-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                    <p className="line-clamp-2 h-9 font-raleway text-[12px] font-semibold tracking-[1px] text-black md:line-clamp-1 md:h-auto">
                      {listing.title}
                    </p>

                    <p className="flex items-center font-raleway text-[12px] font-semibold tracking-[1px] text-button-bg">
                      <img src={naira} alt="naira" /> {listing.value}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-col justify-center gap-2 font-ssPro text-[12px] text-text-secondary">
                      <div className="flex items-center gap-1">
                        <img src={location} alt="" />
                        <p className="line-clamp-1">{listing.location}</p>
                      </div>

                      {listing.isLand ? (
                        <div className="flex items-center gap-1">
                          <img src={houseIcon} alt="" />
                          <p>{listing.landType}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <img src={bed} alt="" />{" "}
                            <p>{listing.bedroom} Beds</p>
                          </div>

                          <div className="flex items-center gap-1">
                            <img src={tubs} alt="" />{" "}
                            <p>{listing.bathroom} Baths</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="mt-2 h-11.25 w-full cursor-pointer rounded-lg border border-button-bg bg-button-disabled font-raleway text-sm text-[14px] font-semibold tracking-[1px] text-text-primary hover:bg-bg-accent">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
