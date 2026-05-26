import searchIcon from "@/assets/agentImages/icon-search.svg"
import filterIcon from "@/assets/agentImages/icon-filter.svg"

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
          className="w-full rounded-lg border border-bg-accent p-2 pr-8 pl-10 text-[12px] leading-4 outline-none"
        />

        <button className="absolute right-2">
          <img src={filterIcon} alt="" />
        </button>
      </div>
    </div>
  )
}
