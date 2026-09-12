import { Link, useSearchParams } from "react-router-dom"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useState } from "react"
import Skeleton from "@/components/ui/Skeleton"
import {
  getStatusLabel,
  getCategory,
  getPersonName,
  getPropertyImage,
  tabs,
  type FilterStatus,
} from "./transactionHelpers"
import { useAgentTransactionsList } from "@/hooks/useAgentTransactionsList"
import Pagination from "@/components/shared/Pagination"

const ITEMS_PER_PAGE = 24

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<FilterStatus>("all")
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const { items, isLoading, error } = useAgentTransactionsList()

  const filtered =
    activeTab === "all"
      ? items
      : items.filter((item) => getCategory(item) === activeTab)

  // client-side pagination over the filtered list
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  // switching tabs resets to page 1, since the filtered set changes size
  const handleTabChange = (tab: FilterStatus) => {
    setActiveTab(tab)
    setSearchParams({ page: "1" })
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`cursor-pointer rounded-lg px-2 py-1 text-[14px] transition-colors duration-300 xs:text-[16px] ${
              activeTab === tab.value
                ? "bg-button-bg text-white"
                : "bg-button-sec text-text-primary hover:bg-bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="mt-6 space-y-4">
        {isLoading &&
          Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <Skeleton className="h-15 w-15 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}

        {error && (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            {error}
          </p>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            No {activeTab === "all" ? "" : activeTab} transactions yet.
          </p>
        )}

        {!isLoading &&
          !error &&
          paginatedItems.map((item) => {
            const isPurchase = item.recordType === "purchase"
            const propertyTitle = item.property?.title ?? ""
            const propertyImage = getPropertyImage(item.property)
            const buyerName = isPurchase
              ? getPersonName(item.buyer)
              : getPersonName(item.user)
            const price = isPurchase ? item.price : item.fee
            const linkTo = `/agent/transactions/${item._id}?type=${item.recordType}`

            return (
              <Link
                to={linkTo}
                key={item._id}
                className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
              >
                {propertyImage ? (
                  <img
                    src={propertyImage}
                    alt={propertyTitle}
                    className="h-15 w-15 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
                )}

                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                      {propertyTitle}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                        <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                          {(price ?? 0).toLocaleString()}
                        </p>
                      </div>
                      {buyerName && (
                        <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                          Buyer: {buyerName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="w-fit rounded-2xl border border-text-disabled px-2 py-1 text-[12px] leading-4">
                      {getStatusLabel(item)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] leading-4 text-text-secondary">
                      Last updated:{" "}
                      {new Date(item.updatedAt).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
      </section>

      {/* pagination control */}
      {!isLoading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  )
}
