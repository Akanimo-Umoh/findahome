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
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { useInspectionStatus } from "@/hooks/useInspectionStatus"
import { usePropertyTaken } from "@/hooks/usePropertyTaken"
import { invalidateDealQueries } from "@/hooks/useRealtimeSync"
import { requestError } from "@/lib/requestError"
import { REFUND_FEE_NOTICE } from "@/lib/refundFee"

type PayInspectionProps = {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  chatId: string
  propertyTitle: string
  propertyAddress: string
  propertyPrice: number
  propertyImage: string
}

export default function PayInspectionModal({
  isOpen,
  onClose,
  propertyId,
  chatId,
  propertyTitle,
  propertyAddress,
  propertyPrice,
  propertyImage,
}: PayInspectionProps) {
  const queryClient = useQueryClient()
  const { saveDraft } = useInspectionDraft()
  const { stage: inspectionStage, refetch: refetchInspections } =
    useInspectionStatus(propertyId)
  // another buyer has paid for this property: no new inspection fees. the
  // server refuses them too, this just says so before anything is created
  const {
    isTaken,
    isSold,
    soldLabel,
    refetch: refetchTaken,
  } = usePropertyTaken(propertyId)
  // true once fresh data has arrived for this opening: the stage can change
  // because of someone else (an admin approving, rejecting or refunding), so
  // decide nothing from what was cached before the window opened
  const [stageChecked, setStageChecked] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [inspectionId, setInspectionId] = useState<string | null>(null)
  const [fee, setFee] = useState<number | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // page restored from bfcache (e.g. user hit back/cancel from Paystack)
        setIsPaying(false)
      }
    }
    window.addEventListener("pageshow", handlePageShow)
    return () => window.removeEventListener("pageshow", handlePageShow)
  }, [])

  // each time the window opens, fetch the inspection's current state first
  useEffect(() => {
    if (!isOpen) {
      setStageChecked(false)
      // forget the last request: it may since have been rejected or
      // refunded, and the next opening must start from the current state
      setInspectionId(null)
      setFee(null)
      setReference(null)
      return
    }
    let cancelled = false
    Promise.allSettled([refetchInspections(), refetchTaken()]).finally(() => {
      if (!cancelled) setStageChecked(true)
    })
    return () => {
      cancelled = true
    }
  }, [isOpen, refetchInspections, refetchTaken])

  useEffect(() => {
    if (!isOpen || !stageChecked) return
    // only blocks starting or paying a new one; a paid inspection shows its
    // own message below
    if (
      isTaken &&
      (inspectionStage === "none" ||
        inspectionStage === "awaiting_payment" ||
        inspectionStage === "cancelled")
    ) {
      toast.error(
        isSold
          ? `This property has been ${soldLabel.toLowerCase()} and is no longer available.`
          : "Another buyer has paid for this property, so new inspections are paused. You can request one if it becomes available again."
      )
      onClose()
      return
    }
    if (inspectionStage === "refund_pending") {
      toast.error(
        "Your refund for the cancelled inspection is still being processed. You can request a new inspection once it has been sent."
      )
      onClose()
      return
    }
    if (inspectionStage === "awaiting_confirmation") {
      toast.error(
        "Your payment is already under review. We'll notify you once it's confirmed."
      )
      onClose()
      return
    }
    if (
      inspectionStage === "awaiting_schedule" ||
      inspectionStage === "awaiting_buyer_confirm" ||
      inspectionStage === "completed"
    ) {
      toast.error("You've already paid the inspection fee for this property.")
      onClose()
      return
    }
    // only proceed to requestInspection if stage is "none", "awaiting_payment"
    // or "cancelled" (the server starts a fresh request after a cancellation)
  }, [isOpen, stageChecked, inspectionStage, isTaken, isSold, soldLabel])

  // create the Inspection record the moment the modal opens — buyer never
  // sees the code step, it's generated server-side and used later by the agent
  useEffect(() => {
    if (!isOpen || !stageChecked || inspectionId || isTaken) return
    if (
      inspectionStage !== "none" &&
      inspectionStage !== "awaiting_payment" &&
      inspectionStage !== "cancelled"
    )
      return

    const init = async () => {
      setIsRequesting(true)
      try {
        const res = await requestInspection(propertyId)
        setInspectionId(res.inspectionId)

        const details = await getInspectionDetails(res.inspectionId)
        setFee(details.fee)
      } catch (err) {
        const backendMessage = axios.isAxiosError<{ message?: string }>(err)
          ? err.response?.data?.message
          : undefined

        toast.error(
          backendMessage ??
            "Couldn't start inspection request. Please try again."
        )
        console.error("requestInspection error:", err)
        onClose()
      } finally {
        setIsRequesting(false)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, stageChecked, propertyId, inspectionStage])

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
        chatId,
      })

      setReference(res.reference)

      window.location.href = res.authorizationUrl
    } catch (err) {
      // 409: an earlier attempt on this request was actually paid. The server
      // has just moved it to review, so refresh instead of paying again.
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        invalidateDealQueries(queryClient)
        toast.success(
          "We've already received your payment. It's now waiting for admin approval."
        )
        onClose()
      } else {
        toast.error(
          requestError(err, "Couldn't start payment. Please try again.")
        )
      }
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
          {isRequesting || !stageChecked ? (
            <Spinner className="flex justify-center py-10" />
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

                <div className="flex items-start gap-1">
                  <img src={infoIcon} alt="" className="mt-0.5" />
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {REFUND_FEE_NOTICE}
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
