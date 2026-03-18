import agentAVatar from "@/assets/images/agentAvatar.jpg";
import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg";
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg";
import PerformanceSnapshot from "./PerformanceSnapshot";
import QuickActions from "./QuickActions";
import RecentActivities from "./RecentActivities";

export default function Dashboard() {
  return (
    <div className="text-text-primary mb-10">
      <div className="flex items-center gap-2 mx-6">
        <img
          src={agentAVatar}
          alt=""
          className="w-12.5 h-12.5 object-cover rounded-full"
        />

        <div>
          <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
            Welcome Back Samson!
          </p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Here's what's happening with your listings
          </p>
        </div>
      </div>

      {/* available balance */}
      <div className="bg-button-bg p-3 rounded-2xl space-y-4 mt-[25px] mx-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-[14px] text-bg-accent">Available Balance</p>
            <div className="flex items-center">
              <img src={whiteNairaIcon} alt="" />
              <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-bg-tertiary">
                3,000,000
              </p>
            </div>
            <p className="text-[12px] leading-4 text-bg-accent">
              Funds are available for withdrawal
            </p>
          </div>

          <p className="text-[14px] text-[#F8B400]">See Escrow Wallet</p>
        </div>

        <button className="h-[45px] rounded-lg bg-bg-tertiary flex items-center justify-center w-full gap-2">
          <img src={withdrawIcon} alt="" />
          <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg">
            Withdraw Funds
          </p>
        </button>
      </div>

      {/* performance snapshot */}
      <div className="mt-6.5">
        <PerformanceSnapshot />
      </div>

      {/* quick actions */}
      <div className="mt-8.5">
        <QuickActions />
      </div>

      {/* recent activities */}
      <div className="mt-8.5">
        <RecentActivities />
      </div>
    </div>
  );
}
