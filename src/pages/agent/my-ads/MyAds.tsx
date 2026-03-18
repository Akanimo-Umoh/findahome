import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import addIcon from "@/assets/agentImages/icon-add-property.svg";
import AdsOverview from "./AdsOverview";
import AdsCard from "./AdsCard";

export default function MyAds() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro flex flex-col mb-10">
      <header className="px-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <img src={goBack} alt="" className="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">My Ads</p>

          <button className="bg-button-bg rounded-full w-7.5 h-7.5 flex items-center justify-center shrink-0">
            <img src={addIcon} alt="" />
          </button>
        </div>
      </header>

      <main className="mt-6">
        {/* stats */}
        <div>
          <AdsOverview />
        </div>

        {/* chats ctn */}
        <div className="mt-5 px-6">
          <AdsCard />
        </div>
      </main>
    </div>
  );
}
