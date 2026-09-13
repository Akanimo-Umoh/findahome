import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
import { useState } from "react"

interface VisitSummaryProps {
  dateTime: string
  visitType: string
  transactionId: string
  paymentStatus: string
}

export default function VisitSummary({
  dateTime,
  visitType,
  transactionId,
  paymentStatus,
}: VisitSummaryProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transactionId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy transaction ID:", err)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2 rounded-xl border border-bg-accent p-2">
      <p className="md:text-[18px] md:font-semibold">Summary</p>
      <div className="space-y-2">
        <div className="visit-summary-title">
          <p>Date & Time:</p>
          <p className="text-text-secondary">{dateTime}</p>
        </div>
        <div className="visit-summary-title">
          <p>Visit Type:</p>
          <p className="text-text-secondary">{visitType}</p>
        </div>
        <div className="visit-summary-title space-x-2">
          <p>Transaction ID:</p>
          <button
            type="button"
            onClick={handleCopy}
            className="line-clamp-1 flex flex-1 cursor-pointer items-center justify-end gap-0.5"
          >
            <span className="line-clamp-1 text-text-secondary">
              {transactionId}
            </span>
            <img src={copyIcon} alt="" className="md:h-6 md:w-6" title="copy" />

            {copied && (
              <p className="text-center text-[11px] text-button-bg">Copied!</p>
            )}
          </button>
        </div>
        <div className="visit-summary-title">
          <p>Payment Status</p>
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            {paymentStatus}
          </p>
        </div>
      </div>
    </div>
  )
}
