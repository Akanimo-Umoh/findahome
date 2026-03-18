import copyIcon from "@/assets/images/icon-green-clipboard.svg";
import blueNaira from "@/assets/images/icon-naira.svg";

export default function PaymentSummary() {
  return (
    <div>
      {/* payment summary */}
      <div className="mt-6">
        <p className="">Payment Summary</p>

        <div className="mt-2 payment-summary space-y-2">
          <div className="payment-summary-ctn">
            <p className="">Payment in Escrow</p>
            <p className="text-[14px] tracking-[1px] text-button-bg font-raleway font-semibold flex items-center justify-center">
              <img src={blueNaira} alt="" className="w-4 h-4" />
              <span>3.000,000</span>
            </p>
          </div>

          <div className="payment-summary-ctn">
            <p>Payment Type</p>
            <p className="text-text-secondary">Property Fee</p>
          </div>

          <div className="payment-summary-ctn">
            <p className="">Reference Number</p>
            <p className="text-text-secondary flex items-center justify-center gap-0.5">
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
  );
}
