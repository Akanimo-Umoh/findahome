import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg"
import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import depositIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import Skeleton from "@/components/ui/Skeleton"
import NoWalletActivity from "./NoWalletActivity"
import type { MergedActivity } from "@/services/transaction.service"
import { useAgentActivities } from "@/hooks/useAgentActivities"

const CONFIG_BY_TYPE: Record<
  string,
  { icon: string; bg: string; sign: "" | "+" | "-" }
> = {
  wallet_funding: { icon: depositIcon, bg: "bg-[#274AD0]", sign: "+" },
  agent_payment: { icon: escrowReleaseIcon, bg: "bg-[#149D18]", sign: "+" },
  withdrawal: { icon: withdrawIcon, bg: "bg-button-bg", sign: "-" },
}

const TITLE_BY_TYPE: Record<string, string> = {
  wallet_funding: "Wallet deposit",
  agent_payment: "Escrow release",
  withdrawal: "Withdrawal",
}

function getPropertyTitle(property: MergedActivity["property"]): string {
  return property?.title ?? "Property"
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}

function ActivityItem({ item }: { item: MergedActivity }) {
  if (item.recordType === "transaction") {
    const config = CONFIG_BY_TYPE[item.type ?? ""] ?? {
      icon: depositIcon,
      bg: "bg-bg-accent",
      sign: "",
    }
    const title = TITLE_BY_TYPE[item.type ?? ""] ?? "Transaction"
    const subtitle =
      item.type === "withdrawal"
        ? item.status === "pending"
          ? "Under review"
          : item.status === "approved"
            ? "Successful"
            : "Declined"
        : item.type === "wallet_funding"
          ? "Funded via Paystack"
          : "Payment received"

    return (
      <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
        <div className="flex flex-1 gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} ${
              item.type === "wallet_funding" ? "rotate-180" : ""
            }`}
          >
            <img src={config.icon} alt="" />
          </div>

          <div>
            <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
              {title}
            </p>
            <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
              {subtitle}
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              {formatDate(item.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          {config.sign && <span className="text-button-bg">{config.sign}</span>}
          <img src={blueNaira} alt="" className="h-4 w-4" />
          <p className="text-button-bg">
            {(item.amount ?? 0).toLocaleString()}
          </p>
        </div>
      </div>
    )
  }

  // escrow branch — pending = hold, released = release, anything else (cancelled) hidden
  if (item.status !== "pending" && item.status !== "released") {
    return null
  }

  // escrow branch
  const isRelease = item.status === "released" // CHANGED
  const icon = isRelease ? escrowReleaseIcon : escrowHoldIcon
  const bg = isRelease ? "bg-[#149D18]" : "bg-[#F8B400]"
  const sign = isRelease ? "+" : ""
  const title = `Escrow ${isRelease ? "release" : "hold"} — ${getPropertyTitle(item.property)}`
  const subtitle = isRelease
    ? "Funds released to you"
    : "Funds held pending release"

  return (
    <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
      <div className="flex flex-1 gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}
        >
          <img src={icon} alt="" />
        </div>

        <div>
          <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
            {title}
          </p>
          <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
            {subtitle}
          </p>
          <p className="text-[12px] leading-4 text-text-secondary">
            {formatDate(item.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        {sign && <span className="text-button-bg">{sign}</span>}
        <img src={blueNaira} alt="" className="h-4 w-4" />
        <p className="text-button-bg">{(item.amount ?? 0).toLocaleString()}</p>
      </div>
    </div>
  )
}

function ActivitiesWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p>Recent Activities/Notifications</p>
      {children}
    </div>
  )
}

export default function Activities() {
  const { activities, isLoading, error } = useAgentActivities()

  // pending (hold) and released now count as visible; approved/cancelled excluded
  const visibleActivities = activities.filter(
    (item) =>
      item.recordType !== "escrow" ||
      item.status === "pending" ||
      item.status === "released"
  )

  if (isLoading) {
    return (
      <ActivitiesWrapper>
        <div className="mt-4 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </ActivitiesWrapper>
    )
  }

  if (error) {
    return (
      <ActivitiesWrapper>
        <p className="mt-10 text-center text-[12px] text-text-secondary">
          Failed to load activities.
        </p>
      </ActivitiesWrapper>
    )
  }

  if (visibleActivities.length === 0) {
    return (
      <ActivitiesWrapper>
        <NoWalletActivity />
      </ActivitiesWrapper>
    )
  }

  return (
    <ActivitiesWrapper>
      <div className="mt-4 space-y-4">
        {visibleActivities.map((item) => (
          <ActivityItem key={item._id} item={item} />
        ))}
      </div>
    </ActivitiesWrapper>
  )
}
