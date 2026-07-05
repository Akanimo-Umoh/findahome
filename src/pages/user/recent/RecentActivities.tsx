// import { useNavigate } from "react-router-dom"
// import goBack from "@/assets/images/icon-back.svg"
// import nairaIcon from "@/assets/images/icon-chat-naira.svg"
// import propertyImg from "@/assets/images/property.jpg"
// import verifiedIcon from "@/assets/images/icon-verified-green.svg"
// import { Button } from "@/components/ui/button"

// export default function Recent() {
//   const navigate = useNavigate()

//   return (
//     <div className="mb-10 px-6 text-text-primary">
//       {/* header */}
//       <div className="relative flex items-center justify-center">
//         <button onClick={() => navigate(-1)} className="absolute left-0">
//           <img src={goBack} alt="" className="h-6 w-6" />
//         </button>

//         <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
//           Recent Activities
//         </p>
//       </div>

//       <main className="mt-6">
//         {/* recent main ctn */}
//         <section className="space-y-[23px]">
//           {/* activities ctn */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div>
//                 <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
//                   Property Handover
//                 </p>

//                 <p className="line-clamp-1 text-[12px] leading-4 text-[#10B981]">
//                   Awaiting Confirmation{" "}
//                   <span className="text-[12px] leading-4 text-text-secondary">
//                     Saturday, Oct 15th 10:00am
//                   </span>
//                 </p>

//                 <p className="line-clamp-1 text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>

//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>

//           {/* the second one: when it is for payment released */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div className="relative">
//                 <div className="flex items-center justify-between">
//                   <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
//                     Property Payment
//                   </p>

//                   <img src={verifiedIcon} alt="" />
//                 </div>

//                 <p className="line-clamp-1 text-[12px] leading-4 text-[#10B981]">
//                   Payment Released{" "}
//                   <span className="text-[12px] leading-4 text-text-secondary">
//                     Saturday, Oct 15th 10:00am
//                   </span>
//                 </p>

//                 <p className="text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>
//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>

//           {/* the third one: when it is for scheduled visit */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div className="relative">
//                 <div className="flex items-center justify-between">
//                   <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
//                     Property Inspection
//                   </p>

//                   <img src={verifiedIcon} alt="" />
//                 </div>

//                 <div>
//                   <p className="text-[12px] leading-4 text-[#10B981]">
//                     Scheduled Visit
//                   </p>
//                   <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                     Saturday, Oct 15th 10:00am
//                   </p>
//                 </div>

//                 <p className="text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>

//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>

//           {/* the fourth one: when it is for Payment held by system */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div className="relative">
//                 <div className="flex items-center justify-between">
//                   <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
//                     Inspection Fee
//                   </p>

//                   <img src={verifiedIcon} alt="" />
//                 </div>

//                 <div>
//                   <p className="text-[12px] leading-4 text-[#10B981]">
//                     Payment held by system
//                   </p>
//                   <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                     <img src={nairaIcon} alt="" />
//                     <span>10,000</span>
//                   </p>
//                 </div>

//                 <p className="text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>

//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>

//           {/* the fifth one: when it is for handover schedule */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div className="relative">
//                 <div className="flex items-center justify-between">
//                   <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
//                     Handover Schedule
//                   </p>

//                   {/* the verified icon only shows if the agent the user is dealing with is verified */}
//                   {/* <img src={verifiedIcon} alt="" /> */}
//                 </div>

//                 <div>
//                   <p className="text-[12px] leading-4 text-[#10B981]">
//                     Awaiting Confirmation
//                   </p>

//                   <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                     Saturday, Oct 15th 10:00am
//                   </p>
//                 </div>

//                 <p className="text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>

//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>

//           {/* the sixth one: when it is for inspection schedule */}
//           <div className="recent-card space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-12 w-12 shrink-0 rounded-xl object-cover"
//               />

//               <div className="relative">
//                 <div className="flex items-center justify-between">
//                   <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
//                     Insppection Schedule
//                   </p>

//                   {/* <img src={verifiedIcon} alt="" /> */}
//                 </div>

//                 <div>
//                   <p className="text-[12px] leading-4 text-[#10B981]">
//                     Scheduled Visit
//                   </p>

//                   <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                     Saturday, Oct 15th 10:00am
//                   </p>
//                 </div>

//                 <p className="text-[14px]">
//                   <span className="font-semibold">Agent:</span> Maryann Kikomu
//                 </p>

//                 <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//               </div>
//             </div>

//             {/* button link */}
//             <Button variant="app-primary" size="full">
//               View Details
//             </Button>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

import Recent from "@/components/recent/Recent"

export default function RecentActivities() {
  return (
    <div>
      <Recent />
    </div>
  )
}
