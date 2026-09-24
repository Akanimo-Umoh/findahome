import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import menu from "@/assets/images/icon-menu.svg"
import close from "@/assets/images/closeMenu.svg"
import dashboard from "@/assets/images/icon-nav-dashboard.svg"
import agents from "@/assets/images/icon-agents.svg"
import chats from "@/assets/images/icon-nav-chat.svg"
import recent from "@/assets/images/icon-recent.svg"
import wallet from "@/assets/images/icon-wallet.svg"
import dashboardActive from "@/assets/images/icon-active-dashboard.svg"
import agentsActive from "@/assets/images/icon-active-agents.svg"
import chatsActive from "@/assets/images/icon-active-chat.svg"
import recentActive from "@/assets/images/icon-active-recent.svg"
import walletActive from "@/assets/images/icon-active-wallet.svg"
import rightArrow from "@/assets/images/icon-nav-rightArrow.svg"
import logoutIcon from "@/assets/images/icon-user.svg"
import logoIcon from "@/assets/images/icon-logo-tablet.svg"
import activeRightArrowIcon from "@/assets/images/icon-white-right-arrow.svg"
import { AnimatePresence, motion } from "framer-motion"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "./Avatar"
import { useLogout } from "@/hooks/useLogout"

// agent-specific icons — same source as AgentSidebar, so nav stays visually consistent
import agentDashboardIcon from "@/assets/agentImages/icon-mydashboard.svg"
import agentDashboardActiveIcon from "@/assets/agentImages/icon-mydashboardActive.svg"
import agentChatsIcon from "@/assets/agentImages/icon-mychat.svg"
import agentChatsActiveIcon from "@/assets/agentImages/icon-mychatActive.svg"
import agentListingsIcon from "@/assets/agentImages/icon-mylisting.svg"
import agentListingsActiveIcon from "@/assets/agentImages/icon-mylistingActive.svg"
import agentWalletIcon from "@/assets/agentImages/icon-mywallet.svg"
import agentWalletActiveIcon from "@/assets/agentImages/icon-mywalletActive.svg"
import agentAdsIcon from "@/assets/agentImages/icon-myads.svg"
import agentAdsActiveIcon from "@/assets/agentImages/icon-myadsActive.svg"
import agentTransactionsIcon from "@/assets/agentImages/icon-mytransactions.svg"
import agentTransactionsActiveIcon from "@/assets/agentImages/icon-mytransactionsActive.svg"
import agentDisputesIcon from "@/assets/agentImages/icon-mydisputes.svg"
import agentDisputesActiveIcon from "@/assets/agentImages/icon-mydisputesActive.svg"

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user } = useAuthContext()
  const { handleLogout } = useLogout()

  const isAgent = user?.role === "agent"

  const logoLink = isAuthenticated && isAgent ? "/agent/dashboard" : "/"
  const profileLink = isAgent ? "/agent/profile" : "/profile"

  // ── MOBILE LINKS ──
  const mobileUserLinks = [
    { icon: dashboard, iconActive: dashboardActive, title: "Home", link: "/" },
    {
      icon: agents,
      iconActive: agentsActive,
      title: "Find Agents",
      link: "/agents",
    },
    { icon: chats, iconActive: chatsActive, title: "Chats", link: "/messages" },
    {
      icon: recent,
      iconActive: recentActive,
      title: "Recent Activities",
      link: "/recent-activities",
    },
    {
      icon: wallet,
      iconActive: walletActive,
      title: "My Wallet",
      link: "/wallet",
    },
  ]

  const mobileAgentLinks = [
    {
      icon: agentDashboardIcon,
      iconActive: agentDashboardActiveIcon,
      title: "Dashboard",
      link: "/agent/dashboard",
    },
    {
      icon: agentListingsIcon,
      iconActive: agentListingsActiveIcon,
      title: "My Listings",
      link: "/agent/my-listings",
    },
    {
      icon: agentChatsIcon,
      iconActive: agentChatsActiveIcon,
      title: "Chats",
      link: "/messages",
    },
    {
      icon: agentWalletIcon,
      iconActive: agentWalletActiveIcon,
      title: "My Wallet",
      link: "/agent/wallet",
    },
    {
      icon: agentAdsIcon,
      iconActive: agentAdsActiveIcon,
      title: "My Ads",
      link: "/agent/my-ads",
    },
    {
      icon: agentTransactionsIcon,
      iconActive: agentTransactionsActiveIcon,
      title: "Transactions",
      link: "/agent/transactions",
    },
    {
      icon: agentDisputesIcon,
      iconActive: agentDisputesActiveIcon,
      title: "Disputes",
      link: "/disputes",
    },
  ]

  const mobileUnauthenticatedLinks = [
    { icon: dashboard, iconActive: dashboardActive, title: "Home", link: "/" },
    {
      icon: agents,
      iconActive: agentsActive,
      title: "Find Agents",
      link: "/agents",
    },
    {
      icon: chats,
      iconActive: chatsActive,
      title: "Apartments",
      link: "/properties",
    },
    {
      icon: recent,
      iconActive: recentActive,
      title: "About us",
      link: "/about",
    },
    {
      icon: wallet,
      iconActive: walletActive,
      title: "My Wallet",
      link: "/wallet",
    },
  ]

  // ── TABLET LINKS ──
  const tabletUserLinks = [
    { title: "Home", link: "/" },
    { title: "Find Agents", link: "/agents" },
    { title: "Chats", link: "/messages" },
    { title: "Recent Activities", link: "/recent-activities" },
    { title: "Disputes", link: "/disputes" },
  ]

  const tabletAgentLinks = [
    { title: "Dashboard", link: "/agent/dashboard" },
    { title: "My Listings", link: "/agent/my-listings" },
    { title: "Chats", link: "/messages" },
    { title: "My Wallet", link: "/agent/wallet" },
    { title: "My Ads", link: "/agent/my-ads" },
    { title: "Transactions", link: "/agent/transactions" },
    { title: "Disputes", link: "/disputes" },
  ]

  const tabletUnauthenticatedLinks = [
    { title: "About Us", link: "/about" },
    { title: "Properties", link: "/properties" },
    { title: "FAQs", link: "/faqs" },
    { title: "Log in", link: "/login" },
    { title: "Create account", link: "/signup" },
  ]

  const mobileLinks = isAuthenticated
    ? isAgent
      ? mobileAgentLinks
      : mobileUserLinks
    : mobileUnauthenticatedLinks

  const tabletLinks = isAuthenticated
    ? isAgent
      ? tabletAgentLinks
      : tabletUserLinks
    : tabletUnauthenticatedLinks

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > scrollY && currentScrollY > 72) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [openMenu])

  const handleMenu = () => setOpenMenu((prev) => !prev)
  const closeMenu = () => setOpenMenu(false)

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-50 h-18 w-full bg-white px-6 font-ssPro transition-colors duration-300 md:h-16.5 md:bg-bg-accent md:p-8"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link
          to={logoLink}
          className="flex items-center gap-2 font-raleway text-[24px] leading-6 font-bold text-[#274AD0]"
        >
          <img src={logoIcon} alt="" />
          <p>
            Finda<span className="font-ssPro">Home</span>
          </p>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2">
            {tabletLinks.map((link, index) => {
              const isActive = location.pathname === link.link
              return (
                <Link
                  key={index}
                  to={link.link}
                  className={`rounded-lg px-2 py-1 text-[14px] transition-colors duration-200 ${
                    isActive
                      ? "bg-button-bg text-white"
                      : "text-text-primary hover:opacity-70"
                  }`}
                >
                  {link.title}
                </Link>
              )
            })}
          </div>
          {isAuthenticated && (
            <Link
              to={profileLink}
              className="rounded-full border border-button-bg"
            >
              <Avatar
                name={user?.name ?? "?"}
                src={user?.profilePicture}
                size="sm"
              />
            </Link>
          )}
        </div>

        <button className="cursor-pointer md:hidden" onClick={handleMenu}>
          <img src={menu} alt="menu" />
        </button>
      </div>

      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/30"
            />

            <motion.div
              key="mobile-menu"
              initial={{ x: 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 250, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-screen w-[203px] rounded-l-xl bg-white pt-6 pr-6 pb-[55px] pl-[17px]"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    {isAuthenticated && (
                      <Link
                        to={profileLink}
                        onClick={closeMenu}
                        className="flex items-center gap-1"
                      >
                        <Avatar
                          name={user?.name ?? "?"}
                          src={user?.profilePicture}
                          size="sm"
                        />
                        <p className="line-clamp-1 text-sm">{user?.name}</p>
                      </Link>
                    )}
                    <img
                      src={close}
                      alt="close"
                      onClick={handleMenu}
                      className="ml-auto cursor-pointer"
                    />
                  </div>

                  <div className="mt-6 space-y-2">
                    {mobileLinks.map((link, index) => {
                      const isActive = location.pathname === link.link
                      return (
                        <Link
                          key={index}
                          to={link.link}
                          onClick={closeMenu}
                          className={`flex items-center justify-between p-1 ${
                            isActive ? "rounded-lg bg-button-bg" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 p-1">
                            <img
                              src={isActive ? link.iconActive : link.icon}
                              alt=""
                            />
                            <p
                              className={`text-[12px] ${
                                isActive ? "text-white" : "text-text-100"
                              }`}
                            >
                              {link.title}
                            </p>
                          </div>
                          <img
                            src={isActive ? activeRightArrowIcon : rightArrow}
                            alt=""
                          />
                        </Link>
                      )
                    })}

                    {!isAuthenticated && (
                      <div className="mt-6 flex items-center justify-between">
                        <Link
                          to="/login"
                          className="flex h-6 w-[70px] items-center justify-center rounded-lg border border-button-bg bg-button-disabled text-[12px] text-text-primary"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="flex h-6 w-[70px] items-center justify-center rounded-lg bg-button-bg text-[12px] text-white"
                        >
                          Sign up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      closeMenu()
                      handleLogout()
                    }}
                    className="flex cursor-pointer gap-1 rounded-lg border border-button-bg p-1"
                  >
                    <img src={logoutIcon} alt="" />
                    <p className="text-[12px] text-text-primary">Logout</p>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
