// import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg"
// import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg"
// import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
// import depositIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
// import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"

// type ActivityType = "escrow_hold" | "escrow_release" | "withdrawal" | "deposit"

// type WalletActivity = {
//   id: string
//   type: ActivityType
//   title: string
//   subtitle: string
//   date: string
//   amount: number
// }

// const ACTIVITY_CONFIG: Record<
//   ActivityType,
//   { icon: string; bg: string; sign: "" | "+" | "-" }
// > = {
//   escrow_hold: { icon: escrowHoldIcon, bg: "bg-[#F8B400]", sign: "" },
//   escrow_release: { icon: escrowReleaseIcon, bg: "bg-[#149D18]", sign: "+" },
//   withdrawal: { icon: withdrawIcon, bg: "bg-button-bg", sign: "-" },
//   deposit: { icon: depositIcon, bg: "bg-[#274AD0]", sign: "+" },
// }

// // TODO: static placeholder data — replace with useQuery(["walletActivities"])
// // once the wallet/transactions endpoint exists
// const MOCK_ACTIVITIES: WalletActivity[] = [
//   {
//     id: "1",
//     type: "escrow_hold",
//     title: "Escrow hold — Lekki Phase 1 apartment",
//     subtitle: "Buyer paid inspection fee",
//     date: "Today · 12:30 PM",
//     amount: 10000,
//   },
//   {
//     id: "2",
//     type: "escrow_release",
//     title: "Escrow release — Lekki Phase 1 apartment",
//     subtitle: "Buyer confirmed inspection",
//     date: "Today · 1:10 PM",
//     amount: 10000,
//   },
//   {
//     id: "3",
//     type: "deposit",
//     title: "Wallet deposit",
//     subtitle: "Funded via Paystack",
//     date: "Yesterday · 3:45 PM",
//     amount: 50000,
//   },
//   {
//     id: "4",
//     type: "escrow_hold",
//     title: "Escrow hold — Ikoyi duplex",
//     subtitle: "Buyer paid for property",
//     date: "Yesterday · 9:05 AM",
//     amount: 3500000,
//   },
//   {
//     id: "5",
//     type: "withdrawal",
//     title: "Withdrawal successful",
//     subtitle: "Transferred to First Bank ****4810",
//     date: "2 days ago · 10:00 AM",
//     amount: 3500000,
//   },
//   {
//     id: "6",
//     type: "escrow_release",
//     title: "Escrow release — 2-bedroom apartment, Ikorodu",
//     subtitle: "Buyer confirmed property handover",
//     date: "10 Nov 2025 · 2:00 PM",
//     amount: 700000,
//   },
// ]

// function ActivityItem({ activity }: { activity: WalletActivity }) {
//   const { icon, bg, sign } = ACTIVITY_CONFIG[activity.type]

//   return (
//     <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
//       <div className="flex flex-1 gap-3">
//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${activity.type === "deposit" ? "rotate-180" : ""}`}
//         >
//           <img src={icon} alt="" />
//         </div>

//         <div>
//           <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
//             {activity.title}
//           </p>
//           <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
//             {activity.subtitle}
//           </p>
//           <p className="text-[12px] leading-4 text-text-secondary">
//             {activity.date}
//           </p>
//         </div>
//       </div>

//       <div className="flex shrink-0 items-center">
//         {sign && <span className="text-button-bg">{sign}</span>}
//         <img src={blueNaira} alt="" />
//         <p className="text-button-bg">{activity.amount.toLocaleString()}</p>
//       </div>
//     </div>
//   )
// }

// export default function Activities() {
//   if (MOCK_ACTIVITIES.length === 0) {
//     return (
//       <div>
//         <p>Recent Activities/Notifications</p>
//         <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
//           <p className="text-[14px] font-semibold">No activity yet</p>
//           <p className="max-w-70 text-[12px] leading-4 text-text-secondary">
//             Your wallet transactions will show up here once you start earning or
//             funding your balance.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <p>Recent Activities/Notifications</p>
//       <div className="mt-4 space-y-4">
//         {MOCK_ACTIVITIES.map((activity) => (
//           <ActivityItem key={activity.id} activity={activity} />
//         ))}
//       </div>
//     </div>
//   )
// }

import { useQuery } from "@tanstack/react-query"
import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"
import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg"
import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import depositIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import Skeleton from "@/components/ui/Skeleton"
import NoWalletActivity from "./NoWalletActivity"

type TransactionType = "wallet_funding" | "agent_payment" | "withdrawal"
type TransactionStatus = "pending" | "approved" | "declined" | "failed"

