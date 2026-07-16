import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import activeIcon from "@/assets/agentImages/icon-white-filled-icon.svg"
import Preview from "./Preview"
import PerformanceOverview from "./PerformanceOverview"
import BudgetSpend from "./BudgetSpend"
import CampaignDetails from "./CampaignDetails"
import ManageAd from "./ManageAd"
import Tips from "./Tips"

export default function CompletedDetails() {
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

      <div className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-[#F8B40080] px-3 py-2">
        <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#F8B400]">
          <img src={activeIcon} alt="" />
        </div>

        <div className="">
          <p className="text-[14px]">Your Ad is completed.</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            You have successfully completed this Ad campaign
          </p>
        </div>
      </div>

      <main className="mt-6">
        <p>Live Ad Preview</p>

        <div className="mt-4">
          <Preview />
        </div>

        {/* Performance Overview */}
        <div className="mt-6">
          <PerformanceOverview />
        </div>

        {/* Budget & Spend */}
        <div className="mt-4">
          <BudgetSpend />
        </div>

        {/* Campaign Details */}
        <div className="mt-4">
          <CampaignDetails />
        </div>

        {/* manage ad */}
        <div className="mt-4">
          <ManageAd />
        </div>

        <div className="mt-6">
          <Tips />
        </div>
      </main>
    </div>
  )
}
