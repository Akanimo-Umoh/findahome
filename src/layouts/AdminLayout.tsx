import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminMobileNav from "@/components/admin/shell/AdminMobileNav"
import AdminSidebar from "@/components/admin/shell/AdminSidebar"
import AdminTopbar from "@/components/admin/shell/AdminTopbar"

// The one shell every /admin/* page renders inside. Pages supply content only; navigation, titles (from adminNav.ts), notifications and the profile chip live here.
export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-ssPro">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-66 lg:block">
        <AdminSidebar />
      </aside>

      <AdminMobileNav open={drawerOpen} onOpenChange={setDrawerOpen} />

      <div className="lg:pl-66">
        <AdminTopbar onMenuClick={() => setDrawerOpen(true)} />
        <main className="mx-auto w-full max-w-360 px-4 py-6 md:px-6 xl:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
