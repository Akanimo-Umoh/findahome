// import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
// import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
// import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
// import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

// export default function PerformanceSnapshot() {
//   return (
//     <div>
//       <p className="md:text[16px] mx-6 md:mx-8">Performance Snapshot</p>

//       <div className="mt-4 md:mt-6">
//         <div className="hideScroll flex gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 md:px-8">
//           <div className="performance-shadow min-w-33.75 space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
//             <div className="h-7.5 w-7.5 rounded-lg bg-[#10B98133] p-2">
//               <img src={activeIcon} alt="" />
//             </div>

//             <div className="w-full space-y-1">
//               <p className="text-[14px] text-[#10B981]">24</p>
//               <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
//                 Active Listings
//               </p>
//             </div>
//           </div>

//           <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
//             <div className="h-7.5 w-7.5 rounded-lg bg-[#FF6B6B33] p-2">
//               <img src={pendingIcon} alt="" />
//             </div>

//             <div className="space-y-1">
//               <p className="text-[14px] text-[#D02727]">10</p>
//               <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
//                 Pending Transaction
//               </p>
//             </div>
//           </div>

//           <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
//             <div className="h-7.5 w-7.5 rounded-lg bg-[#149D1833] p-2">
//               <img src={completedIcon} alt="" />
//             </div>

//             <div className="space-y-1">
//               <p className="text-[14px] text-[#149D18]">15</p>
//               <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
//                 Completed Deals
//               </p>
//             </div>
//           </div>

//           <div className="performance-shadow min-w-[135px] space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5">
//             <div className="h-7.5 w-7.5 rounded-lg bg-[#274AD033] p-2">
//               <img src={stackIcon} alt="" />
//             </div>

//             <div className="space-y-1">
//               <p className="text-[14px] text-button-bg">15</p>
//               <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
//                 Running Ads
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
// import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
// import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
// import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

// type SnapshotItem = {
//   icon: string
//   iconBg: string
//   value: string
//   label: string
//   valueColor: string
// }

// const SNAPSHOT_ITEMS: SnapshotItem[] = [
//   {
//     icon: activeIcon,
//     iconBg: "bg-[#10B98133]",
//     value: "24",
//     label: "Active Listings",
//     valueColor: "text-[#10B981]",
//   },
//   {
//     icon: pendingIcon,
//     iconBg: "bg-[#FF6B6B33]",
//     value: "10",
//     label: "Pending Transaction",
//     valueColor: "text-[#D02727]",
//   },
//   {
//     icon: completedIcon,
//     iconBg: "bg-[#149D1833]",
//     value: "15",
//     label: "Completed Deals",
//     valueColor: "text-[#149D18]",
//   },
//   {
//     icon: stackIcon,
//     iconBg: "bg-[#274AD033]",
//     value: "8",
//     label: "Running Ads",
//     valueColor: "text-button-bg",
//   },
// ]

// export default function PerformanceSnapshot() {
//   return (
//     <div>
//       <p className="mx-6 md:mx-8 md:text-[16px]">Performance Snapshot</p>

//       <div className="mt-4 md:mt-6">
//         {/* mobile/tablet — horizontal scroll */}
//         <div className="hideScroll flex gap-6 overflow-x-auto overscroll-x-contain px-6 pb-2 md:px-8 lg:hidden">
//           {SNAPSHOT_ITEMS.map((item) => (
//             <div
//               key={item.label}
//               className="performance-shadow min-w-33.75 space-y-4 rounded-lg bg-white px-4 py-2 md:min-w-37.5"
//             >
//               <div className={`h-7.5 w-7.5 rounded-lg p-2 ${item.iconBg}`}>
//                 <img src={item.icon} alt="" />
//               </div>
//               <div className="space-y-1">
//                 <p className={`text-[14px] ${item.valueColor}`}>{item.value}</p>
//                 <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
//                   {item.label}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* lg — 4 column grid */}
//         <div className="hidden px-8 lg:grid lg:grid-cols-4 lg:gap-2 xl:gap-4">
//           {SNAPSHOT_ITEMS.map((item) => (
//             <div
//               key={item.label}
//               className="space-y-4 rounded-xl border border-bg-accent px-4 py-4"
//             >
//               <div
//                 className={`flex h-9 w-9 items-center justify-center rounded-lg p-2 ${item.iconBg}`}
//               >
//                 <img src={item.icon} alt="" />
//               </div>

//               <div className="space-y-1">
//                 <p
//                   className={`font-raleway text-[22px] font-semibold tracking-[1px] ${item.valueColor}`}
//                 >
//                   {item.value}
//                 </p>

//                 <p className="text-[14px] leading-5.25">{item.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
// import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
// import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
// import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

// type StatCard = {
//   icon: string
//   iconBg: string
//   value: string
//   label: string
//   valueColor: string
// }

// const stats: StatCard[] = [
//   {
//     icon: activeIcon,
//     iconBg: "bg-[#EEF4F0]",
//     value: "24",
//     valueColor: "text-[#4D7C5F]",
//     label: "Active Listings",
//   },
//   {
//     icon: pendingIcon,
//     iconBg: "bg-[#FBEAE8]",
//     value: "10",
//     valueColor: "text-[#C0392B]",
//     label: "Pending Transaction",
//   },
//   {
//     icon: completedIcon,
//     iconBg: "bg-[#EEF1FC]",
//     value: "15",
//     valueColor: "text-button-bg",
//     label: "Completed Deals",
//   },
//   {
//     icon: stackIcon,
//     iconBg: "bg-[#F0EBFB]",
//     value: "8",
//     valueColor: "text-[#6D3FC0]",
//     label: "Running Ads",
//   },
// ]

// export default function PerformanceSnapshot() {
//   return (
//     <div className="mx-6 mt-6 md:mx-8 md:mt-8">
//       <p className="text-[15px] font-bold tracking-[-0.01em]">
//         Performance Snapshot
//       </p>

//       <div className="mt-3.5 grid grid-cols-4 gap-3.5">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className="rounded-[14px] border border-[#E7E5E2] bg-white px-4 py-[18px]"
//           >
//             {/* icon */}
//             <div
//               className={`${stat.iconBg} mb-3 flex h-8 w-8 items-center justify-center rounded-[9px]`}
//             >
//               <img src={stat.icon} alt="" className="h-4 w-4" />
//             </div>

//             {/* value */}
//             <p
//               className={`${stat.valueColor} mb-0.5 text-[22px] leading-tight font-extrabold tracking-[-0.01em]`}
//             >
//               {stat.value}
//             </p>

//             {/* label */}
//             <p className="text-[11.5px] leading-[1.3] text-text-secondary">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import activeIcon from "@/assets/agentImages/icon-active-listing.svg"
import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg"
import completedIcon from "@/assets/agentImages/icon-completed-deals.svg"
import stackIcon from "@/assets/agentImages/icon-stack-blue.svg"

type StatCard = {
  icon: string
  iconBg: string
  value: string
  label: string
  valueColor: string
}

const stats: StatCard[] = [
  {
    icon: activeIcon,
    iconBg: "bg-[#EEF4F0]",
    value: "24",
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

export default function PerformanceSnapshot() {
  return (
    <div className="mx-6 mt-6 md:mx-8 md:mt-8">
      <p className="">Performance Snapshot</p>

      {/*
        mobile  → 2 columns (2×2 grid)
        md/tablet → 4 columns (single row)
        lg/desktop → 4 columns (single row, scaled up)
      */}
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
