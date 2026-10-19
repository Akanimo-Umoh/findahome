import { Link, useLocation } from "react-router-dom"
import { LogOut } from "lucide-react"
import logoIcon from "@/assets/images/icon-logo-tablet.svg"
import { useLogout } from "@/hooks/useLogout"
import { cn } from "@/lib/utils"
import {
  adminFooterNav,
  adminNavGroups,
  isNavItemActive,
  type AdminNavItem,
} from "./adminNav"

type AdminSidebarProps = {
  // lets the mobile drawer close itself when a link is chosen
  onNavigate?: () => void
}

function NavLinkItem({
  item,
  active,
  onNavigate,
}: {
  item: AdminNavItem
  active: boolean
  onNavigate?: () => void
}) {
  const Icon = item.icon
  return (
    <li>
      <Link
        to={item.to}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
          active
            ? "bg-bg-accent text-button-bg"
            : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
        )}
      >
        {active && (
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-0.75 rounded-r-full bg-button-bg"
          />
        )}
        <Icon size={18} aria-hidden />
        {item.label}
      </Link>
    </li>
  )
}

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const { pathname } = useLocation()
  const { handleLogout } = useLogout()

  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link
          to="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded font-raleway text-[22px] leading-6 font-bold text-button-bg outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40"
        >
          <img src={logoIcon} alt="" />
          <span>
            Finda<span className="font-ssPro">Home</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 pb-4">
        {adminNavGroups.map((group) => (
          <div key={group.label ?? "root"} className="mt-5 first:mt-2">
            {group.label && (
              <p className="px-3 pb-1.5 text-[12px] font-semibold text-text-secondary">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <NavLinkItem
                  key={item.to}
                  item={item}
                  active={isNavItemActive(item, pathname)}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-slate-200 p-3">
        <ul className="space-y-0.5">
          {adminFooterNav.map((item) => (
            <NavLinkItem
              key={item.to}
              item={item}
              active={isNavItemActive(item, pathname)}
              onNavigate={onNavigate}
            />
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                onNavigate?.()
                handleLogout()
              }}
              className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-[14px] font-semibold text-text-secondary transition-colors outline-none hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-button-bg/40"
            >
              <LogOut size={18} aria-hidden />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
