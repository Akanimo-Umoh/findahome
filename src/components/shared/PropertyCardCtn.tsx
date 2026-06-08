import { Link } from "react-router-dom"
import type { Property } from "@/types/property"
import PropertyCard from "../PropertyCard"

type Props = {
  property: Property
}

export default function PropertyCardCtn({ property }: Props) {
  const to = `/property/${property._id}`

  return (
    <>
      {/* mobile — button inside handles navigation */}
      <div className="mx-auto w-full max-w-112.5 md:hidden">
        <PropertyCard property={property} to={to} />
      </div>

      {/* desktop — whole card is the link */}
      <Link to={to} className="mx-auto hidden w-full max-w-112.5 md:block">
        <PropertyCard property={property} to={to} />
      </Link>
    </>
  )
}
