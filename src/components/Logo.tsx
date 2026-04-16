import logoIcon from "@/assets/images/icon-logo-tablet.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link
        to="/"
        className={`font-raleway text-[24px] font-bold leading-6 flex items-center justify-center gap-2 text-button-bg w-fit`}
      >
        <img src={logoIcon} alt="" className="" />
        <p>
          Finda<span className="font-ssPro">Home</span>
        </p>
      </Link>
    </div>
  );
}
