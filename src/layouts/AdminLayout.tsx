import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function AdminLayout() {
  const { pathname } = useLocation()
  const isDashboard = pathname === "/admin/dashboard"

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar />}
      <main
        className={
          isDashboard
            ? "min-h-screen"
            : "mt-18 min-h-[calc(100vh-72px)] md:mt-16.5 md:min-h-[calc(100vh-66px)]"
        }
      >
        <Outlet />
      </main>
    </div>
  )
}
