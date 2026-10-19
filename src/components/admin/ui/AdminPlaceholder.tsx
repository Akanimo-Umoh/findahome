import { Link, useLocation } from "react-router-dom"
import { Construction } from "lucide-react"
import { findNavItem } from "@/components/admin/shell/adminNav"

// Stand-in for admin pages that have no design yet, so every sidebar link lands somewhere real instead of the 404.
export default function AdminPlaceholder() {
  const { pathname } = useLocation()
  const item = findNavItem(pathname)
  const Icon = item?.icon ?? Construction

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-24 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-bg-accent text-button-bg">
        <Icon size={22} aria-hidden />
      </span>
      <h2 className="mt-4 font-raleway text-[18px] font-bold text-text-primary">
        {item?.title ?? "This page"} isn&rsquo;t built yet
      </h2>
      <p className="mt-1 text-[14px] text-text-secondary">
        It will show up here once its design is ready.
      </p>
      <Link
        to="/admin/dashboard"
        className="mt-5 text-[14px] font-semibold text-button-bg underline-offset-4 hover:underline"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
