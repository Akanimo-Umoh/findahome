import { Link } from "react-router-dom";
import location from "@/assets/images/icon-location.svg";
import phone from "@/assets/images/icon-phone-number.svg";
import email from "@/assets/images/icon-email.svg";
import copyright from "@/assets/images/icon-copyright.svg";

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
  ];

  return (
    <div className="mt-6 font-ssPro px-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-w-41">
          <Link
            to="/"
            className="font-raleway text-[20px] font-bold text-[#274AD0] leading-6"
          >
            Finda<span className="font-ssPro">Home</span>
          </Link>

          <p className="text-[12px] text-text-secondary">
            Your trusted partner in finding verified homes across Nigeria.
          </p>
        </div>

        <div className="flex flex-col gap-1 mr-6 w-[102px]">
          <p>Quick Links</p>
          <div className="text-[14px] text-text-secondary flex flex-col gap-1">
            <Link to="">Buy Property</Link>
            <Link to="">List Property</Link>
            <Link to="">Rent Apartment</Link>
          </div>
        </div>
      </div>

      <div className="flex mt-2 justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-text-primary">
            Contact Us
          </p>
          <div>
            {contactUs.map((contact, index) => (
              <div key={index} className="flex items-center gap-1">
                <img src={contact.icon} alt={contact.alt} />
                <p className="text-[14px] text-text-secondary">
                  {contact.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-text-primary">
            Company
          </p>

          <div className="text-text-secondary text-[14px] flex flex-col gap-1">
            <Link to="">About Us</Link>
            <Link to="">How it works</Link>
            <Link to="">Terms and conditions</Link>
            <Link to="">Privacy policy</Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 mt-6 mb-[103px]">
        <img src={copyright} alt="copyright" />
        <p className="text-[12px] text-text-secondary">
          2026 FindaHome. All right reserved.
        </p>
      </div>
    </div>
  );
}
