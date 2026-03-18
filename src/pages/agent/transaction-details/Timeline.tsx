import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg";

export default function Timeline() {
  return (
    <div>
      {/* escrow timeline */}
      <div className="mt-6">
        <p>Escrow Timeline</p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
              <img src={checkIcon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">Payment Made by Buyer</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                11 Nov · 3:22 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
              <img src={checkIcon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">Funds held in Escrow</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                11 Nov · 3:22 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
              <img src={checkIcon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">Schedule Inspection</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                11 Nov · 3:22 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
              {/* <img src={checkIcon} alt="" /> */}
            </div>

            <div>
              <p className="text-[14px]">
                Inspection schedule not confirmed yet
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Buyer must confirm inspection completion
                {/* if it is completed, show the time and remove the other text */}
                {/* 11 Nov · 3:22 PM */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
              <img src={checkIcon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">Inspection Completed</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                {/* replace the text with date and time if it is complete= 11 Nov · 3:22 PM */}
                Pending completion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
              <img src={checkIcon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">Payment Released</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                {/* replace the text with date and time if it is complete= 11 Nov · 3:22 PM */}
                Pending completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
