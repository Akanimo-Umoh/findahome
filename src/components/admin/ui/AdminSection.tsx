import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type AdminSectionProps = {
  title: string
  action?: { label: string; to: string }
  className?: string
  children: React.ReactNode
}

// The standard admin panel: hairline border, title, optional "go to" link.
export default function AdminSection({
  title,
  action,
  className,
  children,
}: AdminSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-xl border border-slate-200 bg-white",
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 px-5 pt-4 pb-3">
        <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
          {title}
        </h2>
        {action && (
          <Link
            to={action.to}
            className="rounded text-[13px] font-semibold text-button-bg underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
          >
            {action.label}
          </Link>
        )}
      </header>
      <div className="flex-1 px-5 pb-5">{children}</div>
    </section>
  )
}
