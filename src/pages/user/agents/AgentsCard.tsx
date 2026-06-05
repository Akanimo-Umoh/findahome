// import agentAvatar from "@/assets/images/agentAvatar.jpg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"
import ellipseIcon from "@/assets/images/icon-ellipse.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import houseIcon from "@/assets/images/icon-nav-apartments.svg"
import { agents } from "./data"
import leftArrow from "@/assets/images/icon-left-arrow.svg"
import rightArrow from "@/assets/images/icon-right-arrow.svg"
import { useSearchParams } from "react-router-dom"

const ITEMS_PER_PAGE = 6

type AgentsCardProps = {
  searchQuery: string
}

export default function AgentsCard({ searchQuery }: AgentsCardProps) {
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

  // pagination logic
  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE)
  const safePage = Math.min(currentPage, totalPages || 1)
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE
  const currentAgents = filteredAgents.slice(
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
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {currentAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex w-full max-w-100 min-w-[320px] flex-col"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={agent.image}
                  alt=""
                  className="h-50 w-full object-cover md:h-62.5"
                />
              </div>

              <div className="flex flex-col gap-2 rounded-b-xl border border-t-0 border-bg-accent p-3 md:gap-6">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="line-clamp-1 text-[12px] font-semibold md:font-raleway md:text-[20px] md:leading-8.25 md:font-medium md:tracking-[1px] lg:text-[24px] lg:leading-10 lg:font-medium">
                      {agent.name}
                    </p>

                    <img
                      src={verifiedIcon}
                      alt=""
                      className="h-4 w-4 lg:h-6 lg:w-6"
                    />
                  </div>

                  <p className="mt-2 line-clamp-1 text-[12px] leading-4 md:text-[14px] md:leading-5.25 lg:text-[16px] lg:leading-6">
                    {agent.company}
                  </p>

                  {/* ratings */}
                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <img src={yellowStar} alt="" className="md:h-5 md:w-5" />
                      <img src={yellowStar} alt="" className="md:h-5 md:w-5" />
                      <img src={yellowStar} alt="" className="md:h-5 md:w-5" />
                      <img src={yellowStar} alt="" className="md:h-5 md:w-5" />
                      <img src={starIcon} alt="" className="md:h-5 md:w-5" />
                    </div>

                    <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25 lg:text-[16px] lg:leading-6">
                      <p>{agent.rating}</p>
                      <img src={ellipseIcon} alt="" />
                      <p>{agent.reviews} reviews</p>
                    </div>
                  </div>

                  <div className="mt-1 flex flex-col gap-2">
                    {/* location */}
                    <div className="flex items-center gap-1">
                      <img
                        src={locationIcon}
                        alt=""
                        className="md:h-5 md:w-5"
                      />
                      <p className="text-[14px] text-text-secondary md:text-[16px]">
                        {agent.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <img src={houseIcon} alt="" className="md:h-5 md:w-5" />
                      <p className="text-[14px] text-text-secondary md:text-[16px]">
                        {agent.activeListings} active listings
                      </p>
                    </div>
                  </div>
                </div>

                {/* view profile */}
                <button className="h-11.25 w-full cursor-pointer rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white hover:bg-button-hover md:text-[16px]">
                  View Profile
                </button>
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
