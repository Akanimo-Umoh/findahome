import {
  CalendarDays,
  Flag,
  Mail,
  MessageSquare,
  Phone,
  ShieldAlert,
} from "lucide-react"
import Avatar from "@/components/Avatar"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser } from "@/types/adminUser"
import type { ReviewState } from "../../agentMeta"
import ReviewBadge from "../../shared/ReviewBadge"

type ProfileHeaderProps = {
  agent: AdminUser
  state: ReviewState
}

const btn =
  "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-[14px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40"
const disabledBtn = `${btn} cursor-not-allowed border-slate-200 text-text-disabled`

export default function ProfileHeader({ agent, state }: ProfileHeaderProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar name={agent.name} src={agent.profilePicture?.[0]} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-raleway text-[20px] leading-7 font-bold text-text-primary">
              {agent.businessName || agent.name}
            </h2>
            <ReviewBadge state={state} />
          </div>
          {agent.businessName && (
            <p className="text-[13.5px] text-text-secondary">{agent.name}</p>
          )}

          {agent.about && (
            <p className="mt-2 max-w-2xl text-[14px] text-text-secondary">
              {agent.about}
            </p>
          )}

          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-text-secondary">
            <li className="flex items-center gap-2">
              <Mail size={15} aria-hidden />
              {agent.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} aria-hidden />
              {agent.phoneNumber || "—"}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays size={15} aria-hidden />
              Joined {formatDate(agent.createdAt)}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`mailto:${agent.email}`}
          className={`${btn} border-slate-200 text-text-primary hover:bg-slate-50`}
        >
          <MessageSquare size={16} aria-hidden />
          Contact Agent
        </a>

        {/* needs a flag / suspend endpoint on the backend */}
        <button
          type="button"
          disabled
          title="Needs backend support"
          className={disabledBtn}
        >
          <Flag size={16} aria-hidden />
          Flag
        </button>
        <button
          type="button"
          disabled
          title="Needs backend support"
          className={disabledBtn}
        >
          <ShieldAlert size={16} aria-hidden />
          Suspend
        </button>
      </div>
    </section>
  )
}
