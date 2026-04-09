import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";

export default function Properties() {
  const { properties, loading, error } = useProperties();

  // slice to 3 for the homepage preview
  const previewProperties = properties.slice(0, 3);
  const skeletons = Array(3).fill(null);

  return (
    <div className="font-ssPro mx-6">
      <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
        Available Properties
      </p>

      {/* main properties ctn */}
      <div className="mt-6 space-y-8">
        {loading ? (
          // show skeletons
          skeletons.map((_, index) => <PropertyCardSkeleton key={index} />)
        ) : error ? (
          // show error message
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          // show properties
          previewProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>

      {!loading && !error && (
        <div className="text-center mt-2">
          <Link to="/properties" className="text-text-secondary text-center">
            See More
          </Link>
        </div>
      )}
    </div>
  );
}
