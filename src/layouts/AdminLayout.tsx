import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function AdminLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mt-18 min-h-[calc(100vh-72px)] md:mt-16.5 md:min-h-[calc(100vh-66px)]">
        <Outlet />
      </main>
    </div>
  )
}
