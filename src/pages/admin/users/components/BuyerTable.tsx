import { Link } from "react-router-dom"
import { MailCheck, MailWarning } from "lucide-react"
import Avatar from "@/components/Avatar"
import Skeleton from "@/components/ui/Skeleton"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser } from "@/types/adminUser"
import { userCode, type BuyerActivity } from "../buyerMeta"
import BuyerRowActions from "./BuyerRowActions"

type BuyerTableProps = {
  rows: AdminUser[]
  loading: boolean
  activity: Map<string, BuyerActivity>
  // false when the escrow / disputes data failed to load: show "—", not zeros
  transactionsKnown: boolean
  disputesKnown: boolean
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

export default function BuyerTable({
  rows,
  loading,
  activity,
  transactionsKnown,
  disputesKnown,
}: BuyerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-215 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Buyer
            </th>
            <th scope="col" className={th}>
              Contact
            </th>
            <th scope="col" className={th}>
              Email
            </th>
            <th scope="col" className={th}>
              Transactions
            </th>
            <th scope="col" className={th}>
              Disputes
            </th>
            <th scope="col" className={th}>
              Joined
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
            : rows.map((u) => {
                const a = activity.get(u._id)
                return (
                  <tr key={u._id} className="hover:bg-slate-50/60">
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={u.name}
                          src={u.profilePicture?.[0]}
                          size="md"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/admin/users/${u._id}`}
                            className="block max-w-48 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                          >
                            {u.name}
                          </Link>
                          <p className="text-[12.5px] text-text-secondary tabular-nums">
                            {userCode(u)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={td}>
                      <p className="max-w-52 truncate text-text-primary">
                        {u.email}
                      </p>
                      <p className="text-[12.5px] text-text-secondary tabular-nums">
                        {u.phoneNumber || "—"}
                      </p>
                    </td>
                    <td className={td}>
                      {u.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700">
                          <MailCheck size={14} aria-hidden />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-700">
                          <MailWarning size={14} aria-hidden />
                          Not verified
                        </span>
                      )}
                    </td>
                    <td className={`${td} text-text-primary tabular-nums`}>
                      {transactionsKnown ? (a?.transactions ?? 0) : "—"}
                    </td>
                    <td className={`${td} tabular-nums`}>
                      {!disputesKnown ? (
                        "—"
                      ) : a?.openDisputes ? (
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[12.5px] font-semibold text-amber-700">
                          {a.openDisputes} open
                        </span>
                      ) : (
                        <span className="text-text-primary">
                          {a?.disputes ?? 0}
                        </span>
                      )}
                    </td>
                    <td
                      className={`${td} whitespace-nowrap text-text-secondary`}
                    >
                      {formatDate(u.createdAt)}
                    </td>
                    <td className={`${td} text-right`}>
                      <BuyerRowActions buyer={u} />
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
