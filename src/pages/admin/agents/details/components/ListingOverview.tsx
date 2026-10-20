import { Link } from "react-router-dom"
import AdminSection from "@/components/admin/ui/AdminSection"
import Skeleton from "@/components/ui/Skeleton"
import { formatNaira } from "@/lib/adminFormat"
import StatusBadge from "@/pages/admin/properties/shared/StatusBadge"
import {
  formatDate,
  propertyCode,
} from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminProperty } from "@/types/adminProperty"

type ListingOverviewProps = {
  agentName: string
  listings?: AdminProperty[]
  loading: boolean
}

const SHOWN = 6

const th = "px-1 py-2 text-left text-[12.5px] font-semibold text-text-secondary"
const td = "px-1 py-3 text-[14px]"

export default function ListingOverview({
  agentName,
  listings,
  loading,
}: ListingOverviewProps) {
  const rows = [...(listings ?? [])]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, SHOWN)

  return (
    <AdminSection
      title="Listing Overview"
      action={
        (listings?.length ?? 0) > SHOWN
          ? {
              label: "See all",
              to: `/admin/properties?q=${encodeURIComponent(agentName)}`,
            }
          : undefined
      }
    >
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : !listings ? (
        <p className="py-6 text-center text-[14px] text-text-secondary">
          The listings didn&rsquo;t load.
        </p>
      ) : rows.length === 0 ? (
        <p className="py-6 text-center text-[14px] text-text-secondary">
          This agent has no listings yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-120 border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className={th}>
                  Property
                </th>
                <th scope="col" className={th}>
                  Status
                </th>
                <th scope="col" className={th}>
                  Price
                </th>
                <th scope="col" className={th}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((p) => (
                <tr key={p._id}>
                  <td className={td}>
                    <Link
                      to={`/admin/properties/${p._id}`}
                      className="block max-w-60 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                    >
                      {p.title}
                    </Link>
                    <p className="text-[12.5px] text-text-secondary">
                      {propertyCode(p)}
                    </p>
                  </td>
                  <td className={td}>
                    <StatusBadge status={p.status} flagged={p.isFlagged} />
                  </td>
                  <td
                    className={`${td} font-semibold whitespace-nowrap text-text-primary lining-nums tabular-nums`}
                  >
                    {formatNaira(p.price)}
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDate(p.createdAt)}
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
