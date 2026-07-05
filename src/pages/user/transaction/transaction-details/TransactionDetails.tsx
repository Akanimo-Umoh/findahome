// import { useNavigate, useParams, Link } from "react-router-dom"
// import { useState } from "react"
// import { toast } from "sonner"
// import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
// import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
// import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
// import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"
// import propertyImg from "@/assets/images/property.jpg"
// import blueNaira from "@/assets/images/icon-naira.svg"
// import blackNaira from "@/assets/images/icon-black-naira.svg"
// import goBack from "@/assets/images/icon-back.svg"
// import whiteCalendar from "@/assets/images/icon-calendar.svg"
// import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
// import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
// import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"
// import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg"
// import infoIcon from "@/assets/images/icon-grey-info.svg"
// import privacyIcon from "@/assets/images/icon-escrow-privacy.svg"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import EscrowTimeline from "./EscrowTimeline"
// import RequestSuccessful from "../../../components/shared/RequestSuccessful"
// import ScheduleConfirmedOverlay from "../../../components/shared/transaction/ScheduleConfirmedOverlay"
// import {
//   getTimelineSteps,
//   BANNER_CONFIG,
//   SCHEDULE_SECTION_LABEL,
//   PAYMENT_TYPE_LABEL,
// } from "./transactionConfig"
// import { getMockTransaction } from "@/data/mockTransactions"
// import type { TransactionStatus } from "@/types/transactions"

// const AGENT_CHAT_PATH = "/chat"

// // Phase 5 steps — separate from the main escrow timeline
// const INSPECTION_SUMMARY_STEPS = [
//   "Payment initiated",
//   "Funds held in Escrow",
//   "Inspection Scheduled",
//   "Inspection Completed",
//   "Funds released",
// ]

// export default function TransactionDetails() {
//   const { transactionId } = useParams()
//   const navigate = useNavigate()
//   const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false)
//   const [isConfirmedOverlayOpen, setIsConfirmedOverlayOpen] = useState(false)

//   // TODO: replace with useQuery(transactionId) once endpoint exists
//   const transaction = getMockTransaction(transactionId ?? "")
//   const status: TransactionStatus =
//     transaction?.status ?? "inspection_requested"

//   const timelineSteps = getTimelineSteps(status)
//   const banner = BANNER_CONFIG[status]
//   const scheduleLabel = SCHEDULE_SECTION_LABEL[status] ?? "Inspection Details"
//   const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

//   // visibility flags
//   const isPhase5 = status === "inspection_completed"
//   const showRequestInspection = status === "inspection_requested"
//   const showConfirmInspection = status === "inspection_scheduled"
//   const showRequestHandover = status === "handover_requested"
//   const showConfirmHandover = status === "handover_scheduled"

//   // Phase 5 — funds_released would come from backend
//   // TODO: replace with real value from transaction record
//   const fundsReleased = false
//   const phase5CompletedCount = fundsReleased ? 5 : 4
//   const phase5ProgressValue =
//     (phase5CompletedCount / INSPECTION_SUMMARY_STEPS.length) * 100

//   const handleSuggestNewTime = () => {
//     toast.success("Agent notified", {
//       description:
//         "We let your agent know you'd like a new time. Head to chat to coordinate the reschedule.",
//     })
//     navigate(AGENT_CHAT_PATH)
//   }

//   const scheduleDetails = [
//     { icon: blueCalendarIcon, title: "Date", detail: "14th Nov, 2025" },
//     { icon: timeIcon, title: "Time", detail: "10:00am" },
//     { icon: locationIcon, title: "Location", detail: "Lekki Toll Gate" },
//   ]

//   const agentDetails = [
//     { icon: userIcon, title: "Name", detail: "Maryann Kikomu" },
//     { icon: phoneIcon, title: "Phone Number", detail: "08152833119" },
//     { icon: emailIcon, title: "Email", detail: "Maryannkikomu@gmail.com" },
//   ]

//   // const buyerDetails = [
//   //   { icon: userIcon, title: "Name", detail: "Victoria Ntekim" },
//   //   { icon: phoneIcon, title: "Phone Number", detail: "08152833119" },
//   //   { icon: emailIcon, title: "Email", detail: "etimvictoria62@gmail.com" },
//   // ]

