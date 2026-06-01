import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"

export default function EscrowTimeline() {
  return (
    <div>
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
            <p className="text-[14px]">Agent scheduled an inspection</p>
            <p className="text-[12px] leading-4 text-text-secondary">
              11 Nov · 3:22 PM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
            {/* <img src={checkIcon} alt="" /> */}
          </div>

          <div>
            <p className="text-[14px]">Inspection schedule not confirmed yet</p>
            <p className="text-[12px] leading-4 text-text-secondary">
              11 Nov · 3:22 PM
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
              11 Nov · 3:22 PM
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
              11 Nov · 3:22 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
