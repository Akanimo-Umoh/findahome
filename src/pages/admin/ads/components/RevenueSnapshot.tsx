import { TrendingUp } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import {
  OBJECTIVE_LABEL,
  PERIOD_LABEL,
  type AdSummary,
  type Period,
} from "../adMeta"

type RevenueSnapshotProps = {
  summary: AdSummary
  period: Period
  loading: boolean
}

export default function RevenueSnapshot({
  summary,
  period,
  loading,
}: RevenueSnapshotProps) {
  const total = summary.revenue.amount

  return (
    <AdminSection title="Ad Revenue Snapshot">
      {loading ? (
        <Skeleton className="h-36 w-full" />
      ) : (
        <div className="grid gap-5 md:grid-cols-[minmax(0,260px)_1fr]">
          <div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">
            <p className="flex items-center gap-2 text-[13px] font-semibold">
              <TrendingUp size={15} aria-hidden />
              Total ad revenue
            </p>
            <p className="mt-1 font-raleway text-[24px] font-bold tabular-nums">
              {formatNaira(total)}
            </p>
            <p className="text-[12.5px]">{PERIOD_LABEL[period]}</p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold text-text-secondary">
              By campaign goal
            </p>
            <ul className="mt-2 space-y-3">
              {Object.entries(summary.byObjective).map(([key, amount]) => (
                <li key={key}>
                  <div className="flex items-center justify-between text-[13.5px]">
                    <span className="font-semibold text-text-primary">
                      {OBJECTIVE_LABEL[key] ?? key}
                    </span>
                    <span className="text-text-secondary tabular-nums">
                      {formatNaira(amount)}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-button-bg"
                      style={{
                        width: `${total ? (amount / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AdminSection>
  )
}
