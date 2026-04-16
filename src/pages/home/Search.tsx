import searchIcon from "@/assets/agentImages/icon-search.svg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

type SearchProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export default function Search({ defaultValue = "", onChange }: SearchProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);
  const [placeholder, setPlaceholder] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1`);
    }
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 768) {
        setPlaceholder("Search property here");
      } else {
        setPlaceholder("Search property by name or location");
      }
    };
    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center justify-center relative h-8 w-full md:h-14">
        <img
          src={searchIcon}
          alt=""
          className="absolute left-3 md:w-6 md:h-6 md:left-4"
        />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          className="text-[12px] leading-4 placeholder:text-text-secondary w-full pl-8 pr-4 bg-bg-tertiary h-full rounded-xl outline-none md:rounded-3xl md:text-[14px] md:pl-13 input-search"
        />
      </div>
    </form>
  );
}
