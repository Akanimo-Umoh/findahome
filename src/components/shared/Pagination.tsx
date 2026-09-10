import leftArrow from "@/assets/images/icon-left-arrow.svg"
import rightArrow from "@/assets/images/icon-right-arrow.svg"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (currentPage > 3) pages.push("...")

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (currentPage < totalPages - 2) pages.push("...")
  pages.push(totalPages)

  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-6 mb-10 flex items-center justify-center gap-2">
      <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-bg-accent">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer"
          }`}
        >
          <img src={leftArrow} alt="Previous" className="h-4 w-4" />
        </button>

        <div className="flex items-center">
          {getPageNumbers(currentPage, totalPages).map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === "number" && goToPage(pageNum)}
              disabled={pageNum === "..."}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md text-[14px] font-medium transition-colors ${
                pageNum === currentPage
                  ? "bg-state-info text-white"
                  : pageNum === "..."
                    ? "cursor-default text-text-secondary"
                    : "cursor-pointer text-text-primary hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer"
          }`}
        >
          <img src={rightArrow} alt="Next" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
