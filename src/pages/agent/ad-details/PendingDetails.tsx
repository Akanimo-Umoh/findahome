import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import activeIcon from "@/assets/agentImages/icon-white-filled-icon.svg"
import Preview from "./Preview"
import CampaignSummary from "./CampaignSummary"
import EstimatedPerformance from "./EstimatedPerformance"

export default function PendingDetails() {
  const navigate = useNavigate()

  return (
    <div className="mx-6 mb-10 flex flex-col font-ssPro">
      <header className="">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">Ad Details</p>
        </div>
      </header>

      <div className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-[#D0272780] px-3 py-2">
        <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#D02727]">
          <img src={activeIcon} alt="" />
        </div>

        <div className="">
          <p className="text-[14px]">Your Ad is pending</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Your property is currently being reviewed by the Ad team.
          </p>
        </div>
      </div>

      <main className="mt-6">
        <p>Live Ad Preview</p>

        <div className="mt-4">
          <Preview />
        </div>

        {/* campaign summary */}
        <div className="mt-6">
          <p>Campaign Summary</p>

          <div className="mt-4">
            <CampaignSummary />
          </div>
        </div>

        <div className="mt-4">
          <EstimatedPerformance />
        </div>
      </main>

      {/* buttons */}
      <div className="mt-8">
        <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
          Go to Ads Dashboard
        </button>
      </div>
    </div>
  )
}
