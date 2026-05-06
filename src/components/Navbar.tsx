// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import menu from "@/assets/images/icon-menu.svg";
// import close from "@/assets/images/closeMenu.svg";
// import avatar from "@/assets/images/avatar.jpg";
// import dashboard from "@/assets/images/icon-nav-dashboard.svg";
// import agents from "@/assets/images/icon-agents.svg";
// import chats from "@/assets/images/icon-nav-chat.svg";
// import recent from "@/assets/images/icon-recent.svg";
// import wallet from "@/assets/images/icon-wallet.svg";
// import dashboardActive from "@/assets/images/icon-active-dashboard.svg";
// import agentsActive from "@/assets/images/icon-active-agents.svg";
// import chatsActive from "@/assets/images/icon-active-chat.svg";
// import recentActive from "@/assets/images/icon-active-recent.svg";
// import walletActive from "@/assets/images/icon-active-wallet.svg";
// import rightArrow from "@/assets/images/icon-nav-rightArrow.svg";
// import logoutIcon from "@/assets/images/icon-user.svg";
// import activeRightArrowIcon from "@/assets/images/icon-white-right-arrow.svg";
// import { AnimatePresence, motion } from "framer-motion";
// import { useAuthContext } from "@/context/AuthContext";

// export default function Navbar() {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [hidden, setHidden] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, user, logout } = useAuthContext();

//   const authenticatedLinks = [
//     {
//       icon: dashboard,
//       iconActive: dashboardActive,
//       title: "Dashboard",
//       link: "/dashboard",
//     },
//     {
//       icon: agents,
//       iconActive: agentsActive,
//       title: "Find Agents",
//       link: "/agents",
//     },
//     {
//       icon: chats,
//       iconActive: chatsActive,
//       title: "Chats",
//       link: "/chats",
//     },
//     {
//       icon: recent,
//       iconActive: recentActive,
//       title: "Recent Activities",
//       link: "/recent",
//     },
//     {
//       icon: wallet,
//       iconActive: walletActive,
//       title: "My Wallet",
//       link: "/wallet",
//     },
//   ];

//   const unauthenticatedLinks = [
//     {
//       icon: dashboard,
//       iconActive: dashboardActive,
//       title: "Home",
//       link: "/",
//     },
//     {
//       icon: agents,
//       iconActive: agentsActive,
//       title: "Find Agents",
//       link: "/agents",
//     },
//     {
//       icon: chats,
//       iconActive: chatsActive,
//       title: "Apartments",
//       link: "/properties",
//     },
//     {
//       icon: recent,
//       iconActive: recentActive,
//       title: "About us",
//       link: "/about",
//     },
//     {
//       icon: wallet,
//       iconActive: walletActive,
//       title: "My Wallet",
//       link: "/wallet",
//     },
//   ];

//   // use appropriate links based on auth state
//   const links = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;

//   // Handle scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Only hide if scrolled down more than 66px (nav height)
//       if (currentScrollY > scrollY && currentScrollY > 72) {
//         setHidden(true);
//       } else {
//         setHidden(false);
//       }

//       setScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrollY]);

//   // Add this useEffect to control body scroll
//   useEffect(() => {
//     if (openMenu) {
//       // Prevent scrolling
//       document.body.style.overflow = "hidden";
//     } else {
//       // Re-enable scrolling
//       document.body.style.overflow = "unset";
//     }

//     // Cleanup function to ensure scroll is re-enabled when component unmounts
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [openMenu]);

//   const handleMenu = () => {
//     setOpenMenu((prev) => !prev);
//   };

//   const closeMenu = () => {
//     setOpenMenu(false);
//   };

//   const handleLogout = () => {
//     logout();
//     closeMenu();
//   };

//   return (
//     <motion.nav
//       initial={{ y: 0 }}
//       animate={{ y: hidden ? -72 : 0 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="px-6 font-ssPro fixed top-0 left-0 bg-white w-full py-6 h-18 z-50"
//     >
//       <div className="flex items-center justify-between h-full">
//         <Link
//           to="/"
//           className="font-raleway text-[24px] font-bold text-[#274AD0] leading-6"
//         >
//           Finda<span className="font-ssPro">Home</span>
//         </Link>