type Transaction = {
  _id: string
  from: string | { _id: string; name?: string; email: string }
  to?: string | { _id: string; name?: string; email: string }
  amount: number
  reference: string
  type: TransactionType
  status: TransactionStatus
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

type EscrowStatus = "pending" | "approved" | "released" | "cancelled"

type EscrowRecord = {
  _id: string
  property: string | { _id: string; title: string }
  buyer: string | { _id: string; name?: string; email: string }
  seller: string
  amount: number
  status: EscrowStatus
  type: string
  reference: string
  createdAt: string
}

// new discriminated union — every list item is one of these two kinds
type ActivityItemData =
  | { kind: "transaction"; data: Transaction }
  | { kind: "escrow"; data: EscrowRecord }

const TRANSACTION_CONFIG: Record<
  TransactionType,
  { icon: string; bg: string; sign: "" | "+" | "-" }
> = {
  wallet_funding: { icon: depositIcon, bg: "bg-[#274AD0]", sign: "+" },
  agent_payment: { icon: escrowReleaseIcon, bg: "bg-[#149D18]", sign: "+" },
  withdrawal: { icon: withdrawIcon, bg: "bg-button-bg", sign: "-" },
}

// new config for the two escrow statuses we actually display
const ESCROW_CONFIG: Record<
  "approved" | "released",
  { icon: string; bg: string; sign: "" | "+" }
> = {
  approved: { icon: escrowHoldIcon, bg: "bg-[#F8B400]", sign: "" }, // hold — no sign, money isn't the agent's yet
  released: { icon: escrowReleaseIcon, bg: "bg-[#149D18]", sign: "+" },
}

const TITLE_BY_TYPE: Record<TransactionType, string> = {
  wallet_funding: "Wallet deposit",
  agent_payment: "Escrow release",
  withdrawal: "Withdrawal",
}

function getSubtitle(t: Transaction): string {
  if (t.type === "withdrawal") {
    if (t.status === "pending") return "Under review"
    if (t.status === "approved") return "Successful"
    if (t.status === "declined" || t.status === "failed") return "Declined"
  }
  if (t.type === "wallet_funding") return "Funded via Paystack"
  if (t.type === "agent_payment") return "Payment received"
  return ""
}

// property title helper for escrow rows — property comes back as either a plain id or a populated object depending on the endpoint
function getPropertyTitle(property: EscrowRecord["property"]): string {
  return typeof property === "string"
    ? "Property"
    : (property?.title ?? "Property")
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}

async function getUserTransactions() {
  const res = await api.get("/transaction/user-transactions")
  return res.data.transactions as Transaction[]
}

// new fetch for agent-scoped escrow records
async function getAgentEscrows() {
  const res = await api.get("/escrow/agent")
  return res.data as {
    success: boolean
    count: number
    totalVolume: number
    releasedVolume: number
    escrows: EscrowRecord[]
  }
}

function ActivityItem({ item }: { item: ActivityItemData }) {
  if (item.kind === "transaction") {
    const activity = item.data
    const { icon, bg, sign } = TRANSACTION_CONFIG[activity.type]
    const title =
      activity.type === "agent_payment"
        ? "Escrow release"
        : TITLE_BY_TYPE[activity.type]

    return (
      <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
        <div className="flex flex-1 gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${
              activity.type === "wallet_funding" ? "rotate-180" : ""
            }`}
          >
            <img src={icon} alt="" />
          </div>

          <div>
            <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
              {title}
            </p>
            <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
              {getSubtitle(activity)}
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              {formatDate(activity.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          {sign && <span className="text-button-bg">{sign}</span>}
          <img src={blueNaira} alt="" className="h-4 w-4" />
          <p className="text-button-bg">{activity.amount.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  // escrow branch — status is guaranteed "approved" or "released" by the filter in Activities()
  const escrow = item.data
  const status = escrow.status as "approved" | "released"
  const { icon, bg, sign } = ESCROW_CONFIG[status]
  const title =
    status === "approved"
      ? `Escrow hold — ${getPropertyTitle(escrow.property)}`
      : `Escrow release — ${getPropertyTitle(escrow.property)}`
  const subtitle =
    status === "approved"
      ? "Funds held pending release"
      : "Funds released to you"

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
            {formatDate(escrow.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        {sign && <span className="text-button-bg">{sign}</span>}
        <img src={blueNaira} alt="" className="h-4 w-4" />
        <p className="text-button-bg">{escrow.amount.toLocaleString()}</p>
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
  const { user } = useAuthContext()
  const RECENT_LIMIT = 10

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery({
    queryKey: ["userTransactions", user?._id],
    queryFn: getUserTransactions,
    enabled: !!user?._id,
  })

  // new query for escrow records
  const {
    data: escrowData,
    isLoading: escrowsLoading,
    error: escrowsError,
  } = useQuery({
    queryKey: ["agentEscrows", user?._id],
    queryFn: getAgentEscrows,
    enabled: !!user?._id,
  })

  // combined loading state and error state
  const isLoading = transactionsLoading || escrowsLoading
  const error = transactionsError || escrowsError

  // only "approved" (hold) and "released" escrows are shown — "pending" (not yet admin-confirmed) and "cancelled" are excluded, matching "it only shows once admin confirms" requirement
  const visibleEscrows = (escrowData?.escrows ?? []).filter(
    (e) => e.status === "approved" || e.status === "released"
  )

  // merge both sources into one list, sorted by recency, then cap it
  const merged: ActivityItemData[] = [
    ...transactions.map((t) => ({ kind: "transaction" as const, data: t })),
    ...visibleEscrows.map((e) => ({ kind: "escrow" as const, data: e })),
  ].sort(
    (a, b) =>
      new Date(b.data.createdAt).getTime() -
      new Date(a.data.createdAt).getTime()
  )

  const activities = merged.slice(0, RECENT_LIMIT)

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

  if (activities.length === 0) {
    return (
      <ActivitiesWrapper>
        <NoWalletActivity />
      </ActivitiesWrapper>
    )
  }

  return (
    <ActivitiesWrapper>
      <div className="mt-4 space-y-4">
        {activities.map((item) => (
          <ActivityItem key={item.data._id} item={item} />
        ))}
      </div>
    </ActivitiesWrapper>
  )
}
