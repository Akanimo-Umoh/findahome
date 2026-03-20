import search from "@/assets/images/search.svg";
// import dropdown from "@/assets/images/icon-downArrow.svg";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "apartment",
    bedrooms: "",
    priceRange: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // build query string from search params
    const queryParams = new URLSearchParams();

    if (searchParams.location)
      queryParams.append("location", searchParams.location);
    if (searchParams.propertyType)
      queryParams.append("propertyType", searchParams.propertyType);
    if (searchParams.bedrooms)
      queryParams.append("bedrooms", searchParams.bedrooms);
    if (searchParams.priceRange)
      queryParams.append("priceRange", searchParams.priceRange);

    // navigate to search results page with query params
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center gap-12"
    >
      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="input-ctn">
            {/* search input */}
            <input
              type="text"
              placeholder="Enter Location"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
              className="placeholder:text-text-secondary w-full outline-none text-text-primary"
            />
          </div>

          {/* property type */}
          <Select
            value={searchParams.propertyType}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, propertyType: value })
            }
          >
            <SelectTrigger className="input-ctn">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 w-full">
          {/* bedrooms */}
          <Select
            value={searchParams.bedrooms}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, bedrooms: value })
            }
          >
            <SelectTrigger className="input-ctn">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4+">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>

          {/* price range */}
          <Select
            value={searchParams.priceRange}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, priceRange: value })
            }
          >
            <SelectTrigger className="input-ctn">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300k-400k">₦ 300k - 400k</SelectItem>
              <SelectItem value="400k-1m">₦ 400k - 1M</SelectItem>
              <SelectItem value="1m-3m">₦ 1M - 3M</SelectItem>
              <SelectItem value="3m+">₦ 3M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-button-bg h-12 rounded-lg gap-2 text-white cursor-pointer hover:bg-button-hover"
      >
        <img src={search} alt="search" className="w-4 h-4" />
        <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
          Search
        </p>
      </button>
    </form>
  );
}
