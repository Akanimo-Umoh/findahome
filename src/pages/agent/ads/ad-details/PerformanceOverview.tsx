import viewsIcon from "@/assets/agentImages/icon-visibility.svg"
import type { Ad } from "@/types/ad"

type PerformanceOverviewProps = {
  ad: Ad
}

export default function PerformanceOverview({ ad }: PerformanceOverviewProps) {
  if (ad.status === "pending") {
    return (
      <div>
        <p>Performance Overview</p>
        <div className="rounded-lg bg-bg-accent px-4 py-3 text-center">
          <p className="text-[13px] text-text-secondary">
            Performance data will appear here once your ad is live.
          </p>
        </div>
      </div>
    )
  }

  const views = ad.views ?? 0
  const clicks = ad.clicks ?? 0
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0"
  // TODO: no "leads" field in schema yet
  // the backend doesn't track leads yet, so show a dash instead of a false 0

  return (
    <div>
      <p>Performance Overview</p>

      <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">Impressions</p>
          </div>

          <p className="text-[14px] font-semibold">{views.toLocaleString()}</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">Clicks</p>
          </div>

          <p className="text-[14px] font-semibold">{clicks.toLocaleString()}</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">CTR</p>
          </div>

          <p className="text-[14px] font-semibold">{ctr}%</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] font-semibold">—</p>
          </div>

          <p className="text-[14px] font-semibold">—</p>
        </div>
      </div>
    </div>
  )
}