//   // Phase 5 UI
//   if (isPhase5) {
//     return (
//       <div className="px-6 text-text-primary">
//         <div className="relative flex items-center justify-center">
//           <button onClick={() => navigate(-1)} className="absolute left-0">
//             <img src={goBack} alt="" className="h-6 w-6" />
//           </button>
//           <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
//             Transaction Details
//           </p>
//         </div>

//         <main className="mt-6">
//           {/* property card */}
//           <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
//             <img
//               src={propertyImg}
//               alt=""
//               className="h-15 w-15 rounded-lg object-cover"
//             />
//             <div className="flex w-full flex-col justify-center gap-1">
//               <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
//                 4 Bed-room Apartment, Lekki phase 1
//               </p>
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 Listed by Maryann Kikomu{" "}
//                 <span className="text-button-bg">(Verified)</span>
//               </p>
//               <p className="w-fit rounded-2xl bg-success px-2 py-1 text-[12px] leading-4 text-bg-tertiary">
//                 Inspection Completed
//               </p>
//             </div>
//           </div>

//           {/* transaction summary */}
//           <div className="mt-6">
//             <p>Transaction Summary</p>
//             <div className="mt-2 flex flex-col gap-3 rounded-xl border border-bg-accent bg-bg-accent p-2">
//               <div className="flex items-center justify-between">
//                 <p className="text-[12px] leading-4">Escrow ID:</p>
//                 <p className="text-[12px] font-semibold">FH-2458</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-[12px] leading-4">Property Amount</p>
//                 <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
//                   <img src={blueNaira} alt="" className="h-4 w-4" />
//                   <span className="text-button-bg">5,000</span>
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="flex items-center text-[12px] leading-4">
//                   <span>Transaction type</span>
//                   <img src={infoIcon} alt="" />
//                 </p>
//                 <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
//                   Inspection fee
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-[12px] leading-4">Date:</p>
//                 <p className="text-[12px] font-semibold">Oct 15, 2025</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="font-raleway text-[14px] leading-4 font-semibold tracking-[1px]">
//                   Total Fee
//                 </p>
//                 <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
//                   <img src={blackNaira} alt="" className="h-4 w-4" />
//                   <span>5,000</span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* transaction in progress */}
//           <div className="mt-4">
//             <p>Transaction in progress</p>
//             <div className="mt-2">
//               <Progress
//                 value={phase5ProgressValue}
//                 className="h-2 w-full bg-bg-accent [&>div]:bg-button-bg"
//               />
//               <div className="mt-3 flex flex-col justify-center gap-2">
//                 {INSPECTION_SUMMARY_STEPS.map((step, index) => {
//                   const isComplete = index < phase5CompletedCount
//                   return (
//                     <div key={step} className="flex items-center gap-1">
//                       <div
//                         className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
//                           isComplete ? "bg-button-bg" : "bg-button-disabled"
//                         }`}
//                       >
//                         {isComplete && <img src={confirmedIcon} alt="" />}
//                       </div>
//                       <p className="text-[12px] font-semibold">{step}</p>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* secure property */}
//           <div className="mt-4">
//             <Button variant="app-primary" size="full" asChild>
//               <Link to={`/transactions/${transactionId}/payment`}>
//                 Secure Property
//               </Link>
//             </Button>

//             <div className="mx-auto mt-3 mb-10 flex max-w-81.25 items-center justify-center gap-1 bg-bg-accent px-2 py-1">
//               <img src={privacyIcon} alt="" className="h-4 w-4" />
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 Funds are securely held by FindaHome until inspection is
//                 confirmed by both parties
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // default TransactionDetails UI (all other statuses)
//   return (
//     <div className="px-6 md:px-8 md:pt-6">
//       <div className="mx-auto max-w-7xl text-text-primary">
//         {/* header */}
//         <div className="relative flex items-center justify-center">
//           <button onClick={() => navigate(-1)} className="absolute left-0">
//             <img src={goBack} alt="" className="h-6 w-6" />
//           </button>
//           <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
//             Transaction Details
//           </p>
//         </div>

