import typeIcon from "@/assets/agentImages/icon-property-type.svg"
import locationIcon from "@/assets/agentImages/icon-blue-location.svg"
import bathIcon from "@/assets/agentImages/icon-blue-bath.svg"
import kitchenIcon from "@/assets/agentImages/icon-blue-kitchen.svg"
import bedIcon from "@/assets/agentImages/icon-blue-bed.svg"

type DetailsProps = {
  property: {
    propertyType: "apartment" | "land"
    address?: string
    bedroom?: number
    bathroom?: number
    kitchen?: number
    landSize?: string
    landUnit?: string
    serviceCharge?: number
    nearbyPlaces?: string[]
    description?: string
  }
}

export default function Details({ property }: DetailsProps) {
  const isLand = property.propertyType === "land"

  return (
    <div>
      {/* apartment details */}
      {!isLand && (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <div className="shrink-0 rounded-full bg-bg-accent p-2">
              <img src={typeIcon} alt="" />
            </div>
            <p className="text-[14px] text-text-secondary">
              Property Type: <span className="font-semibold">Apartment</span>
            </p>
          </div>

          {property.address && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={locationIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.address}
              </p>
            </div>
          )}

          {property.bathroom != null && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={bathIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.bathroom} Bath{property.bathroom !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {property.kitchen != null && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={kitchenIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.kitchen} Kitchen
              </p>
            </div>
          )}

          {property.bedroom != null && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={bedIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.bedroom} Bed{property.bedroom !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      )}

      {/* land details */}
      {isLand && (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <div className="shrink-0 rounded-full bg-bg-accent p-2">
              <img src={typeIcon} alt="" />
            </div>
            <p className="text-[14px] text-text-secondary">
              Property Type: <span className="font-semibold">Land</span>
            </p>
          </div>

          {property.address && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={locationIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.address}
              </p>
            </div>
          )}

          {property.landSize && (
            <div className="flex items-center gap-1">
              <div className="shrink-0 rounded-full bg-bg-accent p-2">
                <img src={typeIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.landSize} {property.landUnit}
              </p>
            </div>
          )}
        </div>
      )}

      {/* service charge — both types */}
      {property.serviceCharge != null && (
        <div className="mt-4">
          <p className="text-[12px] tracking-[1px] text-text-secondary">
            Service charge:{" "}
            <span className="font-semibold text-button-bg">
              ₦{property.serviceCharge.toLocaleString()}/yr
            </span>
          </p>
        </div>
      )}

      {/* landmarks */}
      {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <div className="mt-4 space-y-2 text-[12px] tracking-[1px] text-text-secondary">
          {property.nearbyPlaces.map((place, index) => (
            <p key={index}>{place}</p>
          ))}
        </div>
      )}

      {/* description */}
      {property.description && (
        <div className="mt-6 space-y-2">
          <p className="font-raleway text-[14px] font-medium">Description</p>
          <p className="text-[12px] text-text-secondary">
            {property.description}
          </p>
        </div>
      )}
    </div>
  )
}
