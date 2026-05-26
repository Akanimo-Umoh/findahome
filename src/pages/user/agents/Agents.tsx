import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import searchIcon from "@/assets/images/icon-black-search.svg"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import AgentsCard from "./AgentsCard"

export default function Agents() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Find Verified Agents
        </p>
      </div>

      {/* search and filter bar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* search */}
        <div className="relative flex h-8 w-full max-w-57 items-center">
          <input
            type="text"
            id="search"
            placeholder="Search by agents name or location"
            className="h-full w-full rounded-xl border border-text-secondary pr-3.75 pl-8.75 text-[12px] leading-4"
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
      <section className="mt-6">
        {/* agents main ctn */}
        <AgentsCard />
      </section>
    </div>
  )
}
