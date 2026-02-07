import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
// import propertyImg from "@/assets/images/img-apartment.png";
// import agentAvatar from "@/assets/images/agentAvatar.jpg";
import leftArrow from "@/assets/images/icon-left-arrow.svg";
import rightArrow from "@/assets/images/icon-right-arrow.svg";
import { useProperties } from "@/hooks/useProperties";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search filters from URL
  const filters = useMemo(
    () => ({
      location: searchParams.get("location") || "",
      propertyType: searchParams.get("propertyType") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      priceRange: searchParams.get("priceRange") || "",
    }),
    [searchParams],
  );

  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 3;

  // fetch properties with filters
  const {
    properties: filteredProperties,
    loading,
    error,
  } = useProperties({
    location: filters.location,
    propertyType: filters.propertyType,
    bedrooms: filters.bedrooms,
    priceRange: filters.priceRange,
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      setSearchParams(params);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col font-ssPro">
        <Navbar />
        <main className="flex-1 mt-18 mx-6">
          <div className="flex items-center justify-between">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
              Search Results
            </p>
          </div>
          <div className="mt-6 text-center text-text-secondary">
            Searching properties...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col font-ssPro">
        <Navbar />
        <main className="flex-1 mt-18 mx-6">
          <div className="flex items-center justify-between">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
              Search Results
            </p>
          </div>
          <div className="mt-6 text-center text-red-500">Error: {error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col font-ssPro">
      <Navbar />

      <main className="flex-1 mt-18 mx-6 mb-10">
        <div className="flex items-center justify-between">
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
            Search Results
          </p>
          <p className="text-[12px] text-text-secondary">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "property" : "properties"} found
          </p>
        </div>

        {/* Active Filters */}
        {(filters.location ||
          filters.propertyType ||
          filters.bedrooms ||
          filters.priceRange) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.location && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] flex items-center gap-2">
                Location: {filters.location}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("location");
                    params.set("page", "1");
                    setSearchParams(params);
                  }}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.propertyType && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] flex items-center gap-2">
                Type:{" "}
                {filters.propertyType.charAt(0).toUpperCase() +
                  filters.propertyType.slice(1)}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("propertyType");
                    params.set("page", "1");
                    setSearchParams(params);
                  }}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.bedrooms && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] flex items-center gap-2">
                {filters.bedrooms === "4+"
                  ? "4+ Bedrooms"
                  : `${filters.bedrooms} Bedroom${filters.bedrooms === "1" ? "" : "s"}`}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("bedrooms");
                    params.set("page", "1");
                    setSearchParams(params);
                  }}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] flex items-center gap-2">
                ₦{" "}
                {filters.priceRange === "3m+"
                  ? "3M+"
                  : filters.priceRange.toUpperCase()}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("priceRange");
                    params.set("page", "1");
                    setSearchParams(params);
                  }}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        <div className="mt-6 space-y-8">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                property_image={property.property_image}
                title={property.title}
                value={property.value}
                location={property.location}
                bedroom={property.bedroom}
                bathroom={property.bathroom}
                avatar={property.avatar}
                listed_by={property.listed_by}
                is_verified={property.is_verified}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary text-[14px]">
                No properties found matching your search criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredProperties.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2 py-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <img src={leftArrow} alt="Previous" className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNum === "number" && goToPage(pageNum)
                    }
                    disabled={pageNum === "..."}
                    className={`min-w-8 h-8 flex items-center justify-center rounded-md text-[14px] font-medium transition-colors ${
                      pageNum === currentPage
                        ? "bg-[#274AD0] text-white"
                        : pageNum === "..."
                          ? "cursor-default text-text-secondary"
                          : "hover:bg-gray-100 text-text-primary cursor-pointer"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <img src={rightArrow} alt="Next" className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
