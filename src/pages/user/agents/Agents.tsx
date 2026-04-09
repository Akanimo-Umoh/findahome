import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import searchIcon from "@/assets/images/icon-black-search.svg";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import AgentsCard from "./AgentsCard";

export default function Agents() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Find Verified Agents
        </p>
      </div>

      {/* search and filter bar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* search */}
        <div className="relative h-8 flex items-center max-w-57 w-full">
          <input
            type="text"
            id="search"
            placeholder="Search by agents name or location"
            className="text-[12px] leading-4 border border-text-secondary w-full h-full rounded-xl pl-8.75 pr-3.75"
          />

          <label htmlFor="search" className="absolute left-3.75">
            <img src={searchIcon} alt="" />
          </label>
        </div>

        {/* filter
        <div className="">
          <Select>
            <SelectTrigger className="filter-input">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* agents */}
      <section className=" mt-6">
        {/* agents main ctn */}
        <AgentsCard />
      </section>
    </div>
  );
}
