import { useNavigate, useParams } from "react-router-dom";
import goBackIcon from "@/assets/images/icon-back.svg";
import heartIcon from "@/assets/images/icon-heart.svg";
// import apartmentIcon from "@/assets/images/img-apartment.png";
import rightArrow from "@/assets/images/icon-right-carousel.svg";
import videoIcon from "@/assets/images/icon-video-available.svg";
import nairaIcon from "@/assets/images/icon-naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import kitchen from "@/assets/images/icon-kitchen.svg";
// import agentAvatar from "@/assets/images/agentAvatar.jpg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import cardholder from "@/assets/images/icon-cardholder.svg";
import starIcon from "@/assets/images/icon-star.svg";
import chatIcon from "@/assets/images/icon-chat.svg";
import { useProperty } from "@/hooks/useProperties";
import { useState } from "react";
import ChatAgentModal from "./ChatAgentModal";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { property, loading, error } = useProperty(id || "");

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="mx-6 font-ssPro min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="mx-6 font-ssPro min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">
            {error || "Property not found"}
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="mt-4 text-[#274AD0] underline"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-6 font-ssPro">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={goBackIcon} alt="" />
        </button>

        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary text-center">
          {property.title}
        </p>

        <button type="button" className="cursor-pointer">
          <img src={heartIcon} alt="" />
        </button>
      </div>

      {/* property image carousel */}
      <div className="mt-2 relative">
        <img
          src={property.property_image}
          alt=""
          className="rounded-2xl h-[202px] w-full"
        />

        {/* right carousel button */}
        <button
          type="button"
          className="p-2 bg-bg-accent absolute top-1/2 -translate-y-1/2 right-[11px]"
        >
          <img src={rightArrow} alt="" />
        </button>

        {/* video available */}
        {property.hasVideo && (
          <div className="rounded-xl flex items-center justify-center gap-1 p-2 bg-[#E2EEFF4D] absolute bottom-[19px] right-[11px]">
            <img src={videoIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Video available</p>
          </div>
        )}

        {/* image number */}
        <div className="bg-bg-accent rounded-2xl w-[33px] h-8 flex items-center justify-center absolute bottom-[21px] left-1/2 -translate-x-1/2">
          <p className="text-[12px] text-text-primary">
            1/{property.totalImages || 1}
          </p>
        </div>
      </div>

      <section className="mt-3">
        <div className="flex items-center">
          <img src={nairaIcon} alt="naira" />
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-[#274AD0]">
            {property.value}
          </p>
        </div>

        <div className="mt-2 space-y-3">
          {/* location */}
          <div className="flex items-center gap-1">
            <img src={location} alt="" className="w-6 h-6" />
            <p className="line-clamp-1 text-[14px] text-text-secondary">
              {property.location}
            </p>
          </div>

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

            {/* kitchen */}
            <div className="details-Prop">
              <img src={kitchen} alt="" className="w-6 h-6" />
              <p>{property.kitchen} Kitchen</p>
            </div>
          </div>

          {(property.inspectionFee || property.serviceCharge) && (
            <div className="flex items-center justify-between">
              {property.inspectionFee && (
                <p className="text-[12px] tracking-[1px] text-text-secondary">
                  Inspection fee:{" "}
                  <span className="font-semibold text-[#274AD0]">
                    {property.inspectionFee}
                  </span>
                </p>
              )}

              {property.serviceCharge && (
                <p className="text-[12px] tracking-[1px] text-text-secondary">
                  Service charge:{" "}
                  <span className="font-semibold text-[#274AD0]">
                    {property.serviceCharge}
                  </span>
                </p>
              )}
            </div>
          )}

          {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
            <div className="text-[12px] tracking-[1px] text-text-secondary flex flex-col justify-center gap-2">
              {property.nearbyPlaces.map((place, index) => (
                <p key={index}>{place}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* agent section */}
      <section className="mt-4">
        <p className="text-[14px] font-raleway font-medium text-black">
          Listed By
        </p>

        <div className="bg-bg-accent py-2 px-3 flex items-center gap-2 rounded-xl">
          <div>
            <img
              src={property.avatar}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center gap-0.5">
            <div className="flex gap-1 items-center">
              <p className="text-text-secondary text-[12px] font-semibold">
                {property.listed_by}
              </p>
              {property.is_verified && (
                <img src={verifiedIcon} alt="verified" className="" />
              )}
            </div>

            {property.is_verified && (
              <div className="flex gap-1 items-center">
                <img src={cardholder} alt="" />
                <p>NIN Verified Agent</p>
              </div>
            )}

            {(property.agentRating || property.agentListings) && (
              <div className="flex gap-1 items-center text-[12px] text-text-secondary">
                <img src={starIcon} alt="" />
                <div className="flex items-center justify-center gap-1">
                  {property.agentRating && (
                    <p>{property.agentRating} Rating.</p>
                  )}
                  {property.agentListings && (
                    <p>{property.agentListings} Listing</p>
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
      />
    </div>
  );
}
