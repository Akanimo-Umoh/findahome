import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"
import ellipseIcon from "@/assets/images/icon-ellipse.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import activeIcon from "@/assets/images/icon-active-listings.svg"
import { agents } from "./data"
import leftArrow from "@/assets/images/icon-left-arrow.svg"
import rightArrow from "@/assets/images/icon-right-arrow.svg"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { SortOption } from "../../pages/user/agents/find-agents/FindAgents"

const ITEMS_PER_PAGE = 12

type AgentsCardProps = {
  searchQuery: string
  sortOption: SortOption | ""
}

export default function AgentsCard({
  searchQuery,
  sortOption,
}: AgentsCardProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const filteredAgents = agents.filter((agent) => {
    const query = searchQuery.toLowerCase()
    if (!query) return true
    return (
      agent.name.toLowerCase().includes(query) ||
      agent.company.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query)
    )
  })

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortOption) {
      case "top-rated":
        return b.rating - a.rating
      case "most-reviews":
        return b.reviews - a.reviews
      case "most-listings":
        return b.activeListings - a.activeListings
      case "location":
        return a.location.localeCompare(b.location)
      default:
        return 0
    }
  })

  // pagination logic
  const totalPages = Math.ceil(sortedAgents.length / ITEMS_PER_PAGE)
  const safePage = Math.min(currentPage, totalPages || 1)
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE
  const currentAgents = sortedAgents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set("page", page.toString())
        return next
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (safePage > 3) pages.push("...")
      const start = Math.max(2, safePage - 1)
      const end = Math.min(totalPages - 1, safePage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (safePage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="text-text-primary">
      {currentAgents.length === 0 ? (
        <p className="mt-10 text-center text-[14px] text-text-secondary md:text-[16px]">
          No agents found matching "
          <span className="font-medium text-button-bg">{searchQuery}</span>"
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {currentAgents.map((agent) => (
            <div
              key={agent.id}
              className="w-full rounded-xl border border-bg-accent p-3 hover:shadow-sm md:border-0 md:p-0"
            >
              <div className="hidden h-12.5 w-12.5 shrink-0 md:block md:h-62.5 md:w-full">
                <img
                  src={agent.image}
                  alt=""
                  className="h-12.5 w-12.5 rounded-full object-cover md:h-62.5 md:w-full md:rounded-t-xl md:rounded-b-none"
                />
              </div>

              <div className="md:rounded-b-xl md:border md:border-t-0 md:border-bg-accent md:p-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 md:flex-col md:gap-0">
                    <div className="h-12.5 w-12.5 shrink-0 md:hidden md:h-62.5 md:w-full">
                      <img
                        src={agent.image}
                        alt=""
                        className="h-12.5 w-12.5 rounded-full object-cover md:h-62.5 md:w-full md:rounded-t-xl md:rounded-b-none"
                      />
                    </div>

                    <div className="md:w-full">
                      <div className="flex items-center gap-1 md:justify-between">
                        {/* agent name */}
                        <p className="line-clamp-1 text-[12px] font-semibold md:text-[20px] md:font-medium md:tracking-[1px]">
                          {agent.name}
                        </p>

                        <p className="flex w-fit shrink-0 items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5 text-[12px] leading-4 md:bg-transparent">
                          <span className="md:hidden">Verified</span>{" "}
                          <img
                            src={verifiedIcon}
                            alt=""
                            className="h-4 w-4 md:h-6 md:w-6"
                          />
                        </p>
                      </div>

                      {/* company name */}
                      <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                        {agent.company}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 md:flex md:flex-col-reverse md:gap-2 md:space-y-0">
                    {/* location */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[14px] text-text-secondary md:text-[16px]">
                        <img
                          src={locationIcon}
                          alt=""
                          className="md:h-6 md:w-6"
                        />
                        <span>{agent.location}</span>
                      </div>

                      {/* active listings */}
                      <div className="flex items-center gap-1 text-[14px] text-text-secondary md:text-[16px]">
                        <img
                          src={activeIcon}
                          alt=""
                          className="md:h-6 md:w-6"
                        />
                        <span>{agent.activeListings} active listngs</span>
                      </div>
                    </div>

                    {/* ratings */}
                    <div className="space-y-1">
                      {/* stars */}
                      <div className="flex items-center gap-1">
                        <img
                          src={yellowStar}
                          alt=""
                          className="md:h-5 md:w-5"
                        />
                        <img
                          src={yellowStar}
                          alt=""
                          className="md:h-5 md:w-5"
                        />
                        <img
                          src={yellowStar}
                          alt=""
                          className="md:h-5 md:w-5"
                        />
                        <img
                          src={yellowStar}
                          alt=""
                          className="md:h-5 md:w-5"
                        />
                        <img src={starIcon} alt="" className="md:h-5 md:w-5" />
                      </div>

                      <p className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
                        <span>{agent.rating}</span>{" "}
                        <img src={ellipseIcon} alt="" />
                        <span>{agent.reviews} reviews</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-6">
                  <Button
                    variant="app-primary"
                    size="full"
                    asChild
                    className="md:text-[16px]"
                  >
                    <Link to="/agent-profile">View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="mt-6 mb-10 flex items-center justify-center gap-2">
          <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-bg-accent">
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className={`p-2 ${safePage === 1 ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
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
                    pageNum === safePage
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
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className={`p-2 ${safePage === totalPages ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
            >
              <img src={rightArrow} alt="Next" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
