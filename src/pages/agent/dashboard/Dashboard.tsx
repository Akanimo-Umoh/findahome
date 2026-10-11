import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg"
import PerformanceSnapshot from "./PerformanceSnapshot"
import QuickActions from "./QuickActions"
import RecentActivities from "./RecentActivities"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "@/components/Avatar"
import { useAgentListings } from "@/hooks/useAgentListings"
import { useAgentTransactionsList } from "@/hooks/useAgentTransactionsList"
import { useAgentAds } from "@/hooks/useAgentAds"
import { getCategory } from "@/pages/agent/my-transaction/transactionHelpers"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { activeListingsCount, isLoading: isLoadingListings } =
    useAgentListings()
  const { items: transactions, isLoading: isLoadingTransactions } =
    useAgentTransactionsList()
  const { ads, isLoading: isLoadingAds } = useAgentAds()

  const pendingTransactionsCount = transactions.filter(
    (transaction) => getCategory(transaction) === "pending"
  ).length
  const completedDealsCount = transactions.filter(
    (transaction) => getCategory(transaction) === "completed"
  ).length
  const runningAdsCount = ads.filter((ad) => ad.status === "active").length

  return (
    <div className="mb-10 pt-0.5 md:pt-6 lg:pt-8">
      <div className="flex items-center gap-2">
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
      <div className="mt-6 space-y-4 rounded-2xl bg-button-bg p-3 md:mt-6 md:py-4">
        <div className="flex w-full flex-col justify-between gap-2">
          <p className="text-[14px] text-bg-accent md:text-[16px]">
            Available Balance
          </p>

          <div className="flex items-center">
            <img src={whiteNairaIcon} alt="" />
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-bg-tertiary md:text-[28px] md:font-medium">
              {(user?.balance ?? 0).toLocaleString()}
            </p>
          </div>

          <p className="text-[12px] text-bg-accent md:text-[14px]">
            Funds available for withdrawal
          </p>
        </div>

        <button
          onClick={() => navigate("/agent/withdraw-funds")}
          className="flex h-11.25 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-bg-tertiary md:h-12"
        >
          <img src={withdrawIcon} alt="" />
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            Withdraw Funds
          </p>
        </button>
      </div>

      {/* performance snapshot */}
      <div className="mt-6.5 md:mt-12">
        <PerformanceSnapshot
          activeListingsCount={activeListingsCount}
          isLoadingActiveListings={isLoadingListings}
          pendingTransactionsCount={pendingTransactionsCount}
          completedDealsCount={completedDealsCount}
          isLoadingTransactions={isLoadingTransactions}
          runningAdsCount={runningAdsCount}
          isLoadingAds={isLoadingAds}
        />
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
  )
}
