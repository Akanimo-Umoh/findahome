import { useState } from "react"
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  CreditCard,
  FileCheck2,
  LayoutDashboard,
  Menu,
  Megaphone,
  X,
  Search,
  Settings2,
  ShieldAlert,
  Users,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Listings", href: "/admin/properties", icon: Building2 },
  {
    label: "Escrow Transactions",
    href: "/admin/transactions",
    icon: CreditCard,
  },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Disputes", href: "/disputes", icon: ShieldAlert },
  { label: "Financial Reports", href: "/admin/reports", icon: Activity },
  { label: "Payouts", href: "/admin/transactions", icon: Wallet },
  { label: "Ads Manager", href: "/admin/agents", icon: Megaphone },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
]

const metricCards = [
  {
    label: "Total Users",
    value: "2,847",
    detail: "+12% from last month",
    icon: Users,
    tone: "blue",
  },
  {
    label: "Active Listings",
    value: "200",
    detail: "+8 new this week",
    icon: Building2,
    tone: "amber",
  },
  {
    label: "Escrow funds held",
    value: "₦32.40M",
    detail: "+8M today",
    icon: Wallet,
    tone: "green",
  },
  {
    label: "Escrow Released",
    value: "₦10.5B",
    detail: "+12M today",
    icon: Wallet,
    tone: "green",
  },
  {
    label: "Pending Actions",
    value: "8",
    detail: "5 urgent",
    icon: BadgeCheck,
    tone: "red",
  },
  {
    label: "Platform Revenue",
    value: "₦50.20M",
    detail: "+18% this month",
    icon: CircleDollarSign,
    tone: "purple",
  },
]

const overviewGroups = [
  {
    title: "Agents",
    icon: Users,
    rows: [
      ["Total Agents", "1500", "blue"],
      ["Pending Verification", "200", "red"],
      ["Verified", "1,300", "green"],
    ],
  },
  {
    title: "House-hunters",
    icon: Users,
    rows: [
      ["Total House-hunters", "1,347", "blue"],
      ["Active this week", "1,000", "blue"],
      ["New this week", "347", "green"],
    ],
  },
  {
    title: "Risk & Compliance",
    icon: ShieldAlert,
    rows: [
      ["Flagged Users", "20", "amber"],
      ["Suspended", "10", "red"],
      ["Banned", "8", "red"],
    ],
  },
]

const disputeCards = [
  { title: "New Disputes", value: "3", note: "Last 24 hours", tone: "amber" },
  {
    title: "Open Disputes",
    value: "8",
    note: "Requires action",
    tone: "purple",
  },
  { title: "Overdue", value: "2", note: "Beyond 48 hours", tone: "red" },
  { title: "Recently Resolved", value: "12", note: "This week", tone: "green" },
]

const quickActions = [
  {
    title: "Review User Application",
    note: "8 users awaiting verification",
    tone: "blue",
    icon: FileCheck2,
  },
  {
    title: "Process Payouts",
    note: "₦35M ready for release",
    tone: "amber",
    icon: Wallet,
  },
  {
    title: "Manage Ads",
    note: "10 ads awaiting approval",
    tone: "purple",
    icon: Megaphone,
  },
  {
    title: "Resolve Disputes",
    note: "3 active disputes",
    tone: "red",
    icon: ShieldAlert,
  },
  {
    title: "Resolve Disputes",
    note: "2 overdue disputes",
    tone: "red",
    icon: Clock3,
  },
]

const activityItems = [
  {
    title: "Agent Approved",
    detail: "Sarah Dan verified and activated",
    time: "10 min ago",
    tone: "blue",
  },
  {
    title: "Payment Received",
    detail: "Escrow payment confirmed for transaction #TRX-2048",
    time: "32 min ago",
    tone: "green",
  },
  {
    title: "New Dispute Opened",
    detail: "A dispute was raised for property listing #PR-1842",
    time: "1 hour ago",
    tone: "red",
  },
  {
    title: "Listing Approved",
    detail: "New property listing is now live",
    time: "2 hours ago",
    tone: "purple",
  },
  {
    title: "Payout Processed",
    detail: "Agent payout has been successfully released",
    time: "3 hours ago",
    tone: "amber",
  },
]

