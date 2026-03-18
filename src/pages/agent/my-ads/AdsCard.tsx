import { useEffect, useRef, useState } from "react";
import visibilityIcon from "@/assets/agentImages/icon-eye.svg";
import propertyImg from "@/assets/images/property.jpg";
import trendIcon from "@/assets/agentImages/icon-trend-up.svg";
import rightArrow from "@/assets/agentImages/icon-blue-right-arrow.svg";
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg";
import clicksIcon from "@/assets/agentImages/icon-clicks.svg";

type AdStatus = "active" | "pending" | "paused" | "completed";
type FilterStatus = "all" | AdStatus;

interface Ad {
  id: number;
  status: AdStatus;
  title: string;
  views: number;
  clicks: number;
  ctr: string;
  lastUpdated: string;
  spent: number;
  budget: number;
  pauseReason?: "budget" | "manual";
}

const ads: Ad[] = [
  {
    id: 1,
    status: "active",
    title: "3 Bed-room Apartment, Lekki phase 1",
    views: 2800,
    clicks: 500,
    ctr: "8.3%",
    lastUpdated: "2hrs ago",
    spent: 3000,
    budget: 10000,
  },
  {
    id: 2,
    status: "pending",
    title: "3 Bed-room Apartment, Lekki phase 1",
    views: 0,
    clicks: 0,
    ctr: "0%",
    lastUpdated: "2hrs ago",
    spent: 0,
    budget: 10000,
  },
  {
    id: 3,
    status: "paused",
    title: "3 Bed-room Apartment, Lekki phase 1",
    views: 2800,
    clicks: 500,
    ctr: "8.3%",
    lastUpdated: "2hrs ago",
    spent: 3000,
    budget: 10000,
    pauseReason: "budget",
  },
  {
    id: 4,
    status: "paused",
    title: "3 Bed-room Apartment, Lekki phase 1",
    views: 2800,
    clicks: 500,
    ctr: "8.3%",
    lastUpdated: "2hrs ago",
    spent: 3000,
    budget: 10000,
    pauseReason: "manual",
  },
  {
    id: 5,
    status: "completed",
    title: "3 Bed-room Apartment, Lekki phase 1",
    views: 2800,
    clicks: 500,
    ctr: "8.3%",
    lastUpdated: "2hrs ago",
    spent: 3000,
    budget: 10000,
  },
];

const statusConfig: Record<
  AdStatus,
  { label: string; bg: string; text: string }
> = {
  active: { label: "Active", bg: "bg-success", text: "text-bg-tertiary" },
  pending: { label: "Pending", bg: "bg-[#D02727]", text: "text-bg-tertiary" },
  paused: { label: "Paused", bg: "bg-[#F8B400]", text: "text-text-primary" },
  completed: {
    label: "Completed",
    bg: "bg-button-sec",
    text: "text-text-primary",
  },
};

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

function AdCard({ ad }: { ad: Ad }) {
  const { label, bg, text } = statusConfig[ad.status];
  const showStats = ad.status !== "pending";

  return (
    <div className="border border-bg-accent p-2 rounded-lg flex items-center justify-between gap-4">
      <img src={propertyImg} alt="" className="w-15 h-15 rounded-lg" />

      <div className="flex flex-col w-full gap-2">
        <div className="flex items-start justify-between">
          <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-2">
            {ad.title}
          </p>
          <p
            className={`text-[12px] leading-4 ${bg} ${text} rounded-2xl py-1 px-3 text-center shrink-0`}
          >
            {label}
          </p>
        </div>

        <div className="space-y-1">
          {showStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <img src={visibilityIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {ad.views.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={clicksIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {ad.clicks.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={trendIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  {ad.ctr}
                </p>
              </div>
            </div>
          )}

          <p className="text-[12px] leading-4 text-text-secondary">
            Last updated: {ad.lastUpdated}
          </p>

          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                {ad.spent.toLocaleString()}
              </p>
            </div>
            <p className="text-text-secondary text-[12px] leading-4">/</p>
            <div className="flex items-center justify-center">
              <img src={greyNaira} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                {ad.budget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-[12px] leading-4 text-button-bg">View Details</p>
            <img src={rightArrow} alt="" />
          </div>

          {ad.status === "paused" && (
            <p className="text-[12px] leading-4 text-[#D02727]">
              {ad.pauseReason === "budget"
                ? "Budget limit reached. Add funds to resume"
                : "You paused this ad."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdsCard() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const activeRef = useRef<HTMLButtonElement | null>(null);

  const filtered =
    activeFilter === "all"
      ? ads
      : ads.filter((ad) => ad.status === activeFilter);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeFilter]);

  return (
    <div>
      {/* tabs */}
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            ref={activeFilter === value ? activeRef : null}
            onClick={() => setActiveFilter(value)}
            className={`py-1 px-2 transition-colors duration-300 shrink-0 ${
              activeFilter === value ? "border-b border-button-bg" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="space-y-6 mt-5">
        {filtered.length === 0 ? (
          <p className="text-center text-text-secondary text-[14px] mt-10">
            No ads found.
          </p>
        ) : (
          filtered.map((ad) => <AdCard key={ad.id} ad={ad} />)
        )}
      </div>
    </div>
  );
}
