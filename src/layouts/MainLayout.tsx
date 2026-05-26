import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mt-18 flex-1 md:mt-[66px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
