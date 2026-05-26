import { useNavigate, useParams } from "react-router-dom"
import goBackIcon from "@/assets/images/icon-back.svg"
import heartIcon from "@/assets/images/icon-heart.svg"
import addFavoriteIcon from "@/assets/images/icon-add-to-favorite.svg"
import nairaIcon from "@/assets/images/icon-naira.svg"
import location from "@/assets/images/location.svg"
import bed from "@/assets/images/bed.svg"
import tubs from "@/assets/images/tubs.svg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import cardholder from "@/assets/images/icon-cardholder.svg"
import starIcon from "@/assets/images/icon-star.svg"
import chatIcon from "@/assets/images/icon-chat.svg"
import { useProperty } from "@/hooks/useProperties"
import { useState } from "react"
import ChatAgentModal from "./ChatAgentModal"
import Spinner from "@/components/Spinner"
import { useFavorite } from "@/hooks/useFavorite"
import Avatar from "@/components/Avatar"
import ImageCarousel from "@/components/ImageCarousel"

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { property, loading, error } = useProperty(id || "")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isSaved, isLoading, toggleFavorite } = useFavorite(id || "")

  if (loading) {
    return <Spinner />
  }

  if (error || !property) {
    return (
      <div className="mx-6 flex min-h-screen items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            {error || "Property not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const isLand = property.propertyType === "land"

  return (
    <div className="mx-6 font-ssPro md:mx-8">
      <div className="flex items-center justify-between md:mt-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={goBackIcon} alt="" />
        </button>

        <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary md:text-[22px]">
          Property Details
        </p>

        <button
          type="button"
          onClick={toggleFavorite}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <img
            src={isSaved ? heartIcon : addFavoriteIcon}
            alt="save property"
          />
        </button>
      </div>

      {/* property image carousel */}
      <div className="mt-6">
        <ImageCarousel
          images={property.images}
          video={property.videos?.[0] ?? undefined}
        />
      </div>

      {/* details */}
      <section className="mt-3 md:mt-6">
        <div className="md:flex md:items-start md:justify-between md:gap-6">
          {/* name */}
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-black md:flex-1">
            {property.title}
          </p>

          {/* price */}
          <div className="mt-3 flex items-center md:mt-0">
            <img src={nairaIcon} alt="naira" />
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-[#274AD0]">
              {property.price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-3 md:mt-6">
          {/* address */}
          <div className="flex items-center gap-1">
            <img src={location} alt="" className="h-6 w-6" />
            <p className="line-clamp-1 text-[14px] text-text-secondary md:text-[16px]">
              {property.address}
            </p>
          </div>

          {/* bed and bath for apartment only */}
          {isLand ? (
            <div className="text-[12px] leading-4 text-text-secondary">
              Land type: {property.landType}
            </div>
          ) : (
            <div className="flex items-center gap-6 text-[12px] text-text-secondary">
              {/* bedroom */}
              <div className="details-Prop">
                <img src={bed} alt="" className="h-6 w-6" />
                <p>{property.bedroom} Beds</p>
              </div>

              {/* bathroom */}
              <div className="details-Prop">
                <img src={tubs} alt="" className="h-6 w-6" />
                <p>{property.bathroom} Baths</p>
              </div>
            </div>
          )}

          {/* inspection fee and service charge */}
          {(property.inspectionFee || property.serviceCharge) && (
            <div className="flex items-center justify-start gap-5">
              {property.inspectionFee && (
                <p className="text-[12px] tracking-[1px] text-text-secondary">
                  Inspection fee:{" "}
                  <span className="font-semibold text-[#274AD0]">
                    ₦{property.inspectionFee.toLocaleString()}
                  </span>
                </p>
              )}

              {property.serviceCharge && (
                <p className="text-[12px] tracking-[1px] text-text-secondary">
                  Service charge:{" "}
                  <span className="font-semibold text-[#274AD0]">
                    ₦{property.serviceCharge.toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* nearby places */}
          {property.nearbyPlaces.length > 0 && (
            <div className="">
              <p className="text-[12px] font-semibold text-text-primary">
                Nearby Landmarks:
              </p>
              <div className="flex flex-col justify-center gap-2 text-[12px] tracking-[1px] text-text-secondary">
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
      </section>

      {/* agent section */}
      <section className="mt-4 space-y-2">
        <p className="font-raleway text-[14px] font-medium text-black">
          Listed By
        </p>

        <div className="flex items-center gap-2 rounded-xl bg-bg-accent px-3 py-2">
          <div>
            <Avatar
              name={property.owner.name ?? "?"}
              src={
                Array.isArray(property.owner.profilePicture)
                  ? property.owner.profilePicture[0]
                  : property.owner.profilePicture
              }
              className="h-12.5 w-12.5 rounded-full object-cover"
            />
          </div>

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

            {(property.owner.rating > 0 ||
              property.owner.totalListings > 0) && (
              <div className="flex items-center gap-1 text-[12px] text-text-secondary">
                <img src={starIcon} alt="" />
                <div className="flex items-center justify-center gap-1">
                  {property.owner.rating > 0 && (
                    <p>{property.owner.rating} Rating.</p>
                  )}
                  {property.owner.totalListings > 0 && (
                    <p>{property.owner.totalListings} Listings</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* description */}
      {property.description && (
        <section className="mt-4 flex flex-col gap-2">
          <p className="font-raleway text-[14px] font-medium text-text-primary">
            Description
          </p>
          <p className="text-[12px] text-text-secondary">
            {property.description}
          </p>
        </section>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="button-style mt-6 mb-8 flex w-full items-center justify-center gap-2 rounded-lg from-red-50 px-2 py-3 font-raleway text-[14px] tracking-[1px] text-white"
      >
        <img src={chatIcon} alt="" className="h-6 w-6" />
        <p className="text-white">Chat with Agent</p>
      </button>

      {/* chat overlay */}
      <ChatAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={property._id}
        agentId={property.owner._id}
        agentIsVerified={property.owner.isVerified}
      />
    </div>
  )
}
