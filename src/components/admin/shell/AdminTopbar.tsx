import { Link, useLocation } from "react-router-dom"
import { Bell, Menu } from "lucide-react"
import Avatar from "@/components/Avatar"
import { useAuthContext } from "@/context/AuthContext"
import { useNotifications } from "@/hooks/useNotifications"
import { findNavItem } from "./adminNav"

type AdminTopbarProps = { onMenuClick: () => void }

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const { data } = useNotifications()

  const item = findNavItem(pathname)
  const title = item?.title ?? "Admin"
  const subtitle =
    typeof item?.subtitle === "function" ? item.subtitle(user) : item?.subtitle

  const unread = data?.unreadCount ?? 0
  const displayName = user?.name || "Admin"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6 xl:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="-ml-1.5 flex size-9 cursor-pointer items-center justify-center rounded-lg text-text-primary outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-button-bg/40 lg:hidden"
      >
        <Menu size={20} aria-hidden />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-raleway text-[18px] leading-6 font-bold text-text-primary md:text-[20px]">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[13px] leading-4 text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      <Link
        to="/notifications"
        aria-label={
          unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
        }
        className="relative flex size-10 items-center justify-center rounded-lg text-text-primary outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-button-bg/40"
      >
        <Bell size={20} aria-hidden />
        {unread > 0 && (
          <span className="absolute top-1 right-1 flex min-w-4.5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-4.5 font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Link>

      <Link
        to="/admin/settings"
        className="flex items-center gap-2.5 rounded-lg py-1 pr-2 pl-1 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
      >
        <Avatar name={displayName} src={user?.profilePicture} size="sm" />
        <span className="hidden text-left sm:block">
          <span className="block text-[13px] leading-4 font-semibold text-text-primary">
            {displayName}
          </span>
          <span className="block text-[12px] leading-4 text-text-secondary">
            Administrator
          </span>
        </span>
      </Link>
    </header>
  )
}
