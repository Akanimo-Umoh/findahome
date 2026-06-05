import { useNavigate, useSearchParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import searchIcon from "@/assets/images/icon-black-search.svg"
import AgentsCard from "./AgentsCard"
import { useRef } from "react"

export default function Agents() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""
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

  const handleClear = () => {
    handleSearch("")
    searchInputRef.current?.focus()
  }

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Find Verified Agents
        </p>
      </div>

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
      </div>

      {/* agents */}
      <section className="mt-6">
        {/* agents main ctn */}
        <AgentsCard searchQuery={searchQuery} />
      </section>
    </div>
  )
}
