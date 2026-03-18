import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import activeIcon from "@/assets/agentImages/icon-white-filled-icon.svg";
import Preview from "./Preview";
import CampaignSummary from "./CampaignSummary";
import EstimatedPerformance from "./EstimatedPerformance";

export default function PendingDetails() {
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

      <div className="bg-[#D0272780] flex items-center rounded-lg py-2 px-3 gap-1 border border-bg-accent mt-6">
        <div className="bg-[#D02727] rounded-full w-7.5 h-7.5 flex items-center justify-center shrink-0">
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
        <button className="button-style w-full h-[45px] rounded-lg text-white font-raleway font-semibold text-[14px] tracking-[1px]">
          Go to Ads Dashboard
        </button>
      </div>
    </div>
  );
}
