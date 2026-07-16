import viewsIcon from "@/assets/agentImages/icon-visibility.svg"

export default function EstimatedPerformance() {
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

            <p className="text-[14px]">2.5k - 4.8k</p>

            {/* progress bar */}
            <div>{/* blue progress and white track h-1 rounded-xl */}</div>
          </div>

          <div className="rounded-lg bg-bg-accent px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={viewsIcon} alt="" className="h-4 w-4" />
              <p className="text-[14px] text-text-secondary">Est. Views</p>
            </div>

            <p className="text-[14px]">120 -260</p>

            {/* progress bar */}
            <div>{/* blue progress and white track h-1 rounded-xl */}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
