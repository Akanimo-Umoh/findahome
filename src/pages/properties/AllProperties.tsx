import { useNavigate, useSearchParams } from "react-router-dom"
import leftArrow from "@/assets/images/icon-left-arrow.svg"
import rightArrow from "@/assets/images/icon-right-arrow.svg"
import goBack from "@/assets/images/icon-back.svg"
import { useProperties } from "@/hooks/useProperties"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import Search from "../home/Search"
import PropertyCardCtn from "@/components/shared/PropertyCardCtn"

export default function AllProperties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const ITEMS_PER_PAGE = 3
  const navigate = useNavigate()

  const { properties, loading, error } = useProperties()

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  // start index + end index
  const currentProperties = properties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      // show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      // always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex justify-center">
      <div className="mx-6 flex min-h-screen w-full max-w-7xl flex-col font-ssPro">
        {/* main contents */}
        <main className="">
          <div className="relative flex items-center justify-center md:mt-6">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 cursor-pointer"
            >
              <img src={goBack} alt="" className="lg:h-8 lg:w-8" />
            </button>

            <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary lg:text-[36px]">
              Available Properties
            </p>
          </div>

          {/* search */}
          <div className="mx-auto mt-6 w-full max-w-85 md:mt-7 md:max-w-[554px]">
            <Search />
          </div>

          {/* main properties ctn */}
          <div className="mt-6">
            {loading ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="mt-6 text-center text-red-500">
                Error: {error}
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentProperties.map((property) => (
                  <PropertyCardCtn key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
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
                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNum === "number" && goToPage(pageNum)
                    }
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
        )}
      </div>
    </div>
  )
}
