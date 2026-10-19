import type { ReactNode } from "react"
import {
  Building2,
  Coins,
  Landmark,
  ListChecks,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import Skeleton from "@/components/ui/Skeleton"
import MetricValue from "@/components/admin/ui/MetricValue"
import { formatCount, formatNairaCompact } from "@/lib/adminFormat"
import type { DashboardOverview } from "../types"

type KpiStripProps = { overview?: DashboardOverview; loading: boolean }

type KpiProps = {
  icon: LucideIcon
  label: string
  value: number | null | undefined
  format?: (n: number) => string
  loading: boolean
  sub: ReactNode
}

function Kpi({ icon: Icon, label, value, format, loading, sub }: KpiProps) {
  return (
    <div className="bg-white px-5 py-4">
      <dt className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
        <Icon size={15} aria-hidden />
        {label}
      </dt>
      <dd className="mt-2">
        <MetricValue
          value={value}
          loading={loading}
          format={format}
          skeletonClassName="h-8 w-24"
          className="block font-raleway text-[26px] leading-8 font-bold text-text-primary"
        />
        <div className="mt-1 min-h-4 text-[12.5px] leading-4">
          {loading ? <Skeleton className="h-3 w-20" /> : sub}
        </div>
      </dd>
    </div>
  )
}

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="text-text-secondary">{children}</span>
)
const Good = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-emerald-700">{children}</span>
)
const Bad = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-red-600">{children}</span>
)

// One panel divided by hairlines instead of six separate cards: the figures read as a single row of the ledger.
export default function KpiStrip({ overview, loading }: KpiStripProps) {
  const o = overview

  return (
    <section
      aria-label="Key figures"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200"
    >
      <dl className="grid grid-cols-2 gap-px md:grid-cols-3 xl:grid-cols-6">
        <Kpi
          icon={Users}
          label="Total users"
          value={o?.users.total}
          loading={loading}
          sub={
            o?.users.newThisMonth ? (
              <Good>+{formatCount(o.users.newThisMonth)} this month</Good>
            ) : (
              <Muted>No new sign-ups this month</Muted>
            )
          }
        />
        <Kpi
          icon={Building2}
          label="Active listings"
          value={o?.listings.active}
          loading={loading}
          sub={
            o?.listings.newThisWeek ? (
              <Good>+{formatCount(o.listings.newThisWeek)} this week</Good>
            ) : (
              <Muted>No new listings this week</Muted>
            )
          }
        />
        <Kpi
          icon={Landmark}
          label="Escrow held"
          value={o?.escrow.held.amount}
          format={formatNairaCompact}
          loading={loading}
          sub={
            o?.escrow.held.count != null ? (
              <Muted>
                {formatCount(o.escrow.held.count)}{" "}
                {o.escrow.held.count === 1 ? "payment" : "payments"} in escrow
              </Muted>
            ) : null
          }
        />
        <Kpi
          icon={ShieldCheck}
          label="Escrow released"
          value={o?.escrow.released.amount}
          format={formatNairaCompact}
          loading={loading}
          sub={
            o?.escrow.released.count != null ? (
              <Muted>
                {formatCount(o.escrow.released.count)}{" "}
                {o.escrow.released.count === 1 ? "payment" : "payments"} paid
                out
              </Muted>
            ) : null
          }
        />
        <Kpi
          icon={ListChecks}
          label="Pending actions"
          value={o?.attention.pendingActions}
          loading={loading}
          sub={
            o?.attention.urgent ? (
              <Bad>{formatCount(o.attention.urgent)} overdue</Bad>
            ) : (
              <Muted>Nothing overdue</Muted>
            )
          }
        />
        <Kpi
          icon={Coins}
          label="Platform revenue"
          value={o?.revenue.platform}
          format={formatNairaCompact}
          loading={loading}
          sub={<Muted>Not tracked yet</Muted>}
        />
      </dl>
    </section>
  )
}
