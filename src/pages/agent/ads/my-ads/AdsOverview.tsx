import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import { useAgentAds } from "@/hooks/useAgentAds"

type DateRange = "this-week" | "this-month" | "last-30-days" | "this-year"

function isWithinRange(dateString: string, range: DateRange): boolean {
  const date = new Date(dateString)
  const now = new Date()

  switch (range) {
    case "this-week": {
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - now.getDay())
      startOfWeek.setHours(0, 0, 0, 0)
      return date >= startOfWeek
    }
    case "this-month": {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return date >= startOfMonth
    }
    case "last-30-days": {
      const thirtyDaysAgo = new Date(now)
      thirtyDaysAgo.setDate(now.getDate() - 30)
      return date >= thirtyDaysAgo
    }
    case "this-year": {
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      return date >= startOfYear
    }
  }
}

export default function AdsOverview() {
  const [range, setRange] = useState<DateRange>("this-month")
  const { ads } = useAgentAds()

  console.log("ads:", ads)

  const stats = useMemo(() => {
    const inRange = ads.filter((ad) => isWithinRange(ad.createdAt, range))

    const totalAdsRun = inRange.length
    const activeAds = inRange.filter((ad) => ad.status === "active").length
    const amountSpent = inRange.reduce((sum, ad) => sum + (ad.spent ?? 0), 0)

    const totalViews = inRange.reduce((sum, ad) => sum + (ad.views ?? 0), 0)
    const totalClicks = inRange.reduce((sum, ad) => sum + (ad.clicks ?? 0), 0)
    const ctr =
      totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0"

    return { totalAdsRun, activeAds, amountSpent, ctr }
  }, [ads, range])

  return (
    <div className="space-y-2">
      {/* Date Range Select */}
      <Select
        value={range}
        onValueChange={(value) => setRange(value as DateRange)}
      >
        <SelectTrigger className="rounded-lg border-bg-accent shadow-none outline-none">
          <SelectValue placeholder="This month" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="this-week">This week</SelectItem>
          <SelectItem value="this-month">This month</SelectItem>
          <SelectItem value="last-30-days">Last 30 days</SelectItem>
          <SelectItem value="this-year">This year</SelectItem>
        </SelectContent>
      </Select>

      {/* Stats Row */}
      <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        <div className="flex shrink-0 flex-col justify-center rounded-lg border border-bg-accent p-3">
          <p className="text-[12px] leading-4">Total Ads Run</p>
          <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
            {stats.totalAdsRun}
          </p>
        </div>

        <div className="flex shrink-0 flex-col justify-center rounded-lg border border-bg-accent p-3">
          <p className="text-[12px] leading-4">Active Ads</p>
          <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
            {stats.activeAds}
          </p>
        </div>

        <div className="flex shrink-0 flex-col justify-center rounded-lg border border-bg-accent p-3">
          <p className="text-[12px] leading-4">Amount Spent</p>
          <div className="flex items-center font-raleway text-[18px] font-semibold tracking-[1px]">
            <img src={blackNaira} alt="" className="h-4 w-4" />
            <p>{stats.amountSpent.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-center rounded-lg border border-bg-accent p-3">
          <p className="text-[12px] leading-4">CTR (Avg)</p>
          <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
            {stats.ctr}%
          </p>
        </div>
      </div>
    </div>
  )
}
