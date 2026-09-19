// import { useNavigate, useParams } from "react-router-dom"
// import { useState } from "react"
// import blueNaira from "@/assets/images/icon-naira.svg"
// import propertyImg from "@/assets/images/property.jpg"
// import agentAvatar from "@/assets/images/agentAvatar.jpg"
// import greyNaira from "@/assets/images/icon-chat-naira.svg"
// import blackNaira from "@/assets/images/icon-black-naira.svg"
// import greyInfo from "@/assets/images/icon-grey-info.svg"
// import cancelIcon from "@/assets/images/icon-cancel-payment.svg"
// import { Button } from "@/components/ui/button"
// import PropertyPaymentSuccessful from "@/components/property-payment/PropertyPaymentSuccessful"
// import PageHeader from "@/components/shared/PageHeader"

// export default function PropertyPayment() {
//   const { transactionId } = useParams()
//   const navigate = useNavigate()
//   const [successOpen, setSuccessOpen] = useState(false)

//   return (
//     <div className="px-6 md:px-8 md:pt-6">
//       <div className="mx-auto max-w-3xl">
//         {/* header */}
//         <PageHeader title="Property Payment" responsive />

//         {/* property details */}
//         <div className="mt-4 flex items-center gap-2 rounded-xl border border-bg-accent p-2">
//           <img
//             src={propertyImg}
//             alt=""
//             className="h-15 w-15 rounded-lg object-cover"
//           />

//           <div className="flex flex-col justify-center">
//             <p className="line-clamp-2 font-raleway text-[14px] font-semibold tracking-[1px]">
//               Luxury 4 Bed-room Apartment
//             </p>
//             <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
//               Lekki Phase 1, Lagos.
//             </p>
//             <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
//               <img src={blueNaira} alt="" className="h-4 w-4" />
//               <span>3M/yr</span>
//             </p>
//           </div>
//         </div>

//         {/* agent details */}
//         <div className="mt-4 flex items-center gap-2">
//           <img
//             src={agentAvatar}
//             alt=""
//             className="h-7.5 w-7.5 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-[12px] font-semibold">Maryann Kikomu</p>
//             <p className="text-[12px] leading-4">Verified Agent</p>
//           </div>
//         </div>

//         {/* payment breakdown */}
//         <div className="mt-4 flex flex-col gap-2 rounded-xl border border-bg-accent p-2">
//           <p>Payment Breakdown</p>
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center justify-between">
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 Property Cost
//               </p>
//               <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                 <img src={greyNaira} alt="" />
//                 <span>3M/yr</span>
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                 <span>Escrow fee</span>
//                 <img src={greyInfo} alt="" />
//               </p>
//               <p className="flex items-center text-[12px] leading-4 text-text-secondary">
//                 <img src={greyNaira} alt="" />
//                 <span>60,000</span>
//               </p>
//             </div>

//             <div className="flex items-center justify-between">
//               <p className="text-[14px] font-semibold tracking-[1px]">
//                 Total Fee
//               </p>
//               <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
//                 <img src={blackNaira} alt="" />
//                 <span>3,060,000</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* payment method */}
//         <div className="mt-4 space-y-2">
//           <p>Payment Method</p>
//           <div className="flex flex-col">
//             <label
//               htmlFor="payViaEscrow"
//               className="flex items-center gap-2 rounded-xl border border-button-bg bg-bg-accent px-2 py-3"
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 id="payViaEscrow"
//                 className="h-5 w-5"
//                 defaultChecked
//               />
//               <p>Pay with Paystack</p>
//             </label>
//           </div>
//         </div>

//         {/* confirm payment */}
//         <div className="mt-6 mb-10 flex flex-col gap-2">
//           <div className="flex flex-col gap-3">
//             <Button
//               variant="app-primary"
//               size="full"
//               onClick={() => {
//                 // TODO: replace with real Paystack flow (usePaystackPayment from
//                 // react-paystack, or PaystackPop.setup()), and only call
//                 // setSuccessOpen(true) inside its onSuccess callback
//                 setSuccessOpen(true)
//               }}
//             >
//               Proceed with payment
//             </Button>

//             <Button
//               variant="app-secondary"
//               size="full"
//               onClick={() => navigate(-1)}
//             >
//               <img src={cancelIcon} alt="" className="h-5 w-5" />
//               <span>Cancel Payment</span>
//             </Button>
//           </div>

//           <p className="text-center text-[12px] leading-4 text-text-secondary">
//             Having issues with agent?{" "}
//             <span className="text-button-bg">Open a dispute</span>
//           </p>
//         </div>

//         <PropertyPaymentSuccessful
//           open={successOpen}
//           onOpenChange={setSuccessOpen}
//           transactionId={transactionId ?? ""}
//         />
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import blueNaira from "@/assets/images/icon-naira.svg"
import greyNaira from "@/assets/images/icon-chat-naira.svg"
import blackNaira from "@/assets/images/icon-black-naira.svg"
import greyInfo from "@/assets/images/icon-grey-info.svg"
import cancelIcon from "@/assets/images/icon-cancel-payment.svg"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/PageHeader"
import Spinner from "@/components/Spinner"
import { getInspectionDetails } from "@/services/inspection.service"
import {
  requestPurchase,
  initializePurchasePayment,
} from "@/services/purchase.service"
import { getPersonDisplay } from "@/lib/personDisplay"
import Avatar from "@/components/Avatar"

