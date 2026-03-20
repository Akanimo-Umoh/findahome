import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";

export default function Properties() {
  const { properties, loading, error } = useProperties();

  if (loading) {
    return (
      <div className="font-ssPro mx-6">
        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
          Available Properties
        </p>
        <div className="mt-6 text-center text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-ssPro mx-6">
        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
          Available Properties
        </p>
        <div className="mt-6 text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  // slice to 3 for the homepage preview
  const previewProperties = properties.slice(0, 3);

  return (
    <div className="font-ssPro mx-6">
      <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
        Available Properties
      </p>

      {/* main properties ctn */}
      <div className="mt-6 space-y-8">
        {/* properties ctn */}
        {previewProperties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            img_height="h-50"
          />
        ))}
      </div>

      <div className="text-center mt-2">
        <Link to="/properties" className="text-text-secondary text-center">
          See More
        </Link>
      </div>
    </div>
  );
}
