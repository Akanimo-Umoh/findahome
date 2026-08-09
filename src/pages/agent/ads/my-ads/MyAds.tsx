import { Link, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import AdsOverview from "./AdsOverview"
import AdsCard from "./AdsCard"
import { Plus } from "lucide-react"

export default function MyAds() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
      <header className="">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={goBack} alt="" className="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">My Ads</p>

          <Link
            to="/agent/create-ad"
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-button-bg"
          >
            <Plus className="h-5 w-5 text-white" />
          </Link>
        </div>
      </header>

      <main className="mt-6">
        {/* stats */}
        <div>
          <AdsOverview />
        </div>

        {/* chats ctn */}
        <div className="mt-5">
          <AdsCard />
        </div>
      </main>
    </div>
  )
}
