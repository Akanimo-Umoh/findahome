import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import blueNaira from "@/assets/images/icon-naira.svg"
import propertyImg from "@/assets/images/property.jpg"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import greyNaira from "@/assets/images/icon-chat-naira.svg"
import blackNaira from "@/assets/images/icon-black-naira.svg"
import greyInfo from "@/assets/images/icon-grey-info.svg"
import cancelIcon from "@/assets/images/icon-cancel-payment.svg"
import { Button } from "@/components/ui/button"
import PropertyPaymentSuccessful from "@/components/property-payment/PropertyPaymentSuccessful"
import PageHeader from "@/components/shared/PageHeader"

export default function PropertyPayment() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [successOpen, setSuccessOpen] = useState(false)

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-3xl">
        {/* header */}
        <PageHeader title="Property Payment" responsive />

        {/* property details */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="line-clamp-2 font-raleway text-[14px] font-semibold tracking-[1px]">
              Luxury 4 Bed-room Apartment
            </p>
            <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
              Lekki Phase 1, Lagos.
            </p>
            <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <span>3M/yr</span>
            </p>
          </div>
        </div>

        {/* agent details */}
        <div className="mt-4 flex items-center gap-2">
          <img
            src={agentAvatar}
            alt=""
            className="h-7.5 w-7.5 rounded-full object-cover"
          />
          <div>
            <p className="text-[12px] font-semibold">Maryann Kikomu</p>
            <p className="text-[12px] leading-4">Verified Agent</p>
          </div>
        </div>

        {/* payment breakdown */}
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-bg-accent p-2">
          <p>Payment Breakdown</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4 text-text-secondary">
                Property Cost
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>3M/yr</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <span>Escrow fee</span>
                <img src={greyInfo} alt="" />
              </p>
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={greyNaira} alt="" />
                <span>60,000</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold tracking-[1px]">
                Total Fee
              </p>
              <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
                <img src={blackNaira} alt="" />
                <span>3,060,000</span>
              </p>
            </div>
          </div>
        </div>

        {/* payment method */}
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

        {/* confirm payment */}
        <div className="mt-6 mb-10 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={() => {
                // TODO: replace with real Paystack flow (usePaystackPayment from
                // react-paystack, or PaystackPop.setup()), and only call
                // setSuccessOpen(true) inside its onSuccess callback
                setSuccessOpen(true)
              }}
            >
              Proceed with payment
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

        <PropertyPaymentSuccessful
          open={successOpen}
          onOpenChange={setSuccessOpen}
          transactionId={transactionId ?? ""}
        />
      </div>
    </div>
  )
}