//         <button className="cursor-pointer" onClick={handleMenu}>
//           <img src={menu} alt="menu" />
//         </button>
//       </div>

//       {/* mobile menu */}
//       <AnimatePresence>
//         {openMenu && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               key="backdrop"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               onClick={closeMenu}
//               className="fixed inset-0 bg-black/30 z-40"
//             />

//             <motion.div
//               key="mobile-menu"
//               initial={{ x: 250, opacity: 0 }} // start off-screen right
//               animate={{ x: 0, opacity: 1 }} // slide in
//               exit={{ x: 250, opacity: 0 }} // slide out
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed bg-white top-0 right-0 w-[203px] pt-6 pl-[17px] pr-6 z-50 h-screen rounded-l-xl pb-[55px]"
//             >
//               <div className="flex flex-col h-full justify-between">
//                 <div>
//                   <div className="flex items-center justify-between">
//                     {isAuthenticated && (
//                       <div className="flex items-center justify-between gap-1">
//                         <img
//                           src={avatar}
//                           className="w-7.5 h-7.5 rounded-full object-cover"
//                           alt="profile"
//                         />

//                         <p className="text-sm text-text-100">{user?.name}</p>
//                       </div>
//                     )}

//                     <img
//                       src={close}
//                       alt="close"
//                       onClick={handleMenu}
//                       className="cursor-pointer ml-auto"
//                     />
//                   </div>

//                   {/* nav links */}
//                   <div className="space-y-2 mt-6">
//                     {isAuthenticated ? (
//                       links.map((link, index) => {
//                         const isActive = location.pathname === link.link;

//                         return (
//                           <Link
//                             key={index}
//                             to={link.link}
//                             onClick={handleMenu}
//                             className={`flex items-center justify-between p-1 ${isActive ? "bg-button-bg rounded-lg" : ""}`}
//                           >
//                             <div
//                               className={`flex items-center justify-center gap-1 p-1 ${isActive ? "bg-button-bg rounded-lg" : ""}`}
//                             >
//                               <img
//                                 src={isActive ? link.iconActive : link.icon}
//                                 alt="dashboard"
//                               />
//                               <p
//                                 className={`text-[12px] ${isActive ? "text-white" : "text-text-100"}`}
//                               >
//                                 {link.title}
//                               </p>
//                             </div>
//                             <img
//                               src={isActive ? activeRightArrowIcon : rightArrow}
//                               alt=""
//                             />
//                           </Link>
//                         );
//                       })
//                     ) : (
//                       <>
//                         {links.map((link, index) => {
//                           const isActive = location.pathname === link.link;

//                           return (
//                             <Link
//                               key={index}
//                               to={link.link}
//                               onClick={handleMenu}
//                               className={`flex items-center justify-between p-1 ${isActive ? "bg-button-bg rounded-lg" : ""}`}
//                             >
//                               <div
//                                 className={`flex items-center justify-center gap-1 ${isActive ? "" : ""}`}
//                               >
//                                 <img
//                                   src={isActive ? link.iconActive : link.icon}
//                                   alt="dashboard"
//                                 />
//                                 <p
//                                   className={`text-[12px] ${isActive ? "text-white" : "text-text-100"}`}
//                                 >
//                                   {link.title}
//                                 </p>
//                               </div>
//                               <img
//                                 src={
//                                   isActive ? activeRightArrowIcon : rightArrow
//                                 }
//                                 alt=""
//                               />
//                             </Link>
//                           );
//                         })}

//                         <div className="mt-6 flex items-center justify-between">
//                           <Link
//                             to="/login"
//                             className="text-[12px] text-text-primary flex items-center justify-center border border-button-bg bg-button-disabled h-6 rounded-lg w-[70px]"
//                           >
//                             Sign in
//                           </Link>

