import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"

export default function BudgetSpend() {
  return (
    <div>
      <p>Budget & Spend</p>

      <div className="mt-2 flex flex-col gap-2 rounded-lg bg-bg-accent p-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-text-secondary">Total Budget</p>
            <div className="flex items-center">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                15,000
              </p>
            </div>
          </div>

          <div>
            <p className="text-[14px] text-text-secondary">Spent so far</p>

            <div className="flex items-center">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                5,600
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* progress bar */}
          <div>progress bar</div>

          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4 text-text-secondary">
              60.8% used
            </p>

            <div className="flex items-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                5,600 remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
