import type { ReactNode } from "react"

/**
 * The one grid every page uses for property cards (and their skeletons).
 * Change the columns or gap here and every page updates.
 */
export default function PropertyGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