//         {/* property card */}
//         <section className="mt-6">
//           <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
//             <div className="shrink-0">
//               <img
//                 src={propertyImg}
//                 alt=""
//                 className="h-15 w-15 rounded-lg object-cover"
//               />
//             </div>
//             <div>
//               <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
//                 Luxury 4 Bed-room Apartment
//               </p>
//               <div className="flex items-center">
//                 <img src={blueNaira} alt="" className="h-4 w-4" />
//                 <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
//                   3,000,000
//                 </p>
//               </div>
//               <div className="mt-1">
//                 <p className="w-fit rounded-2xl bg-agents-bg px-2 text-[12px] leading-4 text-bg-tertiary">
//                   Paid
//                 </p>
//                 <p className="text-[12px] leading-4 text-text-secondary">
//                   Last updated: <span>2hrs ago</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* banner — only when action needed */}
//         {banner && (
//           <section className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
//             <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
//               <img src={whiteCalendar} alt="" />
//             </div>
//             <div>
//               <p className="text-[14px]">{banner.title}</p>
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 {banner.subtitle}
//               </p>
//             </div>
//           </section>
//         )}

//         {/* payment summary */}
//         <section className="mt-8">
//           <p>Payment Summary</p>
//           <div className="payment-summary mt-2 space-y-2">
//             <div className="payment-summary-ctn">
//               <p>Payment in Escrow</p>
//               <p className="flex items-center justify-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
//                 <img src={blueNaira} alt="" className="h-4 w-4" />
//                 <span>3,000,000</span>
//               </p>
//             </div>
//             <div className="payment-summary-ctn">
//               <p>Payment Type</p>
//               <p className="text-text-secondary">{paymentTypeLabel}</p>
//             </div>
//             <div className="payment-summary-ctn">
//               <p>Reference Number</p>
//               <p className="flex items-center justify-center gap-0.5 text-text-secondary">
//                 <span>Ref ID: FH-TRX-002834</span>
//                 <img src={copyIcon} alt="" />
//               </p>
//             </div>
//             <div className="payment-summary-ctn">
//               <p>Date Paid</p>
//               <p className="text-text-secondary">15th Nov, 2025</p>
//             </div>
//           </div>
//         </section>

//         {/* schedule details */}
//         <section className="mt-6">
//           <p>{scheduleLabel}</p>
//           <div className="mt-2 space-y-2">
//             {scheduleDetails.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-bg-accent">
//                   <img src={item.icon} alt="" />
//                 </div>
//                 <div>
//                   <p className="text-[12px] leading-4 text-text-secondary">
//                     {item.title}
//                   </p>
//                   <p className="text-[14px]">{item.detail}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* escrow timeline */}
//         <EscrowTimeline steps={timelineSteps} />

//         {/* agent details */}
//         <section className="mt-6">
//           <p>Agent Details</p>

//           <div className="mt-2 space-y-4 md:flex md:items-center md:justify-between">
//             {agentDetails.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-bg-accent">
//                   <img src={item.icon} alt="" />
//                 </div>
//                 <div>
//                   <p className="text-[14px]">{item.title}</p>
//                   <p className="text-[14px] font-semibold">{item.detail}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* bottom actions */}
//         <div className="mt-6 mb-8">
//           <div className="flex flex-col items-center justify-center gap-4">
//             {/* Phase 1 — request inspection */}
//             {showRequestInspection && (
//               <>
//                 <Button
//                   variant="app-primary"
//                   size="full"
//                   onClick={() => {
//                     // TODO: fire mutation, then setIsRequestSuccessOpen(true) in onSuccess
//                     setIsRequestSuccessOpen(true)
//                   }}
//                 >
//                   Request Inspection Schedule
//                 </Button>

//                 <RequestSuccessful
//                   open={isRequestSuccessOpen}
//                   onOpenChange={setIsRequestSuccessOpen}
//                   onGoToDashboard={() => navigate("/")}
//                   title="Your agent has received your inspection request"
//                   description="You will receive a notification for an inspection schedule"
//                 />
//               </>
//             )}

