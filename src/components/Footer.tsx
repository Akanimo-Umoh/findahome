import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import location from "@/assets/images/icon-location.svg"
import phone from "@/assets/images/icon-phone-number.svg"
import email from "@/assets/images/icon-email.svg"
import copyright from "@/assets/images/icon-copyright.svg"
import Logo from "./Logo"

/* ---------- Theme ----------
 * Every color in the footer lives here, so changing the look means editing
 * this one object. This is the "royal blue" theme (white text on blue).
 */
// Mesh gradient: a base color with soft radial "blobs" layered on top.
// The colors are our own brand blues. The lightest blobs are kept mid-tone
// so white text stays readable wherever it overlaps them.
const meshStyle: CSSProperties = {
  backgroundColor: "#112379",
  backgroundImage: [
    "radial-gradient(at 8% 12%, #2A47B8 0, transparent 48%)",
    "radial-gradient(at 92% 6%, #3F37B5 0, transparent 46%)",
    "radial-gradient(at 78% 78%, #1E4AA8 0, transparent 50%)",
    "radial-gradient(at 6% 92%, #0B1A5E 0, transparent 55%)",
  ].join(", "),
}

const theme = {
  footer: "text-white antialiased",
  logoWrap: "inline-flex rounded-xl bg-white px-3 py-2", // keeps the colored logo readable
  heading: "text-white",
  text: "text-white",
  link: "text-white hover:underline underline-offset-4 focus-visible:outline-white",
  divider:
    "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]", // fades out at both ends
  icon: "brightness-0 invert", // flips the dark line icons to white
}

/* ---------- Links ----------
 * "/#id" links scroll to a section on the home page, from any page.
 * Home needs matching ids and the useScrollToHash() hook.
 * TODO: fill in the empty `to` values with your real routes.
 */
const quickLinks = [
  { label: "Buy Property", to: "" },
  { label: "List Property", to: "" },
  { label: "Rent Apartment", to: "" },
]

const company = [
  { label: "Why Choose Us", to: "/#why-choose-us" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "FAQ", to: "/#faq" },
  { label: "Terms and conditions", to: "" },
  { label: "Privacy policy", to: "" },
]

const contacts = [
  { icon: location, text: "123 Victoria Island, Lagos" },
  { icon: phone, text: "+234 816 728 8115", href: "tel:+2348167288115" },
  {
    icon: email,
    text: "hello@findahome.ng",
    href: "mailto:hello@findahome.ng",
  },
]

const headingClass = `font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px] ${theme.heading}`
const listClass =
  "mt-3 space-y-2 text-[14px] md:mt-4 md:space-y-3 md:text-[16px]"
const linkClass = `rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.link}`
const iconClass = `h-4 w-4 shrink-0 md:h-5 md:w-5 ${theme.icon}`

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={meshStyle}
      className={`relative mt-10 overflow-hidden rounded-t-3xl font-ssPro md:mt-20 ${theme.footer}`}
    >
      {/* pb-25 on mobile keeps the copyright clear of a fixed bottom nav while
          the footer background still extends underneath it */}
      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-10 md:px-8 md:pt-14 md:pb-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1.3fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className={theme.logoWrap}>
              <Logo />
            </div>

            <p
              className={`mt-3 max-w-55 text-[12px] leading-5 md:max-w-xl md:text-[14px] md:leading-6 lg:max-w-md ${theme.text}`}
            >
              <span className="md:hidden">
                Your trusted partner in finding verified homes across Nigeria.
              </span>
              <span className="hidden md:inline">
                Your trusted property marketplace for finding homes safely and
                transacting with confidence. Whether you're searching for your
                next home or listing a property for serious buyers, FindaHome
                connects you with verified agents, secure escrow payments, and a
                transparent inspection process. Discover apartments, houses, and
                investment properties all protected from search to handover in
                one trusted place.
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className={headingClass}>Quick Links</h2>
            <ul className={listClass}>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact: sits last on sm (full width row), in the middle from md up */}
          <div className="sm:order-3 sm:col-span-2 md:order-none md:col-span-1">
            <h2 className={headingClass}>Contact Us</h2>
            <ul className={listClass}>
              {contacts.map((contact) => {
                const content = (
                  <>
                    <img src={contact.icon} alt="" className={iconClass} />
                    <span>{contact.text}</span>
                  </>
                )

                return (
                  <li key={contact.text}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className={`flex items-center gap-2 ${linkClass}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <p className={`flex items-center gap-2 ${theme.text}`}>
                        {content}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className={headingClass}>Company</h2>
            <ul className={listClass}>
              {company.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-10 h-px md:mt-14 ${theme.divider}`} />
        <div className="flex items-center justify-center gap-1.5 pt-6">
          <img src={copyright} alt="" className={iconClass} />
          <p className={`text-[12px] md:text-[14px] ${theme.text}`}>
            {year} FindaHome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
