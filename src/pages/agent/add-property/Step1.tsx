import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg";

export default function Step1() {
  return (
    <div>
      <form action="">
        {/* property details */}
        <div className="flex flex-col gap-2">
          <label htmlFor="propertyName">Property Name</label>

          <input
            type="text"
            id="propertyName"
            className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            placeholder="3-Bedroom Apartment"
          />
        </div>

        {/* property type */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="property type">Property Type</label>

          {/* property type */}
          <Select>
            <SelectTrigger className="addPropType">
              <SelectValue
                placeholder="Property Type"
                defaultValue="apartment"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* listing type */}
        <div className="mt-6">
          <label htmlFor="listing type">Listing Type</label>

          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="listing type"
                id="sale"
                className="w-5 h-5"
              />
              <label htmlFor="sale" className="text-[14px]">
                For Sale
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="listing type"
                id="sale"
                className="w-5 h-5"
              />
              <label htmlFor="sale" className="text-[14px]">
                For Rent
              </label>
            </div>
          </div>
        </div>

        {/* if it is land */}
        <div className="flex items-center justify-between gap-6 mt-6">
          <div>
            <label htmlFor="plotSize" className="text-[14px]">
              Plot Size
            </label>
            <input
              type="text"
              id="plotSize"
              className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            />
          </div>

          <div>
            <label htmlFor="unit">Unit</label>
            <Select>
              <SelectTrigger className="addPropType">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sqm">Sqm</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <Select>
            <SelectTrigger className="addPropType">
              <SelectValue placeholder="Land Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqm">Sqm</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Select>
            <SelectTrigger className="addPropType">
              <SelectValue placeholder="Document Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqm">Sqm</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* land stops here */}

        {/* price: the price shows for both */}
        <div className="mt-6">
          <input
            type="text"
            className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            placeholder={`Price \u20a6`}
          />
        </div>

        <button className="bg-button-bg flex items-center gap-2 h-[45px] px-2 rounded-lg mt-[37px] ml-auto">
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
            Next
          </p>
          <img src={rightIcon} alt="" />
        </button>
      </form>
    </div>
  );
}
