import activeIcon from "@/assets/agentImages/icon-active-listing.svg";
import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg";
import completedIcon from "@/assets/agentImages/icon-completed-deals.svg";
import stackIcon from "@/assets/agentImages/icon-stack-blue.svg";

export default function PerformanceSnapshot() {
  return (
    <div>
      <p className="mx-6 md:mx-8 md:text[16px]">Performance Snapshot</p>

      <div className="mt-4 md:mt-6">
        <div className="flex gap-6 px-6 overflow-x-auto overscroll-x-contain hideScroll pb-2 md:px-8">
          <div className="space-y-4 py-2 px-4 bg-white rounded-lg performance-shadow min-w-33.75 md:min-w-37.5">
            <div className="bg-[#10B98133] rounded-lg p-2 w-7.5 h-7.5">
              <img src={activeIcon} alt="" />
            </div>

            <div className="space-y-1 w-full">
              <p className="text-[14px] text-[#10B981]">24</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Active Listings
              </p>
            </div>
          </div>

          <div className="space-y-4 py-2 px-4 bg-white rounded-lg performance-shadow min-w-[135px] md:min-w-37.5">
            <div className="bg-[#FF6B6B33] rounded-lg p-2 w-7.5 h-7.5">
              <img src={pendingIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#D02727]">10</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Pending Transaction
              </p>
            </div>
          </div>

          <div className="space-y-4 py-2 px-4 bg-white rounded-lg performance-shadow min-w-[135px] md:min-w-37.5">
            <div className="bg-[#149D1833] rounded-lg p-2 w-7.5 h-7.5">
              <img src={completedIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#149D18]">15</p>
              <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                Completed Deals
              </p>
            </div>
          </div>

          <div className="space-y-4 py-2 px-4 bg-white rounded-lg performance-shadow min-w-[135px] md:min-w-37.5">
            <div className="bg-[#274AD033] rounded-lg p-2 w-7.5 h-7.5">
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
  );
}
