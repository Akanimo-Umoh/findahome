import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Navbar from "@/components/Navbar"

export default function AuthLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const showBackButton =
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password"

  return (
    <div className="auth-bg flex min-h-screen flex-col items-center md:relative md:min-h-[calc(screen-72px)] md:justify-center md:pt-18">
      <div className="relative mt-8 flex w-full items-center justify-center md:hidden">
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
          className="font-raleway text-[24px] font-bold text-[#274AD0]"
        >
          Finda<span className="font-ssPro">Home</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="mt-8 mb-8 flex w-full max-w-[406px] justify-center md:my-10 md:rounded-2xl md:border md:border-bg-accent md:bg-white">
        <Outlet />
      </div>
    </div>
  )
}
