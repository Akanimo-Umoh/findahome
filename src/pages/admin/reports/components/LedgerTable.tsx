import { Link } from "react-router-dom"
import { EllipsisVertical, Eye } from "lucide-react"
import Skeleton from "@/components/ui/Skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatNaira } from "@/lib/adminFormat"
import { formatDate } from "@/pages/admin/escrow/format"
import FinanceStatusBadge from "../../finance/components/FinanceStatusBadge"
import { KIND_LABEL } from "../../finance/financeMeta"
import type { LedgerRow } from "../../finance/types"

type LedgerTableProps = {
  rows: LedgerRow[]
  loading: boolean
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

const ROLE_BADGE: Record<string, { label: string; className: string }> = {
  user: { label: "Buyer", className: "bg-amber-50 text-amber-700" },
  agent: { label: "Agent", className: "bg-emerald-50 text-emerald-700" },
}

function RowAction({ row }: { row: LedgerRow }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${row.code}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
        <DropdownMenuItem
          asChild={!!row.href}
          disabled={!row.href}
          className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"
        >
          {row.href ? (
            <Link to={row.href}>
              <Eye aria-hidden />
              View Details
            </Link>
          ) : (
            <span>
              <Eye aria-hidden />
              View Details
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function LedgerTable({ rows, loading }: LedgerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-215 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Transaction
            </th>
            <th scope="col" className={th}>
              Person
            </th>
            <th scope="col" className={th}>
              Type
            </th>
            <th scope="col" className={th}>
              Amount
            </th>
            <th scope="col" className={th}>
              Status
            </th>
            <th scope="col" className={th}>
              Date
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
            : rows.map((r) => {
                const badge = r.party.role
                  ? ROLE_BADGE[r.party.role]
                  : undefined
                return (
                  <tr
                    key={`${r.kind}-${r.id}`}
                    className="hover:bg-slate-50/60"
                  >
                    <td className={td}>
                      <p className="max-w-52 truncate font-semibold text-text-primary">
                        {r.title}
                      </p>
                      <p className="text-[12.5px] text-text-secondary tabular-nums">
                        {r.code}
                      </p>
                    </td>
                    <td className={td}>
                      <p className="max-w-44 truncate text-text-primary">
                        {r.party.name}
                      </p>
                      {badge && (
                        <span
                          className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      )}
                    </td>
                    <td
                      className={`${td} whitespace-nowrap text-text-secondary`}
                    >
                      {KIND_LABEL[r.kind]}
                    </td>
                    <td
                      className={`${td} font-semibold whitespace-nowrap text-text-primary tabular-nums`}
                    >
                      {formatNaira(r.amount)}
                    </td>
                    <td className={td}>
                      <FinanceStatusBadge status={r.status} />
                    </td>
                    <td
                      className={`${td} whitespace-nowrap text-text-secondary`}
                    >
                      {formatDate(r.date)}
                    </td>
                    <td className={`${td} text-right`}>
                      <RowAction row={r} />
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
