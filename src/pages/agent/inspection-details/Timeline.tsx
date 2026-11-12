import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"

export default function Timeline() {
  return (
    <div>
      {/* escrow timeline */}
      <div className="mt-6">
        <p>Escrow Timeline</p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
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
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
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
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
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
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
              {/* <img src={checkIcon} alt="" /> */}
              {/* note: if it is confirmed, show the img and also change the div bg to bg-[#149D18] */}
            </div>

            <div>
              <p className="text-[14px]">
                Inspection schedule not confirmed yet
                {/* note: if it is confirmed, remove the text above and pt this:
                "Buyer confirmed inspection Schedule" */}
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Buyer must confirm inspection completion
                {/* if it is completed, show the time and remove the other text */}
                {/* 11 Nov · 3:22 PM */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
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
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
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
  )
}
