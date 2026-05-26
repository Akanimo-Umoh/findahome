import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

export default function PerformanceSnapshot() {
  return (
    <div>
      <p className="md:text[16px] mx-6 md:mx-8">Performance Snapshot</p>

      <div className="mt-4 md:mt-6">
        <div className="hideScroll flex gap-6 overflow-x-auto overscroll-x-contain px-6 pb-2 md:px-8">
          <div className="performance-shadow min-w-33.75 space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
            <div className="h-7.5 w-7.5 rounded-lg bg-[#10B98133] p-2">
              <img src={activeIcon} alt="" />
            </div>

            <div className="w-full space-y-1">
              <p className="text-[14px] text-[#10B981]">24</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Active Listings
              </p>
            </div>
          </div>

          <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
            <div className="h-7.5 w-7.5 rounded-lg bg-[#FF6B6B33] p-2">
              <img src={pendingIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#D02727]">10</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Pending Transaction
              </p>
            </div>
          </div>

          <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
            <div className="h-7.5 w-7.5 rounded-lg bg-[#149D1833] p-2">
              <img src={completedIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#149D18]">15</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Completed Deals
              </p>
            </div>
          </div>

          <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
            <div className="h-7.5 w-7.5 rounded-lg bg-[#274AD033] p-2">
              <img src={stackIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-button-bg">15</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Running Ads
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
