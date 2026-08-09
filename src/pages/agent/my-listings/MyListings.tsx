import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import FilterButtons from "./FilterButtons"
import ListingsCard from "./ListingsCard"
import { useState } from "react"
import { useAgentListings } from "@/hooks/useAgentListings"
import { useAuthContext } from "@/context/AuthContext"

type Tab = "apartment" | "land"

export type ListingStatus = "approved" | "sold" | "pending" | "rejected"
export type FilterStatus = "all" | ListingStatus

export default function MyListings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>("apartment")
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")

  const { user } = useAuthContext()
  console.log("Current user:", user)

  const { listings, isLoading, error } = useAgentListings()

  const tabs: Tab[] = ["apartment", "land"]
  const tabLabels = {
    apartment: "Apartments",
    land: "Lands",
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center gap-8 md:gap-16">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex h-10 cursor-pointer items-center justify-center rounded-xl px-3 font-raleway text-[14px] font-semibold tracking-[1px] transition-colors md:h-10.75 md:font-ssPro md:text-[18px] md:font-normal ${
                activeTab === tab ? "border border-bg-accent" : ""
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* <Link to="/agent/add-property" className="absolute right-0">
          <img src={addIcon} alt="" className="w-6 h-6" />
        </Link> */}
      </div>

      {/* filter buttons */}
      <div className="mt-6">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* search bar */}
      {/* <div className="mt-7">
        <SearchListings />
      </div> */}

      {/* listings card */}
      <div className="mt-6 md:mt-8">
        <ListingsCard
          activeFilter={activeFilter}
          activeTab={activeTab}
          listings={listings}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}
