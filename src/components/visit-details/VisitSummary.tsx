import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"

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
        <div className="visit-summary-title">
          <p>Transaction ID:</p>
          <p className="flex items-center justify-center gap-0.5">
            <span className="text-text-secondary">{transactionId}</span>
            <img
              src={copyIcon}
              alt=""
              className="cursor-pointer md:h-6 md:w-6"
              title="copy"
            />
          </p>
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
