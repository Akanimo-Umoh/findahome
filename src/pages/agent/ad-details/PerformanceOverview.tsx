import viewsIcon from "@/assets/agentImages/icon-visibility.svg"

export default function PerformanceOverview() {
  return (
    <div>
      <p>Performance Overview</p>

      <div className="grid grid-cols-2 gap-x-[21px] gap-y-2">
        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">Impressions</p>
          </div>

          <p className="text-[14px] font-semibold">12.5k</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">Clicks</p>
          </div>

          <p className="text-[14px] font-semibold">432</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">CTR</p>
          </div>

          <p className="text-[14px] font-semibold">3.5%</p>
        </div>

        <div className="rounded-lg bg-bg-accent px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="h-4 w-4" />
            <p className="text-[14px] text-text-secondary">Leads</p>
          </div>

          <p className="text-[14px] font-semibold">20</p>
        </div>
      </div>
    </div>
  )
}
