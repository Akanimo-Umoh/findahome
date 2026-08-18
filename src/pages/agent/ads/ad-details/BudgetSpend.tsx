import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"
import type { Ad } from "@/types/ad"
import { Progress } from "@/components/ui/progress"

type BudgetSpendProps = {
  ad: Ad
}

export default function BudgetSpend({ ad }: BudgetSpendProps) {
  if (ad.status === "pending") {
    return (
      <div>
        <p>Budget & Spend</p>
        <div className="mt-2 rounded-lg bg-bg-accent p-2">
          <p className="text-[14px] text-text-secondary">Total Budget</p>
          <div className="flex items-center">
            <img src={blackNaira} alt="" className="h-4 w-4" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              {ad.adBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const spent = ad.spent ?? 0
  const remaining = Math.max(ad.adBudget - spent, 0)
  const percentUsed =
    ad.adBudget > 0 ? Math.min((spent / ad.adBudget) * 100, 100) : 0

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
                {ad.adBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[14px] text-text-secondary">Spent so far</p>

            <div className="flex items-center">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                {spent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* progress bar */}
          <Progress value={percentUsed} className="h-2" />

          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4 text-text-secondary">
              {percentUsed.toFixed(1)}% used
            </p>

            <div className="flex items-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                {remaining.toLocaleString()} remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
