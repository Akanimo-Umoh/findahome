import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import AgentSidebar from "@/components/AgentSidebar"

export default function AgentLayout() {
  return (
    <div className="min-h-screen">
      {/* mobile/tablet — regular navbar */}
      <div className="lg:hidden">
        <Navbar />
      </div>

      {/* lg — sidebar */}
      <div className="hidden lg:block">
        <AgentSidebar />
      </div>

      {/* main content
          mobile/tablet: mt-18 to clear the fixed navbar
          lg: ml-[358px] to clear the fixed sidebar, no top margin needed */}
      <main className="mt-18 lg:mt-0 lg:ml-[300px]">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
