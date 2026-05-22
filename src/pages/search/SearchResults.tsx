import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import leftArrow from "@/assets/images/icon-left-arrow.svg";
import rightArrow from "@/assets/images/icon-right-arrow.svg";
import filterIcon from "@/assets/images/icon-filter.svg";
import goBack from "@/assets/images/icon-back.svg";
import { useProperties } from "@/hooks/useProperties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import Search from "../home/Search";

type SortOption = "low-to-high" | "high-to-low" | "newest" | "";
type FilterOption = "all" | "verified";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showFilter, setShowFilter] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 3;

  const { properties, loading, error } = useProperties();

  // display properties
  const displayProperties = useMemo(() => {
    let result = [...properties];

    // text search for title and address
    if (query.trim()) {
      const search = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.address.toLowerCase().includes(search),
      );
    }

    // verified filter
    if (filterBy === "verified") {
      result = result.filter((p) => p.owner.isVerified);
    }

    // sort
    if (sortBy === "low-to-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [properties, query, filterBy, sortBy]);

  const totalPages = Math.ceil(displayProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = displayProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 150);
  };

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
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="">
      <main className="flex-1 mx-6 mb-10">
        <div className="relative flex items-center justify-center md:mt-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 cursor-pointer"
          >
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary text-center">
            Search Results
          </p>
        </div>

        <p
          className="text-[12px] text-text-secondary text-center mt-1"
          style={{ opacity: loading || isTransitioning ? 0 : 1 }}
        >
          {displayProperties.length}{" "}
          {displayProperties.length === 1 ? "property" : "properties"} found
        </p>

        {/* search */}
        <div className="flex items-center justify-center mt-4 max-w-85 mx-auto">
          <Search
            defaultValue={query}
            onChange={(value) => {
              if (debounceRef.current) clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => {
                const params = new URLSearchParams(searchParams);
                if (value.trim()) {
                  params.set("query", value);
                } else {
                  params.delete("query");
                }
                params.set("page", "1");
                setSearchParams(params, { replace: true });
              }, 400);
            }}
          />
        </div>

        {/* sort and filter by */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <Select
            value={sortBy}
            onValueChange={(value) => {
              triggerTransition(() => setSortBy(value as SortOption));
            }}
          >
            <SelectTrigger className="border-none outline-none shadow-none text-[14px] text-text-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              {/* <SelectItem value="most-popular">Most Popular</SelectItem> */}
            </SelectContent>
          </Select>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className={`filter-shadow w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white ${filterBy !== "all" ? "ring-1 ring-button-bg" : ""}`}
            >
              <img src={filterIcon} alt="" />
              {/* we can filter by verified only and all */}
            </button>

            {showFilter && (
              <>
                {/* backdrop — closes dropdown when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowFilter(false)}
                />

                {/* dropdown */}
                <div className="absolute right-0 top-10 z-20 bg-white border border-bg-accent rounded-xl shadow-sm min-w-[140px] py-1 overflow-hidden">
                  {(["all", "verified"] as FilterOption[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        triggerTransition(() => setFilterBy(option));
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${
                        filterBy === option
                          ? "text-button-bg font-semibold bg-bg-tertiary"
                          : "text-text-primary hover:bg-bg-tertiary"
                      }`}
                    >
                      {option === "all" ? "All" : "Verified only"}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 space-y-8">
          {loading || isTransitioning ? (
            // initial load
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          ) : error ? (
            // api error
            <div className="text-center py-12">
              <p className="text-red-500 text-[14px]">
                Something went wrong. Please try again.
              </p>
            </div>
          ) : currentProperties.length > 0 ? (
            // results
            <div className="grid justify-center gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {currentProperties.map((property) => (
                <Link
                  to={`/property/${property._id}`}
                  key={property._id}
                  className="max-w-85 mx-auto"
                >
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          ) : (
            // no results
            <div className="text-center py-12">
              <p className="text-text-secondary text-[14px]">
                No properties found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading &&
            !isTransitioning &&
            !error &&
            displayProperties.length > ITEMS_PER_PAGE && (
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
