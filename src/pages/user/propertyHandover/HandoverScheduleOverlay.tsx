import greenCalendar from "@/assets/images/icon-calendar-check.svg"

export default function HandoverScheduleOverlay() {
  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro text-text-primary">
      {/* black overlay */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40 px-6">
        <div className="w-full max-w-[340px] rounded-xl bg-white px-[27px] py-[43px]">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#10B98133]">
            <img src={greenCalendar} alt="" />
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              Handover Scheduled
            </p>
            <p className="text-[12px] leading-4 text-black">
              Your Property handover has been confirmed
            </p>
          </div>

          {/* visit details */}
          <div className="mt-4.5 flex flex-col justify-center gap-2 rounded-xl bg-bg-accent p-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4">Date & Time:</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                20th Oct, 2025 at 10 AM
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4">Visit Type:</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Physical Visit
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4">Agent:</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Maryann Kikomu
              </p>
            </div>
          </div>

          <div className="mx-auto mt-7.5 flex max-w-[250px] flex-col items-center justify-center gap-3">
            <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              View Handover Details
            </button>

            <button className="h-[45px] w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
              Back to chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
