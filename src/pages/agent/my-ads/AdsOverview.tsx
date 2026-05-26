import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import type { DateRange } from "@/types/ads"
import { adsStatsData } from "./MockData"

export default function AdsOverview() {
  const [range, setRange] = useState<DateRange>("this-month")

  const stats = adsStatsData[range]

  return (
    <div className="space-y-2">
      {/* Date Range Select */}
      <Select
        value={range}
        onValueChange={(value) => setRange(value as DateRange)}
      >
        <SelectTrigger className="border-none px-6 shadow-none outline-none">
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
      <div className="flex gap-4 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden">
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
