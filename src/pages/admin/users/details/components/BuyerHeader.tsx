import {
  CalendarDays,
  Flag,
  MailCheck,
  MailWarning,
  Mail,
  Phone,
  ShieldAlert,
} from "lucide-react"
import Avatar from "@/components/Avatar"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser } from "@/types/adminUser"
import { userCode } from "../../buyerMeta"
import { useUserModeration } from "../../useUserModeration"

const btn =
  "inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-[14px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40 disabled:cursor-not-allowed disabled:opacity-50"

export default function BuyerHeader({ buyer }: { buyer: AdminUser }) {
  const moderate = useUserModeration()
  const set = (action: "flag" | "suspend" | "ban", value: boolean) =>
    moderate.mutate({ id: buyer._id, action, value })

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar name={buyer.name} src={buyer.profilePicture?.[0]} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-raleway text-[20px] leading-7 font-bold text-text-primary">
              {buyer.name}
            </h2>
            <span className="text-[13px] font-semibold text-text-secondary tabular-nums">
              {userCode(buyer)}
            </span>
            {buyer.isVerified !== undefined &&
              (buyer.isVerified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[12.5px] font-semibold text-emerald-700">
                  <MailCheck size={13} aria-hidden />
                  Email verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[12.5px] font-semibold text-amber-700">
                  <MailWarning size={13} aria-hidden />
                  Email not verified
                </span>
              ))}
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-text-secondary">
            <li className="flex items-center gap-2">
              <Mail size={15} aria-hidden />
              {buyer.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} aria-hidden />
              {buyer.phoneNumber || "—"}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays size={15} aria-hidden />
              Joined {formatDate(buyer.createdAt)}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays size={15} aria-hidden />
              Last active {formatDate(buyer.lastActive)}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={moderate.isPending}
          onClick={() => set("flag", !buyer.isFlagged)}
          className={btn}
        >
          <Flag size={16} aria-hidden />
          {buyer.isFlagged ? "Remove flag" : "Flag account"}
        </button>
        <button
          type="button"
          disabled={moderate.isPending}
          onClick={() => set("suspend", !buyer.isSuspended)}
          className={btn}
        >
          <ShieldAlert size={16} aria-hidden />
          {buyer.isSuspended ? "Unsuspend" : "Suspend"}
        </button>
        <button
          type="button"
          disabled={moderate.isPending}
          onClick={() => set("ban", !buyer.isBanned)}
          className={btn}
        >
          <ShieldAlert size={16} aria-hidden />
          {buyer.isBanned ? "Unban" : "Ban"}
        </button>
      </div>
    </section>
  )
}
