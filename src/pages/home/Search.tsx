import searchIcon from "@/assets/agentImages/icon-search.svg";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type SearchProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export default function Search({ defaultValue = "", onChange }: SearchProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center justify-center relative h-8 w-full">
        <img src={searchIcon} alt="" className="absolute left-3" />

        <input
          type="text"
          placeholder="Search property here"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          className="text-[12px] leading-4 placeholder:text-text-secondary w-full pl-8 pr-4 bg-bg-tertiary h-full rounded-xl outline-none"
        />
      </div>
    </form>
  );
}