//                           <Link
//                             to="/signup"
//                             className="text-[12px] text-white flex items-center justify-center bg-button-bg rounded-lg w-[70px] h-6"
//                           >
//                             Sign up
//                           </Link>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {isAuthenticated && (
//                   <button
//                     onClick={handleLogout}
//                     className="flex gap-1 border border-button-bg rounded-lg p-1 cursor-pointer"
//                   >
//                     <img src={logoutIcon} alt="" />
//                     <p className="text-[12px] text-text-primary">Logout</p>
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "@/assets/images/icon-menu.svg";
import close from "@/assets/images/closeMenu.svg";
import dashboard from "@/assets/images/icon-nav-dashboard.svg";
import agents from "@/assets/images/icon-agents.svg";
import chats from "@/assets/images/icon-nav-chat.svg";
import recent from "@/assets/images/icon-recent.svg";
import wallet from "@/assets/images/icon-wallet.svg";
import dashboardActive from "@/assets/images/icon-active-dashboard.svg";
import agentsActive from "@/assets/images/icon-active-agents.svg";
import chatsActive from "@/assets/images/icon-active-chat.svg";
import recentActive from "@/assets/images/icon-active-recent.svg";
import walletActive from "@/assets/images/icon-active-wallet.svg";
import rightArrow from "@/assets/images/icon-nav-rightArrow.svg";
import logoutIcon from "@/assets/images/icon-user.svg";
import logoIcon from "@/assets/images/icon-logo-tablet.svg";
import activeRightArrowIcon from "@/assets/images/icon-white-right-arrow.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext";
import Avatar from "./Avatar";
import { useLogout } from "@/hooks/useLogout";

