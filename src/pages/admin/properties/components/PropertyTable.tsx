import { Link } from "react-router-dom"
import { Building2 } from "lucide-react"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import type { AdminProperty } from "@/types/adminProperty"
import StatusBadge from "../shared/StatusBadge"
import type { ReviewAction } from "../shared/ReviewDialog"
import {
  LISTING_LABEL,
  TYPE_LABEL,
  formatDate,
  propertyCode,
} from "../shared/propertyMeta"
import RowActions from "./RowActions"

type PropertyTableProps = {
  rows: AdminProperty[]
  loading: boolean
  onReview: (property: AdminProperty, action: ReviewAction) => void
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

export default function PropertyTable({
  rows,
  loading,
  onReview,
}: PropertyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-215 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Property
            </th>
            <th scope="col" className={th}>
              Type
            </th>
            <th scope="col" className={th}>
              Agent
            </th>
            <th scope="col" className={th}>
              Price
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
            : rows.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/60">
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover"
                          />
                        ) : (
                          <Building2 size={18} aria-hidden />
                        )}
                      </span>
                      <div className="min-w-0">
                        <Link
                          to={`/admin/properties/${p._id}`}
                          className="block max-w-72 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                        >
                          {p.title}
                        </Link>
                        <p className="text-[12.5px] text-text-secondary">
                          {propertyCode(p)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={td}>
                    <p className="text-text-primary">
                      {TYPE_LABEL[p.propertyType] ?? p.propertyType}
                    </p>
                    <p className="text-[12.5px] text-text-secondary">
                      {LISTING_LABEL[p.listingType] ?? p.listingType}
                    </p>
                  </td>
                  <td className={`${td} max-w-44 truncate text-text-primary`}>
                    {p.owner?.name ?? "—"}
                  </td>
                  <td
                    className={`${td} font-semibold whitespace-nowrap text-text-primary lining-nums tabular-nums`}
                  >
                    {formatNaira(p.price)}
                  </td>
                  <td className={td}>
                    <StatusBadge status={p.status} flagged={p.isFlagged} />
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDate(p.createdAt)}
                  </td>
                  <td className={`${td} text-right`}>
                    <RowActions property={p} onReview={onReview} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
