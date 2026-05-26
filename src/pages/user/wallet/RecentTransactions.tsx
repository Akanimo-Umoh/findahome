import iconTransactions from "@/assets/images/icon-pay-inspection-fee.svg"
import blackNaira from "@/assets/images/icon-black-naira.svg"
import greenNaira from "@/assets/images/icon-green-naira.svg"

export default function RecentTransactions() {
  return (
    <div>
      <p>Recent Transactions</p>

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-accent">
            <img src={iconTransactions} alt="" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Inspection Fee – FH-2458</p>
              <p className="flex items-center">
                <img src={blackNaira} alt="" />
                <span>-10,000</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4">
              <p className="text-text-secondary">Today, 2:45pm</p>
              <p className="rounded-2xl bg-button-bg p-1 text-white">
                Held in escrow
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-accent">
            <img src={iconTransactions} alt="" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Inspection Fee – FH-2458</p>
              <p className="flex items-center">
                <img src={greenNaira} alt="" />
                <span className="text-[#149D18]">-10,000</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4">
              <p className="text-text-secondary">Today, 2:45pm</p>
              <p className="rounded-2xl bg-[#149D18] p-1 text-white">
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
