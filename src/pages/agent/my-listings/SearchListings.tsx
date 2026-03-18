import searchIcon from "@/assets/agentImages/icon-search.svg";
import filterIcon from "@/assets/agentImages/icon-filter.svg";

export default function SearchListings() {
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <label htmlFor="search" className="absolute left-2">
          <img src={searchIcon} alt="" />
        </label>

        <input
          type="text"
          name=""
          id="search"
          placeholder="Search Listings"
          className="border border-bg-accent p-2 pl-10 pr-8 w-full text-[12px] leading-4 outline-none rounded-lg"
        />

        <button className="absolute right-2">
          <img src={filterIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
