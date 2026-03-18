import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import pendingIcon from "@/assets/agentImages/icon-pending-transaction.svg";
import greenNairaIcon from "@/assets/agentImages/icon-green-naira.svg";
import paidOutIcon from "@/assets/agentImages/icon-paid-out.svg";
import warningIcon from "@/assets/agentImages/icon-warning.svg";
import Transactions from "./Transactions";

export default function MyTransactions() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Transactions
        </p>
      </div>

      <section className="mt-6">
        <div className="grid gap-2 grid-cols-[repeat(auto-fit,min(98px,104px))] justify-center sm:gap-[15px]">
          <div className="space-y-4 py-2 pl-4 bg-white rounded-lg performance-shadow">
            <div className="bg-[#FF6B6B33] rounded-lg p-2 w-7.5 h-7.5">
              <img src={pendingIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#10B981]">5</p>
              <p className="text-[12px] leading-4 text-nowrap">Pending Deals</p>
            </div>
          </div>

          <div className="space-y-4 py-2 pl-4 bg-white rounded-lg performance-shadow">
            <div className="bg-[#10B98133] rounded-lg p-2 w-7.5 h-7.5">
              <img src={paidOutIcon} alt="" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <img src={greenNairaIcon} alt="" />
                <p className="text-[14px] text-[#10B981]">1,000,000</p>
              </div>
              <p className="text-[12px] leading-4 text-nowrap">Paid out</p>
            </div>
          </div>

          <div className="space-y-4 py-2 pl-4 bg-white rounded-lg performance-shadow">
            <div className="bg-[#D0272733] rounded-lg p-2 w-7.5 h-7.5">
              <img src={warningIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#D02727]">10</p>
              <p className="text-[12px] leading-4 text-nowrap">Disputes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Transactions />
      </section>
    </div>
  );
}
