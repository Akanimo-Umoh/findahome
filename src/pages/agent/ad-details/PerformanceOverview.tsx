import viewsIcon from "@/assets/agentImages/icon-visibility.svg";

export default function PerformanceOverview() {
  return (
    <div>
      <p>Performance Overview</p>

      <div className="grid grid-cols-2 gap-x-[21px] gap-y-2">
        <div className="rounded-lg bg-bg-accent py-3 px-4">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="w-4 h-4" />
            <p className="text-[14px] text-text-secondary">Impressions</p>
          </div>

          <p className="font-semibold text-[14px]">12.5k</p>
        </div>

        <div className="rounded-lg bg-bg-accent py-3 px-4">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="w-4 h-4" />
            <p className="text-[14px] text-text-secondary">Clicks</p>
          </div>

          <p className="font-semibold text-[14px]">432</p>
        </div>

        <div className="rounded-lg bg-bg-accent py-3 px-4">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="w-4 h-4" />
            <p className="text-[14px] text-text-secondary">CTR</p>
          </div>

          <p className="font-semibold text-[14px]">3.5%</p>
        </div>

        <div className="rounded-lg bg-bg-accent py-3 px-4">
          <div className="flex items-center gap-2">
            <img src={viewsIcon} alt="" className="w-4 h-4" />
            <p className="text-[14px] text-text-secondary">Leads</p>
          </div>

          <p className="font-semibold text-[14px]">20</p>
        </div>
      </div>
    </div>
  );
}
