import type { ReactNode } from "react"

export function Panel({
  title,
  children,
  aside,
}: {
  title: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-raleway text-sm font-semibold text-slate-900">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
