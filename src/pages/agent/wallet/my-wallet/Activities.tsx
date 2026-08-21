import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg"
import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import depositIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"

type ActivityType = "escrow_hold" | "escrow_release" | "withdrawal" | "deposit"

type WalletActivity = {
  id: string
  type: ActivityType
  title: string
  subtitle: string
  date: string
  amount: number
}

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: string; bg: string; sign: "" | "+" | "-" }
> = {
  escrow_hold: { icon: escrowHoldIcon, bg: "bg-[#F8B400]", sign: "" },
  escrow_release: { icon: escrowReleaseIcon, bg: "bg-[#149D18]", sign: "+" },
  withdrawal: { icon: withdrawIcon, bg: "bg-button-bg", sign: "-" },
  deposit: { icon: depositIcon, bg: "bg-[#274AD0]", sign: "+" },
}

// TODO: static placeholder data — replace with useQuery(["walletActivities"])
// once the wallet/transactions endpoint exists
const MOCK_ACTIVITIES: WalletActivity[] = [
  {
    id: "1",
    type: "escrow_hold",
    title: "Escrow hold — Lekki Phase 1 apartment",
    subtitle: "Buyer paid inspection fee",
    date: "Today · 12:30 PM",
    amount: 10000,
  },
  {
    id: "2",
    type: "escrow_release",
    title: "Escrow release — Lekki Phase 1 apartment",
    subtitle: "Buyer confirmed inspection",
    date: "Today · 1:10 PM",
    amount: 10000,
  },
  {
    id: "3",
    type: "deposit",
    title: "Wallet deposit",
    subtitle: "Funded via Paystack",
    date: "Yesterday · 3:45 PM",
    amount: 50000,
  },
  {
    id: "4",
    type: "escrow_hold",
    title: "Escrow hold — Ikoyi duplex",
    subtitle: "Buyer paid for property",
    date: "Yesterday · 9:05 AM",
    amount: 3500000,
  },
  {
    id: "5",
    type: "withdrawal",
    title: "Withdrawal successful",
    subtitle: "Transferred to First Bank ****4810",
    date: "2 days ago · 10:00 AM",
    amount: 3500000,
  },
  {
    id: "6",
    type: "escrow_release",
    title: "Escrow release — 2-bedroom apartment, Ikorodu",
    subtitle: "Buyer confirmed property handover",
    date: "10 Nov 2025 · 2:00 PM",
    amount: 700000,
  },
]

function ActivityItem({ activity }: { activity: WalletActivity }) {
  const { icon, bg, sign } = ACTIVITY_CONFIG[activity.type]

  return (
    <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
      <div className="flex flex-1 gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${activity.type === "deposit" ? "rotate-180" : ""}`}
        >
          <img src={icon} alt="" />
        </div>

        <div>
          <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
            {activity.title}
          </p>
          <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
            {activity.subtitle}
          </p>
          <p className="text-[12px] leading-4 text-text-secondary">
            {activity.date}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        {sign && <span className="text-button-bg">{sign}</span>}
        <img src={blueNaira} alt="" />
        <p className="text-button-bg">{activity.amount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default function Activities() {
  if (MOCK_ACTIVITIES.length === 0) {
    return (
      <div>
        <p>Recent Activities/Notifications</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-[14px] font-semibold">No activity yet</p>
          <p className="max-w-70 text-[12px] leading-4 text-text-secondary">
            Your wallet transactions will show up here once you start earning or
            funding your balance.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p>Recent Activities/Notifications</p>
      <div className="mt-4 space-y-4">
        {MOCK_ACTIVITIES.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
