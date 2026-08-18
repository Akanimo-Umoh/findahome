import { useNavigate, useParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import activeIcon from "@/assets/agentImages/icon-white-filled-icon.svg"
import Spinner from "@/components/Spinner"
import Preview from "./Preview"
import PerformanceOverview from "./PerformanceOverview"
import BudgetSpend from "./BudgetSpend"
import CampaignDetails from "./CampaignDetails"
import ManageAd from "./ManageAd"
import Tips from "./Tips"
import { useAd } from "@/hooks/useAd"
import type { AdStatus } from "@/types/ad"

type BannerConfig = {
  bg: string
  iconBg: string
  title: string
  subtitle: string
}

const BANNER_CONFIG: Record<AdStatus, BannerConfig> = {
  active: {
    bg: "bg-[#10B98133]",
    iconBg: "bg-[#10B981]",
    title: "Your Ad is active",
    subtitle: "Your property is currently being promoted at FindaHome.",
  },
  paused: {
    bg: "bg-[#F8B40080]",
    iconBg: "bg-[#F8B400]",
    title: "You paused this Ad",
    subtitle:
      "Your Ad is being paused, click on the continue button to continue Ad.",
  },
  pending: {
    bg: "bg-[#4F95FF33]",
    iconBg: "bg-[#4F95FF]",
    title: "Ready to Launch",
    subtitle: "Launch your ad to start promoting this listing to buyers.",
  },
  completed: {
    bg: "bg-[#F8B40080]",
    iconBg: "bg-[#F8B400]",
    title: "Your Ad is completed.",
    subtitle: "You have successfully completed this Ad campaign",
  },
}

export default function AdDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { ad, isLoading, error } = useAd(id ?? "")

  if (isLoading) return <Spinner />

  if (error || !ad) {
    return (
      <div className="flex min-h-screen items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            {error ?? "Ad not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const banner = BANNER_CONFIG[ad.status]
  // all statuses use the full layout now, ManageAd branches internally
  const showFullDetails = true

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
      <header className="">
        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={goBack} alt="" />
          </button>
          <p className="font-raleway text-[18px] font-semibold">Ad Details</p>
        </div>
      </header>

      <div
        className={`mt-6 flex items-center gap-1 rounded-lg border border-bg-accent ${banner.bg} px-3 py-2`}
      >
        <div
          className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full ${banner.iconBg}`}
        >
          <img src={activeIcon} alt="" />
        </div>
        <div>
          <p className="text-[14px]">{banner.title}</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            {banner.subtitle}
          </p>
        </div>
      </div>

      <main className="mt-6">
        <div>
          <Preview ad={ad} />
        </div>

        {showFullDetails && (
          <>
            <div className="mt-6">
              <PerformanceOverview ad={ad} />
            </div>

            <div className="mt-4">
              <BudgetSpend ad={ad} />
            </div>

            <div className="mt-4">
              <CampaignDetails ad={ad} />
            </div>

            <div className="mt-4">
              <ManageAd ad={ad} />
            </div>

            <div className="mt-6">
              <Tips />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
