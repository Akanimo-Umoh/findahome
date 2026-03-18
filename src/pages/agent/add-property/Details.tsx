import typeIcon from "@/assets/agentImages/icon-property-type.svg";
import locationIcon from "@/assets/agentImages/icon-blue-location.svg";
import bathIcon from "@/assets/agentImages/icon-blue-bath.svg";
import kitchenIcon from "@/assets/agentImages/icon-blue-kitchen.svg";
import bedIcon from "@/assets/agentImages/icon-blue-bed.svg";

export default function Details() {
  return (
    <div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <div className="flex items-center gap-1">
          <div className="p-2 shrink-0 bg-bg-accent rounded-full">
            <img src={typeIcon} alt="" />
          </div>
          <p className="text-[14px] text-text-secondary">
            Property Type: <span className="font-semibold">Apartment</span>
          </p>
        </div>

        <div className="flex items-center gap-1">
          <div className="p-2 shrink-0 bg-bg-accent rounded-full">
            <img src={locationIcon} alt="" />
          </div>
          <p className="text-[14px] text-text-secondary">Lekki Phase 1</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="p-2 shrink-0 bg-bg-accent rounded-full">
            <img src={bathIcon} alt="" />
          </div>
          <p className="text-[14px] text-text-secondary">2 Baths</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="p-2 shrink-0 bg-bg-accent rounded-full">
            <img src={kitchenIcon} alt="" />
          </div>
          <p className="text-[14px] text-text-secondary">1 Kitchen</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="p-2 shrink-0 bg-bg-accent rounded-full">
            <img src={bedIcon} alt="" />
          </div>
          <p className="text-[14px] text-text-secondary">4 Beds</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[12px] tracking-[1px] text-text-secondary">
          Service charge:{" "}
          <span className="font-semibold text-button-bg">
            {`\u20a6`}100,000/yr
          </span>
        </p>
      </div>

      {/* landmark */}
      <div className="text-[12px] tracking-[1px] text-text-secondary space-y-2 mt-4">
        <p>5 Minutes to Lekki toll gate</p>
        <p>2 Min to shoprite mall</p>
        <p>10 min to Reddinghton hospital</p>
      </div>

      {/* description */}
      <div className="mt-10 space-y-2">
        <p className="font-raleway font-medium text-[14px]">Description</p>

        <p className="text-[12px] text-text-secondary">
          Beautiful and spacious 2-bedroom apartment in the heart of Lekki Phase
          1. This fully furnished unit features modern amenities, premium
          finishes, and stunning views. Perfect for professionals and families
          looking for luxury living in a prime location with easy access to
          major business districts and entertainment centers.
        </p>
      </div>
    </div>
  );
}
