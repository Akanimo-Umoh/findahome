import { Link } from "react-router-dom"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import { formatDate } from "@/pages/admin/escrow/format"
import type { AdminAd } from "@/types/adminAd"
import { OBJECTIVE_LABEL, adCode, adState } from "../adMeta"
import AdRowActions, { type AdRowMode } from "./AdRowActions"
import AdStatusBadge from "./AdStatusBadge"

type AdTableProps = {
  rows: AdminAd[]
  loading: boolean
  showStatus: boolean
  onDetails: (ad: AdminAd) => void
  onReview: (ad: AdminAd) => void
  onAct: (ad: AdminAd, mode: AdRowMode) => void
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

export default function AdTable({
  rows,
  loading,
  showStatus,
  onDetails,
  onReview,
  onAct,
}: AdTableProps) {
  const columns = showStatus ? 9 : 8

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-230 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Ad ID
            </th>
            <th scope="col" className={th}>
              Listing
            </th>
            <th scope="col" className={th}>
              Agent
            </th>
            <th scope="col" className={th}>
              Goal
            </th>
            <th scope="col" className={th}>
              Duration
            </th>
            <th scope="col" className={th}>
              Amount
            </th>
            <th scope="col" className={th}>
              Submitted
            </th>
            {showStatus && (
              <th scope="col" className={th}>
                Status
              </th>
            )}
            <th scope="col" className={`${th} text-right`}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: columns }).map((__, j) => (
                    <td key={j} className={td}>
                      <Skeleton className="h-5 w-full max-w-28" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50/60">
                  <td className={`${td} text-text-secondary tabular-nums`}>
                    {adCode(a)}
                  </td>
                  <td className={td}>
                    {a.property?._id ? (
                      <Link
                        to={`/admin/properties/${a.property._id}`}
                        className="block max-w-52 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                      >
                        {a.property.title ?? "Unknown listing"}
                      </Link>
                    ) : (
                      <span className="font-semibold text-text-primary">
                        Unknown listing
                      </span>
                    )}
                  </td>
                  <td className={td}>
                    {a.user?._id ? (
                      <Link
                        to={`/admin/agents/${a.user._id}`}
                        className="block max-w-40 truncate rounded text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                      >
                        {a.user.name ?? "Unknown agent"}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className={td}>
                    <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[12.5px] text-text-secondary">
                      {OBJECTIVE_LABEL[a.objective] ?? a.objective}
                    </span>
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {a.duration} {a.duration === 1 ? "day" : "days"}
                  </td>
                  <td
                    className={`${td} font-semibold whitespace-nowrap text-text-primary tabular-nums`}
                  >
                    {formatNaira(a.adBudget)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDate(a.createdAt)}
                  </td>
                  {showStatus && (
                    <td className={td}>
                      <AdStatusBadge state={adState(a)} />
                    </td>
                  )}
                  <td className={`${td} text-right`}>
                    <AdRowActions
                      ad={a}
                      onDetails={onDetails}
                      onReview={onReview}
                      onAct={onAct}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
