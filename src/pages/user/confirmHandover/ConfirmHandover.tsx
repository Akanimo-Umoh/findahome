import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import copyIcon from "@/assets/images/icon-black-clipboard.svg"
import starIcon from "@/assets/images/icon-inspection-star.svg"
// import HandoverConfirmationOverlay from "./HandoverConfirmationOverlay";
// import PropertyConfirmedOverlay from "./PropertyConfirmedOverlay";

export default function ConfirmHandover() {
  const navigate = useNavigate()

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Handover Confirmation
        </p>
      </div>

      <main>
        <p className="text-center text-[12px] leading-4 text-text-secondary">
          Confirm that this inspection has been completed.
        </p>

        <div className="mt-4.5 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="flex w-full flex-col justify-center gap-2">
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
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

            <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-[12px] leading-4">
              Handover Pending
            </p>
          </div>
        </div>

        <div className="mt-6.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent py-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-bg-accent">
            <img src={infoIcon} alt="" className="h-10 w-10" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              Verify Your Property Handover
            </p>
            <p className="flex max-w-[288px] text-[14px] text-text-secondary">
              Share this unique code with the agent after the handover. Only
              enter it if you have gotten your keys and documents.
            </p>
          </div>
        </div>

        {/* handover code */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-[14px]">Your handover code</p>
            <p className="w-full rounded-lg border border-bg-accent p-2 text-center text-[24px] font-semibold text-button-bg">
              479 017
            </p>
            <p className="text-[12px] leading-4 text-[#D02727]">
              Expires in 4:59
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg border border-bg-accent p-2">
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
                className="h-4 w-4"
              />
              <label
                htmlFor="satisfied"
                className="text-[12px] leading-4 text-text-secondary"
              >
                I am satisfied with the property
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="match" className="h-4 w-4" />
              <label
                htmlFor="match"
                className="text-[12px] leading-4 text-text-secondary"
              >
                I have gotten my keys and documents
              </label>
            </div>
          </div>
        </div>

        {/* rate agent */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p>Rate this Agent</p>

            <div>
              {/* five of this star */}
              <img src={starIcon} alt="" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Kindly leave a review(Optional)</p>

            <div className="rounded-xl border border-text-disabled p-2">
              <textarea
                className="h-full w-full text-[12px] leading-4 outline-none"
                placeholder="Share your thoughts about the property, any concerns or feedback about the visit?"
                rows={4}
              />
            </div>

            <p className="text-[12px] leading-4 text-text-secondary">
              This helps improve our service and assist future buyers
            </p>
          </div>
        </div>

        <div className="mt-8.5 flex flex-col gap-3">
          {/* button is diabled until the user checks all the checkboxes */}
          <button className="h-11.25 w-full rounded-lg bg-[#E2EEFF] font-raleway text-[14px] font-semibold tracking-[1px]">
            Send Code to Agent
          </button>
          {/* if submitted, this should show, once clicked, the{" "}
          <HandoverConfirmationOverlay /> should show */}

          {/* if all the checkboxes are checked, this is the styling for the button */}
          {/* <button className="font-raleway font-semibold text-[14px] text-white tracking-[1px] h-11.25 rounded-lg button-style w-full">
            Send Code to Agent
          </button> */}
          <p className="mb-10 flex items-center justify-center text-[12px] leading-4 text-text-secondary">
            Having issues with agent?&nbsp;
            <span className="text-button-bg">Open a dispute</span>
          </p>
        </div>
        {/* if the agent has confirmed from his end, this should show */}
        {/* <PropertyConfirmedOverlay /> */}
      </main>
    </div>
  )
}
