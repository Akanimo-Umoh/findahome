import AdminSection from "@/components/admin/ui/AdminSection"
import MetricValue from "@/components/admin/ui/MetricValue"
import StatRow from "@/components/admin/ui/StatRow"
import { formatNairaCompact } from "@/lib/adminFormat"
import type { DashboardOverview } from "../types"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

export default function AdsRevenue({ overview, loading, className }: Props) {
  const a = overview?.ads

  return (
    <AdminSection
      title="Ads and revenue"
      action={{ label: "Manage ads", to: "/admin/ads" }}
      className={className}
    >
      <div className="divide-y divide-slate-100">
        <StatRow
          label="Running now"
          value={a?.active}
          loading={loading}
          tone="success"
        />
        <StatRow
          label="Waiting for approval"
          value={a?.pendingApproval}
          loading={loading}
          tone="warning"
        />
        <StatRow
          label="Ending soon"
          value={a?.expiringSoon}
          loading={loading}
          tone="warning"
        />
      </div>

      <div className="mt-3 rounded-lg bg-emerald-50 px-4 py-3">
        <p className="text-[13px] font-semibold text-emerald-800">
          Paid ad budgets to date
        </p>
        <MetricValue
          value={a?.paidBudgetTotal}
          loading={loading}
          format={formatNairaCompact}
          skeletonClassName="mt-1 h-7 w-24"
          className="mt-0.5 block font-raleway text-[24px] leading-8 font-bold text-emerald-900"
        />
      </div>
    </AdminSection>
  )
}
