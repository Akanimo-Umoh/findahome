import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton =
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  return (
    <div className="min-h-screen flex flex-col auth-bg items-center">
      <div className="relative w-full flex items-center justify-center mt-8">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className="absolute left-6 cursor-pointer">
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

      <div className="flex w-full justify-center mt-8 mb-8">
        <Outlet />
      </div>
    </div>
  );
}
