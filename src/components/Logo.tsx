import logoIcon from "@/assets/images/icon-logo-tablet.svg"
import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <div>
      <Link
        to="/"
        className={`flex w-fit items-center justify-center gap-2 font-raleway text-[24px] leading-6 font-bold text-button-bg`}
      >
        <img src={logoIcon} alt="" className="" />
        <p>
          Finda<span className="font-ssPro">Home</span>
        </p>
      </Link>
    </div>
  )
}
