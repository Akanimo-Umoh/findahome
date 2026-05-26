import saveIcon from "@/assets/images/icon-heart.svg"
import goBack from "@/assets/images/icon-back.svg"
import { Link, useNavigate } from "react-router-dom"
import { useSavedProperties } from "@/hooks/useSavedProperties"
import { useState } from "react"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import PropertyCard from "@/components/PropertyCard"

type Tab = "apartment" | "land"

export default function SavedProperties() {
  const navigate = useNavigate()
  const { favorites, loading, error } = useSavedProperties()
  const [activeTab, setActiveTab] = useState<Tab>("apartment")

  const filtered = favorites.filter((fav) =>
    activeTab === "land"
      ? fav.property.propertyType === "land"
      : fav.property.propertyType !== "land"
  )

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center md:hidden">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
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
              className={`w-26 cursor-pointer rounded-xl py-2 font-raleway text-[14px] tracking-[1px] transition-colors ${
                activeTab === tab
                  ? "border border-bg-accent font-semibold"
                  : "hover:font-semibold"
              }`}
            >
              {tab === "apartment" ? "Apartments" : "Lands"}
            </button>
          ))}
        </div>

        {/* main apartment card ctn */}
        <div className="mt-8 space-y-8">
          {loading ? (
            <PropertyCardSkeleton />
          ) : error ? (
            <p>{error}</p>
          ) : filtered.length === 0 ? (
            <p className="mx-auto mt-30 flex max-w-[297px] items-center justify-center text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-secondary">
              You don't have any saved properties yet.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
              {filtered.map((fav) => (
                <Link
                  to={`/property/${fav.property._id}`}
                  className="mx-auto max-w-85"
                >
                  <PropertyCard key={fav._id} property={fav.property} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
