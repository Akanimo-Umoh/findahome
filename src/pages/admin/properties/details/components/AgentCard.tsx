import { Link } from "react-router-dom"
import { CalendarDays, Mail, Phone } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Avatar from "@/components/Avatar"
import Skeleton from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import type {
  AdminAgentProfile,
  AdminProperty,
  RiskLevel,
} from "@/types/adminProperty"
import { formatDate } from "../../shared/propertyMeta"
import { reviewState } from "@/pages/admin/agents/agentMeta"
import ReviewBadge from "@/pages/admin/agents/shared/ReviewBadge"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"

type AgentCardProps = {
  owner: AdminProperty["owner"]
  agent?: AdminAgentProfile
  loading: boolean
  totalListings?: number
  activeListings?: number
}

const RISK: Record<RiskLevel, { label: string; style: string }> = {
  none: { label: "No risk", style: "bg-emerald-50 text-emerald-700" },
  low: { label: "Low risk", style: "bg-amber-50 text-amber-700" },
  medium: { label: "Medium risk", style: "bg-orange-50 text-orange-700" },
  high: { label: "High risk", style: "bg-red-50 text-red-700" },
}

const Pill = ({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold",
      className
    )}
  >
    {children}
  </span>
)

export default function AgentCard({
  owner,
  agent,
  loading,
  totalListings,
  activeListings,
}: AgentCardProps) {
  const name = agent?.name ?? owner.name
  const photo = agent?.profilePicture?.[0] ?? owner.profilePicture?.[0]
  const company = [
    agent?.businessName,
    agent?.licenseNumber && `ID-${agent.licenseNumber}`,
  ]
    .filter(Boolean)
    .join(" ")
  const risk = agent?.riskLevel ? RISK[agent.riskLevel] : null

  // the public agent endpoint only knows the e-mail check (isVerified), so the admin verification state comes from the admin user list
  const fullAgent = useAdminUsers().data?.find((u) => u._id === owner._id)

  return (
    <AdminSection title="Agent Profile">
      <div className="flex items-center gap-3">
        <Avatar name={name} src={photo} size="md" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-text-primary">
            {name}
          </p>
          {company && (
            <p className="truncate text-[12.5px] text-text-secondary">
              {company}
            </p>
          )}
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-[13.5px] text-text-secondary">
        {loading ? (
          <>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <li className="flex items-center gap-2.5">
              <Mail size={15} aria-hidden />
              <span className="truncate">{agent?.email ?? "—"}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} aria-hidden />
              {agent?.phoneNumber ?? "—"}
            </li>
            <li className="flex items-center gap-2.5">
              <CalendarDays size={15} aria-hidden />
              Joined {formatDate(agent?.createdAt)}
            </li>
          </>
        )}
      </ul>

      {/* User Management will read ?agent= once it exists */}
      <Link
        to={`/admin/agents/${owner._id}`}
        className="mt-4 flex h-10 items-center justify-center rounded-lg bg-button-bg text-[14px] font-semibold text-white outline-none hover:bg-button-hover focus-visible:ring-2 focus-visible:ring-button-bg/40 focus-visible:ring-offset-2"
      >
        View Profile
      </Link>

      <dl className="mt-4 divide-y divide-slate-100 text-[14px]">
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-text-secondary">Verification</dt>
          <dd>
            {fullAgent ? (
              <ReviewBadge state={reviewState(fullAgent)} />
            ) : (
              <span className="text-[13px] text-text-secondary">—</span>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <dt className="text-text-secondary">Risk Level</dt>
          <dd>
            {risk ? (
              <Pill className={risk.style}>{risk.label}</Pill>
            ) : (
              <span className="text-[13px] text-text-secondary">
                Not assessed
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 px-3 py-3 text-center">
          <p className="text-[12.5px] text-text-secondary">Total Listings</p>
          {totalListings === undefined ? (
            <Skeleton className="mx-auto mt-1 h-7 w-10" />
          ) : (
            <p className="font-raleway text-[22px] leading-8 font-bold text-button-bg lining-nums tabular-nums">
              {totalListings}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 px-3 py-3 text-center">
          <p className="text-[12.5px] text-text-secondary">Active Listings</p>
          {activeListings === undefined ? (
            <Skeleton className="mx-auto mt-1 h-7 w-10" />
          ) : (
            <p className="font-raleway text-[22px] leading-8 font-bold text-emerald-700 lining-nums tabular-nums">
              {activeListings}
            </p>
          )}
        </div>
      </div>
    </AdminSection>
  )
}
