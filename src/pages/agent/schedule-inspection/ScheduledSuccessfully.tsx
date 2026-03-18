import successImg from "@/assets/images/img-inspection-fee-successful.png";

export default function ScheduledSuccessfully() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-end justify-center">
        <div className="bg-white py-[43px] rounded-t-[24px] w-full flex flex-col items-center justify-center px-6">
          <div>
            <img src={successImg} alt="" className="mx-auto" />
          </div>

          <div className="flex flex-col mt-4 w-[326px]">
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="font-raleway font-medium text-[24px] tracking-[1px] text-center">
                Your inspection has been scheduled!
              </p>

              <p className="text-[12px] text-text-secondary leading-4 text-center">
                The buyer will be notified of the time and date scheduled
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-4">
              {/* date */}
              <p>Date: 14 Nov 2025</p>
              {/* time */}
              <p>Time: 11:00 AM</p>
            </div>

            <div className="flex flex-col gap-3 max-w-[343px] mt-6">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white">
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
