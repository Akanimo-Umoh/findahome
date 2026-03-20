import { useNavigate, useParams } from "react-router-dom";
import goBackIcon from "@/assets/images/icon-back.svg";
import heartIcon from "@/assets/images/icon-heart.svg";
import nairaIcon from "@/assets/images/icon-naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import cardholder from "@/assets/images/icon-cardholder.svg";
import starIcon from "@/assets/images/icon-star.svg";
import chatIcon from "@/assets/images/icon-chat.svg";
import { useProperty } from "@/hooks/useProperties";
import { useState } from "react";
import ChatAgentModal from "./ChatAgentModal";
import ImageCarousel from "./ImageCarousel";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import Spinner from "@/components/Spinner";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { property, loading, error } = useProperty(id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  if (error || !property) {
    return (
      <div className="mx-6 font-ssPro min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">
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
    );
  }

  const isLand = property.propertyType === "land";

  return (
    <div className="mx-6 font-ssPro">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={goBackIcon} alt="" />
        </button>

        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary text-center">
          Property Details
        </p>

        <button type="button" className="cursor-pointer">
          <img src={heartIcon} alt="" />
        </button>
      </div>

      {/* property image carousel */}
      <div className="mt-6">
        <ImageCarousel
          images={property.images}
          video={property.video ?? undefined}
        />
      </div>

      {/* price and details */}
      <section className="mt-3">
        <div className="flex items-center">
          <img src={nairaIcon} alt="naira" />
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-[#274AD0]">
            {property.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-2 space-y-3">
          {/* address */}
          <div className="flex items-center gap-1">
            <img src={location} alt="" className="w-6 h-6" />
            <p className="line-clamp-1 text-[14px] text-text-secondary">
              {property.address}
            </p>
          </div>

          {/* bed and bath for apartment only */}
          {!isLand && (
            <div className="flex gap-6 text-[12px] text-text-secondary items-center">
              {/* bedroom */}
              <div className="details-Prop">
                <img src={bed} alt="" className="w-6 h-6" />
                <p>{property.bedroom} Beds</p>
              </div>

              {/* bathroom */}
              <div className="details-Prop">
                <img src={tubs} alt="" className="w-6 h-6" />
                <p>{property.bathroom} Baths</p>
              </div>
            </div>
          )}

          {/* land type - only for land */}
          {isLand && property.landType && (
            <div className="text-[12px] leading-4 text-text-secondary">
              Land type:{" "}
              <span className="font-semibold">{property.landType}</span>
            </div>
          )}

          {/* inspection fee and service charge */}
          {(property.inspectionFee || property.serviceCharge) && (
            <div className="flex items-center justify-between">
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
              <div className="text-[12px] tracking-[1px] text-text-secondary flex flex-col justify-center gap-2">
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
        <p className="text-[14px] font-raleway font-medium text-black">
          Listed By
        </p>

        <div className="bg-bg-accent py-2 px-3 flex items-center gap-2 rounded-xl">
          <div>
            <img
              src={
                Array.isArray(property.owner.profilePicture)
                  ? (property.owner.profilePicture[0] ?? agentAvatar)
                  : (property.owner.profilePicture ?? agentAvatar)
              }
              alt={property.owner.name}
              className="w-12.5 h-12.5 object-cover rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center gap-0.5">
            <div className="flex gap-1 items-center">
              <p className="text-text-secondary text-[12px] font-semibold">
                {property.owner.name}
              </p>
              {property.owner.isVerified && (
                <img src={verifiedIcon} alt="verified" />
              )}
            </div>

            {property.owner.isVerified && (
              <div className="flex gap-1 items-center">
                <img src={cardholder} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  NIN Verified Agent
                </p>
              </div>
            )}

            {(property.owner.rating > 0 ||
              property.owner.totalListings > 0) && (
              <div className="flex gap-1 items-center text-[12px] text-text-secondary">
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
          <p className="text-[14px] font-raleway font-medium text-text-primary">
            Description
          </p>
          <p className="text-[12px] text-text-secondary">
            {property.description}
          </p>
        </section>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 rounded-lg py-3 px-2 flex items-center justify-center w-full gap-2 text-white text-[14px] tracking-[1px] font-raleway from-red-50 mb-8 button-style"
      >
        <img src={chatIcon} alt="" className="h-6 w-6" />
        <p className="text-white">Chat with Agent</p>
      </button>

      {/* chat overlay */}
      <ChatAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={property._id}
        propertyTitle={property.title}
        propertyImage={property.images?.[0]}
        propertyPrice={property.price}
        propertyAddress={property.address}
        agentId={property.owner._id}
        agentName={property.owner.name}
        agentAvatar={
          Array.isArray(property.owner.profilePicture)
            ? (property.owner.profilePicture[0] ?? null)
            : property.owner.profilePicture
        }
        agentIsVerified={property.owner.isVerified}
      />
    </div>
  );
}
