import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Gap = "gap-start" | "gap-end"

type AdminPaginationProps = {
  page: number
  pageCount: number
  total: number
  pageSize: number
  noun?: string
  onPageChange: (page: number) => void
}

// 1 2 3 4 5 … 20   |   1 … 8 9 10 … 20   |   1 … 16 17 18 19 20
export function getPageItems(
  page: number,
  pageCount: number
): (number | Gap)[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, "gap-end", pageCount]
  if (page >= pageCount - 3) {
    return [
      1,
      "gap-start",
      ...Array.from({ length: 5 }, (_, i) => pageCount - 4 + i),
    ]
  }
  return [1, "gap-start", page - 1, page, page + 1, "gap-end", pageCount]
}

export default function AdminPagination({
  page,
  pageCount,
  total,
  pageSize,
  noun = "results",
  onPageChange,
}: AdminPaginationProps) {
  const [draft, setDraft] = useState("")

  if (total === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const jump = () => {
    const n = Math.round(Number(draft))
    if (Number.isFinite(n) && n >= 1) onPageChange(Math.min(n, pageCount))
    setDraft("")
  }

  const arrow =
    "flex size-8 items-center justify-center rounded-md text-text-primary outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-button-bg/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-[13px] text-text-secondary">
        Showing{" "}
        <span className="font-semibold text-text-primary">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-text-primary">{total}</span>{" "}
        {noun}
      </p>

      {pageCount > 1 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav aria-label="Pagination" className="flex items-center gap-1">
            <button
              type="button"
              className={arrow}
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft size={17} aria-hidden />
            </button>

            {getPageItems(page, pageCount).map((item) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  type="button"
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => onPageChange(item)}
                  className={cn(
                    "h-8 min-w-8 rounded-md px-2 text-[13px] font-semibold tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
                    item === page
                      ? "bg-button-bg text-white"
                      : "text-text-primary hover:bg-slate-100"
                  )}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  aria-hidden
                  className="w-6 text-center text-[13px] text-text-secondary"
                >
                  …
                </span>
              )
            )}

            <button
              type="button"
              className={arrow}
              aria-label="Next page"
              disabled={page === pageCount}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight size={17} aria-hidden />
            </button>
          </nav>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              jump()
            }}
            className="flex items-center gap-2 text-[13px] text-text-secondary"
          >
            <label htmlFor="go-to-page">Go to page</label>
            <input
              id="go-to-page"
              type="number"
              inputMode="numeric"
              min={1}
              max={pageCount}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={String(page)}
              className="h-8 w-16 rounded-md border border-slate-200 bg-white px-2 text-center text-[13px] text-text-primary tabular-nums outline-none focus:border-button-bg focus:ring-2 focus:ring-button-bg/20"
            />
            <button
              type="submit"
              className="h-8 cursor-pointer rounded-md border border-slate-200 px-3 text-[13px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
