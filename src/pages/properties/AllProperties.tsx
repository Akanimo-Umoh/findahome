import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import leftArrow from "@/assets/images/icon-left-arrow.svg";
import rightArrow from "@/assets/images/icon-right-arrow.svg";
import goBack from "@/assets/images/icon-back.svg";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";

export default function AllProperties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 3;
  const navigate = useNavigate();

  const { properties, loading, error } = useProperties();

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // start index + end index
  const currentProperties = properties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  let content;

  if (loading) {
    content = Array.from({ length: 3 }).map((_, index) => (
      <PropertyCardSkeleton key={index} />
    ));
  } else if (error) {
    content = (
      <div className="text-center text-red-500 mt-6">Error: {error}</div>
    );
  } else {
    content = currentProperties.map((property) => (
      <PropertyCard key={property._id} property={property} />
    ));
  }

  return (
    <div className="flex min-h-screen flex-col font-ssPro">
      {/* navbar */}
      <Navbar />

      {/* main contents */}
      <main className="mt-18 mx-6">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 cursor-pointer"
          >
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary text-center">
            Available Properties
          </p>
        </div>

        {/* main properties ctn */}
        <div className="mt-6 space-y-8">{content}</div>
      </main>

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 mb-10">
          <div className="flex items-center justify-center gap-2 border border-bg-accent rounded-xl h-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <img src={leftArrow} alt="Previous" className="w-4 h-4" />
            </button>

            <div className="flex items-center">
              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof pageNum === "number" && goToPage(pageNum)
                  }
                  disabled={pageNum === "..."}
                  className={`min-w-8 h-8 flex items-center justify-center rounded-md text-[14px] font-medium transition-colors ${
                    pageNum === currentPage
                      ? "bg-state-info text-white"
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
              <img src={rightArrow} alt="Next" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
