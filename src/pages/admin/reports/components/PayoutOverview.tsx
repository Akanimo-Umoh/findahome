import { CircleCheck, CircleX, Clock } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import { formatDate } from "@/pages/admin/escrow/format"
import type { PayoutRow, PayoutStatus } from "../../finance/types"

type PayoutOverviewProps = {
  payouts: PayoutRow[]
  loading: boolean
  onProcess: (payout: PayoutRow) => void
}

const SHOWN = 6

// what needs attention first: pending, then failed, then the rest
const ORDER: Record<PayoutStatus, number> = {
  pending: 0,
  failed: 1,
  completed: 2,
  declined: 3,
}

const STATUS = {
  pending: { label: "Pending", icon: Clock, color: "text-amber-600" },
  failed: { label: "Failed", icon: CircleX, color: "text-red-600" },
  completed: {
    label: "Completed",
    icon: CircleCheck,
    color: "text-emerald-600",
  },
  declined: { label: "Declined", icon: CircleX, color: "text-slate-500" },
} as const

export default function PayoutOverview({
  payouts,
  loading,
  onProcess,
}: PayoutOverviewProps) {
  const shown = [...payouts]
    .sort(
      (a, b) =>
        ORDER[a.status] - ORDER[b.status] || b.date.localeCompare(a.date)
    )
    .slice(0, SHOWN)

  return (
    <AdminSection
      title="Payout Overview"
      action={{ label: "See all", to: "/admin/payouts" }}
    >
      {loading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
          No payout requests yet.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {shown.map((p) => {
            const s = STATUS[p.status]
            const Icon = s.icon
            return (
              <article key={p.id} className="rounded-lg bg-bg-accent p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate text-[14px] font-semibold text-text-primary">
                    {p.agent.name}
                  </p>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold ${s.color}`}
                  >
                    <Icon size={13} aria-hidden />
                    {s.label}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <p className="font-raleway text-[17px] font-bold text-text-primary tabular-nums">
                    {formatNaira(p.amount)}
                  </p>
                  <span className="text-[12.5px] text-text-secondary">
                    {formatDate(p.date)}
                  </span>
                </div>
                {(p.status === "pending" || p.status === "failed") && (
                  <Button
                    variant={p.status === "pending" ? "app-primary" : "outline"}
                    className="mt-3 w-full"
                    onClick={() => onProcess(p)}
                  >
                    {p.status === "pending" ? "Process now" : "Retry payout"}
                  </Button>
                )}
              </article>
            )
          })}
        </div>
      )}
    </AdminSection>
  )
}
