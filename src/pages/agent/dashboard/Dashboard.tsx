import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg"
import PerformanceSnapshot from "./PerformanceSnapshot"
import QuickActions from "./QuickActions"
import RecentActivities from "./RecentActivities"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "@/components/Avatar"

export default function Dashboard() {
  const { user } = useAuthContext()

  return (
    <div className="mb-10">
      <div>
        <div className="mx-6 mt-0.5 flex items-center gap-2 md:mx-8 md:mt-6">
          <Avatar
            name={user?.name ?? "?"}
            src={user?.profilePicture}
            className="h-12.5 w-12.5 shrink-0 rounded-full object-cover md:h-25 md:w-25 md:text-[40px]"
          />

          <div>
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:hidden">
              Welcome {user?.name?.split(" ")[0]}!
            </p>

            <p className="hidden font-raleway text-[18px] font-semibold tracking-[1px] md:flex md:text-[28px] md:font-medium">
              Welcome {user?.name}!
            </p>

            <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
              Here's what's happening with your listings
            </p>
          </div>
        </div>

        {/* available balance */}
        <div className="mx-6 mt-6 space-y-4 rounded-2xl bg-button-bg p-3 md:mx-8 md:mt-6 md:py-4">
          <div className="flex w-full flex-col justify-between gap-2">
            <p className="text-[14px] text-bg-accent md:text-[16px]">
              Available Balance
            </p>

            <div className="flex items-center">
              <img src={whiteNairaIcon} alt="" />
              <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-bg-tertiary md:text-[28px] md:font-medium">
                3,000,000
              </p>
            </div>

            <p className="text-[12px] text-bg-accent md:text-[14px]">
              Funds are available for withdrawal
            </p>
          </div>

          <button className="flex h-11.25 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-bg-tertiary md:h-12">
            <img src={withdrawIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
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
    </div>
  )
}
