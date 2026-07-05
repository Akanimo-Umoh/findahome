import { useSearchParams } from "react-router-dom"
import searchIcon from "@/assets/images/icon-black-search.svg"
import { useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PageHeader from "@/components/shared/PageHeader"
import AgentsCard from "@/components/find-agents/AgentsCard"

export type SortOption =
  | "top-rated"
  | "most-reviews"
  | "most-listings"
  | "location"

export default function FindAgents() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""
  const sortOption = (searchParams.get("sort") as SortOption) ?? ""
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set("search", value)
      else next.delete("search")
      next.set("page", "1") // reset to page 1 on new search
      return next
    })
  }

  const handleSort = (value: SortOption) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set("sort", value)
      else next.delete("sort")
      next.set("page", "1")
      return next
    })
  }

  const handleClear = () => {
    handleSearch("")
    searchInputRef.current?.focus()
  }

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <PageHeader title="Find Verified Agents" responsive />

        {/* search and filter bar */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* search */}
          <div className="relative flex w-full items-center">
            <input
              ref={searchInputRef}
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by agents name or location"
              className="h-8 w-full rounded-xl border border-bg-accent pr-8 pl-8.75 text-[12px] leading-4 outline-none focus:ring-2 focus:ring-bg-accent md:h-14 md:pl-13 md:text-[14px] lg:text-[16px]"
            />

            <label htmlFor="search" className="absolute left-3.75">
              <img src={searchIcon} alt="" />
            </label>

            {/* clear button */}
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-3 cursor-pointer text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            )}
          </div>

          {/* sort */}
          <Select
            value={sortOption}
            onValueChange={(value) => handleSort(value as SortOption)}
          >
            <SelectTrigger className="sortTrigger w-fit shrink-0 rounded-xl border border-bg-accent text-[12px] md:text-[14px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-rated">Top Rated</SelectItem>
              <SelectItem value="most-reviews">Most Reviews</SelectItem>
              <SelectItem value="most-listings">Most Listings</SelectItem>
              <SelectItem value="location">Location (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* agents */}
        <section className="mt-6">
          {/* agents main ctn */}
          <AgentsCard searchQuery={searchQuery} sortOption={sortOption} />
        </section>
      </div>
    </div>
  )
}
