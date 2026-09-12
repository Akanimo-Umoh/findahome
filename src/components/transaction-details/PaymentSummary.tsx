import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
import blueNaira from "@/assets/images/icon-naira.svg"
import { useState } from "react"

interface PaymentSummaryProps {
  amountInEscrow: string
  paymentType: string
  referenceNumber: string
  datePaid: string
}

export default function PaymentSummary({
  amountInEscrow,
  paymentType,
  referenceNumber,
  datePaid,
}: PaymentSummaryProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy reference:", err)
    }
  }

  return (
    <section className="md:rounded-xl md:border md:border-bg-accent md:p-2 lg:p-3">
      <p className="md:text-[18px] md:font-semibold">Payment Summary</p>

      <div className="payment-summary mt-2 space-y-2">
        <div className="payment-summary-ctn">
          <p className="payment-summary-title">Payment in Escrow</p>

          <p className="flex items-center justify-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            <img src={blueNaira} alt="" className="h-4 w-4" />
            <span>{amountInEscrow}</span>
          </p>
        </div>

        <div className="payment-summary-ctn">
          <p className="payment-summary-title">Payment Type</p>

          <p className="payment-summary-label">{paymentType}</p>
        </div>

        <div className="payment-summary-ctn space-x-2">
          <p className="payment-summary-title">Reference Number</p>

          <button
            type="button"
            onClick={handleCopy}
            className="payment-summary-label line-clamp-1 flex flex-1 cursor-pointer items-center justify-end gap-0.5"
          >
            <span className="line-clamp-1">{referenceNumber}</span>
            <img src={copyIcon} alt="" className="md:h-6 md:w-6" />

            {copied && (
              <p className="text-center text-[11px] text-button-bg">Copied!</p>
            )}
          </button>
        </div>

        <div className="payment-summary-ctn">
          <p className="payment-summary-title">Date Paid</p>
          <p className="payment-summary-label">{datePaid}</p>
        </div>
      </div>
    </section>
  )
}
