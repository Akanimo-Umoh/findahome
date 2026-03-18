import iconTransactions from "@/assets/images/icon-pay-inspection-fee.svg";
import blackNaira from "@/assets/images/icon-black-naira.svg";
import greenNaira from "@/assets/images/icon-green-naira.svg";

export default function RecentTransactions() {
  return (
    <div>
      <p>Recent Transactions</p>

      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-bg-accent rounded-full">
            <img src={iconTransactions} alt="" />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Inspection Fee – FH-2458</p>
              <p className="flex items-center">
                <img src={blackNaira} alt="" />
                <span>-10,000</span>
              </p>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between">
              <p className="text-text-secondary">Today, 2:45pm</p>
              <p className="text-white bg-button-bg p-1 rounded-2xl">
                Held in escrow
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-bg-accent rounded-full">
            <img src={iconTransactions} alt="" />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Inspection Fee – FH-2458</p>
              <p className="flex items-center">
                <img src={greenNaira} alt="" />
                <span className="text-[#149D18]">-10,000</span>
              </p>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between">
              <p className="text-text-secondary">Today, 2:45pm</p>
              <p className="text-white bg-[#149D18] p-1 rounded-2xl">
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
