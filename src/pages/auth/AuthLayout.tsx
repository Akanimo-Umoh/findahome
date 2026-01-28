import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col auth-bg items-center">
      <Link
        to="/"
        className="font-raleway font-bold text-[24px] text-[#274AD0] mt-8"
      >
        Finda<span className="font-ssPro">Home</span>
      </Link>

      <div className="flex w-full justify-center mt-8">
        <Outlet />
      </div>
    </div>
  );
}
