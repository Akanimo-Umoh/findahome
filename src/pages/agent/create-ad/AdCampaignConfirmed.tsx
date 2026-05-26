import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import infoIcon from "@/assets/agentImages/icon-grey-info.svg"

export default function AdCampaignConfirmed() {
  const navigate = useNavigate()

  return (
    <div className="mx-6 mb-10 flex flex-col font-ssPro">
      <header className="">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">
            Ad Campaign Confirmed
          </p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <img src={successImg} alt="" className="mx-auto" />
        </div>

        <div className="">
          <div className="mx-auto flex max-w-85.5 flex-col items-center justify-center gap-1">
            <p className="text-center font-raleway text-[24px] font-semibold tracking-[1px]">
              Campaign Submitted for Review
            </p>

            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Your ad for a{" "}
              <span className="font-semibold">3-bedroom apartment Lekki</span>{" "}
              has been sent for review by the Finda-Home team. We will notify
              you once it's approved and live.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Ad Name</p>
              <p className="line-clamp-1 text-[14px]">Apartments in Lekki</p>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Property</p>
              <p className="line-clamp-1 text-[14px]">
                3 Bedroom apartment, Lekki
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Campaign goal</p>
              <p className="line-clamp-1 text-[14px]">More views</p>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Duration</p>
              <p className="line-clamp-1 text-[14px]">
                Nov 17 - Nov 22(6 days)
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Total Budget</p>
              <div className="line-clamp-1 flex items-center text-[14px]">
                <img src={blueNaira} alt="" className="h-4 w-4" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                  15,000
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[14px] text-text-secondary">Status</p>
              <p className="w-fit rounded-2xl bg-[#D02727] px-2 py-0.5 text-[12px] leading-4 text-bg-tertiary">
                Pending Approval
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-2">
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
          <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            Go to Ads Dashboard
          </button>

          <button className="h-[45px] rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
            Preview Ad
          </button>
        </div>
      </main>
    </div>
  )
}
