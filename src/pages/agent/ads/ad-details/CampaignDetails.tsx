import type { Ad } from "@/types/ad"
import { useMemo, useState } from "react"

const OBJECTIVE_LABEL: Record<string, string> = {
  views: "More Views",
  leads: "Lead generation",
  sales: "Quick Sales",
}

type CampaignDetailsProps = {
  ad: Ad
}

export default function CampaignDetails({ ad }: CampaignDetailsProps) {
  const [now] = useState(() => Date.now())

  const { daysLeft, formattedStartDate } = useMemo(() => {
    const startDate = new Date(ad.createdAt)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + ad.duration)

    const days =
      now === null
        ? ad.duration
        : Math.max(
            Math.ceil((endDate.getTime() - now) / (1000 * 60 * 60 * 24)),
            0
          )

    const formatted = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    return { daysLeft: days, formattedStartDate: formatted }
  }, [ad.createdAt, ad.duration, now])

  return (
    <div>
      <p>Campaign Details</p>

      <div className="mt-2 flex flex-col gap-2 rounded-lg bg-bg-accent p-2">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Ad Goal</p>
          <p className="text-[14px]">{OBJECTIVE_LABEL[ad.objective]}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Duration</p>
          <p className="text-[14px]">
            {" "}
            {ad.duration} Days ({daysLeft} days left)
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Start Date</p>
          <p className="text-[14px]">{formattedStartDate}</p>
        </div>
      </div>
    </div>
  )
}
