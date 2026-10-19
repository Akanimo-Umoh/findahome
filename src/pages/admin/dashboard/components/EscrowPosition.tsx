import { motion, useReducedMotion } from "framer-motion"
import AdminSection from "@/components/admin/ui/AdminSection"
import MetricValue from "@/components/admin/ui/MetricValue"
import StatRow from "@/components/admin/ui/StatRow"
import { formatCount, formatNairaCompact } from "@/lib/adminFormat"
import type { DashboardOverview } from "../types"
import StatCell from "./StatCell"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

// Smallest visible slice so a tiny-but-real segment never disappears
const MIN_SLICE = 2

export default function EscrowPosition({
  overview,
  loading,
  className,
}: Props) {
  const reduceMotion = useReducedMotion()
  const escrow = overview?.escrow
  const tx = overview?.transactions

  const held = escrow?.held.amount ?? 0
  const released = escrow?.released.amount ?? 0
  const total = held + released

  const share = (part: number) =>
    total > 0 && part > 0 ? Math.max((part / total) * 100, MIN_SLICE) : 0
  const heldPct = share(held)
  const releasedPct = share(released)

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <AdminSection
      title="Escrow and transactions"
      action={{ label: "View transactions", to: "/admin/transactions" }}
      className={className}
    >
      {/* the memorable bit: where the money is sitting right now */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
            <span aria-hidden className="size-2 rounded-full bg-button-bg" />
            Held in escrow
          </p>
          <MetricValue
            value={escrow?.held.amount}
            loading={loading}
            format={formatNairaCompact}
            skeletonClassName="mt-1 h-8 w-24"
            className="mt-1 block font-raleway text-[28px] leading-9 font-bold text-text-primary"
          />
          <p className="text-[12.5px] text-text-secondary">
            {escrow?.held.count != null
              ? `${formatCount(escrow.held.count)} ${escrow.held.count === 1 ? "payment" : "payments"}`
              : "\u00A0"}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
            <span aria-hidden className="size-2 rounded-full bg-success" />
            Released to sellers
          </p>
          <MetricValue
            value={escrow?.released.amount}
            loading={loading}
            format={formatNairaCompact}
            skeletonClassName="mt-1 h-8 w-24"
            className="mt-1 block font-raleway text-[28px] leading-9 font-bold text-text-primary"
          />
          <p className="text-[12.5px] text-text-secondary">
            {escrow?.released.count != null
              ? `${formatCount(escrow.released.count)} ${escrow.released.count === 1 ? "payment" : "payments"}`
              : "\u00A0"}
          </p>
        </div>
      </div>

      <div
        role="img"
        aria-label={
          total > 0
            ? `${formatNairaCompact(held)} held and ${formatNairaCompact(released)} released`
            : "No escrow payments yet"
        }
        className="mt-5 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-slate-100"
      >
        <motion.div
          className="h-full rounded-full bg-button-bg"
          initial={{ width: 0 }}
          animate={{ width: `${heldPct}%` }}
          transition={transition}
        />
        <motion.div
          className="h-full rounded-full bg-success"
          initial={{ width: 0 }}
          animate={{ width: `${releasedPct}%` }}
          transition={transition}
        />
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        <StatRow
          label="Disputed"
          value={escrow?.disputed.amount}
          loading={loading}
          tone="danger"
          format={formatNairaCompact}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
        <StatCell
          label="Today"
          value={tx?.today}
          sub="Transactions"
          loading={loading}
        />
        <StatCell
          label="Failed"
          value={tx?.failedThisWeek}
          sub="Last 7 days"
          loading={loading}
          tone="danger"
        />
        <StatCell
          label="Withdrawals"
          value={tx?.pendingPayouts.count}
          sub="Awaiting payout"
          loading={loading}
          tone="warning"
        />
      </div>
    </AdminSection>
  )
}
