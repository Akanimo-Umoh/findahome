import { Link } from "react-router-dom"
import { formatNaira } from "@/lib/adminFormat"
import { formatDate, KIND_LABEL } from "../format"
import type { EscrowRow } from "../types"
import { EscrowRowActions } from "./EscrowRowActions"
import { EscrowStatusBadge } from "./EscrowStatusBadge"

const HEAD = [
  "Transaction",
  "Buyer",
  "Type",
  "Agent",
  "Amount",
  "Status",
  "Date",
  "",
]

function Person({ name, email }: { name: string; email: string }) {
  return (
    <>
      <p className="font-medium text-slate-800">{name}</p>
      {email && (
        <p className="max-w-44 truncate text-xs text-slate-400">{email}</p>
      )}
    </>
  )
}

export function EscrowTable({ rows }: { rows: EscrowRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-240 text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase">
            {HEAD.map((h, i) => (
              <th key={i} className="px-4 py-3 font-medium">
                {h || <span className="sr-only">Actions</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50/60">
              <td className="px-4 py-3">
                <Link
                  to={`/admin/transactions/${r.id}`}
                  className="block max-w-56 truncate font-medium text-slate-900 hover:text-[#274ad0]"
                >
                  {r.propertyTitle}
                </Link>
                <p className="text-xs text-slate-400 tabular-nums">{r.code}</p>
              </td>
              <td className="px-4 py-3">
                <Person {...r.buyer} />
              </td>
              <td className="px-4 py-3 text-slate-600">{KIND_LABEL[r.kind]}</td>
              <td className="px-4 py-3">
                <Person {...r.agent} />
              </td>
              <td className="px-4 py-3 font-medium text-slate-900 tabular-nums">
                {formatNaira(r.amount)}
              </td>
              <td className="px-4 py-3">
                <EscrowStatusBadge state={r.status} />
              </td>
              <td className="px-4 py-3 text-slate-500 tabular-nums">
                {formatDate(r.createdAt)}
              </td>
              <td className="px-2 py-3 text-right">
                <EscrowRowActions row={r} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
