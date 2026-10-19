import { Link } from "react-router-dom"
import {
  Banknote,
  Building2,
  ChevronRight,
  Megaphone,
  Scale,
  Timer,
  UserCheck,
  type LucideIcon,
} from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import MetricValue from "@/components/admin/ui/MetricValue"
import { toneSoft, type Tone } from "@/components/admin/ui/tone"
import { cn } from "@/lib/utils"
import { formatNairaCompact } from "@/lib/adminFormat"
import type { DashboardOverview } from "../types"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

type Row = {
  key: string
  to: string
  icon: LucideIcon
  tone: Tone
  title: string
  sub: string
  value: number | null | undefined
}

export default function NeedsAttention({
  overview,
  loading,
  className,
}: Props) {
  const o = overview
  const payoutAmount = o?.transactions.pendingPayouts.amount

  const rows: Row[] = [
    {
      key: "overdue",
      to: "/admin/disputes",
      icon: Timer,
      tone: "danger",
      title: "Disputes past 48 hours",
      sub: "Still unresolved since they were opened",
      value: o?.disputes.overdue,
    },
    {
      key: "disputes",
      to: "/admin/disputes",
      icon: Scale,
      tone: "warning",
      title: "Open disputes",
      sub: "Waiting for a decision",
      value: o?.disputes.open,
    },
    {
      key: "payouts",
      to: "/admin/payouts",
      icon: Banknote,
      tone: "info",
      title: "Withdrawal requests",
      sub: payoutAmount
        ? `${formatNairaCompact(payoutAmount)} waiting for release`
        : "No money waiting for release",
      value: o?.transactions.pendingPayouts.count,
    },
    {
      key: "listings",
      to: "/admin/properties",
      icon: Building2,
      tone: "info",
      title: "Listings to review",
      sub: "Submitted by agents",
      value: o?.listings.pendingApproval,
    },
    {
      key: "agents",
      to: "/admin/users",
      icon: UserCheck,
      tone: "info",
      title: "Agent applications",
      sub: "Verification isn’t tracked yet",
      value: o?.attention.agentApplications,
    },
    {
      key: "ads",
      to: "/admin/ads",
      icon: Megaphone,
      tone: "info",
      title: "Ads to approve",
      sub: "Ads go live on payment today",
      value: o?.ads.pendingApproval,
    },
  ]

  return (
    <AdminSection title="Needs your attention" className={className}>
      <ul className="-mx-2 divide-y divide-slate-100">
        {rows.map((row) => {
          const Icon = row.icon
          const active = typeof row.value === "number" && row.value > 0
          return (
            <li key={row.key}>
              <Link
                to={row.to}
                className="group flex items-center gap-3 rounded-lg px-2 py-2.5 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    active ? toneSoft[row.tone] : toneSoft.neutral
                  )}
                >
                  <Icon size={17} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-text-primary">
                    {row.title}
                  </span>
                  <span className="block truncate text-[12.5px] text-text-secondary">
                    {row.sub}
                  </span>
                </span>
                <MetricValue
                  value={row.value}
                  loading={loading}
                  className={cn(
                    "min-w-8 rounded-full px-2.5 py-0.5 text-center text-[13px] font-bold",
                    active ? toneSoft[row.tone] : "text-text-secondary"
                  )}
                />
                <ChevronRight
                  size={16}
                  aria-hidden
                  className="text-slate-300 transition-colors group-hover:text-slate-500"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </AdminSection>
  )
}