// this page is reached from an inspection's "Secure Property" button, so
// transactionId here is the *inspection* id, not a purchase id yet — a
// Purchase record doesn't exist until requestPurchase creates one
export default function PropertyPayment() {
  const { transactionId: inspectionId } = useParams()
  const navigate = useNavigate()
  const [isRequesting, setIsRequesting] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [purchaseId, setPurchaseId] = useState<string | null>(null)

  const { data: inspection, isLoading } = useQuery({
    queryKey: ["inspectionDetails", inspectionId],
    queryFn: () => getInspectionDetails(inspectionId ?? ""),
    enabled: !!inspectionId,
  })

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setIsPaying(false)
    }
    window.addEventListener("pageshow", handlePageShow)
    return () => window.removeEventListener("pageshow", handlePageShow)
  }, [])

  // create the Purchase record the moment the page loads — mirrors
  // PayInspectionModal's "request on open" pattern
  useEffect(() => {
    if (!inspection || purchaseId) return
    const property =
      typeof inspection.property === "string" ? undefined : inspection.property
    if (!property?._id) return

    const init = async () => {
      setIsRequesting(true)
      try {
        const res = await requestPurchase(property._id)
        setPurchaseId(res.purchaseId)
      } catch (err) {
        toast.error("Couldn't start purchase. Please try again.")
        console.error("requestPurchase error:", err)
      } finally {
        setIsRequesting(false)
      }
    }
    init()
  }, [inspection, purchaseId])

  if (isLoading || isRequesting) return <Spinner />

  if (!inspection) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this property.
        </p>
      </div>
    )
  }

  const property =
    typeof inspection.property === "string" ? undefined : inspection.property
  const owner = getPersonDisplay(
    typeof inspection.owner === "string" ? undefined : inspection.owner,
    "Agent"
  )
  console.log("owner profilePicture raw:", JSON.stringify(inspection.owner))

  const propertyPrice = property?.price ?? 0
  const escrowFee = Math.round(propertyPrice * 0.02) // TODO: confirm real escrow fee calc with backend — flat placeholder for now
  const totalFee = propertyPrice + escrowFee

  const handlePay = async () => {
    if (!purchaseId) return
    setIsPaying(true)
    try {
      const callback_url = `${window.location.origin}/property-payment/callback`
      const res = await initializePurchasePayment(purchaseId, callback_url)
      sessionStorage.setItem(
        "pending-purchase-payment",
        JSON.stringify({ purchaseId, reference: res.reference })
      )
      window.location.href = res.authorizationUrl
    } catch (err) {
      toast.error("Couldn't start payment. Please try again.")
      console.error("initializePurchasePayment error:", err)
      setIsPaying(false)
    }
  }

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Property Payment" responsive />

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-bg-accent p-2">
          {property?.image ? (
            <img
              src={property.image}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />
          ) : (
            <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
          )}
          <div className="flex flex-col justify-center">
            <p className="line-clamp-2 font-raleway text-[14px] font-semibold tracking-[1px]">
              {property?.title ?? ""}
            </p>
            <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
              {property?.address ?? ""}
            </p>
            <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <span>{propertyPrice.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Avatar name={owner.name} src={owner.profilePicture} size="sm" />
          <div>
            <p className="text-[12px] font-semibold">{owner.name}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-bg-accent p-2">
          <p>Payment Breakdown</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4 text-text-secondary">
                Property Cost
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>{propertyPrice.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <span>Escrow fee</span>
                <img src={greyInfo} alt="" />
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>{escrowFee.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold tracking-[1px]">
                Total Fee
              </p>
              <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
                <img src={blackNaira} alt="" />
                <span>{totalFee.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p>Payment Method</p>
          <div className="flex flex-col">
            <label
              htmlFor="payViaEscrow"
              className="flex items-center gap-2 rounded-xl border border-button-bg bg-bg-accent px-2 py-3"
            >
              <input
                type="radio"
                name="paymentMethod"
                id="payViaEscrow"
                className="h-5 w-5"
                defaultChecked
              />
              <p>Pay with Paystack</p>
            </label>
          </div>
        </div>

        <div className="mt-6 mb-10 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={handlePay}
              disabled={!purchaseId || isPaying}
            >
              {isPaying ? "Redirecting..." : "Proceed with payment"}
            </Button>

            <Button
              variant="app-secondary"
              size="full"
              onClick={() => navigate(-1)}
            >
              <img src={cancelIcon} alt="" className="h-5 w-5" />
              <span>Cancel Payment</span>
            </Button>
          </div>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Having issues with agent?{" "}
            <span className="text-button-bg">Open a dispute</span>
          </p>
        </div>
      </div>
    </div>
  )
}
