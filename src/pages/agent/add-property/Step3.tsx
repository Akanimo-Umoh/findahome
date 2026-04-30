import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bedroomIcon from "@/assets/agentImages/icon-bedrooms.svg";
import bathroomIcon from "@/assets/agentImages/icon-bathrooms.svg";
import UploadImages from "./UploadImages";
import UploadDocuments from "./UploadDocuments";
import UploadVideo from "./UploadVideo";
import type { AddPropertyFormData } from "./AddProperty";
import { toast } from "sonner";
import { useState } from "react";
// import SubmissionSuccessful from "./SubmissionSuccessful";

type Step3Props = {
  formData: AddPropertyFormData;
  updateFormData: (fields: Partial<AddPropertyFormData>) => void;
  onSubmit: () => Promise<void>;
};

export default function Step3({
  formData,
  updateFormData,
  onSubmit,
}: Step3Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isApartment = formData.propertyType === "apartment";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.video) {
      toast.error("Please upload a video tour before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* apartment only */}
        {isApartment && (
          <>
            <p>Property Features</p>

            {/* property details */}
            <div className="flex items-center justify-between gap-4 mt-2">
              {/* bedrooms */}
              <div className="w-full">
                <Select
                  value={formData.bedrooms}
                  onValueChange={(val) => updateFormData({ bedrooms: val })}
                >
                  <SelectTrigger className="addPropTypeFeatures">
                    <div className="flex items-center gap-1">
                      <img src={bedroomIcon} alt="" />
                      <SelectValue placeholder="Bedrooms" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6+"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* bathrooms */}
              <div className="w-full">
                <Select
                  value={formData.bathrooms}
                  onValueChange={(val) => updateFormData({ bathrooms: val })}
                >
                  <SelectTrigger className="addPropTypeFeatures">
                    <div className="flex items-center gap-1">
                      <img src={bathroomIcon} alt="" />
                      <SelectValue placeholder="Bathrooms" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6+"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col gap-2 mt-6">
              <label
                htmlFor="apartmentDescription"
                className="app-property-label"
              >
                Description
              </label>

              <div className="p-3 border border-text-disabled rounded-xl h-25 md:h-37.5">
                <textarea
                  id="apartmentDescription"
                  value={formData.apartmentDescription}
                  onChange={(e) =>
                    updateFormData({ apartmentDescription: e.target.value })
                  }
                  placeholder="Start typing..."
                  className="outline-none text-[12px] w-full h-full resize-none"
                ></textarea>
              </div>
            </div>
          </>
        )}

        {/* upload images */}
        {/* for the land, step 3 would only have upload and videos */}
        <div className="mt-6">
          <p>Upload Photos $ Videos</p>

          <div className="mt-5 mx-4">
            {/* images */}
            <div>
              <UploadImages
                value={formData.images}
                onChange={(files) => updateFormData({ images: files })}
              />
            </div>

            {/* legal document */}
            {!isApartment && (
              <div className="mt-12">
                <UploadDocuments
                  value={formData.documents}
                  onChange={(files) => updateFormData({ documents: files })}
                />
              </div>
            )}

            {/* video */}
            <div className="mt-12">
              <UploadVideo
                value={formData.video}
                onChange={(file) => updateFormData({ video: file })}
              />
            </div>
          </div>
        </div>

        <div className="text-[14px] font-raleway font-semibold tracking-[1px] space-y-4 mt-11">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg h-[45px] button-style text-white w-full "
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button className="rounded-lg border border-text-secondary bg-button-disabled h-[45px] w-full cursor-pointer">
            Save as draft
          </button>
        </div>
      </form>

      {/* this is the successful component */}
      {/* <SubmissionSuccessful /> */}
    </div>
  );
}
