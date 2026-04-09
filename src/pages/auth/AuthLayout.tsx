import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import Navbar from "@/components/Navbar";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton =
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  return (
    <div className="min-h-screen flex flex-col auth-bg items-center md:relative md:pt-18 md:min-h-[calc(screen-72px)] md:justify-center">
      <div className="relative w-full flex items-center justify-center mt-8 md:hidden">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 cursor-pointer"
          >
            <img src={goBack} alt="" />
          </button>
        )}
        <Link
          to="/"
          className="font-raleway font-bold text-[24px] text-[#274AD0]"
        >
          Finda<span className="font-ssPro">Home</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="flex w-full justify-center mt-8 mb-8 max-w-[406px] md:bg-white md:rounded-2xl md:border md:border-bg-accent md:my-10">
        <Outlet />
      </div>
    </div>
  );
}
