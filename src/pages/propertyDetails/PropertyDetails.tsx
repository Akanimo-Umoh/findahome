import { useNavigate } from "react-router-dom";
import goBackIcon from "@/assets/images/icon-back.svg";
import heartIcon from "@/assets/images/icon-heart.svg";
import apartmentIcon from "@/assets/images/img-apartment.png";
import rightArrow from "@/assets/images/icon-right-carousel.svg";
import videoIcon from "@/assets/images/icon-video-available.svg";
import nairaIcon from "@/assets/images/icon-naira.svg";
import location from "@/assets/images/location.svg";
import bed from "@/assets/images/bed.svg";
import tubs from "@/assets/images/tubs.svg";
import kitchen from "@/assets/images/icon-kitchen.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import cardholder from "@/assets/images/icon-cardholder.svg";
import starIcon from "@/assets/images/icon-star.svg";
import chatIcon from "@/assets/images/icon-chat.svg";

export default function PropertyDetails() {
  const navigate = useNavigate();

  return (
    <div className="mx-6 font-ssPro">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="">
          <img src={goBackIcon} alt="" />
        </button>

        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary text-center">
          4 Bedroom Apartment
        </p>

        <button type="button">
          <img src={heartIcon} alt="" />
        </button>
      </div>

      {/* property image carousel */}
      <div className="mt-2 relative">
        <img
          src={apartmentIcon}
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
        <div className="rounded-xl flex items-center justify-center gap-1 p-2 bg-[#E2EEFF4D] absolute bottom-[19px] right-[11px]">
          <img src={videoIcon} alt="" />
          <p className="text-[14px] text-text-secondary">Video available</p>
        </div>

        {/* image number */}
        <div className="bg-bg-accent rounded-2xl w-[33px] h-8 flex items-center justify-center absolute bottom-[21px] left-1/2 -translate-x-1/2">
          <p className="text-[12px] text-text-primary">1/4</p>
        </div>
      </div>

      <section className="mt-3">
        <div className="flex items-center">
          <img src={nairaIcon} alt="naira" />
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-[#274AD0]">
            3M/yr
          </p>
        </div>

        <div className="mt-2 space-y-3">
          {/* location */}
          <div className="flex items-center gap-1">
            <img src={location} alt="" className="w-6 h-6" />
            <p className="line-clamp-1 text-[14px] text-text-secondary">
              Lekki Phase 1, Lagos
            </p>
          </div>

          <div className="flex gap-6 text-[12px] text-text-secondary items-center">
            {/* bedroom */}
            <div className="details-Prop">
              <img src={bed} alt="" className="w-6 h-6" />
              <p>4 Beds</p>
            </div>

            {/* bathroom */}
            <div className="details-Prop">
              <img src={tubs} alt="" className="w-6 h-6" />
              <p>2 Baths</p>
            </div>

            {/* kitchen */}
            <div className="details-Prop">
              <img src={kitchen} alt="" className="w-6 h-6" />
              <p>1 Kitchen</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[12px] tracking-[1px] text-text-secondary">
              Inspection fee:{" "}
              <span className="font-semibold text-[#274AD0]">₦5000</span>
            </p>

            <p className="text-[12px] tracking-[1px] text-text-secondary">
              Service charge:{" "}
              <span className="font-semibold text-[#274AD0]">₦100,000/yr</span>
            </p>
          </div>

          <div className="text-[12px] tracking-[1px] text-text-secondary flex flex-col justify-center gap-2">
            <p>5 Minutes to Lekki toll gate</p>
            <p>2 Min to shoprite mall</p>
            <p>10 min to Reddinghton hospital</p>
          </div>
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
              src={agentAvatar}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center gap-0.5">
            <div className="flex gap-1 items-center">
              <p className="text-text-secondary text-[12px] font-semibold">
                MaryAnn Kikomu
              </p>
              <img src={verifiedIcon} alt="verified" className="" />
            </div>

            <div className="flex gap-1 items-center">
              <img src={cardholder} alt="" />
              <p>NIN Verified Agent</p>
            </div>

            <div className="flex gap-1 items-center text-[12px] text-text-secondary">
              <img src={starIcon} alt="" />
              <div className="flex items-center justify-center gap-1">
                <p>4.8 Rating.</p>
                <p>127 Listing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* description */}
      <section className="mt-4 flex flex-col gap-2">
        <p className="text-[14px] font-raleway font-medium text-text-primary">
          Description
        </p>
        <p className="text-[12px] text-text-secondary">
          Beautiful and spacious 2-bedroom apartment in the heart of Lekki Phase
          1. This fully furnished unit features modern amenities, premium
          finishes, and stunning views. Perfect for professionals and families
          looking for luxury living in a prime location with easy access to
          major business districts and entertainment centers.
        </p>
      </section>

      <button className="mt-6 bg-button-bg rounded-lg py-3 px-2 flex items-center justify-center w-full gap-2 text-white text-[14px] tracking-[1px] font-raleway from-red-50 mb-8">
        <img src={chatIcon} alt="" className="h-6 w-6" />
        <p className="text-white">Chat with Agent</p>
      </button>
    </div>
  );
}
