import copyIcon from "@/assets/images/icon-green-clipboard.svg"
import blueNaira from "@/assets/images/icon-naira.svg"

export default function PaymentSummary() {
  return (
    <div>
      {/* payment summary */}
      <div className="mt-6">
        <p className="">Payment Summary</p>

        <div className="payment-summary mt-2 space-y-2">
          <div className="payment-summary-ctn">
            <p className="">Payment in Escrow</p>
            <p className="flex items-center justify-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <span>3.000,000</span>
            </p>
          </div>

          <div className="payment-summary-ctn">
            <p>Payment Type</p>
            <p className="text-text-secondary">Property Fee</p>
          </div>

          <div className="payment-summary-ctn">
            <p className="">Reference Number</p>
            <p className="flex items-center justify-center gap-0.5 text-text-secondary">
              <span>Ref ID: FH-TRX-002834</span>
              <img src={copyIcon} alt="" />
            </p>
          </div>

          <div className="payment-summary-ctn">
            <p>Date Paid</p>
            <p className="text-text-secondary">15th Nov, 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
