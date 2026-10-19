import AdminSection from "@/components/admin/ui/AdminSection"
import type { DashboardOverview } from "../types"
import StatCell from "./StatCell"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

export default function DisputesOverview({
  overview,
  loading,
  className,
}: Props) {
  const d = overview?.disputes

  return (
    <AdminSection
      title="Disputes"
      action={{ label: "Open disputes", to: "/admin/disputes" }}
      className={className}
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
        <StatCell
          label="New"
          value={d?.newToday}
          sub="Opened in the last 24 hours"
          loading={loading}
          tone="info"
        />
        <StatCell
          label="Open"
          value={d?.open}
          sub="Need a decision"
          loading={loading}
          tone="warning"
        />
        <StatCell
          label="Overdue"
          value={d?.overdue}
          sub="Open for over 48 hours"
          loading={loading}
          tone="danger"
        />
        <StatCell
          label="Resolved"
          value={d?.resolvedThisWeek}
          sub="In the last 7 days"
          loading={loading}
          tone="success"
        />
      </div>
    </AdminSection>
  )
}
