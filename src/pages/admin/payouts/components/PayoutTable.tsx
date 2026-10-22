import { Link } from "react-router-dom"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import FinanceStatusBadge from "../../finance/components/FinanceStatusBadge"
import { formatDateTime } from "../../finance/financeMeta"
import type { PayoutRow } from "../../finance/types"
import PayoutRowActions from "./PayoutRowActions"

type PayoutTableProps = {
  rows: PayoutRow[]
  loading: boolean
  // false when the bank request failed: show "—", not "No account"
  banksKnown: boolean
  onProcess: (payout: PayoutRow) => void
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

export default function PayoutTable({
  rows,
  loading,
  banksKnown,
  onProcess,
}: PayoutTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-215 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Agent
            </th>
            <th scope="col" className={th}>
              Payout ID
            </th>
            <th scope="col" className={th}>
              Bank
            </th>
            <th scope="col" className={th}>
              Amount
            </th>
            <th scope="col" className={th}>
              Requested
            </th>
            <th scope="col" className={th}>
              Status
            </th>
            <th scope="col" className={`${th} text-right`}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} className={td}>
                      <Skeleton className="h-5 w-full max-w-32" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className={td}>
                    {p.agent.id ? (
                      <Link
                        to={`/admin/agents/${p.agent.id}`}
                        className="block max-w-48 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                      >
                        {p.agent.name}
                      </Link>
                    ) : (
                      <span className="font-semibold text-text-primary">
                        {p.agent.name}
                      </span>
                    )}
                    <p className="max-w-48 truncate text-[12.5px] text-text-secondary">
                      {p.agent.email}
                    </p>
                  </td>
                  <td className={`${td} text-text-secondary tabular-nums`}>
                    {p.code}
                  </td>
                  <td className={td}>
                    {!banksKnown ? (
                      "—"
                    ) : p.bank ? (
                      <>
                        <p className="text-text-primary">{p.bank.bankName}</p>
                        <p className="text-[12.5px] text-text-secondary tabular-nums">
                          •••• {p.bank.accountNumber.slice(-4)}
                        </p>
                      </>
                    ) : (
                      <span className="text-text-secondary">No account</span>
                    )}
                  </td>
                  <td
                    className={`${td} font-semibold whitespace-nowrap text-text-primary tabular-nums`}
                  >
                    {formatNaira(p.amount)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDateTime(p.date)}
                  </td>
                  <td className={td}>
                    <FinanceStatusBadge status={p.status} />
                  </td>
                  <td className={`${td} text-right`}>
                    <PayoutRowActions payout={p} onProcess={onProcess} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
