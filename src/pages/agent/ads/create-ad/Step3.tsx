import { Slider } from "@/components/ui/slider"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"

const BUDGET_MIN = 1000
const BUDGET_MAX = 50000
const BUDGET_STEP = 500
const DURATION_MIN = 1
const DURATION_MAX = 30

type Step3Props = {
  dailyBudget: number
  duration: number
  onChangeDailyBudget: (value: number) => void
  onChangeDuration: (value: number) => void
}

export default function Step3({
  dailyBudget,
  duration,
  onChangeDailyBudget,
  onChangeDuration,
}: Step3Props) {
  const totalBudget = dailyBudget * duration
  const reachMin = Math.round(totalBudget * 0.6).toLocaleString()
  const reachMax = Math.round(totalBudget * 1).toLocaleString()

  return (
    <div className="">
      <p>Step 3: Set Budget</p>

      <div className="mt-2 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] leading-4">Daily budget</label>

            <div className="flex items-center border border-bg-accent px-1 py-0.5">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <p className="text-[12px] leading-4">
                {dailyBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <Slider
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={[dailyBudget]}
              onValueChange={([val]) => onChangeDailyBudget(val)}
              className="step3-slider"
            />

            <div className="mt-1 flex justify-between">
              <span className="text-[10px] text-text-secondary">
                ₦{BUDGET_MIN.toLocaleString()}
              </span>
              <span className="text-[10px] text-text-secondary">
                ₦{BUDGET_MAX.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] leading-4">Duration</label>

            <div className="flex items-center border border-bg-accent px-1 py-0.5">
              <p className="text-[12px] leading-4">
                {duration} {duration === 1 ? "Day" : "Days"}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <Slider
              min={DURATION_MIN}
              max={DURATION_MAX}
              value={[duration]}
              onValueChange={([val]) => onChangeDuration(val)}
              className="step3-slider"
            />

            <div className="mt-1 flex justify-between">
              <span className="text-[10px] text-text-secondary">
                {DURATION_MIN} day
              </span>
              <span className="text-[10px] text-text-secondary">
                {DURATION_MAX} days
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] leading-4">Ad budget</label>

            <div className="flex items-center border border-bg-accent px-1 py-0.5">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <p className="text-[12px] font-semibold">
                {totalBudget.toLocaleString()} over {duration}{" "}
                {duration === 1 ? "day" : "days"}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between text-[12px] leading-4 text-text-secondary">
            <p>Estimated reach</p>
            <p>
              {reachMin} - {reachMax}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
