import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
// import addIcon from "@/assets/agentImages/icon-add-new-property.svg";
import FilterButtons from "./FilterButtons";
// import SearchListings from "./SearchListings";
import ListingsCard from "./ListingsCard";
import { useState } from "react";

type Tab = "apartment" | "land";

export type ListingStatus = "active" | "sold" | "pending" | "rejected";
export type FilterStatus = "all" | ListingStatus;

export default function MyListings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("apartment");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  const tabs: Tab[] = ["apartment", "land"];
  const tabLabels = {
    apartment: "Apartments",
    land: "Lands",
  };

  return (
    <div className="text-text-primary mb-10 mx-6 md:mt-6 md:mx-8">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-center gap-8 md:gap-16">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl flex items-center justify-center px-3 transition-colors font-raleway text-[14px] tracking-[1px] font-semibold h-10 md:text-[18px] md:font-normal md:font-ssPro md:h-10.75 cursor-pointer ${
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
      <div className="mt-6 md:mt-12">
        <ListingsCard activeFilter={activeFilter} activeTab={activeTab} />
      </div>
    </div>
  );
}
