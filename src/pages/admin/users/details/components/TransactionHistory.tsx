import { Link } from "react-router-dom"
import { Eye } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import { EscrowStatusBadge } from "@/pages/admin/escrow/components/EscrowStatusBadge"
import { formatDate, KIND_LABEL } from "@/pages/admin/escrow/format"
import type { EscrowRow } from "@/pages/admin/escrow/types"

type TransactionHistoryProps = {
  buyerName: string
  // undefined when the escrow data failed to load
  rows?: EscrowRow[]
  loading: boolean
}

const SHOWN = 6

const th = "px-1 py-2 text-left text-[12.5px] font-semibold text-text-secondary"
const td = "px-1 py-3 align-middle text-[14px]"

export default function TransactionHistory({
  buyerName,
  rows,
  loading,
}: TransactionHistoryProps) {
  const latest = [...(rows ?? [])]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, SHOWN)

  return (
    <AdminSection
      title="Escrow & Transaction History"
      action={
        (rows?.length ?? 0) > SHOWN
          ? {
              label: "See all",
              to: `/admin/transactions?q=${encodeURIComponent(buyerName)}`,
            }
          : undefined
      }
    >
      <p className="-mt-2 mb-3 text-[13px] text-text-secondary">
        Payments this buyer has made into escrow
      </p>

      {loading ? (
        <Skeleton className="h-48 w-full" />
      ) : !rows ? (
        <p className="py-6 text-center text-[14px] text-text-secondary">
          The transactions didn&rsquo;t load.
        </p>
      ) : latest.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
          This buyer hasn&rsquo;t paid into escrow yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className={th}>
                  Transaction
                </th>
                <th scope="col" className={th}>
                  Type
                </th>
                <th scope="col" className={th}>
                  Amount
                </th>
                <th scope="col" className={th}>
                  Date
                </th>
                <th scope="col" className={th}>
                  Status
                </th>
                <th scope="col" className={th}>
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {latest.map((r) => (
                <tr key={r.id}>
                  <td className={td}>
                    <p className="max-w-52 truncate font-semibold text-text-primary">
                      {r.propertyTitle}
                    </p>
                    <p className="text-[12.5px] text-text-secondary tabular-nums">
                      {r.code}
                    </p>
                  </td>
                  <td className={`${td} text-text-secondary`}>
                    {KIND_LABEL[r.kind]}
                  </td>
                  <td
                    className={`${td} font-semibold whitespace-nowrap text-text-primary tabular-nums`}
                  >
                    {formatNaira(r.amount)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDate(r.createdAt)}
                  </td>
                  <td className={td}>
                    <EscrowStatusBadge state={r.status} />
                  </td>
                  <td className={td}>
                    <Link
                      to={`/admin/transactions/${r.id}`}
                      aria-label={`View ${r.code}`}
                      className="flex size-8 items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40"
                    >
                      <Eye size={17} aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminSection>
  )
}
