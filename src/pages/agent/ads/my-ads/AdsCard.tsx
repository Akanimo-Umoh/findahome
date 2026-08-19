import { useState } from "react"
import visibilityIcon from "@/assets/agentImages/icon-eye.svg"
import trendIcon from "@/assets/agentImages/icon-trend-up.svg"
import rightArrow from "@/assets/agentImages/icon-blue-right-arrow.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"
import clicksIcon from "@/assets/agentImages/icon-clicks.svg"
import { Link } from "react-router-dom"
import type { Ad, AdStatus } from "@/types/ad"
import { useAgentAds } from "@/hooks/useAgentAds"
import Spinner from "@/components/Spinner"

type FilterStatus = "all" | AdStatus

const statusConfig: Record<
  AdStatus,
  { label: string; bg: string; text: string }
> = {
  active: { label: "Active", bg: "bg-success", text: "text-bg-tertiary" },
  pending: { label: "Pending", bg: "bg-[#4F95FF]", text: "text-bg-tertiary" },
  paused: { label: "Paused", bg: "bg-[#F8B400]", text: "text-text-primary" },
  completed: {
    label: "Completed",
    bg: "bg-button-sec",
    text: "text-text-primary",
  },
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
]

function formatRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHrs < 1) return "Just now"
  if (diffHrs < 24) return `${diffHrs}hr${diffHrs > 1 ? "s" : ""} ago`
  const diffDays = Math.floor(diffHrs / 24)
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
}

function AdCard({ ad }: { ad: Ad }) {
  const { label, bg, text } = statusConfig[ad.status]
  const showStats = ad.status !== "pending"
  const spent = ad.spent ?? 0
  const views = ad.views ?? 0
  const clicks = ad.clicks ?? 0
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0"

  return (
    <Link
      to={`/agent/ad-details/${ad._id}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-bg-accent p-2"
    >
      <img
        src={ad.property.images?.[0]}
        alt={ad.property.title}
        className="h-15 w-15 rounded-lg object-cover"
      />

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-start justify-between">
          <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
            {ad.property.title}
          </p>
          <p
            className={`text-[12px] leading-4 ${bg} ${text} shrink-0 rounded-2xl px-3 py-1 text-center`}
          >
            {label}
          </p>
        </div>

        <div className="space-y-1">
          {showStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <img src={visibilityIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {views.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={clicksIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {clicks.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={trendIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {ctr}%
                </p>
              </div>
            </div>
          )}

          <p className="text-[12px] leading-4 text-text-secondary">
            Created: {formatRelativeTime(ad.createdAt)}
          </p>

          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                {spent.toLocaleString()}
              </p>
            </div>
            <p className="text-[12px] leading-4 text-text-secondary">/</p>
            <div className="flex items-center justify-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                {ad.adBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-[12px] leading-4 text-button-bg">View Details</p>
            <img src={rightArrow} alt="" />
          </div>

          {ad.status === "paused" && (
            <p className="text-[12px] leading-4 text-[#D02727]">
              {ad.pauseReason === "budget"
                ? "Budget limit reached. Add funds to resume"
                : "You paused this ad."}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function AdsCard() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")
  const { ads, isLoading, error } = useAgentAds()

  const filtered =
    activeFilter === "all"
      ? ads
      : ads.filter((ad) => ad.status === activeFilter)

  if (isLoading) {
    return (
      <div className="mt-10">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-[14px] text-text-secondary">
        {error}
      </p>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-[14px] font-semibold">No ads yet</p>
        <p className="max-w-70 text-[12px] leading-4 text-text-secondary">
          Create your first ad campaign to boost visibility for your listings.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* tabs */}
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`shrink-0 cursor-pointer px-2 py-1 transition-colors duration-300 ${
              activeFilter === value
                ? "border-b border-button-bg"
                : "hover:border-b hover:border-bg-accent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="mt-5 space-y-6">
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-[14px] text-text-secondary">
            No {activeFilter} ads found.
          </p>
        ) : (
          filtered.map((ad) => <AdCard key={ad._id} ad={ad} />)
        )}
      </div>
    </div>
  )
}
