import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import activeIcon from "@/assets/agentImages/icon-white-filled-icon.svg";
import Preview from "./Preview";
import PerformanceOverview from "./PerformanceOverview";
import BudgetSpend from "./BudgetSpend";
import CampaignDetails from "./CampaignDetails";
import ManageAd from "./ManageAd";
import Tips from "./Tips";

export default function ActiveDetails() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro flex flex-col mb-10 mx-6">
      <header className="">
        {/* header */}
        <div className="flex items-center justify-center relative">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">Ad Details</p>
        </div>
      </header>

      <div className="bg-[#10B98133] flex items-center rounded-lg py-2 px-3 gap-1 border border-bg-accent mt-6">
        <div className="bg-[#10B981] rounded-full w-7.5 h-7.5 flex items-center justify-center shrink-0">
          <img src={activeIcon} alt="" />
        </div>

        <div className="">
          <p className="text-[14px]">Your Ad is active</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Your property is currently being promoted at FindaHome.
          </p>
        </div>
      </div>

      <main className="mt-6">
        <div>
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
  );
}
