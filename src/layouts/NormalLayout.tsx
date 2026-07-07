import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function NormalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mt-18 flex-1 md:mt-16.5">
        <Outlet />
      </main>
    </div>
  )
}
