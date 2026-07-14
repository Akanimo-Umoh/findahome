import modelHouse from "@/assets/agentImages/img-model-house.jpg"
import apartmentImg from "@/assets/images/img-apartment.png"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

type FilterTab = "all" | "pending" | "completed" | "dispute"

type Transaction = {
  id: string
  title: string
  price: string
  buyer: string
  status: string
  refId: string
  lastUpdated: string
  image: string
}

function getCategory(status: string): "pending" | "completed" | "dispute" {
  const s = status.toLowerCase()
  if (s === "payment released") return "completed"
  if (s === "dispute opened") return "dispute"
  return "pending"
}

const tabs: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Dispute", value: "dispute" },
]

const transactions: Transaction[] = [
  {
    id: "1",
    title: "3 Bed-room Apartment, Lekki phase 1",
    price: "3,000,000",
    buyer: "Victoria Ntekim",
    status: "In Escrow",
    refId: "FH-TRX-002834",
    lastUpdated: "2hrs ago",
    image: apartmentImg,
  },
  {
    id: "2",
    title: "4 Bed-room Apartment, Ojota, Lagos",
    price: "2,000,000",
    buyer: "Victoria Ntekim",
    status: "Awaiting inspection completion",
    refId: "FH-TRX-002834",
    lastUpdated: "3hrs ago",
    image: modelHouse,
  },
  {
    id: "3",
    title: "2 Bed-room Apartment, Ikeja",
    price: "1,700,000",
    buyer: "Victoria Ntekim",
    status: "Payment Released",
    refId: "FH-TRX-002834",
    lastUpdated: "5hrs ago",
    image: modelHouse,
  },
  {
    id: "4",
    title: "600 SQM, Along airport road, Uyo",
    price: "7,500,000",
    buyer: "Victoria Ntekim",
    status: "Dispute opened",
    refId: "FH-TRX-002834",
    lastUpdated: "9hrs ago",
    image: modelHouse,
  },
]

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const filtered =
    activeTab === "all"
      ? transactions
      : transactions.filter(
          (t) => getCategory(t.status.toLowerCase()) === activeTab
        )

  return (
    <div>
      {/* tab buttons */}
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

      {/* transactions */}
      <section className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            No {activeTab} transactions yet.
          </p>
        ) : (
          filtered.map((transaction) => (
            <Link
              to="/agent/my-transactions/1"
              key={transaction.id}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <img
                src={transaction.image}
                alt=""
                className="h-15 w-15 shrink-0 rounded-lg object-cover"
              />

              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                    {transaction.title}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={blueNairaIcon} alt="" className="h-4 w-4" />

                      <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                        {transaction.price}
                      </p>
                    </div>

                    <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                      Buyer: {transaction.buyer}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="w-fit rounded-2xl border border-text-disabled px-2 py-1 text-[12px] leading-4">
                    {transaction.status}
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Ref ID: {transaction.refId}
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Last updated: {transaction.lastUpdated}
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
