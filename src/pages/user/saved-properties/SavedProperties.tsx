import saveIcon from "@/assets/images/icon-heart.svg";
import goBack from "@/assets/images/icon-back.svg";
import { useNavigate } from "react-router-dom";
// import PropertyCard from "@/components/PropertyCard";

export default function SavedProperties() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Saved Properties
        </p>

        <div className="absolute right-0">
          <img src={saveIcon} alt="" />
        </div>
      </div>

      <main className="mt-6">
        {/* tabs */}
        {/* these tabs are used to switch between the property types */}
        <div className="flex items-center justify-center gap-8">
          <button className="rounded-xl py-2 border border-bg-accent w-26">
            Apartments
          </button>

          <button className="w-26 py-2">Lands</button>
        </div>

        {/* main apartment card ctn */}
        {/* this is for the apartment cards */}
        <div className="space-y-8 mt-8">
          {/* {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))} */}
        </div>
      </main>
    </div>
  );
}
