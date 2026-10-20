import { Link } from "react-router-dom"
import { CircleCheck, CircleDashed } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Avatar from "@/components/Avatar"
import Skeleton from "@/components/ui/Skeleton"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser } from "@/types/adminUser"

type VerificationQueueProps = {
  // agents who submitted their details and have no decision yet, oldest first
  agents: AdminUser[]
  total: number
  loading: boolean
}

const Doc = ({ label, done }: { label: string; done: boolean }) => (
  <span
    className={`inline-flex items-center gap-1 text-[12.5px] ${done ? "text-emerald-700" : "text-text-secondary"}`}
  >
    {done ? (
      <CircleCheck size={13} aria-hidden />
    ) : (
      <CircleDashed size={13} aria-hidden />
    )}
    {label}
  </span>
)

export default function VerificationQueue({
  agents,
  total,
  loading,
}: VerificationQueueProps) {
  return (
    <AdminSection
      title="Verification Queue"
      action={
        total > agents.length
          ? { label: "See all", to: "/admin/agents?status=pending" }
          : undefined
      }
    >
      <p className="-mt-2 mb-3 text-[13px] text-text-secondary">
        Agents who finished onboarding and are waiting for a decision
      </p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : agents.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
          No agents are waiting for review.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {agents.map((a) => (
            <li
              key={a._id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar name={a.name} src={a.profilePicture?.[0]} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-text-primary">
                    {a.name}
                  </p>
                  <p className="truncate text-[12.5px] text-text-secondary">
                    {a.businessName || a.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Doc label="ID" done={!!a.governmentId?.length} />
                <Doc label="Business doc" done={!!a.licenseDoc?.length} />
              </div>

              <span className="text-[12.5px] whitespace-nowrap text-text-secondary">
                Joined {formatDate(a.createdAt)}
              </span>

              <Link
                to={`/admin/agents/${a._id}`}
                className="flex h-9 items-center rounded-lg border border-slate-200 px-3.5 text-[13px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
              >
                Review
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminSection>
  )
}
