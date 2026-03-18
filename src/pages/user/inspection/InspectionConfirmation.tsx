import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import propertyImg from "@/assets/images/property.jpg";
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg";
import copyIcon from "@/assets/images/icon-black-clipboard.svg";
import starIcon from "@/assets/images/icon-inspection-star.svg";
import InspectionConfirmedModal from "./InspectionConfirmedModal";

export default function InspectionConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Inspection Confirmation
        </p>
      </div>

      <main>
        <p className="text-[12px] leading-4 text-text-secondary text-center">
          Confirm that this inspection has been completed.
        </p>

        <div className="flex items-center gap-3 p-2 rounded-xl border border-bg-accent mt-4.5">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-center gap-2 w-full">
            <div className="flex flex-col gap-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-2">
                4 Bed-room Apartment, Lekki phase 1
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Agent: Maryann Kikomu{" "}
                <span className="text-button-bg">(Verified)</span>
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Buyer: Victoria Ntekim
              </p>
            </div>

            <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit">
              Inspection Pending
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-3 rounded-lg border border-bg-accent items-center justify-center mt-6.5">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-bg-accent">
            <img src={infoIcon} alt="" className="w-10 h-10" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
              Verify Your Property Inspection
            </p>
            <p className="text-[14px] text-text-secondary flex max-w-[288px]">
              Share this unique code with the agent after your inspection. Only
              enter it if you are satisfied with the inspection carried out
            </p>
          </div>
        </div>

        {/* inspection code */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-[14px]">Your inspection code</p>
            <p className="font-semibold text-[24px] text-button-bg p-2 border border-bg-accent rounded-lg w-full text-center">
              479 017
            </p>
            <p className="text-[12px] leading-4 text-[#D02727]">
              Expires in 4:59
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg p-2 border border-bg-accent">
            <img src={copyIcon} alt="" />
            <p className="text-[14px]">Copy code</p>
          </div>
        </div>

        {/* review before confirming */}
        <div className="mt-6.5 space-y-2">
          <p>Review before confirming</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="satisfied"
                className="w-4 h-4"
              />
              <label
                htmlFor="satisfied"
                className="text-[12px] leading-4 text-text-secondary"
              >
                I am satisfied with the inspection
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="inspected-properly"
                className="w-4 h-4"
              />
              <label
                htmlFor="inspected-properly"
                className="text-[12px] leading-4 text-text-secondary"
              >
                I inspected the property physically
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="match" className="w-4 h-4" />
              <label
                htmlFor="match"
                className="text-[12px] leading-4 text-text-secondary"
              >
                The property matches the listing description
              </label>
            </div>
          </div>
        </div>

        {/* rate agent */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-1">
            <p>Rate this Agent</p>

            <div>
              {/* five of this star */}
              <img src={starIcon} alt="" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Kindly leave a review(Optional)</p>

            <textarea
              className="w-full  rounded-xl border border-text-disabled px-2 text-[12px] leading-4"
              placeholder="Share your thoughts about the property, any concerns or feedback about the visit?"
              rows={4}
            />

            <p className="text-[12px] leading-4 text-text-secondary">
              This helps improve our service and assist future buyers
            </p>
          </div>
        </div>

        <div className="mt-8.5 flex flex-col gap-3">
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] h-11.25 rounded-lg bg-[#E2EEFF] w-full">
            Submit Confirmation
          </button>

          {/* if submitted, this should show, once clicked, the <InspectionConfirmedModal /> should show */}
          {/* <button className="font-raleway font-semibold text-[14px] text-white tracking-[1px] h-11.25 rounded-lg button-style w-full">
            Send Code to Agent
          </button> */}

          <p className="text-[12px] leading-4 text-text-secondary flex items-center justify-center mb-10">
            Having issues with agent?&nbsp;
            <span className="text-button-bg">Open a dispute</span>
          </p>
        </div>

        <InspectionConfirmedModal />
      </main>
    </div>
  );
}
