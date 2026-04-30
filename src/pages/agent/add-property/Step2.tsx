import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg";
import addIcon from "@/assets/agentImages/icon-add-landmarks.svg";
import type { AddPropertyFormData } from "./AddProperty";
import { nigerianStates } from "@/types/nigerianStates";

type Step2Props = {
  formData: AddPropertyFormData;
  updateFormData: (fields: Partial<AddPropertyFormData>) => void;
  onNext: () => void;
};

export default function Step2({
  formData,
  updateFormData,
  onNext,
}: Step2Props) {
  const handleLandmarkChange = (index: number, value: string) => {
    const updated = [...formData.landmarks];
    updated[index] = value;
    updateFormData({ landmarks: updated });
  };

  const addLandmark = () => {
    updateFormData({ landmarks: [...formData.landmarks, ""] });
  };

  const handleNext = () => {
    if (!formData.state || !formData.city.trim()) return;
    onNext();
  };

  const isApartment = formData.propertyType === "apartment";

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <p className="md:text-[18px]">Location Info</p>

        {/* property details */}
        <div className="flex flex-col gap-1 mt-2 md:mt-4">
          <label className="app-property-label">State</label>

          {/* state */}
          <Select
            value={formData.state}
            onValueChange={(val) => updateFormData({ state: val })}
          >
            <SelectTrigger className="addPropType">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {nigerianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* city */}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="city" className="app-property-label">
            City
          </label>

          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
            placeholder="e.g, Ikoyi, Garki, etc"
          />
        </div>

        {/* nearest landmark, dynamic list */}
        <div className="flex flex-col gap-1 mt-4">
          <label className="app-property-label">Nearest Landmarks</label>

          {formData.landmarks.map((landmark, index) => (
            <input
              key={index}
              type="text"
              value={landmark}
              onChange={(e) => handleLandmarkChange(index, e.target.value)}
              className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2 mt-1"
              placeholder="e.g, 5 mins to Silverbird cinema"
            />
          ))}
        </div>

        {/* add more landmarks */}
        <button
          type="button"
          onClick={addLandmark}
          className="flex items-center mt-4 rounded-lg border border-bg-accent bg-button-disabled h-[45px] px-2 gap-2 justify-center"
        >
          <img src={addIcon} alt="" />
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] md:text-[16px]">
            Add more landmarks
          </p>
        </button>

        {/* the design in here is the same with that of the description for land. apartment does not have this here */}
        {!isApartment && (
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="description" className="app-property-label">
              Description
            </label>

            <div className="p-3 border border-text-disabled rounded-xl h-25 md:h-37.5">
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  updateFormData({ description: e.target.value })
                }
                placeholder="Start typing..."
                className="outline-none text-[12px] w-full h-full resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {/* next button */}
        <button
          type="submit"
          className="bg-button-bg flex items-center gap-2 h-[45px] px-2 rounded-lg mt-6 ml-auto cursor-pointer"
        >
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white md:text-[16px]">
            Next
          </p>
          <img src={rightIcon} alt="" />
        </button>
      </form>
    </div>
  );
}
