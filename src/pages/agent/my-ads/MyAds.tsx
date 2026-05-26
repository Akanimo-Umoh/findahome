import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import addIcon from "@/assets/agentImages/icon-add-property.svg"
import AdsOverview from "./AdsOverview"
import AdsCard from "./AdsCard"

export default function MyAds() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 flex flex-col font-ssPro">
      <header className="px-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <img src={goBack} alt="" className="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">My Ads</p>

          <button className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
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
  )
}
