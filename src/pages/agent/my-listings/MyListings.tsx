import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import addIcon from "@/assets/agentImages/icon-add-new-property.svg";
import FilterButtons from "./FilterButtons";
import SearchListings from "./SearchListings";
import ListingsCard from "./ListingsCard";
import { useState } from "react";

export type ListingStatus = "active" | "sold" | "pending" | "rejected";
export type FilterStatus = "all" | ListingStatus;

export default function MyListings() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Listings
        </p>

        <button
          onClick={() => navigate(-1)}
          className="absolute right-0"
          title="Add property"
        >
          <img src={addIcon} alt="" className="w-6 h-6" />
        </button>
      </div>

      {/* filter buttons */}
      <div className="mt-6">
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* search bar */}
      <div className="mt-7">
        <SearchListings />
      </div>

      {/* listings card */}
      <div className="mt-6">
        <ListingsCard activeFilter={activeFilter} />
      </div>
    </div>
  );
}