type Tone = "blue" | "green" | "amber" | "red" | "purple"

const toneStyles: Record<
  Tone,
  { icon: string; surface: string; text: string; dot: string }
> = {
  blue: {
    icon: "bg-[#e8f1ff] text-[#3974d8]",
    surface: "bg-[#e8f1ff]",
    text: "text-[#3974d8]",
    dot: "bg-[#3974d8]",
  },
  green: {
    icon: "bg-[#e7f5eb] text-[#289653]",
    surface: "bg-[#e7f5eb]",
    text: "text-[#289653]",
    dot: "bg-[#289653]",
  },
  amber: {
    icon: "bg-[#fff3d7] text-[#d49a12]",
    surface: "bg-[#fff3d7]",
    text: "text-[#d49a12]",
    dot: "bg-[#d49a12]",
  },
  red: {
    icon: "bg-[#fde9e9] text-[#d65a5a]",
    surface: "bg-[#fde9e9]",
    text: "text-[#d65a5a]",
    dot: "bg-[#d65a5a]",
  },
  purple: {
    icon: "bg-[#f3e8f6] text-[#a34ab5]",
    surface: "bg-[#f3e8f6]",
    text: "text-[#a34ab5]",
    dot: "bg-[#a34ab5]",
  },
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-semibold text-[#252525]">{title}</h2>
      {action && (
        <button className="inline-flex items-center gap-1 text-[11px] font-medium text-[#777] hover:text-[#274ad0]">
          {action}
          <ArrowRight size={13} />
        </button>
      )}
    </div>
  )
}

