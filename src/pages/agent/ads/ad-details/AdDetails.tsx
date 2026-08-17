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
import CampaignSummary from "./CampaignSummary"
import EstimatedPerformance from "./EstimatedPerformance"
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
    bg: "bg-[#D0272780]",
    iconBg: "bg-[#D02727]",
    title: "Your Ad is pending",
    subtitle: "Your property is currently being reviewed by the Ad team.",
  },
  completed: {
    bg: "bg-[#F8B40080]",
    iconBg: "bg-[#F8B400]",
    title: "Your Ad is completed.",
    subtitle: "You have successfully completed this Ad campaign",
  },
  // TODO: confirm exact copy/color with design — placeholder for now
  rejected: {
    bg: "bg-[#D0272780]",
    iconBg: "bg-[#D02727]",
    title: "Your Ad was rejected",
    subtitle:
      "This campaign didn't meet our review requirements. Contact support for details.",
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
  const showFullDetails = ad.status !== "pending" && ad.status !== "rejected"
  const showPendingLayout = ad.status === "pending"

  return (
    <div className="mx-6 mb-10 flex flex-col font-ssPro">
      <header className="">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
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
        <p>Live Ad Preview</p>

        <div className="mt-4">
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

        {showPendingLayout && (
          <>
            <div className="mt-6">
              <p>Campaign Summary</p>
              <div className="mt-4">
                <CampaignSummary ad={ad} />
              </div>
            </div>

            <div className="mt-4">
              <EstimatedPerformance ad={ad} />
            </div>
          </>
        )}
      </main>

      {showPendingLayout && (
        <div className="mt-8">
          <button
            onClick={() => navigate("/agent/my-ads", { replace: true })}
            className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
          >
            Go to Ads Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
