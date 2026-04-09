// import search from "@/assets/images/search.svg";
import searchIcon from "@/assets/agentImages/icon-search.svg";
// import dropdown from "@/assets/images/icon-downArrow.svg";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";

export default function Search() {
  return (
    <form className="">
      {/* <div className="space-y-4 flex flex-col items-center w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="input-ctn">
            <input
              type="text"
              placeholder="Enter Location"
              className="placeholder:text-text-secondary w-full outline-none text-text-primary"
            />
          </div>
        </div>
      </div> */}

      <div className="flex items-center justify-center relative h-8">
        <img src={searchIcon} alt="" className="absolute left-3" />

        <input
          type="text"
          placeholder="Search property here"
          className="text-[12px] leading-4 placeholder:text-text-secondary w-full pl-8 pr-4 bg-bg-tertiary h-full rounded-xl outline-none"
        />
      </div>
    </form>
  );
}
