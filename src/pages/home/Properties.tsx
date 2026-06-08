import { Link } from "react-router-dom"
import { useProperties } from "@/hooks/useProperties"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"
import PropertyCardCtn from "@/components/shared/PropertyCardCtn"

export default function Properties() {
  const { properties, loading, error } = useProperties()

  // slice to 3 for the homepage preview
  const previewProperties = properties.slice(0, 3)

  return (
    <div className="mx-6 max-w-7xl font-ssPro md:mx-8">
      <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary md:text-[36px]">
        Available Properties
      </p>

      {/* main properties ctn */}
      <div className="mt-6 space-y-8 md:mt-12">
        {loading ? (
          // show skeletons
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          // show error message
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          // show properties
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {previewProperties.map((property) => (
              <PropertyCardCtn key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="mt-2 text-center md:mt-10">
          <Link
            to="/available-properties"
            className="text-center text-text-secondary md:text-[18px]"
          >
            See More
          </Link>
        </div>
      )}
    </div>
  )
}