//             {/* Phase 2 — confirm inspection schedule */}
//             {showConfirmInspection && (
//               <>
//                 <Button
//                   variant="app-primary"
//                   size="full"
//                   onClick={() => {
//                     // TODO: fire mutation, then setIsConfirmedOverlayOpen(true) in onSuccess
//                     setIsConfirmedOverlayOpen(true)
//                   }}
//                 >
//                   Confirm Inspection Schedule
//                 </Button>
//                 <ScheduleConfirmedOverlay
//                   open={isConfirmedOverlayOpen}
//                   onOpenChange={setIsConfirmedOverlayOpen}
//                   title="Visit Scheduled!"
//                   description="Your property visit has been confirmed"
//                   viewDetailsLabel="View Visit Details"
//                   viewDetailsTo={`/transactions/${transactionId}/visit`}
//                 />
//                 <Button
//                   variant="app-secondary"
//                   size="full"
//                   onClick={handleSuggestNewTime}
//                 >
//                   Suggest New Time
//                 </Button>
//               </>
//             )}

//             {/* Phase 7 — request handover */}
//             {showRequestHandover && (
//               <>
//                 <Button
//                   variant="app-primary"
//                   size="full"
//                   onClick={() => {
//                     // TODO: fire mutation, then setIsRequestSuccessOpen(true) in onSuccess
//                     setIsRequestSuccessOpen(true)
//                   }}
//                 >
//                   Request Handover Schedule
//                 </Button>

//                 <RequestSuccessful
//                   open={isRequestSuccessOpen}
//                   onOpenChange={setIsRequestSuccessOpen}
//                   onGoToDashboard={() => navigate("/")}
//                   title="Your agent has received your handover request"
//                   description="You will receive a notification for a handover schedule"
//                 />
//               </>
//             )}

//             {/* Phase 8 — confirm handover schedule */}
//             {showConfirmHandover && (
//               <>
//                 <Button
//                   variant="app-primary"
//                   size="full"
//                   onClick={() => {
//                     // TODO: fire mutation, then setIsConfirmedOverlayOpen(true) in onSuccess
//                     setIsConfirmedOverlayOpen(true)
//                   }}
//                 >
//                   Confirm Handover Schedule
//                 </Button>
//                 <ScheduleConfirmedOverlay
//                   open={isConfirmedOverlayOpen}
//                   onOpenChange={setIsConfirmedOverlayOpen}
//                   title="Handover Scheduled!"
//                   description="Your property handover has been confirmed"
//                   viewDetailsLabel="View Handover Details"
//                   viewDetailsTo={`/transactions/${transactionId}/visit`}
//                 />
//                 <Button
//                   variant="app-secondary"
//                   size="full"
//                   onClick={handleSuggestNewTime}
//                 >
//                   Suggest New Time
//                 </Button>
//               </>
//             )}
//           </div>

//           <p className="mt-3 text-center text-[12px] leading-4 text-text-secondary">
//             Having issues with agent?{" "}
//             <Link to="/dispute" className="font-bold hover:text-button-bg">
//               Open a dispute
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useNavigate, useParams, Link } from "react-router-dom"
// import { useState } from "react"
// import { toast } from "sonner"
// // import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
// // import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
// // import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
// // import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"
// // import blueNaira from "@/assets/images/icon-naira.svg"
// import goBack from "@/assets/images/icon-back.svg"
// // import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
// // import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
// // import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"
// import { Button } from "@/components/ui/button"
// import EscrowTimeline from "./EscrowTimeline"
// import RequestSuccessful from "@/components/shared/RequestSuccessful"
// // import ScheduleConfirmedOverlay from "./ScheduleConfirmedOverlay"
// import TransactionPropertyCard from "@/components/transaction/TransactionPropertyCard"
// import TransactionBanner from "@/components/transaction/TransactionBanner"
// import PaymentSummary from "@/components/transaction/PaymentSummary"
// import ScheduleDetails from "@/components/transaction/ScheduleDetails"
// import ContactDetails from "@/components/transaction/ContactDetails"
// import {
//   getTimelineSteps,
//   BANNER_CONFIG,
//   SCHEDULE_SECTION_LABEL,
//   PAYMENT_TYPE_LABEL,
// } from "./transactionConfig"
// import { getMockTransaction } from "@/data/mockTransactions"
// import type { TransactionStatus } from "@/types/transactions"
// import ScheduleConfirmedOverlay from "@/components/transaction/ScheduleConfirmedOverlay"
// import { TransactionActions } from "@/components/transaction"

