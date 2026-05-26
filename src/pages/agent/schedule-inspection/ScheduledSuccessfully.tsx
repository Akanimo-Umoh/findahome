import successImg from "@/assets/images/img-inspection-fee-successful.png"

export default function ScheduledSuccessfully() {
  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-end justify-center bg-black/40">
        <div className="flex w-full flex-col items-center justify-center rounded-t-[24px] bg-white px-6 py-[43px]">
          <div>
            <img src={successImg} alt="" className="mx-auto" />
          </div>

          <div className="mt-4 flex w-[326px] flex-col">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center font-raleway text-[24px] font-medium tracking-[1px]">
                Your inspection has been scheduled!
              </p>

              <p className="text-center text-[12px] leading-4 text-text-secondary">
                The buyer will be notified of the time and date scheduled
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              {/* date */}
              <p>Date: 14 Nov 2025</p>
              {/* time */}
              <p>Time: 11:00 AM</p>
            </div>

            <div className="mt-6 flex max-w-[343px] flex-col gap-3">
              <button className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
