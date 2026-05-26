import successImg from "@/assets/images/img-pay-inspection-fee.png"

export default function ConfirmedSuccess() {
  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40 px-6">
        <div className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-xl bg-white px-[27px] py-[43px]">
          <div>
            <img src={successImg} alt="" className="mx-auto" />
          </div>

          <div className="mt-2 flex w-[258px] flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
                Handover Completed!
              </p>
              <p className="text-center text-[14px] text-text-secondary">
                Success! The buyer confirmed the handover and your payment is
                now released
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                View Transaction Details
              </button>

              <button className="h-11.25 w-full rounded-lg border border-text-secondary font-raleway text-[14px] font-semibold tracking-[1px]">
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
