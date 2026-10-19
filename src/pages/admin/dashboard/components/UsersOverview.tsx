import AdminSection from "@/components/admin/ui/AdminSection"
import MetricValue from "@/components/admin/ui/MetricValue"
import StatRow from "@/components/admin/ui/StatRow"
import type { DashboardOverview } from "../types"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

type ColumnProps = {
  title: string
  total?: number | null
  loading: boolean
  children: React.ReactNode
}

function Column({ title, total, loading, children }: ColumnProps) {
  return (
    <div className="md:px-5 md:first:pl-0 md:last:pr-0">
      <p className="text-[13px] font-semibold text-text-secondary">{title}</p>
      {total !== undefined ? (
        <MetricValue
          value={total}
          loading={loading}
          skeletonClassName="mt-1 h-8 w-16"
          className="mt-1 block font-raleway text-[28px] leading-9 font-bold text-text-primary"
        />
      ) : (
        <div className="hidden h-9 md:block" aria-hidden />
      )}
      <div className="mt-2 divide-y divide-slate-100">{children}</div>
    </div>
  )
}

export default function UsersOverview({ overview, loading, className }: Props) {
  const u = overview?.users

  return (
    <AdminSection
      title="Users"
      action={{ label: "Manage users", to: "/admin/users" }}
      className={className}
    >
      <div className="grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-100">
        <Column title="Agents" total={u?.agents.total} loading={loading}>
          <StatRow
            dot={false}
            label="Awaiting verification"
            value={u?.agents.pendingVerification}
            loading={loading}
            tone="warning"
          />
          <StatRow
            dot={false}
            label="Verified"
            value={u?.agents.verified}
            loading={loading}
          />
        </Column>

        <Column
          title="House-hunters"
          total={u?.houseHunters.total}
          loading={loading}
        >
          <StatRow
            dot={false}
            label="Joined this week"
            value={u?.houseHunters.newThisWeek}
            loading={loading}
            tone="success"
          />
          <StatRow
            dot={false}
            label="Active this week"
            value={u?.houseHunters.activeThisWeek}
            loading={loading}
          />
        </Column>

        <Column title="Risk and compliance" loading={loading}>
          <StatRow
            dot={false}
            label="Flagged"
            value={u?.risk.flagged}
            loading={loading}
            tone="warning"
          />
          <StatRow
            dot={false}
            label="Suspended"
            value={u?.risk.suspended}
            loading={loading}
            tone="warning"
          />
          <StatRow
            dot={false}
            label="Banned"
            value={u?.risk.banned}
            loading={loading}
            tone="danger"
          />
        </Column>
      </div>
    </AdminSection>
  )
}
