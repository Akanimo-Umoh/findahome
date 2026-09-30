import type { Property } from "@/types/property"
import PropertyCard from "../PropertyCard"

type Props = {
  property: Property
}

export default function PropertyCardCtn({ property }: Props) {
  const to = `/property/${property._id}`

  return (
    <div className="mx-auto w-full max-w-112.5">
      <PropertyCard property={property} to={to} />
    </div>
  )
}
