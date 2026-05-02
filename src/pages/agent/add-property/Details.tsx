// import typeIcon from "@/assets/agentImages/icon-property-type.svg";
// import locationIcon from "@/assets/agentImages/icon-blue-location.svg";
// import bathIcon from "@/assets/agentImages/icon-blue-bath.svg";
// import kitchenIcon from "@/assets/agentImages/icon-blue-kitchen.svg";
// import bedIcon from "@/assets/agentImages/icon-blue-bed.svg";

// export default function Details() {
//   return (
//     <div>
//       {/* this is for apartment */}
//       <div className="flex flex-wrap gap-x-4 gap-y-2">
//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={typeIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">
//             Property Type: <span className="font-semibold">Apartment</span>
//           </p>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={locationIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">Lekki Phase 1</p>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={bathIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">2 Baths</p>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={kitchenIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">1 Kitchen</p>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={bedIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">4 Beds</p>
//         </div>
//       </div>

//       {/* this is for land */}
//       <div className="flex flex-wrap gap-x-4 gap-y-2">
//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={typeIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">
//             Property Type: <span className="font-semibold">Land</span>
//           </p>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="p-2 shrink-0 bg-bg-accent rounded-full">
//             <img src={locationIcon} alt="" />
//           </div>
//           <p className="text-[14px] text-text-secondary">Lekki Phase 1</p>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="text-[12px] tracking-[1px] text-text-secondary">
//           Service charge:{" "}
//           <span className="font-semibold text-button-bg">
//             {`\u20a6`}100,000/yr
//           </span>
//         </p>
//       </div>

//       {/* landmark */}
//       <div className="text-[12px] tracking-[1px] text-text-secondary space-y-2 mt-4">
//         <p>5 Minutes to Lekki toll gate</p>
//         <p>2 Min to shoprite mall</p>
//         <p>10 min to Reddinghton hospital</p>
//       </div>

//       {/* description */}
//       <div className="mt-6 space-y-2">
//         <p className="font-raleway font-medium text-[14px]">Description</p>

//         <p className="text-[12px] text-text-secondary">
//           Beautiful and spacious 2-bedroom apartment in the heart of Lekki Phase
//           1. This fully furnished unit features modern amenities, premium
//           finishes, and stunning views. Perfect for professionals and families
//           looking for luxury living in a prime location with easy access to
//           major business districts and entertainment centers.
//         </p>
//       </div>
//     </div>
//   );
// }

import typeIcon from "@/assets/agentImages/icon-property-type.svg";
import locationIcon from "@/assets/agentImages/icon-blue-location.svg";
import bathIcon from "@/assets/agentImages/icon-blue-bath.svg";
import kitchenIcon from "@/assets/agentImages/icon-blue-kitchen.svg";
import bedIcon from "@/assets/agentImages/icon-blue-bed.svg";

type DetailsProps = {
  property: {
    propertyType: "apartment" | "land";
    address?: string;
    bedroom?: number;
    bathroom?: number;
    kitchen?: number;
    landSize?: string;
    landUnit?: string;
    serviceCharge?: number;
    nearbyPlaces?: string[];
    description?: string;
  };
};

export default function Details({ property }: DetailsProps) {
  const isLand = property.propertyType === "land";

  return (
    <div>
      {/* apartment details */}
      {!isLand && (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <div className="p-2 shrink-0 bg-bg-accent rounded-full">
              <img src={typeIcon} alt="" />
            </div>
            <p className="text-[14px] text-text-secondary">
              Property Type: <span className="font-semibold">Apartment</span>
            </p>
          </div>

          {property.address && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
                <img src={locationIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.address}
              </p>
            </div>
          )}

          {property.bathroom != null && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
                <img src={bathIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.bathroom} Bath{property.bathroom !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {property.kitchen != null && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
                <img src={kitchenIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.kitchen} Kitchen
              </p>
            </div>
          )}

          {property.bedroom != null && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
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
            <div className="p-2 shrink-0 bg-bg-accent rounded-full">
              <img src={typeIcon} alt="" />
            </div>
            <p className="text-[14px] text-text-secondary">
              Property Type: <span className="font-semibold">Land</span>
            </p>
          </div>

          {property.address && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
                <img src={locationIcon} alt="" />
              </div>
              <p className="text-[14px] text-text-secondary">
                {property.address}
              </p>
            </div>
          )}

          {property.landSize && (
            <div className="flex items-center gap-1">
              <div className="p-2 shrink-0 bg-bg-accent rounded-full">
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
        <div className="text-[12px] tracking-[1px] text-text-secondary space-y-2 mt-4">
          {property.nearbyPlaces.map((place, index) => (
            <p key={index}>{place}</p>
          ))}
        </div>
      )}

      {/* description */}
      {property.description && (
        <div className="mt-6 space-y-2">
          <p className="font-raleway font-medium text-[14px]">Description</p>
          <p className="text-[12px] text-text-secondary">
            {property.description}
          </p>
        </div>
      )}
    </div>
  );
}
