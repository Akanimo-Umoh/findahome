import saveIcon from "@/assets/images/icon-heart.svg";
import goBack from "@/assets/images/icon-back.svg";
import { useNavigate } from "react-router-dom";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { useState } from "react";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import PropertyCard from "@/components/PropertyCard";

type Tab = "apartment" | "land";

export default function SavedProperties() {
  const navigate = useNavigate();
  const { favorites, loading, error } = useSavedProperties();
  const [activeTab, setActiveTab] = useState<Tab>("apartment");

  const filtered = favorites.filter((fav) =>
    activeTab === "land"
      ? fav.property.propertyType === "land"
      : fav.property.propertyType !== "land",
  );

  return (
    <div className="text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Saved Properties
        </p>

        <div className="absolute right-0">
          <img src={saveIcon} alt="" />
        </div>
      </div>

      <main className="mt-6">
        {/* tabs */}
        {/* these tabs are used to switch between the property types */}
        <div className="flex items-center justify-center gap-8">
          {(["apartment", "land"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl py-2 w-26 transition-colors font-raleway text-[14px] tracking-[1px] ${
                activeTab === tab ? "border border-bg-accent font-semibold" : ""
              }`}
            >
              {tab === "apartment" ? "Apartments" : "Lands"}
            </button>
          ))}
        </div>

        {/* main apartment card ctn */}
        <div className="space-y-8 mt-8">
          {loading ? (
            <PropertyCardSkeleton />
          ) : error ? (
            <p>{error}</p>
          ) : filtered.length === 0 ? (
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-secondary flex items-center justify-center text-center max-w-[343px] mx-auto mt-30">
              You don't have any saved properties yet.
            </p>
          ) : (
            filtered.map((fav) => (
              <PropertyCard key={fav._id} property={fav.property} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
