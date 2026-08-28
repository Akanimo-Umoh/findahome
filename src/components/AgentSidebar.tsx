import { Link, useLocation } from "react-router-dom"
import dashboardIcon from "@/assets/agentImages/icon-mydashboard.svg"
import dashboardActiveIcon from "@/assets/agentImages/icon-mydashboardActive.svg"
import chatsIcon from "@/assets/agentImages/icon-mychat.svg"
import chatsActiveIcon from "@/assets/agentImages/icon-mychatActive.svg"
import listingsIcon from "@/assets/agentImages/icon-mylisting.svg"
import listingsActiveIcon from "@/assets/agentImages/icon-mylistingActive.svg"
import walletIcon from "@/assets/agentImages/icon-mywallet.svg"
import walletActiveIcon from "@/assets/agentImages/icon-mywalletActive.svg"
import adsIcon from "@/assets/agentImages/icon-myads.svg"
import adsActiveIcon from "@/assets/agentImages/icon-myadsActive.svg"
import transactionsIcon from "@/assets/agentImages/icon-mytransactions.svg"
import transactionsActiveIcon from "@/assets/agentImages/icon-mytransactionsActive.svg"
import disputesIcon from "@/assets/agentImages/icon-mydisputes.svg"
import disputesActiveIcon from "@/assets/agentImages/icon-mydisputesActive.svg"
import logoIcon from "@/assets/agentImages/icon-logo.svg"
import logoutIcon from "@/assets/images/icon-user.svg"
import { useAuthContext } from "@/context/AuthContext"
import { useLogout } from "@/hooks/useLogout"
import Avatar from "@/components/Avatar"

const NAV_LINKS = [
  {
    title: "Dashboard",
    link: "/agent/dashboard",
    icon: dashboardIcon,
    iconActive: dashboardActiveIcon,
  },
  {
    title: "Chats",
    link: "/messages",
    icon: chatsIcon,
    iconActive: chatsActiveIcon,
  },
  {
    title: "My Listings",
    link: "/agent/my-listings",
    icon: listingsIcon,
    iconActive: listingsActiveIcon,
  },
  {
    title: "My Wallet",
    link: "/agent/wallet",
    icon: walletIcon,
    iconActive: walletActiveIcon,
  },
  {
    title: "My Ads",
    link: "/agent/my-ads",
    icon: adsIcon,
    iconActive: adsActiveIcon,
  },
  {
    title: "Transactions",
    link: "/agent/transactions",
    icon: transactionsIcon,
    iconActive: transactionsActiveIcon,
  },
  {
    title: "Disputes",
    link: "/agent/my-disputes",
    icon: disputesIcon,
    iconActive: disputesActiveIcon,
  },
]

export default function AgentSidebar() {
  const location = useLocation()
  const { user } = useAuthContext()
  const { handleLogout } = useLogout()

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-75 flex-col border-r border-bg-accent bg-white px-8 py-8">
      {/* logo */}
      <Link to="/agent/dashboard" className="shrink-0">
        <img src={logoIcon} alt="" />
      </Link>

      {/* nav links */}
      <nav className="mt-8 flex flex-1 flex-col gap-2 overflow-y-auto">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.link
          return (
            <Link
              key={link.link}
              to={link.link}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ${
                isActive
                  ? "bg-button-bg text-white"
                  : "text-text-primary hover:bg-bg-accent"
              }`}
            >
              <img
                src={isActive ? link.iconActive : link.icon}
                alt=""
                className="shrink-0"
              />

              <p className="font-semibold tracking-[1px]">{link.title}</p>
            </Link>
          )
        })}
      </nav>

      {/* bottom — business name + logout */}
      <div className="mt-4 flex shrink-0 flex-col gap-4">
        <Link
          to="/agent/profile"
          className="flex items-center gap-3 rounded-xl bg-bg-warm-section px-2 py-2"
        >
          <Avatar
            name={user?.name ?? "?"}
            src={user?.profilePicture}
            // size="sm"
            className="h-12 w-12 border border-button-bg"
          />

          <div>
            <p className="text-[18px] font-semibold tracking-[1px]">
              {user?.name}
            </p>

            <p className="text-[14px] leading-4">Agent. Lagos.</p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-button-bg px-4 py-3 transition-colors hover:bg-bg-accent"
        >
          <img src={logoutIcon} alt="" className="h-6 w-6" />

          <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
            Logout
          </p>
        </button>
      </div>
    </aside>
  )
}
