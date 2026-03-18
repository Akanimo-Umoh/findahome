import greenCalendar from "@/assets/images/icon-calendar-check.svg";

export default function InspectionScheduledModal() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary">
      {/* black overlay */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center px-6">
        <div className="bg-white py-[43px] px-[27px] rounded-xl max-w-[340px] w-full">
          <div className="w-10 h-10 rounded-full bg-[#10B98133] flex items-center justify-center mx-auto">
            <img src={greenCalendar} alt="" />
          </div>

          <div className="flex flex-col gap-2 items-center mt-8">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
              Visit Scheduled
            </p>
            <p className="text-[12px] leading-4 text-black">
              Your Property visit has been confirmed
            </p>
          </div>

          {/* visit details */}
          <div className="bg-bg-accent p-2 rounded-xl flex flex-col justify-center gap-2 mt-4.5">
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

          <div className="flex flex-col gap-3 items-center justify-center mt-7.5 max-w-[250px] mx-auto">
            <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white">
              View Visit Details
            </button>

            <button className="font-raleway font-semibold text-[14px] tracking-[1px] bg-button-disabled border border-text-secondary h-[45px] w-full rounded-lg">
              Back to chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
