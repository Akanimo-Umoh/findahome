import successImg from "@/assets/images/img-pay-inspection-fee.png"

export default function PropertyPaymentSuccessful() {
  return (
    <div className="modal-enter fixed inset-0 z-50 h-screen font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40">
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[24px] bg-white py-14.5 text-text-primary">
          <img src={successImg} alt="" />

          <div className="mt-4 flex w-[300px] flex-col items-center justify-center gap-2">
            <p className="text-center font-raleway text-[24px] font-medium tracking-[1px]">
              Payment Successful!
            </p>
            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Your payment of ₦3,060,000 has been securely placed in escrow.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center rounded-xl bg-bg-accent p-2">
            <p className="text-[12px] text-text-secondary">
              Escrow ID Reference
            </p>
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              ESC-45892024
            </p>
          </div>

          {/* buttons */}
          <div className="mt-6.5 flex w-[343px] flex-col gap-3">
            <button className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              View Escrow Details
            </button>

            <button className="h-11.25 w-full rounded-lg border border-text-secondary font-raleway text-[14px] font-semibold tracking-[1px]">
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
