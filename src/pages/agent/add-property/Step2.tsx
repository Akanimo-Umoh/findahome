import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg";
import addIcon from "@/assets/agentImages/icon-add-landmarks.svg";

export default function Step2() {
  return (
    <div>
      <form action="">
        <p>Location Info</p>

        {/* property details */}
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="state" className="text-[14px]">
            State
          </label>

          {/* state */}
          <Select>
            <SelectTrigger className="addPropType">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Abia</SelectItem>
              <SelectItem value="land">Adamawa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* city */}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="city" className="text-[14px]">
            City
          </label>

          <input
            type="text"
            id="city"
            className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            placeholder="e.g, Ikoyi, Garki, etc"
          />
        </div>

        {/* nearest landmark */}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="city" className="text-[14px]">
            Nearest Landmarks
          </label>

          <input
            type="text"
            id="city"
            className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            placeholder="e.g, 5 mins to Silverbird cinema"
          />
        </div>

        {/* add more landmarks */}
        <button
          type="button"
          className="flex items-center mt-4 rounded-lg border border-bg-accent bg-button-disabled h-[45px] px-2 gap-2"
        >
          <img src={addIcon} alt="" />
          <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
            Add more landmarks
          </p>
        </button>

        {/* next button */}
        <button className="bg-button-bg flex items-center gap-2 h-[45px] px-2 rounded-lg mt-6 ml-auto">
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
            Next
          </p>
          <img src={rightIcon} alt="" />
        </button>
      </form>
    </div>
  );
}