// const AGENT_CHAT_PATH = "/chat"

// export default function TransactionDetails() {
//   const { transactionId } = useParams()
//   const navigate = useNavigate()
//   const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false)
//   const [isConfirmedOverlayOpen, setIsConfirmedOverlayOpen] = useState(false)

//   // TODO: replace with useQuery(["transaction", transactionId]) once endpoint exists
//   const transaction = getMockTransaction(transactionId ?? "")
//   const status: TransactionStatus =
//     transaction?.status ?? "inspection_requested"

//   const timelineSteps = getTimelineSteps(status)
//   const banner = BANNER_CONFIG[status]
//   const scheduleLabel = SCHEDULE_SECTION_LABEL[status] ?? "Inspection Details"
//   const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

//   // --- visibility flags ---
//   const showRequestInspection = status === "inspection_requested"
//   const showConfirmInspection = status === "inspection_scheduled"
//   const showViewVisitDetails = status === "inspection_confirmed"
//   const showSecureProperty = status === "inspection_completed"
//   const showRequestHandover = status === "handover_requested"
//   const showConfirmHandover = status === "handover_scheduled"
//   const showViewHandoverDetails = status === "handover_confirmed"
//   const showViewReceipt = status === "funds_released"

//   const handleSuggestNewTime = () => {
//     toast.success("Agent notified", {
//       description:
//         "We've informed your agent about the reschedule. Please chat to coordinate the new time.",
//     })
//     navigate(AGENT_CHAT_PATH)
//   }

//   return (
//     <div className="px-6 md:px-8 md:pt-6">
//       <div className="mx-auto max-w-7xl text-text-primary">
//         {/* header */}
//         <div className="relative flex items-center justify-center">
//           <button onClick={() => navigate(-1)} className="absolute left-0">
//             <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
//           </button>
//           <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
//             Transaction Details
//           </p>
//         </div>

//         {/* property card */}
//         <div className="lg:mt-6 lg:flex lg:justify-between lg:gap-6">
//           <section className="mt-6 lg:mt-0 lg:flex-1 lg:space-y-6">
//             <TransactionPropertyCard
//               variant="default"
//               title="Luxury 4 Bed-room Apartment"
//               price="3,000,000"
//               paymentStatus="Paid"
//               lastUpdated="2hrs ago"
//             />

//             {/* banner — only when action needed or info to show */}
//             {banner && (
//               <section className="mt-6 lg:mt-0">
//                 <TransactionBanner
//                   title={banner.title}
//                   subtitle={banner.subtitle}
//                 />
//               </section>
//             )}

//             <div className="hidden lg:block">
//               <EscrowTimeline steps={timelineSteps} />
//             </div>
//           </section>

//           <section className="mt-8 lg:mt-0 lg:flex-1">
//             {/* payment summary */}
//             <div className="">
//               <PaymentSummary
//                 amountInEscrow="3,000,000"
//                 paymentType={paymentTypeLabel}
//                 referenceNumber="FH-TRX-002834"
//                 datePaid="15th Nov, 2025"
//               />
//             </div>

//             {/* escrow timeline */}
//             <div className="mt-6 lg:hidden">
//               <EscrowTimeline steps={timelineSteps} />
//             </div>

//             {/* agent details */}
//             <div className="mt-6">
//               <ContactDetails
//                 label="Agent Details"
//                 name="Maryann Kikomu"
//                 phone="08152833119"
//                 email="Maryannkikomu@gmail.com"
//               />
//             </div>

//             {/* schedule details */}
//             <div className="mt-6">
//               <ScheduleDetails
//                 label={scheduleLabel}
//                 date="14th Nov, 2025"
//                 time="10:00am"
//                 location="Lekki Toll Gate"
//               />
//             </div>
//           </section>
//         </div>

