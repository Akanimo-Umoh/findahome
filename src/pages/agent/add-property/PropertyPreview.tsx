import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import goBack from "@/assets/images/icon-back.svg"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import cardholder from "@/assets/images/icon-cardholder.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
// import Details from "./Details"
import Avatar from "@/components/Avatar"
import api from "@/services/api"
import Spinner from "@/components/Spinner"
import ImageCarousel from "@/components/ImageCarousel"
import { Button } from "@/components/ui/button"

type PropertyData = {
  _id: string
  title: string
  price: number
  address: string
  propertyType: "apartment" | "land"
  listingType: string
  bedroom?: number
  bathroom?: number
  kitchen?: number
  landSize?: string
  landUnit?: string
  landType?: string
  serviceCharge?: number
  inspectionFee?: number
  nearbyPlaces?: string[]
  description?: string
  images: string[]
  videos?: string[]
  owner: {
    name: string
    profilePicture?: string | string[] | null
    isVerified?: boolean
    rating?: number
    totalListings?: number
  }
}

export default function PropertyPreview() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<PropertyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    async function fetchProperty() {
      try {
        const res = await api.get(`/property/${id}`)
        console.log(res.data)
        setProperty(res.data.property)
      } catch {
        setError("Failed to load property.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  if (isLoading) return <Spinner />

  if (error || !property) {
    return (
      <div className="flex h-screen items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            {error ?? "Property not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[14px] text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const isLand = property.propertyType === "land"
  const videoUrl = property.videos?.[0] ?? null
  const ownerAvatar = Array.isArray(property.owner.profilePicture)
    ? (property.owner.profilePicture[0] ?? null)
    : (property.owner.profilePicture ?? null)

  return (
    <div className="pb-12 font-ssPro md:pt-6 lg:pt-8">
      <div className="mx-auto">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <h1 className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary md:text-[22px]">
            Preview Listing
          </h1>

          {/* spacer to keep title centered */}
          <div className="h-6 w-6 md:h-8 md:w-8" />
        </div>

        <div className="mt-6 xl:flex xl:justify-center xl:gap-7">
          {/* left column — carousel + video (lg) */}
          <div className="xl:flex-1">
            <ImageCarousel images={property.images} />

            {videoUrl && (
              <section className="mt-4 hidden xl:block">
                <p className="font-raleway text-[14px] font-medium text-black">
                  Property Video
                </p>
                <video
                  src={videoUrl}
                  controls
                  className="mt-2 h-50.5 w-full rounded-2xl bg-black object-contain md:h-62.5"
                />
              </section>
            )}
          </div>

          {/* right column — details */}
          <section className="mt-3 flex max-w-full flex-col md:mt-6 xl:mt-0 xl:w-[clamp(320px,40%,559px)]">
            {/* title + price */}
            <div>
              <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-black md:text-[22px] md:font-medium">
                {property.title}
              </p>
              <div className="mt-3 flex items-center md:mt-2">
                <img src={nairaIcon} alt="naira" />
                <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-button-bg md:text-[22px] md:font-medium">
                  {property.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-3 md:mt-3">
              {/* address */}
              <div className="flex gap-1">
                <img src={location} alt="" className="h-6 w-6" />
                <p className="text-[14px] text-text-secondary md:text-[16px]">
                  {property.address}
                </p>
              </div>

              {/* bed/bath or land type */}
              {isLand ? (
                <div className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                  Land type: {property.landType}
                </div>
              ) : (
                <div className="flex items-center gap-6 text-[12px] text-text-secondary md:text-[14px]">
                  {property.bedroom != null && (
                    <div className="flex items-center gap-1">
                      <img src={bed} alt="" className="h-6 w-6" />
                      <p>{property.bedroom} Beds</p>
                    </div>
                  )}
                  {property.bathroom != null && (
                    <div className="flex items-center gap-1">
                      <img src={tubs} alt="" className="h-6 w-6" />
                      <p>{property.bathroom} Baths</p>
                    </div>
                  )}
                </div>
              )}

              {/* inspection fee + service charge */}
              {(property.inspectionFee || property.serviceCharge) && (
                <div className="flex items-center justify-start gap-5">
                  {property.inspectionFee && (
                    <p className="text-[12px] tracking-[1px] text-text-secondary md:text-[14px]">
                      Inspection fee:{" "}
                      <span className="font-semibold text-button-bg">
                        ₦{property.inspectionFee.toLocaleString()}
                      </span>
                    </p>
                  )}
                  {property.serviceCharge && (
                    <p className="text-[12px] tracking-[1px] text-text-secondary md:text-[14px]">
                      Service charge:{" "}
                      <span className="font-semibold text-button-bg">
                        ₦{property.serviceCharge.toLocaleString()}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* nearby landmarks */}
              {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
                <div>
                  <p className="font-raleway text-[14px] font-medium text-black">
                    Nearby Landmarks:
                  </p>
                  <div className="flex flex-col justify-center gap-2 text-[12px] tracking-[1px] text-text-secondary md:text-[14px]">
                    {property.nearbyPlaces
                      .flatMap((place) => place.split(",").map((p) => p.trim()))
                      .filter(Boolean)
                      .map((place, index) => (
                        <span key={index}>{place}</span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* agent card */}
            <section className="mt-4 space-y-2">
              <p className="font-raleway text-[14px] font-medium text-black">
                Listed By
              </p>
              <div className="flex items-center gap-2 rounded-xl bg-bg-accent px-3 py-2">
                <Avatar
                  name={property.owner.name ?? "?"}
                  src={ownerAvatar}
                  className="h-12.5 w-12.5 rounded-full border border-gray-300 object-cover"
                />
                <div className="flex flex-col justify-center gap-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-[12px] font-semibold text-text-secondary">
                      {property.owner.name}
                    </p>
                    {property.owner.isVerified && (
                      <img src={verifiedIcon} alt="verified" />
                    )}
                  </div>
                  {property.owner.isVerified && (
                    <div className="flex items-center gap-1">
                      <img src={cardholder} alt="" />
                      <p className="text-[12px] leading-4 text-text-secondary">
                        NIN Verified Agent
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* video — mobile/tablet only */}
            {videoUrl && (
              <section className="mt-4 xl:hidden">
                <p className="font-raleway text-[14px] font-medium text-black">
                  Property Video
                </p>
                <video
                  src={videoUrl}
                  controls
                  className="mt-2 h-50.5 w-full rounded-2xl bg-black object-contain md:h-62.5"
                />
              </section>
            )}

            {/* description */}
            {property.description && (
              <section className="mt-4 flex flex-col gap-2">
                <p className="font-raleway text-[14px] font-medium text-black">
                  Description
                </p>
                <p className="text-[12px] text-text-secondary md:text-[14px]">
                  {property.description}
                </p>
              </section>
            )}

            {/* details component
            <div className="mt-6">
              <Details property={property} />
            </div> */}

            <Button
              variant="app-primary"
              size="full"
              onClick={() => navigate("/agent/dashboard")}
              className="mt-6 mb-8"
            >
              Go to Dashboard
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
