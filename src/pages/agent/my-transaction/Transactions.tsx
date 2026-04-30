import modelHouse from "@/assets/agentImages/img-model-house.jpg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import { useState } from "react";

type FilterTab = "all" | "pending" | "completed" | "dispute";

type Transaction = {
  id: string;
  title: string;
  price: string;
  buyer: string;
  status: string;
  refId: string;
  lastUpdated: string;
  image: string;
};

// derive filter category from status string
function getCategory(status: string): "pending" | "completed" | "dispute" {
  const s = status.toLowerCase();
  if (s === "payment released") return "completed";
  if (s === "dispute opened") return "dispute";
  return "pending"; // in escrow, awaiting inspection, awaiting handover, etc.
}

// status badge styles
const statusStyles: Record<string, string> = {
  "payment released": "bg-[#149D18] text-white",
  "dispute opened": "border border-text-secondary",
  "in escrow": "bg-[#F39C12] text-white",
  "awaiting inspection completion": "bg-[#FF6B6B]",
  "awaiting property handover": "bg-[#FF6B6B]",
};

const tabs: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Dispute", value: "dispute" },
];

// hardcoded for now — replace with API data later
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
];

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? transactions
      : transactions.filter(
          (t) => getCategory(t.status.toLowerCase()) === activeTab,
        );

  return (
    <div>
      {/* tab buttons */}
      <div className="flex items-center justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-lg py-1 px-2 transition-colors duration-300 text-[14px] ${
              activeTab === tab.value
                ? "bg-button-bg text-white"
                : "bg-button-sec text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* transactions */}
      <section className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-text-secondary text-[12px] mt-10">
            No {activeTab} transactions yet.
          </p>
        ) : (
          filtered.map((transaction) => {
            const statusKey = transaction.status.toLowerCase();
            const badgeStyle = statusStyles[statusKey] ?? "bg-[#FF6B6B]";

            return (
              <div
                key={transaction.id}
                className="border border-bg-accent rounded-xl p-2 flex items-center gap-3"
              >
                <img
                  src={transaction.image}
                  alt=""
                  className="w-15 h-15 rounded-lg object-cover shrink-0"
                />

                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                      {transaction.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                        <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                          {transaction.price}
                        </p>
                      </div>
                      <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                        Buyer: {transaction.buyer}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p
                      className={`text-[12px] leading-4 py-1 px-2 rounded-2xl w-fit ${badgeStyle}`}
                    >
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
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
