import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import campaignIcon from "@/assets/agentImages/icon-campaign.svg"
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg"
import type { Ad } from "@/types/ad"
import { useMemo } from "react"

const OBJECTIVE_LABEL: Record<string, string> = {
  views: "More Views",
  leads: "Get Leads",
  sales: "Quick Sales",
}

type CampaignSummaryProps = {
  ad: Ad
}

export default function CampaignSummary({ ad }: CampaignSummaryProps) {
  const dateRangeLabel = useMemo(() => {
    const start = new Date(ad.createdAt)
    const end = new Date(start)
    end.setDate(start.getDate() + ad.duration)

    const format = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    return `${format(start)} - ${format(end)}`
  }, [ad.createdAt, ad.duration])

  return (
    <div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={campaignIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Campaign Goal</p>
          </div>
          <p className="text-[14px]">{OBJECTIVE_LABEL[ad.objective]}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Duration</p>
          </div>

          <p className="text-[14px]">{dateRangeLabel}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Total Budget</p>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" className="h-4 w-4" />
            <p className="font-raleway text-[14px] font-semibold text-button-bg">
              {ad.adBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
