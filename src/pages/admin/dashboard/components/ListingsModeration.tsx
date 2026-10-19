import AdminSection from "@/components/admin/ui/AdminSection"
import StatRow from "@/components/admin/ui/StatRow"
import type { DashboardOverview } from "../types"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

export default function ListingsModeration({
  overview,
  loading,
  className,
}: Props) {
  const l = overview?.listings

  return (
    <AdminSection
      title="Listings"
      action={{ label: "Review listings", to: "/admin/properties" }}
      className={className}
    >
      <div className="divide-y divide-slate-100">
        <StatRow
          label="Live on the platform"
          value={l?.active}
          loading={loading}
          tone="success"
        />
        <StatRow
          label="Waiting for approval"
          value={l?.pendingApproval}
          loading={loading}
          tone="warning"
        />
        <StatRow
          label="Rejected this week"
          value={l?.rejectedThisWeek}
          loading={loading}
          tone="danger"
        />
        <StatRow
          label="Flagged for policy"
          value={l?.flagged}
          loading={loading}
          tone="warning"
        />
      </div>
    </AdminSection>
  )
}
