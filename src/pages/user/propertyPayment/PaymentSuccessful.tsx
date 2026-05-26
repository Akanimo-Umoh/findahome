import successImg from "@/assets/images/img-pay-inspection-fee.png"

export default function PaymentSuccessful() {
  return (
    <div className="modal-enter fixed inset-0 z-50 h-screen font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40">
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[24px] bg-white py-10 text-text-primary">
          <img src={successImg} alt="" />

          <div className="mt-4 flex w-[317px] flex-col items-center justify-center gap-2">
            <p className="text-center font-raleway text-[24px] font-medium tracking-[1px]">
              Your agent has received your handover request
            </p>
            <p className="text-center text-[12px] leading-4 text-text-secondary">
              You will receive a notification for handover schedule
            </p>
          </div>

          {/* buttons */}
          <button className="button-style mt-6.5 h-11.25 w-[343px] rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
