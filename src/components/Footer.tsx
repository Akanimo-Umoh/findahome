import { Link } from "react-router-dom"
import location from "@/assets/images/icon-location.svg"
import phone from "@/assets/images/icon-phone-number.svg"
import email from "@/assets/images/icon-email.svg"
import copyright from "@/assets/images/icon-copyright.svg"
import Logo from "./Logo"

export default function Footer() {
  const contactUs = [
    {
      icon: location,
      alt: "",
      text: "123 Victoria Island, Lagos",
    },
    {
      icon: phone,
      alt: "",
      text: "+234 816 728 8115",
    },
    {
      icon: email,
      alt: "",
      text: "hello@findahome.ng",
    },
  ]

  return (
    <div className="mx-auto mt-6 w-full max-w-7xl px-6 font-ssPro md:mt-20 md:px-8">
      <div className="flex items-center justify-between md:flex-col md:items-start">
        <div className="flex max-w-41 flex-col gap-1 md:max-w-full md:gap-2">
          <Logo />

          <p className="text-[12px] text-text-secondary md:w-full md:text-[14px]">
            <span className="md:hidden">
              Your trusted partner in finding verified homes across Nigeria.
            </span>
            <span className="hidden md:flex">
              Your trusted property marketplace for finding homes safely and
              transacting with confidence. Whether you're searching for your
              next home or listing a property for serious buyers, FindaHome
              connects you with verified agents, secure escrow payments, and a
              transparent inspection process. Discover apartments, houses, and
              investment properties all protected from search to handover in one
              trusted place.
            </span>
          </p>
        </div>

        <div className="mr-6 flex w-[102px] flex-col gap-1 md:float-left md:hidden">
          <p>Quick Links</p>
          <div className="flex flex-col gap-1 text-[14px] text-text-secondary">
            <Link to="">Buy Property</Link>
            <Link to="">List Property</Link>
            <Link to="">Rent Apartment</Link>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between md:mt-8">
        <div className="hidden flex-col gap-1 md:flex md:gap-6">
          <p className="md:font-semibold">Quick Links</p>
          <div className="flex flex-col gap-1 text-[14px] text-text-secondary md:gap-4 md:text-[18px]">
            <Link to="">Buy Property</Link>
            <Link to="">List Property</Link>
            <Link to="">Rent Apartment</Link>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-6">
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary md:text-[16px]">
            Contact Us
          </p>
          <div className="md:space-y-4">
            {contactUs.map((contact, index) => (
              <div key={index} className="flex items-center gap-1">
                <img
                  src={contact.icon}
                  alt={contact.alt}
                  className="md:h-6 md:w-6"
                />
                <p className="text-[14px] text-text-secondary md:text-[18px]">
                  {contact.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-6">
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary md:text-[16px]">
            Company
          </p>

          <div className="flex flex-col gap-1 text-[14px] text-text-secondary md:gap-4 md:text-[18px]">
            <Link to="">About Us</Link>
            <Link to="" className="md:hidden">
              How it works
            </Link>
            <Link to="">Terms and conditions</Link>
            <Link to="">Privacy policy</Link>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-[100px] flex items-center justify-center gap-1 md:mt-14 md:mb-14">
        <img src={copyright} alt="copyright" className="md:h-6 md:w-6" />
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          2026 FindaHome. All right reserved.
        </p>
      </div>
    </div>
  )
}
