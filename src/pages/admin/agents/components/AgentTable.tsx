import { Link } from "react-router-dom"
import Avatar from "@/components/Avatar"
import Skeleton from "@/components/ui/Skeleton"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"
import { reviewState, type ListingCount } from "../agentMeta"
import ReviewBadge from "../shared/ReviewBadge"
import AgentRowActions from "./AgentRowActions"

type AgentTableProps = {
  rows: AdminUser[]
  loading: boolean
  listings: Map<string, ListingCount>
  listingsLoading: boolean
  onDecide: (agent: AdminUser, action: VerificationDecision) => void
}

const th =
  "px-5 py-2.5 text-left text-[12.5px] font-semibold text-text-secondary whitespace-nowrap"
const td = "px-5 py-3 align-middle text-[14px]"

export default function AgentTable({
  rows,
  loading,
  listings,
  listingsLoading,
  onDecide,
}: AgentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-200 border-collapse">
        <thead className="bg-slate-50/70">
          <tr className="border-b border-slate-100">
            <th scope="col" className={th}>
              Agent
            </th>
            <th scope="col" className={th}>
              Business
            </th>
            <th scope="col" className={th}>
              Listings
            </th>
            <th scope="col" className={th}>
              Verification
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
                  {Array.from({ length: 6 }).map((__, j) => (
                    <td key={j} className={td}>
                      <Skeleton className="h-5 w-full max-w-32" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50/60">
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={a.name}
                        src={a.profilePicture?.[0]}
                        size="md"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/admin/agents/${a._id}`}
                          className="block max-w-56 truncate rounded font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
                        >
                          {a.name}
                        </Link>
                        <p className="max-w-56 truncate text-[12.5px] text-text-secondary">
                          {a.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`${td} max-w-48 truncate text-text-primary`}>
                    {a.businessName || "—"}
                  </td>
                  <td
                    className={`${td} text-text-primary lining-nums tabular-nums`}
                  >
                    {listingsLoading ? (
                      <Skeleton className="h-5 w-8" />
                    ) : (
                      (listings.get(a._id)?.total ?? 0)
                    )}
                  </td>
                  <td className={td}>
                    <ReviewBadge state={reviewState(a)} />
                  </td>
                  <td className={`${td} whitespace-nowrap text-text-secondary`}>
                    {formatDate(a.createdAt)}
                  </td>
                  <td className={`${td} text-right`}>
                    <AgentRowActions agent={a} onDecide={onDecide} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