type NavbarProps = {
  variant?: "light" | "dark";
};

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthContext();
  const { handleLogout } = useLogout();

  // ── MOBILE LINKS ──
  const mobileUserLinks = [
    {
      icon: dashboard,
      iconActive: dashboardActive,
      title: "Home",
      link: "/",
    },
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
  ];

  const mobileAgentLinks = [
    {
      icon: dashboard,
      iconActive: dashboardActive,
      title: "Dashboard",
      link: "/agent/dashboard",
    },
    {
      icon: wallet,
      iconActive: walletActive,
      title: "My Listings",
      link: "/agent/my-listings",
    },
    {
      icon: chats,
      iconActive: chatsActive,
      title: "Chats",
      link: "/messages",
    },
    {
      icon: wallet,
      iconActive: walletActive,
      title: "My Wallet",
      link: "/agent/wallet",
    },
    {
      icon: wallet,
      iconActive: walletActive,
      title: "My Ads",
      link: "/agent/ads",
    },
  ];

  const mobileUnauthenticatedLinks = [
    { icon: dashboard, iconActive: dashboardActive, title: "Home", link: "/" },
    {
      icon: agents,
      iconActive: agentsActive,
      title: "Find agent",
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
      title: "My wallet",
      link: "/wallet",
    },
  ];

  // ── TABLET LINKS ──
  const tabletUserLinks = [
    { title: "Home", link: "/" },
    { title: "Find agent", link: "/agents" },
    { title: "Chats", link: "/messages" },
    { title: "Recent Activities", link: "/recent-activities" },
    { title: "My Wallet", link: "/wallet" },
  ];

  const tabletAgentLinks = [
    { title: "Dashboard", link: "/agent/dashboard" },
    { title: "My Listings", link: "/agent/my-listings" },
    { title: "My Wallet", link: "/agent/wallet" },
    { title: "My Ads", link: "/agent/ads" },
  ];

  const tabletUnauthenticatedLinks = [
    { title: "About Us", link: "/about" },
    { title: "Properties", link: "/properties" },
    { title: "FAQs", link: "/faqs" },
    { title: "Log in", link: "/login" },
    { title: "Create account", link: "/signup" },
  ];

  // pick correct sets based on auth + role
  const mobileLinks = isAuthenticated
    ? user?.role === "agent"
      ? mobileAgentLinks
      : mobileUserLinks
    : mobileUnauthenticatedLinks;

  const tabletLinks = isAuthenticated
    ? user?.role === "agent"
      ? tabletAgentLinks
      : tabletUserLinks
    : tabletUnauthenticatedLinks;

  // scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY && currentScrollY > 72) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  const handleMenu = () => setOpenMenu((prev) => !prev);
  const closeMenu = () => setOpenMenu(false);

  const profileLink = user?.role === "agent" ? "/agent/profile" : "/profile";

  const isLight = variant === "light";
  const linkTextClass = isLight ? "text-white" : "text-text-primary";
  const logoTextClass = isLight ? "text-white" : "text-[#274AD0]";
  const navBgClass = isLight ? "bg-transparent" : "bg-white md:bg-bg-accent";

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`px-6 font-ssPro fixed top-0 left-0 w-full h-18 z-50 transition-colors duration-300 md:h-16.5 ${navBgClass}`}
    >
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          to="/"
          className={`font-raleway text-[24px] font-bold leading-6 flex items-center gap-2 ${logoTextClass}`}
        >
          <img src={logoIcon} alt="" />
          <p>
            Finda<span className="font-ssPro">Home</span>
          </p>
        </Link>

        {/* ── TABLET NAV (md+) ── */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2">
            {tabletLinks.map((link, index) => {
              const isActive = location.pathname === link.link;
              return (
                <Link
                  key={index}
                  to={link.link}
                  className={`text-[14px] px-2 py-1 rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-button-bg text-white"
                        : `${linkTextClass} hover:opacity-70`
                    }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          {isAuthenticated && (
            <Link
              to={profileLink}
              className="border border-button-bg rounded-full"
            >
              <Avatar
                name={user?.name ?? "?"}
                src={user?.profilePicture}
                size="sm"
              />
            </Link>
          )}
        </div>

        {/* ── MOBILE HAMBURGER (below md) ── */}
        <button className="cursor-pointer md:hidden" onClick={handleMenu}>
          <img
            src={menu}
            alt="menu"
            className={isLight ? "brightness-0 invert" : ""}
          />
        </button>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
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
              className="fixed inset-0 bg-black/30 z-40"
            />

            <motion.div
              key="mobile-menu"
              initial={{ x: 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 250, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bg-white top-0 right-0 w-[203px] pt-6 pl-[17px] pr-6 z-50 h-screen rounded-l-xl pb-[55px]"
            >
              <div className="flex flex-col h-full justify-between">
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
                        <p className="text-sm line-clamp-1">{user?.name}</p>
                      </Link>
                    )}
                    <img
                      src={close}
                      alt="close"
                      onClick={handleMenu}
                      className="cursor-pointer ml-auto"
                    />
                  </div>

                  {/* mobile nav links */}
                  <div className="space-y-2 mt-6">
                    {isAuthenticated ? (
                      mobileLinks.map((link, index) => {
                        const isActive = location.pathname === link.link;
                        return (
                          <Link
                            key={index}
                            to={link.link}
                            onClick={closeMenu}
                            className={`flex items-center justify-between p-1 ${isActive ? "bg-button-bg rounded-lg" : ""}`}
                          >
                            <div className="flex items-center justify-center gap-1 p-1">
                              <img
                                src={isActive ? link.iconActive : link.icon}
                                alt=""
                              />
                              <p
                                className={`text-[12px] ${isActive ? "text-white" : "text-text-100"}`}
                              >
                                {link.title}
                              </p>
                            </div>
                            <img
                              src={isActive ? activeRightArrowIcon : rightArrow}
                              alt=""
                            />
                          </Link>
                        );
                      })
                    ) : (
                      <>
                        {mobileUnauthenticatedLinks.map((link, index) => {
                          const isActive = location.pathname === link.link;
                          return (
                            <Link
                              key={index}
                              to={link.link}
                              onClick={closeMenu}
                              className={`flex items-center justify-between p-1 ${isActive ? "bg-button-bg rounded-lg" : ""}`}
                            >
                              <div className="flex items-center justify-center gap-1">
                                <img
                                  src={isActive ? link.iconActive : link.icon}
                                  alt=""
                                />
                                <p
                                  className={`text-[12px] ${isActive ? "text-white" : "text-text-100"}`}
                                >
                                  {link.title}
                                </p>
                              </div>
                              <img
                                src={
                                  isActive ? activeRightArrowIcon : rightArrow
                                }
                                alt=""
                              />
                            </Link>
                          );
                        })}

                        <div className="mt-6 flex items-center justify-between">
                          <Link
                            to="/login"
                            className="text-[12px] text-text-primary flex items-center justify-center border border-button-bg bg-button-disabled h-6 rounded-lg w-[70px]"
                          >
                            Sign in
                          </Link>
                          <Link
                            to="/signup"
                            className="text-[12px] text-white flex items-center justify-center bg-button-bg rounded-lg w-[70px] h-6"
                          >
                            Sign up
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="flex gap-1 border border-button-bg rounded-lg p-1 cursor-pointer"
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
  );
}
