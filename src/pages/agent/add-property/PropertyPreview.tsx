import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import goBack from "@/assets/images/icon-back.svg"
import editIcon from "@/assets/agentImages/icon-edit.svg"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import cardholder from "@/assets/images/icon-cardholder.svg"
import Details from "./Details"
import Avatar from "@/components/Avatar"
import api from "@/services/api"
import Spinner from "@/components/Spinner"
import ImageCarousel from "@/components/ImageCarousel"

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
  serviceCharge?: number
  nearbyPlaces?: string[]
  description?: string
  images: string[]
  videos?: string[]
  owner: {
    name: string
    profilePicture?: string | string[] | null
    isVerified?: boolean
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

  const ownerAvatar = Array.isArray(property.owner.profilePicture)
    ? (property.owner.profilePicture[0] ?? null)
    : (property.owner.profilePicture ?? null)

  // video first, then images
  const videoUrl = property.videos?.[0] ?? null

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>
        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Preview Listing
        </p>
        <button className="absolute right-0 font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
          <img src={editIcon} alt="" />
        </button>
      </div>

      <section className="mt-6">
        {/* carousel — video first, then images */}
        <ImageCarousel images={property.images} video={videoUrl} />

        <div className="mt-2">
          <p className="line-clamp-2 font-raleway text-[18px] font-semibold tracking-[1px] text-black">
            {property.title}
          </p>
          <div className="mt-1 flex items-center">
            <img src={nairaIcon} alt="" />
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-button-bg">
              {property.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* agent details */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-bg-accent px-3 py-2">
          <Avatar
            name={property.owner.name}
            src={ownerAvatar}
            size="md"
            className="h-[50px] w-[50px]"
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
            <div className="flex items-center gap-1">
              <img src={cardholder} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                NIN Verified Agent
              </p>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="mt-6">
          <Details property={property} />
        </div>

        <button
          onClick={() => navigate("/agent/dashboard")}
          className="mt-6 h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white hover:bg-button-hover"
        >
          Go to Dashboard
        </button>
      </section>
    </div>
  )
}
