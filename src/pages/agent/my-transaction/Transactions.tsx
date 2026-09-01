import { Link } from "react-router-dom"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useState } from "react"
import type { PurchaseStatus } from "@/types/purchase"
import { useAgentPurchases } from "@/hooks/useAgentPurchase"
import Skeleton from "@/components/ui/Skeleton"

type FilterStatus = "all" | "pending" | "completed"

// const STATUS_LABEL: Record<TransactionStatus, string> = {
//   inspection_requested: "Awaiting Inspection Schedule",
//   inspection_scheduled: "Awaiting Buyer Confirmation",
//   inspection_confirmed: "Inspection Upcoming",
//   inspection_completed: "Awaiting Property Payment",
//   property_payment_pending: "Property Payment Made",
//   handover_requested: "Awaiting Handover Schedule",
//   handover_scheduled: "Awaiting Buyer Confirmation",
//   handover_confirmed: "Handover Upcoming",
//   handover_completed: "Handover Completed",
//   funds_released: "Payment Released",
// }

const STATUS_LABEL: Record<PurchaseStatus, string> = {
  none: "Awaiting Inspection",
  property_payment_made: "Property Payment Made",
  handover_requested: "Awaiting Handover Schedule",
  handover_scheduled: "Awaiting Buyer Confirmation",
  handover_confirmed: "Handover Upcoming",
  handover_completed: "Handover Completed",
  funds_released: "Payment Released",
}

function getCategory(status: PurchaseStatus): "pending" | "completed" {
  return status === "funds_released" ? "completed" : "pending"
}

const tabs: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<FilterStatus>("all")
  const { purchases, isLoading, error } = useAgentPurchases()

  // TODO: replace with useQuery(["agentTransactions"]) once endpoint exists —
  // backend should only return transactions where payment has been made
  const filtered =
    activeTab === "all"
      ? purchases
      : purchases.filter((p) => getCategory(p.status) === activeTab)

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
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
          Array.from({ length: 3 }).map((_, i) => (
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
          filtered.map((purchase) => (
            <Link
              to={`/agent/transactions/${purchase._id}`}
              key={purchase._id}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />

              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                    {purchase.property.title}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                      <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                        {purchase.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                      Buyer: {purchase.buyer.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="w-fit rounded-2xl border border-text-disabled px-2 py-1 text-[12px] leading-4">
                    {STATUS_LABEL[purchase.status]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  )
}
