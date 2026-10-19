// (ellipsis + go-to-page)
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PAGE_SIZE } from "../useEscrowFilters"

interface Props {
  page: number
  pageCount: number
  total: number
  onPage: (p: number) => void
}

function pageItems(current: number, count: number) {
  const wanted = [...new Set([1, count, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= count)
    .sort((a, b) => a - b)
  const items: (number | "gap")[] = []
  let last = 0
  for (const p of wanted) {
    if (p - last > 1) items.push("gap")
    items.push(p)
    last = p
  }
  return items
}

export function EscrowPagination({ page, pageCount, total, onPage }: Props) {
  const [jump, setJump] = useState("")
  if (total === 0) return null

  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)
  const go = () => {
    const n = Number(jump)
    if (n >= 1 && n <= pageCount) onPage(n)
    setJump("")
  }
  const btn =
    "grid size-8 place-items-center rounded-md text-sm transition-colors"

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="tabular-nums">
          {from}–{to}
        </span>{" "}
        of <span className="tabular-nums">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          className={cn(btn, "hover:bg-slate-100 disabled:opacity-40")}
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>
        {pageItems(page, pageCount).map((it, i) =>
          it === "gap" ? (
            <span key={`g${i}`} className="px-1 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={it}
              onClick={() => onPage(it)}
              aria-current={it === page ? "page" : undefined}
              className={cn(
                btn,
                "tabular-nums",
                it === page ? "bg-[#274ad0] text-white" : "hover:bg-slate-100"
              )}
            >
              {it}
            </button>
          )
        )}
        <button
          className={cn(btn, "hover:bg-slate-100 disabled:opacity-40")}
          disabled={page === pageCount}
          onClick={() => onPage(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>

        <input
          value={jump}
          onChange={(e) => setJump(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && go()}
          inputMode="numeric"
          placeholder="Go to"
          aria-label="Go to page"
          className="ml-2 h-8 w-16 rounded-md border border-slate-200 px-2 text-sm outline-none focus:border-[#274ad0]"
        />
      </div>
    </div>
  )
}
