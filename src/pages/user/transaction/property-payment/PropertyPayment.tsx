import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
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
  getPurchaseDetails,
} from "@/services/purchase.service"
import { getPersonDisplay } from "@/lib/personDisplay"
import { requestError } from "@/lib/requestError"
import { REFUND_FEE_NOTICE } from "@/lib/refundFee"
import { invalidateDealQueries } from "@/hooks/useRealtimeSync"
import Avatar from "@/components/Avatar"

// this page is reached from an inspection's "Secure Property" button, so transactionId here is the *inspection* id, not a purchase id yet — a Purchase record doesn't exist until requestPurchase creates one
export default function PropertyPayment() {
  const { transactionId: inspectionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isRequesting, setIsRequesting] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [purchaseId, setPurchaseId] = useState<string | null>(null)
  // why the server won't start a purchase (e.g. the property is under offer)
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null)

  const { data: inspection, isLoading } = useQuery({
    queryKey: ["inspectionDetails", inspectionId],
    queryFn: () => getInspectionDetails(inspectionId ?? ""),
    enabled: !!inspectionId,
  })

  // the purchase is what Paystack charges: its price is the total and it
  // carries the platform fee, so the breakdown reads from it, not from the
  // inspection (whose property comes without the fee fields)
  const { data: purchase } = useQuery({
    queryKey: ["purchaseDetails", purchaseId],
    queryFn: () => getPurchaseDetails(purchaseId ?? ""),
    enabled: !!purchaseId,
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
    if (!inspection || purchaseId || blockedMessage) return
    const property =
      typeof inspection.property === "string" ? undefined : inspection.property
    if (!property?._id) return

    const init = async () => {
      setIsRequesting(true)
      try {
        const res = await requestPurchase(property._id)
        setPurchaseId(res.purchaseId)
      } catch (err) {
        // already paid (or under review): the server sends that purchase's id,
        // so open it rather than leaving the buyer on a dead payment page
        const existingId = isAxiosError<{ purchaseId?: string }>(err)
          ? err.response?.data?.purchaseId
          : undefined
        if (existingId) {
          navigate(`/transactions/${existingId}?type=purchase`, {
            replace: true,
          })
          return
        }
        // a 400 without a purchase id means the server won't let this buyer
        // buy it now (e.g. another buyer's payment is under review): show
        // why instead of a payment form that can't work
        if (isAxiosError(err) && err.response?.status === 400) {
          setBlockedMessage(
            requestError(err, "This property can't be purchased right now.")
          )
        } else {
          toast.error(
            requestError(err, "Couldn't start purchase. Please try again.")
          )
        }
        console.error("requestPurchase error:", err)
      } finally {
        setIsRequesting(false)
      }
    }
    init()
  }, [inspection, purchaseId, blockedMessage, navigate])

  if (isLoading || isRequesting) return <Spinner />

  if (blockedMessage) {
    return (
      <div className="px-6 md:px-8 md:pt-6">
        <div className="mx-auto max-w-3xl">
          <PageHeader title="Property Payment" responsive />
          <div className="mt-6 rounded-xl bg-bg-accent px-4 py-6 text-center">
            <p className="font-raleway text-[16px] font-semibold tracking-[1px] text-text-primary">
              Property under offer
            </p>
            <p className="mt-2 text-[14px] text-text-secondary">
              {blockedMessage}
            </p>
            <Button
              variant="app-primary"
              size="full"
              className="mt-5"
              onClick={() =>
                navigate(`/transactions/${inspectionId}`, { replace: true })
              }
            >
              Back to inspection
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
  const purchaseProperty =
    purchase && typeof purchase.property !== "string"
      ? purchase.property
      : undefined
  const propertyPrice = purchaseProperty?.price ?? property?.price ?? 0
  const platformFee = purchase?.platformFee ?? purchaseProperty?.escrowFee ?? 0
  const serviceFee = purchaseProperty?.serviceCharge ?? 0
  // exactly what Paystack will charge
  const totalFee = purchase?.price ?? propertyPrice + platformFee + serviceFee

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
      // 409: an earlier attempt was actually paid; the server has moved it to
      // review, so show the transaction instead of charging again
      if (isAxiosError(err) && err.response?.status === 409) {
        invalidateDealQueries(queryClient)
        toast.success(
          "We've already received your payment. It's now waiting for admin approval."
        )
        navigate(`/transactions/${purchaseId}?type=purchase`, { replace: true })
        return
      }
      // the server explains a block, e.g. another buyer's payment is under review
      toast.error(
        requestError(err, "Couldn't start payment. Please try again.")
      )
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
                <span>Platform fee</span>
                <img
                  src={greyInfo}
                  alt=""
                  title="FindaHome's fee for holding your payment securely in escrow until the handover"
                />
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>{platformFee.toLocaleString()}</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4 text-text-secondary">
                Service fee
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>{serviceFee.toLocaleString()}</span>
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

        <p className="mt-1 flex items-start gap-1 text-[11px] leading-4 text-text-secondary">
          <img src={greyInfo} alt="" className="mt-0.5 h-3 w-3 shrink-0" />
          {REFUND_FEE_NOTICE}
        </p>

        <div className="mt-6 mb-10 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={handlePay}
              // wait for the purchase, so the total shown is the one charged
              disabled={!purchaseId || !purchase || isPaying}
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
