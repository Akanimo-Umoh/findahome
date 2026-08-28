import { Link } from "react-router-dom"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useState } from "react"
import { MOCK_TRANSACTIONS } from "@/data/mockTransactions"
import type { TransactionStatus } from "@/types/transactions"
import propertyImg from "@/assets/images/property.jpg"

type FilterTab = "all" | "pending" | "completed"

const STATUS_LABEL: Record<TransactionStatus, string> = {
  inspection_requested: "Awaiting Inspection Schedule",
  inspection_scheduled: "Awaiting Buyer Confirmation",
  inspection_confirmed: "Inspection Upcoming",
  inspection_completed: "Awaiting Property Payment",
  property_payment_pending: "Property Payment Made",
  handover_requested: "Awaiting Handover Schedule",
  handover_scheduled: "Awaiting Buyer Confirmation",
  handover_confirmed: "Handover Upcoming",
  handover_completed: "Handover Completed",
  funds_released: "Payment Released",
}

function getCategory(status: TransactionStatus): "pending" | "completed" {
  return status === "funds_released" ? "completed" : "pending"
}

const tabs: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  // TODO: replace with useQuery(["agentTransactions"]) once endpoint exists —
  // backend should only return transactions where payment has been made
  const filtered =
    activeTab === "all"
      ? MOCK_TRANSACTIONS
      : MOCK_TRANSACTIONS.filter((t) => getCategory(t.status) === activeTab)

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
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            No {activeTab} transactions yet.
          </p>
        ) : (
          filtered.map((transaction) => (
            <Link
              to={`/agent/transactions/${transaction.transactionId}`}
              key={transaction.transactionId}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <img
                src={transaction.image ?? propertyImg}
                className="h-15 w-15 shrink-0 rounded-lg object-cover"
              />

              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                    Luxury 4 Bed-room Apartment
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                      <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                        3,000,000
                      </p>
                    </div>

                    <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                      Buyer: Victoria Ntekim
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="w-fit rounded-2xl border border-text-disabled px-2 py-1 text-[12px] leading-4">
                    {STATUS_LABEL[transaction.status]}
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Ref ID: FH-TRX-002834
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Last updated: 2hrs ago
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