function SummaryRows({ rows }: { rows: [string, string, Tone][] }) {
  return (
    <div className="space-y-3">
      {rows.map(([label, value, tone]) => (
        <div
          className="flex items-center justify-between gap-3 text-[12px]"
          key={label}
        >
          <span className="text-[#727272]">{label}</span>
          <span
            className={`font-semibold tabular-nums ${toneStyles[tone].text}`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f7f7f7] text-[#252525]">
      {isNavigationOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-black/35 sm:hidden"
          onClick={() => setIsNavigationOpen(false)}
        />
      )}
      <aside
        id="admin-navigation"
        className={`fixed inset-y-0 left-0 z-30 flex h-screen w-[260px] shrink-0 flex-col border-r border-[#ededed] bg-white px-4 py-5 transition-transform duration-200 sm:sticky sm:top-0 sm:z-auto sm:w-[224px] sm:translate-x-0 lg:w-[250px] ${isNavigationOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsNavigationOpen(false)}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#274ad0] text-[11px] font-bold text-white">
              FH
            </span>
            <span className="text-[15px] font-bold text-[#202020]">
              Finda<span className="font-normal">Home</span>
            </span>
          </Link>
          <button
            aria-label="Close navigation"
            className="grid size-9 place-items-center rounded-md text-[#666] hover:bg-[#f5f5f5] sm:hidden"
            onClick={() => setIsNavigationOpen(false)}
          >
            <X size={19} />
          </button>
        </div>
        <nav aria-label="Admin navigation" className="flex flex-col gap-1">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin/dashboard"
            return (
              <Link
                key={label}
                to={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-[12px] font-medium transition-colors ${active ? "bg-[#274ad0] text-white" : "text-[#6d6d6d] hover:bg-[#f3f5fb] hover:text-[#274ad0]"}`}
                onClick={() => setIsNavigationOpen(false)}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto rounded-md bg-[#f7f8fb] p-3 text-[11px] text-[#858585]">
          <div className="mb-2 flex items-center gap-2 font-semibold text-[#555]">
            <CircleHelp size={14} />
            Need help?
          </div>
          Contact the support team
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b border-[#ededed] bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <button
              aria-label="Open navigation"
              aria-controls="admin-navigation"
              aria-expanded={isNavigationOpen}
              className="grid size-9 shrink-0 place-items-center rounded-md text-[#555] hover:bg-[#f5f5f5] sm:hidden"
              onClick={() => setIsNavigationOpen(true)}
            >
              <Menu size={19} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[18px] font-semibold">
                Admin Dashboard
              </h1>
              <p className="hidden text-[10px] text-[#777] sm:block">
                Welcome Back Super Admin
              </p>
            </div>
            <label className="hidden h-9 w-[min(32vw,340px)] items-center gap-2 rounded-md border border-[#ededed] bg-[#fafafa] px-3 text-[#999] md:flex">
              <Search size={15} />
              <input
                aria-label="Search dashboard"
                placeholder="Search transactions, users or listings..."
                className="w-full bg-transparent text-[12px] text-[#333] outline-none placeholder:text-[#999]"
              />
            </label>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Notifications"
              className="relative grid size-9 place-items-center rounded-full text-[#666] hover:bg-[#f5f5f5]"
            >
              <Bell size={17} />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#e15a5a]" />
            </button>
            <button className="flex items-center gap-2 text-left">
              <span className="grid size-8 place-items-center rounded-full bg-[#f1e8f4] text-[12px] font-semibold text-[#8d3d9f]">
                MA
              </span>
              <span className="hidden sm:block">
                <span className="block text-[12px] font-semibold">
                  Mark Anthony
                </span>
                <span className="block text-[10px] text-[#898989]">
                  Super Admin
                </span>
              </span>
              <ChevronDown size={14} className="hidden text-[#888] sm:block" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] space-y-5 p-4 sm:p-6 lg:p-8">
          <section
            aria-label="Key metrics"
            className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 xl:grid-cols-6"
          >
            {metricCards.map(({ label, value, detail, icon: Icon, tone }) => (
              <article
                key={label}
                className="min-w-0 rounded-md border border-[#ededed] bg-white p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="text-[11px] text-[#777]">{label}</span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded ${toneStyles[tone as Tone].icon}`}
                  >
                    <Icon size={15} />
                  </span>
                </div>
                <div className="text-[22px] leading-none font-semibold tabular-nums">
                  {value}
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#858585]">
                  <ArrowUpRight size={12} className="text-[#289653]" />
                  {detail}
                </div>
              </article>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
            <article className="min-w-0 rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading
                title="Users Overview"
                action="View User Management"
              />
              <div className="grid gap-5 md:grid-cols-3">
                {overviewGroups.map(({ title, icon: Icon, rows }) => (
                  <div
                    key={title}
                    className="border-t border-[#f0f0f0] pt-3 md:border-t-0 md:pt-0"
                  >
                    <h3 className="mb-4 flex items-center gap-2 text-[12px] font-semibold">
                      <Icon size={14} className="text-[#777]" />
                      {title}
                    </h3>
                    <SummaryRows rows={rows as [string, string, Tone][]} />
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading
                title="Disputes Overview"
                action="Open Disputes"
              />
              <div className="grid grid-cols-2 gap-2.5">
                {disputeCards.map(({ title, value, note, tone }) => (
                  <div
                    key={title}
                    className={`min-h-[78px] rounded-md p-3 ${toneStyles[tone as Tone].surface}`}
                  >
                    <div className="text-[10px] text-[#686868]">{title}</div>
                    <div className="mt-1 flex items-end justify-between">
                      <strong
                        className={`text-[18px] leading-none ${toneStyles[tone as Tone].text}`}
                      >
                        {value}
                      </strong>
                      <span className="text-[9px] text-[#777]">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-5 xl:grid-cols-2">
            <article className="min-w-0 rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading
                title="Escrow & Transaction"
                action="View financial reports"
              />
              <div className="mb-4 flex items-center gap-2 text-[11px] text-[#777]">
                <Activity size={13} />
                Escrow Snapshot
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["Funded", "250", "₦40M", "blue"],
                  ["Released", "89", "₦20M", "green"],
                  ["Disputed", "7", "₦950K", "red"],
                  ["Over SLA", "3", "8h+", "purple"],
                ].map(([label, count, amount, tone]) => (
                  <div
                    key={label}
                    className={`rounded-md p-3 ${toneStyles[tone as Tone].surface}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-[10px] text-[#686868]">
                      <span
                        className={`size-2 rounded-full ${toneStyles[tone as Tone].dot}`}
                      />
                      {label}
                    </div>
                    <strong className="block text-[17px] leading-none">
                      {count}
                    </strong>
                    <span className="mt-1 block text-[10px] text-[#777]">
                      {amount}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 mb-3 flex items-center gap-2 text-[11px] text-[#777]">
                <CreditCard size={13} />
                Transaction Snapshot
              </div>
              <SummaryRows
                rows={[
                  ["Transaction today", "50", "green"],
                  ["Failed Transactions", "7", "red"],
                  ["Pending payouts", "8", "amber"],
                ]}
              />
            </article>

            <article className="rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading title="Quick Actions" />
              <div className="space-y-2">
                {quickActions.map(
                  ({ title, note, tone, icon: Icon }, index) => (
                    <button
                      key={`${title}-${index}`}
                      className={`flex min-h-[47px] w-full items-center gap-3 rounded-md px-3 py-2 text-left ${toneStyles[tone as Tone].surface} hover:brightness-[0.98]`}
                    >
                      <Icon
                        size={15}
                        className={toneStyles[tone as Tone].text}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-semibold">
                          {title}
                        </span>
                        <span className="mt-0.5 block truncate text-[9px] text-[#777]">
                          {note}
                        </span>
                      </span>
                      <ArrowRight size={14} className="shrink-0 text-[#777]" />
                    </button>
                  )
                )}
              </div>
            </article>
          </section>

          <section className="grid gap-5 xl:grid-cols-2">
            <article className="rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading
                title="Listings & Moderation"
                action="Go to listing dashboard"
              />
              <div className="mb-3 text-[10px] text-[#999]">
                Transaction Snapshot
              </div>
              <SummaryRows
                rows={[
                  ["Active Listing", "200", "green"],
                  ["Pending Approval", "8", "red"],
                  ["Flagged Listings", "5", "amber"],
                  ["Recently Rejected", "10", "red"],
                ]}
              />
            </article>

            <article className="rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
              <SectionHeading title="Ads & Revenue" action="Manage ads" />
              <SummaryRows
                rows={[
                  ["Active ads", "100", "green"],
                  ["Pending approval", "32", "red"],
                  ["Expiring soon", "10", "amber"],
                ]}
              />
              <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-[#e7f5eb] p-3">
                <div>
                  <div className="text-[10px] text-[#52705c]">
                    Revenue This Month
                  </div>
                  <div className="mt-1 text-[17px] font-semibold text-[#289653]">
                    ₦12.8M
                  </div>
                  <div className="text-[9px] text-[#52705c]">
                    +24% from last month
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-[#289653]" />
              </div>
            </article>
          </section>

          <section className="rounded-md border border-[#ededed] bg-white p-4 sm:p-5">
            <SectionHeading
              title="Recent Activity Feed"
              action="View all activity"
            />
            <div className="divide-y divide-[#f0f0f0]">
              {activityItems.map(({ title, detail, time, tone }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 py-3 first:pt-1 last:pb-0"
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full ${toneStyles[tone as Tone].icon}`}
                  >
                    <Check size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold">
                      {title}
                      <span className="ml-2 font-normal text-[#888]">
                        {detail}
                      </span>
                    </div>
                  </div>
                  <time className="shrink-0 text-[9px] text-[#999]">
                    {time}
                  </time>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
