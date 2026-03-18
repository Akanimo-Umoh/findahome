// this is the property preview page, you only come here after listing a property

import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import editIcon from "@/assets/agentImages/icon-edit.svg";
import modelHouse from "@/assets/agentImages/img-model-house.jpg";
import leftIcon from "@/assets/agentImages/icon-leftArrow.svg";
import rightIcon from "@/assets/agentImages/icon-rightArrow.svg";
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import cardholder from "@/assets/images/icon-cardholder.svg";
import Details from "./Details";

export default function PropertyPreview() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Preview Listing
        </p>

        <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          <img src={editIcon} alt="" />
        </button>
      </div>

      {/* image and video */}
      <section className="mt-6">
        <div className="relative">
          {/* images */}
          <div>
            <img src={modelHouse} alt="" className="h-[241px]" />
          </div>

          {/* left and right buttons */}
          <div className="absolute flex items-center top-1/2 -translate-y-1/2 w-full justify-between px-[15px]">
            {/* left button */}
            <button className="bg-bg-accent p-2">
              <img src={leftIcon} alt="" />
            </button>

            {/* right button */}
            <button className="bg-bg-accent p-2">
              <img src={rightIcon} alt="" />
            </button>
          </div>

          {/* listing type */}
          <p className="font-raleway font-semibold tracking-[1px] rounded-lg py-1 px-2 bg-bg-accent shadow-[4px_4px_4px_rgba(0,0,0,0.5)] absolute left-[15px] top-5.5">
            For sale!
          </p>
        </div>

        <div className="mt-2">
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-black line-clamp-2">
            4 Bedroom Apartment in Lekki Phase 1
          </p>

          <div className="flex items-center mt-1">
            <img src={nairaIcon} alt="" />
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-button-bg">
              3M/yr
            </p>
          </div>
        </div>

        {/* agent details */}
        <div className="rounded-lg py-2 px-3 bg-bg-accent flex items-center gap-2 mt-4">
          <div>
            <img
              src={agentAvatar}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
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
              <p className="text-[12px] leading-4 text-text-secondary">
                NIN Verified Agent
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Details />
        </div>

        <button className="text-[14px] font-semibold font-raleway tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg hover:bg-button-hover w-full mt-6">
          Go to Dashboard
        </button>
      </section>
    </div>
  );
}
