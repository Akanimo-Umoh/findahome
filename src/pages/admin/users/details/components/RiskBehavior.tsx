import { Ban, Gavel, TriangleAlert, type LucideIcon } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import type { BuyerSummary } from "../../buyerMeta"

type RiskBehaviorProps = {
  summary: BuyerSummary
}

const Signal = ({
  icon: Icon,
  label,
  note,
  value,
  tone,
}: {
  icon: LucideIcon
  label: string
  note: string
  value: string
  tone: string
}) => (
  <li className="flex items-start gap-3 py-3">
    <Icon size={18} aria-hidden className={`mt-0.5 shrink-0 ${tone}`} />
    <div className="min-w-0 flex-1">
      <p className="text-[14px] font-semibold text-text-primary">{label}</p>
      <p className="text-[12.5px] text-text-secondary">{note}</p>
    </div>
    <span className="text-[14px] font-semibold text-text-primary tabular-nums">
      {value}
    </span>
  </li>
)

// Only signals the backend can really back up. There is no overall risk level on users yet, so no Low / High banner.
export default function RiskBehavior({ summary }: RiskBehaviorProps) {
  const dash = (n: number | null) => (n === null ? "—" : String(n))

  return (
    <AdminSection title="Risk & Behavior">
      <ul className="divide-y divide-slate-100">
        <Signal
          icon={TriangleAlert}
          tone="text-amber-500"
          label="Dispute frequency"
          note={
            summary.disputes !== null && summary.transactions !== null
              ? `${summary.disputes} ${summary.disputes === 1 ? "dispute" : "disputes"} in ${summary.transactions} ${summary.transactions === 1 ? "transaction" : "transactions"}`
              : "Not available"
          }
          value={
            summary.disputeRate === null
              ? "—"
              : `${Math.round(summary.disputeRate)}%`
          }
        />
        <Signal
          icon={Gavel}
          tone="text-red-500"
          label="Open disputes"
          note="Disputes still waiting for a resolution"
          value={dash(summary.openDisputes)}
        />
        <Signal
          icon={Ban}
          tone="text-slate-500"
          label="Cancelled inspections"
          note="Inspections this buyer cancelled"
          value={dash(summary.cancelledInspections)}
        />
      </ul>

      <p className="mt-2 border-t border-slate-100 pt-3 text-[12.5px] text-text-secondary">
        Risk level, payment failures and chargebacks aren&rsquo;t tracked yet.
      </p>
    </AdminSection>
  )
}
