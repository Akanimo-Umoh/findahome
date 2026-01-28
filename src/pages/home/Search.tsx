import search from "@/assets/images/search.svg";
import dropdown from "@/assets/images/icon-downArrow.svg";

export default function Search() {
  return (
    <form
      action=""
      className="flex flex-col w-full items-center justify-center gap-12"
    >
      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="input-ctn">
            <input
              type="text"
              placeholder="Enter Location"
              className="placeholder:text-text-secondary w-full outline-none text-text-primary"
            />
          </div>

          <div className="input-ctn">
            <p>Property Type</p>
            <img src={dropdown} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 w-full">
          <div className="input-ctn">
            <p>Bedrooms</p>
            <img src={dropdown} alt="" />
          </div>

          <div className="input-ctn">
            <p>Price Range</p>
            <img src={dropdown} alt="" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-button-bg h-12 rounded-lg gap-2 text-white cursor-pointer"
      >
        <img src={search} alt="search" className="w-4 h-4" />
        <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
          Search
        </p>
      </button>
    </form>
  );
}
