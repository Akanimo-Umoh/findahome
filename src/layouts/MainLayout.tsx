import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useAuthContext } from "@/context/AuthContext"

export default function MainLayout() {
  const { user } = useAuthContext()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mt-18 flex-1 md:mt-[66px]">
        <Outlet />
      </main>

      {user?.role !== "admin" && <Footer />}
    </div>
  )
}
