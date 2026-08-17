import viewsIcon from "@/assets/agentImages/icon-visibility.svg"
import type { Ad } from "@/types/ad"

type EstimatedPerformanceProps = {
  ad: Ad
}

export default function EstimatedPerformance({
  ad,
}: EstimatedPerformanceProps) {
  const reachMin = Math.round(ad.adBudget * 0.6)
  const reachMax = Math.round(ad.adBudget * 2)
  const clickMin = Math.round(ad.adBudget * 0.03)
  const clickMax = Math.round(ad.adBudget * 0.06)

  return (
    <div>
      <div className="mt-8">
        <p>Estimated Performance</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="rounded-lg bg-bg-accent px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={viewsIcon} alt="" className="h-4 w-4" />
              <p className="text-[14px] text-text-secondary">Est. Views</p>
            </div>

            <p className="text-[14px]">
              {reachMin.toLocaleString()} - {reachMax.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-bg-accent px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={viewsIcon} alt="" className="h-4 w-4" />
              <p className="text-[14px] text-text-secondary">Est. Views</p>
            </div>

            <p className="text-[14px]">
              {clickMin.toLocaleString()} - {clickMax.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
