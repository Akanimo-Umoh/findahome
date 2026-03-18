import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import successImg from "@/assets/images/img-pay-inspection-fee.png";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";
import infoIcon from "@/assets/agentImages/icon-grey-info.svg";

export default function AdCampaignConfirmed() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro flex flex-col mb-10 mx-6">
      <header className="">
        {/* header */}
        <div className="flex items-center justify-center relative">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">
            Ad Campaign Confirmed
          </p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <img src={successImg} alt="" className="mx-auto" />
        </div>

        <div className="">
          <div className="flex flex-col gap-1 items-center justify-center max-w-85.5 mx-auto">
            <p className="text-[24px] font-raleway font-semibold tracking-[1px] text-center">
              Campaign Submitted for Review
            </p>

            <p className="text-[12px] leading-4 text-text-secondary text-center">
              Your ad for a{" "}
              <span className="font-semibold">3-bedroom apartment Lekki</span>{" "}
              has been sent for review by the Finda-Home team. We will notify
              you once it's approved and live.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Ad Name</p>
              <p className="text-[14px] line-clamp-1">Apartments in Lekki</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Property</p>
              <p className="text-[14px] line-clamp-1">
                3 Bedroom apartment, Lekki
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Campaign goal</p>
              <p className="text-[14px] line-clamp-1">More views</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Duration</p>
              <p className="text-[14px] line-clamp-1">
                Nov 17 - Nov 22(6 days)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Total Budget</p>
              <div className="text-[14px] line-clamp-1 flex items-center">
                <img src={blueNaira} alt="" className="w-4 h-4" />
                <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg">
                  15,000
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-text-secondary text-[14px]">Status</p>
              <p className="text-[12px] leading-4 bg-[#D02727] py-0.5 px-2 rounded-2xl text-bg-tertiary w-fit">
                Pending Approval
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-8">
          <img src={infoIcon} alt="" />

          <div className="flex flex-col gap-1 text-[12px] leading-4 text-text-secondary">
            <p>
              Approval usually takes less than 24 hours, we'll send you an email
              and an in-app notification.
            </p>
            <p>
              You can track your ad progress and performance from the My Ad's
              section
            </p>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button className="button-style w-full h-[45px] rounded-lg text-white font-raleway font-semibold text-[14px] tracking-[1px]">
            Go to Ads Dashboard
          </button>

          <button className="font-raleway font-semibold text-[14px] tracking-[1px] border border-text-secondary bg-button-disabled rounded-lg h-[45px]">
            Preview Ad
          </button>
        </div>
      </main>
    </div>
  );
}
