import { useNavigate, useSearchParams } from "react-router-dom"
import { useMemo, useRef, useState } from "react"
// import filterIcon from "@/assets/images/icon-filter.svg"
import goBack from "@/assets/images/icon-back.svg"
import { useProperties } from "@/hooks/useProperties"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import Search from "../home/Search"
import PropertyCardCtn from "@/components/shared/PropertyCardCtn"
import Pagination from "@/components/shared/Pagination"

type SortOption = "low-to-high" | "high-to-low" | "newest" | ""

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<SortOption>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const query = searchParams.get("query") || ""
  const currentPage = Number(searchParams.get("page")) || 1
  const ITEMS_PER_PAGE = 3

  const { properties, loading, error } = useProperties()

  // display properties
  const displayProperties = useMemo(() => {
    let result = [...properties]

    if (query.trim()) {
      const search = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.address.toLowerCase().includes(search)
      )
    }

    if (sortBy === "low-to-high") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === "high-to-low") {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return result
  }, [properties, query, sortBy])

  const totalPages = Math.ceil(displayProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProperties = displayProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setIsTransitioning(false)
    }, 150)
  }

  // goToPage now just updates params — Pagination handles bounds/scroll
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    setSearchParams(params)
  }

  return (
    <div className="px-6 md:px-8">
      <main className="mx-auto mb-10 max-w-7xl flex-1">
        <div className="relative flex items-center justify-center md:mt-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 cursor-pointer"
          >
            <img src={goBack} alt="" />
          </button>

          <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
            Search Results
          </p>
        </div>

        <p
          className="mt-1 text-center text-[12px] text-text-secondary"
          style={{ opacity: loading || isTransitioning ? 0 : 1 }}
        >
          {displayProperties.length}{" "}
          {displayProperties.length === 1 ? "property" : "properties"} found
        </p>

        {/* search */}
        <div className="mx-auto mt-4 flex max-w-85 items-center justify-center">
          <Search
            defaultValue={query}
            onChange={(value) => {
              if (debounceRef.current) clearTimeout(debounceRef.current)
              debounceRef.current = setTimeout(() => {
                const params = new URLSearchParams(searchParams)
                if (value.trim()) {
                  params.set("query", value)
                } else {
                  params.delete("query")
                }
                params.set("page", "1")
                setSearchParams(params, { replace: true })
              }, 400)
            }}
          />
        </div>

        {/* sort and filter by */}
        <div className="mt-1 flex items-center justify-start">
          <Select
            value={sortBy}
            onValueChange={(value) => {
              triggerTransition(() => setSortBy(value as SortOption))
            }}
          >
            <SelectTrigger className="border-none text-[14px] text-text-primary shadow-none outline-none">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              {/* <SelectItem value="most-popular">Most Popular</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mt-6 space-y-8">
          {loading || isTransitioning ? (
            // initial load
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            // api error
            <div className="py-12 text-center">
              <p className="text-[14px] text-red-500">
                Something went wrong. Please try again.
              </p>
            </div>
          ) : currentProperties.length > 0 ? (
            // results
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentProperties.map((property) => (
                <PropertyCardCtn key={property._id} property={property} />
              ))}
            </div>
          ) : (
            // no results
            <div className="py-12 text-center">
              <p className="text-[14px] text-text-secondary">
                No properties found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && !isTransitioning && !error && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </main>
    </div>
  )
}
