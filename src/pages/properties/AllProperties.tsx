import { useNavigate, useSearchParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import { useProperties } from "@/hooks/useProperties"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import Search from "../home/Search"
import PropertyCardCtn from "@/components/shared/PropertyCardCtn"
import Pagination from "@/components/shared/Pagination"

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

  // goToPage now just sets the param — scroll-to-top and bounds checking now live inside Pagination itself
  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() })
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="mt-6 text-center text-red-500">
                Error: {error}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentProperties.map((property) => (
                  <PropertyCardCtn key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  )
}
