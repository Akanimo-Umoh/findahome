import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg";
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg";
import PerformanceSnapshot from "./PerformanceSnapshot";
import QuickActions from "./QuickActions";
import RecentActivities from "./RecentActivities";
import { useAuthContext } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div className="text-text-primary mb-10">
      <div className="flex items-center gap-2 mx-6 mt-0.5 md:mt-6 md:mx-8">
        <Avatar
          name={user?.name ?? "?"}
          src={user?.profilePicture}
          className="w-12.5 h-12.5 object-cover rounded-full shrink-0 md:w-25 md:h-25 md:text-[40px]"
        />

        <div>
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] md:hidden">
            Welcome {user?.name?.split(" ")[0]}!
          </p>
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] hidden md:flex md:font-medium md:text-[28px]">
            Welcome {user?.name}!
          </p>
          <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
            Here's what's happening with your listings
          </p>
        </div>
      </div>

      {/* available balance */}
      <div className="bg-button-bg p-3 rounded-2xl space-y-4 mt-6.25 mx-6 md:mx-8 md:mt-6 md:py-4">
        <div className="flex flex-col justify-between gap-2 w-full">
          <p className="text-[14px] text-bg-accent md:text-[16px]">
            Available Balance
          </p>

          <div className="flex items-center">
            <img src={whiteNairaIcon} alt="" />
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-bg-tertiary md:font-medium md:text-[28px]">
              3,000,000
            </p>
          </div>

          <p className="text-[12px] leading-4 text-bg-accent md:text-[14px]">
            Funds are available for withdrawal
          </p>
        </div>

        <button className="h-[45px] rounded-lg bg-bg-tertiary flex items-center justify-center w-full gap-2 md:h-12">
          <img src={withdrawIcon} alt="" />
          <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            Withdraw Funds
          </p>
        </button>
      </div>

      {/* performance snapshot */}
      <div className="mt-6.5 md:mt-12">
        <PerformanceSnapshot />
      </div>

      {/* quick actions */}
      <div className="mt-8.5 md:mt-12">
        <QuickActions />
      </div>

      {/* recent activities */}
      <div className="mt-8.5 md:mt-12">
        <RecentActivities />
      </div>
    </div>
  );
}
