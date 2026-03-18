import successImg from "@/assets/images/img-pay-inspection-fee.png";

export default function PropertyPaymentSuccessful() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary h-screen">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center">
        <div className="text-text-primary py-14.5 flex flex-col items-center justify-center bg-white rounded-t-[24px] w-full absolute bottom-0">
          <img src={successImg} alt="" />

          <div className="flex flex-col items-center justify-center gap-2 mt-4 w-[300px]">
            <p className="font-raleway font-medium tracking-[1px] text-[24px] text-center">
              Payment Successful!
            </p>
            <p className="text-[12px] leading-4 text-text-secondary text-center">
              Your payment of ₦3,060,000 has been securely placed in escrow.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-bg-accent mt-7 rounded-xl p-2">
            <p className="text-[12px] text-text-secondary">
              Escrow ID Reference
            </p>
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              ESC-45892024
            </p>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-3 mt-6.5 w-[343px]">
            <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white">
              View Escrow Details
            </button>

            <button className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-11.25 rounded-lg border border-text-secondary">
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