//         {/* bottom actions */}
//         <div className="mt-6 mb-8">
//           <div className="lg:hidden">
//             <TransactionActions {...actionsProps} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import EscrowTimeline from "@/components/transaction-details/EscrowTimeline"
import TransactionPropertyCard from "@/components/transaction-details/TransactionPropertyCard"
import TransactionBanner from "@/components/transaction-details/TransactionBanner"
import PaymentSummary from "@/components/transaction-details/PaymentSummary"
import ScheduleDetails from "@/components/transaction-details/ScheduleDetails"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import TransactionActions from "@/components/transaction-details/TransactionActions"
import {
  getTimelineSteps,
  BANNER_CONFIG,
  SCHEDULE_SECTION_LABEL,
  PAYMENT_TYPE_LABEL,
} from "../../../../components/transaction-details/transactionConfig"
import { getMockTransaction } from "@/data/mockTransactions"
import type { TransactionStatus } from "@/types/transactions"
import PageHeader from "@/components/shared/PageHeader"

const AGENT_CHAT_PATH = "/chat"

export default function TransactionDetails() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false)
  const [isConfirmedOverlayOpen, setIsConfirmedOverlayOpen] = useState(false)

  // TODO: replace with useQuery(["transaction", transactionId]) once endpoint exists
  const transaction = getMockTransaction(transactionId ?? "")
  const status: TransactionStatus =
    transaction?.status ?? "inspection_requested"

  const timelineSteps = getTimelineSteps(status)
  const banner = BANNER_CONFIG[status]
  const scheduleLabel = SCHEDULE_SECTION_LABEL[status] // undefined → hide section
  const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

  const handleSuggestNewTime = () => {
    toast.success("Agent notified", {
      description:
        "We've informed your agent about the reschedule. Please chat to coordinate the new time.",
    })
    navigate(AGENT_CHAT_PATH)
  }

  // Shared props for TransactionActions — rendered twice (lg + mobile),
  // once visible at a time via CSS, so state/handlers must come from one source.
  const actionsProps = {
    status,
    transactionId: transactionId ?? "",
    isRequestSuccessOpen,
    onRequestSuccessOpenChange: setIsRequestSuccessOpen,
    isConfirmedOverlayOpen,
    onConfirmedOverlayOpenChange: setIsConfirmedOverlayOpen,
    onRequestAction: () => setIsRequestSuccessOpen(true),
    onConfirmAction: () => setIsConfirmedOverlayOpen(true),
    onSuggestNewTime: handleSuggestNewTime,
    onGoToDashboard: () => navigate("/"),
  }

  return (
    <div className="px-6 md:px-8 md:pt-6 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <PageHeader title="Transaction Details" responsive />

        <div className="lg:mt-6 lg:flex lg:justify-between lg:gap-6">
          {/* left column (lg): property card → banner → timeline → actions */}
          <section className="mt-6 space-y-6 lg:mt-0 lg:flex-1">
            <TransactionPropertyCard
              variant="default"
              title="Luxury 4 Bed-room Apartment"
              price="3,000,000"
              paymentStatus="Paid"
              lastUpdated="2hrs ago"
            />

            {/* banner — only when action needed or info to show */}
            {banner && (
              <section>
                <TransactionBanner
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </section>
            )}

            <div className="hidden lg:block">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            {/* actions live here on lg — right after the timeline */}
            <div className="hidden lg:block">
              <TransactionActions {...actionsProps} />
            </div>
          </section>

          {/* right column (lg) / continues below on mobile */}
          <section className="mt-8 space-y-6 lg:mt-0 lg:flex-1">
            <PaymentSummary
              amountInEscrow="3,000,000"
              paymentType={paymentTypeLabel}
              referenceNumber="FH-TRX-002834"
              datePaid="15th Nov, 2025"
            />

            {/* escrow timeline — mobile only, lg shows it in left column above */}
            <div className="lg:hidden">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            <ContactDetails
              label="Agent Details"
              name="Maryann Kikomu"
              phone="08152833119"
              email="Maryannkikomu@gmail.com"
            />

            {scheduleLabel && (
              <ScheduleDetails
                label={scheduleLabel}
                date="14th Nov, 2025"
                time="10:00am"
                location="Lekki Toll Gate"
              />
            )}
          </section>
        </div>

        {/* actions — mobile only, lg version renders above in left column */}
        <div className="lg:hidden">
          <TransactionActions {...actionsProps} />
        </div>
      </div>
    </div>
  )
}
