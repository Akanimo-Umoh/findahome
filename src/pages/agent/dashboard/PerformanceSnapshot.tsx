import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

type PerformanceSnapshotProps = {
  activeListingsCount: number
  isLoadingActiveListings: boolean
}

export default function PerformanceSnapshot({
  activeListingsCount,
  isLoadingActiveListings,
}: PerformanceSnapshotProps) {
  const stats = [
    {
      icon: activeIcon,
      iconBg: "bg-[#EEF4F0]",
      value: isLoadingActiveListings ? "—" : String(activeListingsCount),
      valueColor: "text-[#4D7C5F]",
      label: "Active Listings",
    },
    {
      icon: pendingIcon,
      iconBg: "bg-[#FBEAE8]",
      value: "10",
      valueColor: "text-[#C0392B]",
      label: "Pending Transaction",
    },
    {
      icon: completedIcon,
      iconBg: "bg-[#EEF1FC]",
      value: "15",
      valueColor: "text-button-bg",
      label: "Completed Deals",
    },
    {
      icon: stackIcon,
      iconBg: "bg-[#F0EBFB]",
      value: "8",
      valueColor: "text-[#6D3FC0]",
      label: "Running Ads",
    },
  ]

  return (
    <div className="mt-6 md:mt-8">
      <p className="">Performance Snapshot</p>

      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-3.5 md:grid-cols-4 md:gap-3.5 lg:mt-3.5 lg:gap-3.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#E7E5E2] bg-white px-4 py-4 md:rounded-[14px] md:py-[18px] lg:py-[18px]"
          >
            {/* icon */}
            <div
              className={`${stat.iconBg} mb-3 flex h-7 w-7 items-center justify-center rounded-lg md:h-8 md:w-8 md:rounded-[9px] lg:h-8 lg:w-8`}
            >
              <img
                src={stat.icon}
                alt=""
                className="h-3.5 w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4"
              />
            </div>

            {/* value */}
            <p
              className={`${stat.valueColor} mb-0.5 text-[18px] leading-tight font-extrabold tracking-[-0.01em] md:text-[20px] lg:text-[22px]`}
            >
              {stat.value}
            </p>

            {/* label */}
            <p className="text-[11px] leading-[1.3] text-text-secondary md:text-[11.5px] lg:text-[11.5px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
