import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menu from "@/assets/images/icon-menu.svg";
import close from "@/assets/images/closeMenu.svg";
import avatar from "@/assets/images/avatar.jpg";
import dashboard from "@/assets/images/icon-nav-dashboard.svg";
import agents from "@/assets/images/agents.svg";
import chats from "@/assets/images/icon-nav-chat.svg";
import recent from "@/assets/images/recent.svg";
import wallet from "@/assets/images/wallet.svg";
import downArrow from "@/assets/images/icon-downArrow.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  const links = [
    {
      icon: dashboard,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: agents,
      title: "Find Agents",
      link: "/",
    },
    {
      icon: chats,
      title: "Chats",
      link: "/",
    },
    {
      icon: recent,
      title: "Recent Activities",
      link: "/",
    },
    {
      icon: wallet,
      title: "My Wallet",
      link: "/",
    },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide if scrolled down more than 66px (nav height)
      if (currentScrollY > scrollY && currentScrollY > 72) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  // Add this useEffect to control body scroll
  useEffect(() => {
    if (openMenu) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-6 font-ssPro fixed top-0 left-0 bg-white w-full py-6 h-18"
    >
      <div className="flex items-center justify-between h-full">
        <Link
          to="/"
          className="font-raleway text-[24px] font-bold text-[#274AD0] leading-6"
        >
          Finda<span className="font-ssPro">Home</span>
        </Link>

        <button className="cursor-pointer" onClick={handleMenu}>
          <img src={menu} alt="menu" />
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Backdrop */}
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
              initial={{ x: 250, opacity: 0 }} // start off-screen right
              animate={{ x: 0, opacity: 1 }} // slide in
              exit={{ x: 250, opacity: 0 }} // slide out
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="border fixed bg-white top-0 right-0 h-[367px] w-[203px] menu-box-shadow pt-[24px] pl-[17px] pr-6 z-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-1">
                  <img
                    src={avatar}
                    className="w-[30px] h-[30px] rounded-full object-cover"
                    alt="profile"
                  />

                  <p className="text-sm text-text-100">Ntekim Victoria</p>
                </div>

                <img
                  src={close}
                  alt="close"
                  onClick={handleMenu}
                  className="cursor-pointer"
                />
              </div>

              {/* nav links */}
              <div className="space-y-4 mt-6">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    onClick={handleMenu}
                    className="flex items-center justify-between py-0.5"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <img src={link.icon} alt="dashboard" />
                      <p className="text-xs text-text-100">{link.title}</p>
                    </div>
                    <img src={downArrow} alt="" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
