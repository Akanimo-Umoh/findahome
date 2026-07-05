import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
import blueNaira from "@/assets/images/icon-naira.svg"

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

        <div className="payment-summary-ctn">
          <p className="payment-summary-title">Reference Number</p>

          <p className="payment-summary-label flex items-center justify-center gap-0.5">
            <span>Ref ID: {referenceNumber}</span>
            <img src={copyIcon} alt="" className="md:h-6 md:w-6" />
          </p>
        </div>

        <div className="payment-summary-ctn">
          <p className="payment-summary-title">Date Paid</p>

          <p className="payment-summary-label">{datePaid}</p>
        </div>
      </div>
    </section>
  )
}
