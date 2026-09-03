// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
// import nairaIcon from "@/assets/images/icon-chat-naira.svg"
// import blueNairaIcon from "@/assets/images/naira.svg"
// import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
// import { Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"

// type PayInspectionProps = {
//   isOpen: boolean
//   onClose: () => void
//   propertyTitle: string
//   propertyAddress: string
//   propertyPrice: number
//   propertyImage: string
// }

// export default function PayInspectionModal({
//   isOpen,
//   onClose,
//   propertyTitle,
//   propertyAddress,
//   propertyPrice,
//   propertyImage,
// }: PayInspectionProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
//         <DialogTitle className="sr-only">Pay Inspection Fee</DialogTitle>

//         {/* header */}
//         <div className="shrink-0 px-6 pt-8">
//           <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
//             Pay Inspection Fee
//           </p>
//         </div>

//         {/* scrollable content */}
//         <div className="flex-1 space-y-2 overflow-y-auto px-6 pt-6">
//           {/* property details */}
//           <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
//             <img
//               src={propertyImage}
//               alt={propertyTitle}
//               className="h-15 w-15 rounded-lg object-cover"
//             />
//             <div className="flex flex-col justify-center">
//               <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
//                 {propertyTitle}
//               </p>
//               <div className="flex items-center text-[12px] leading-4 text-text-secondary">
//                 {propertyAddress ?? (
//                   <p className="line-clamp-1 flex-1">{propertyAddress}</p>
//                 )}

//                 <p className="flex items-center">
//                   <img src={nairaIcon} alt="" className="h-4 w-4" />
//                   <span>{propertyPrice?.toLocaleString()}</span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* payment summary */}
//           <div className="flex flex-col gap-2 rounded-xl bg-bg-accent px-3 py-2">
//             <div className="flex items-center justify-between">
//               <p className="text-text-primary">Inspection fee</p>
//               <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
//                 <img src={blueNairaIcon} alt="" className="h-4 w-4" />
//                 <span>5,000</span>
//               </p>
//             </div>

//             <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
//               <p>Payment Reference</p>
//               <p>FH-PAY-2472-001</p>
//             </div>

//             <div className="flex items-center gap-1">
//               <img src={infoIcon} alt="" />
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 Payment is held securely by FindaHome until inspection is
//                 complete
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* sticky footer */}
//         <div className="shrink-0 px-6 pt-4 pb-6">
//           <Button variant="app-primary" size="full">
//             Pay with Paystack
//           </Button>

//           <p className="mt-2 text-center text-[12px] leading-4 text-text-secondary">
//             By proceeding, you agree to FindaHome's escrow policy
//           </p>

//           <div className="mt-3 text-center">
//             <Link
//               to=""
//               className="border-b border-b-button-bg text-center text-[12px] leading-4 text-text-secondary"
//             >
//               Having issues with agent? Open a dispute
//             </Link>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import blueNairaIcon from "@/assets/images/naira.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Spinner from "@/components/Spinner"
import {
  requestInspection,
  getInspectionDetails,
  initializeInspectionPayment,
} from "@/services/inspection.service"
import { useInspectionDraft } from "@/hooks/useInspectionDraft"

type PayInspectionProps = {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  propertyTitle: string
  propertyAddress: string
  propertyPrice: number
  propertyImage: string
}

export default function PayInspectionModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  propertyAddress,
  propertyPrice,
  propertyImage,
}: PayInspectionProps) {
  const { saveDraft } = useInspectionDraft()
  const [isRequesting, setIsRequesting] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [inspectionId, setInspectionId] = useState<string | null>(null)
  const [fee, setFee] = useState<number | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  // create the Inspection record the moment the modal opens — buyer never
  // sees the code step, it's generated server-side and used later by the agent
  useEffect(() => {
    if (!isOpen || inspectionId) return

    const init = async () => {
      setIsRequesting(true)
      try {
        const res = await requestInspection(propertyId)
        setInspectionId(res.inspectionId)

        // requestInspection doesn't return the fee — fetch the full record
        const details = await getInspectionDetails(res.inspectionId)
        setFee(details.fee)
      } catch (err) {
        toast.error("Couldn't start inspection request. Please try again.")
        console.error("requestInspection error:", err)
        onClose()
      } finally {
        setIsRequesting(false)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, propertyId])

  const handlePay = async () => {
    if (!inspectionId) return

    setIsPaying(true)
    try {
      const callback_url = `${window.location.origin}/inspection-payment/callback`
      const res = await initializeInspectionPayment(inspectionId, callback_url)

      saveDraft({
        inspectionId,
        reference: res.reference,
        propertyId,
      })

      setReference(res.reference)

      window.location.href = res.authorizationUrl
    } catch (err) {
      toast.error("Couldn't start payment. Please try again.")
      console.error("initializeInspectionPayment error:", err)
      setIsPaying(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
        <DialogTitle className="sr-only">Pay Inspection Fee</DialogTitle>

        <div className="shrink-0 px-6 pt-8">
          <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
            Pay Inspection Fee
          </p>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-6 pt-6">
          {isRequesting ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
                <img
                  src={propertyImage}
                  alt={propertyTitle}
                  className="h-15 w-15 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                    {propertyTitle}
                  </p>
                  <div className="flex items-center text-[12px] leading-4 text-text-secondary">
                    <p className="line-clamp-1 flex-1">{propertyAddress}</p>
                    <p className="flex items-center">
                      <img src={nairaIcon} alt="" className="h-4 w-4" />
                      <span>{propertyPrice?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl bg-bg-accent px-3 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-text-primary">Inspection fee</p>
                  <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                    <span>{fee !== null ? fee.toLocaleString() : "—"}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
                  <p>Payment Reference</p>
                  <p>{reference ?? "Generated on payment"}</p>
                </div>

                <div className="flex items-center gap-1">
                  <img src={infoIcon} alt="" />
                  <p className="text-[12px] leading-4 text-text-secondary">
                    Payment is held securely by FindaHome until inspection is
                    complete
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="shrink-0 px-6 pt-4 pb-6">
          <Button
            variant="app-primary"
            size="full"
            onClick={handlePay}
            disabled={isRequesting || isPaying || !inspectionId}
          >
            {isPaying ? "Redirecting..." : "Pay with Paystack"}
          </Button>

          <p className="mt-2 text-center text-[12px] leading-4 text-text-secondary">
            By proceeding, you agree to FindaHome's escrow policy
          </p>

          <div className="mt-3 text-center">
            <Link
              to="/open-dispute"
              className="border-b border-b-button-bg text-center text-[12px] leading-4 text-text-secondary"
            >
              Having issues with agent? Open a dispute
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
