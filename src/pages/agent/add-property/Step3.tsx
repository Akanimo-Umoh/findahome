// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import bedroomIcon from "@/assets/agentImages/icon-bedrooms.svg";
// import bathroomIcon from "@/assets/agentImages/icon-bathrooms.svg";
// import UploadImages from "./UploadImages";
// import UploadDocuments from "./UploadDocuments";
// import UploadVideo from "./UploadVideo";
// import type { AddPropertyFormData } from "./AddProperty";
// import { toast } from "sonner";
// import { useState } from "react";
// // import SubmissionSuccessful from "./SubmissionSuccessful";

// type Step3Props = {
//   formData: AddPropertyFormData;
//   updateFormData: (fields: Partial<AddPropertyFormData>) => void;
//   onSubmit: () => Promise<void>;
// };

// export default function Step3({
//   formData,
//   updateFormData,
//   onSubmit,
// }: Step3Props) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const isApartment = formData.propertyType === "apartment";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.video) {
//       toast.error("Please upload a video tour before submitting.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       await onSubmit();
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {/* apartment only */}
//         {isApartment && (
//           <>
//             <p>Property Features</p>

//             {/* property details */}
//             <div className="flex items-center justify-between gap-4 mt-2">
//               {/* bedrooms */}
//               <div className="w-full">
//                 <Select
//                   value={formData.bedrooms}
//                   onValueChange={(val) => updateFormData({ bedrooms: val })}
//                 >
//                   <SelectTrigger className="addPropTypeFeatures">
//                     <div className="flex items-center gap-1">
//                       <img src={bedroomIcon} alt="" />
//                       <SelectValue placeholder="Bedrooms" />
//                     </div>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {["1", "2", "3", "4", "5", "6+"].map((n) => (
//                       <SelectItem key={n} value={n}>
//                         {n}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* bathrooms */}
//               <div className="w-full">
//                 <Select
//                   value={formData.bathrooms}
//                   onValueChange={(val) => updateFormData({ bathrooms: val })}
//                 >
//                   <SelectTrigger className="addPropTypeFeatures">
//                     <div className="flex items-center gap-1">
//                       <img src={bathroomIcon} alt="" />
//                       <SelectValue placeholder="Bathrooms" />
//                     </div>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {["1", "2", "3", "4", "5", "6+"].map((n) => (
//                       <SelectItem key={n} value={n}>
//                         {n}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             {/* description */}
//             <div className="flex flex-col gap-2 mt-6">
//               <label
//                 htmlFor="apartmentDescription"
//                 className="app-property-label"
//               >
//                 Description
//               </label>

//               <div className="p-3 border border-text-disabled rounded-xl h-25 md:h-37.5">
//                 <textarea
//                   id="apartmentDescription"
//                   value={formData.apartmentDescription}
//                   onChange={(e) =>
//                     updateFormData({ apartmentDescription: e.target.value })
//                   }
//                   placeholder="Start typing..."
//                   className="outline-none text-[12px] w-full h-full resize-none"
//                 ></textarea>
//               </div>
//             </div>
//           </>
//         )}

//         {/* upload images */}
//         {/* for the land, step 3 would only have upload and videos */}
//         <div className="mt-6">
//           <p>Upload Photos $ Videos</p>

//           <div className="mt-5 mx-4">
//             {/* images */}
//             <div>
//               <UploadImages
//                 value={formData.images}
//                 onChange={(files) => updateFormData({ images: files })}
//               />
//             </div>

//             {/* legal document */}
//             {!isApartment && (
//               <div className="mt-12">
//                 <UploadDocuments
//                   value={formData.documents}
//                   onChange={(files) => updateFormData({ documents: files })}
//                 />
//               </div>
//             )}

//             {/* video */}
//             <div className="mt-12">
//               <UploadVideo
//                 value={formData.video}
//                 onChange={(file) => updateFormData({ video: file })}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="text-[14px] font-raleway font-semibold tracking-[1px] space-y-4 mt-11">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="rounded-lg h-[45px] button-style text-white w-full "
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>

//           <button className="rounded-lg border border-text-secondary bg-button-disabled h-[45px] w-full cursor-pointer">
//             Save as draft
//           </button>
//         </div>
//       </form>

//       {/* this is the successful component */}
//       {/* <SubmissionSuccessful /> */}
//     </div>
//   );
// }

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
import FormField from "./FormField";

type Step3Props = {
  formData: AddPropertyFormData;
  updateFormData: (fields: Partial<AddPropertyFormData>) => void;
  onSubmit: () => Promise<void>;
};

type Step3Errors = {
  bedrooms?: string;
  bathrooms?: string;
  apartmentDescription?: string;
  images?: string;
  documents?: string;
  video?: string;
};

export default function Step3({
  formData,
  updateFormData,
  onSubmit,
}: Step3Props) {
  const [errors, setErrors] = useState<Step3Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isApartment = formData.propertyType === "apartment";

  const validate = (): boolean => {
    const newErrors: Step3Errors = {};

    if (isApartment) {
      if (!formData.bedrooms)
        newErrors.bedrooms = "Please select number of bedrooms";
      if (!formData.bathrooms)
        newErrors.bathrooms = "Please select number of bathrooms";
      if (!formData.apartmentDescription.trim())
        newErrors.apartmentDescription = "Description can't be empty";
    }

    if (formData.images.length === 0)
      newErrors.images = "Please upload at least one photo";
    if (!isApartment && formData.documents.length === 0)
      newErrors.documents = "Please upload at least one legal document";
    if (!formData.video) newErrors.video = "Please upload a video tour";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
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
        {isApartment && (
          <>
            <p>Property Features</p>

            <div className="flex items-start justify-between gap-4 mt-2">
              <div className="w-full">
                <Select
                  value={formData.bedrooms}
                  onValueChange={(val) => {
                    updateFormData({ bedrooms: val });
                    if (errors.bedrooms)
                      setErrors((prev) => ({ ...prev, bedrooms: undefined }));
                  }}
                >
                  <SelectTrigger
                    className={`addPropTypeFeatures ${errors.bedrooms ? "border-red-500" : ""}`}
                  >
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
                {errors.bedrooms && (
                  <p className="text-red-500 text-[11px] leading-4 mt-1">
                    {errors.bedrooms}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Select
                  value={formData.bathrooms}
                  onValueChange={(val) => {
                    updateFormData({ bathrooms: val });
                    if (errors.bathrooms)
                      setErrors((prev) => ({ ...prev, bathrooms: undefined }));
                  }}
                >
                  <SelectTrigger
                    className={`addPropTypeFeatures ${errors.bathrooms ? "border-red-500" : ""}`}
                  >
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
                {errors.bathrooms && (
                  <p className="text-red-500 text-[11px] leading-4 mt-1">
                    {errors.bathrooms}
                  </p>
                )}
              </div>
            </div>

            <FormField
              label="Description"
              htmlFor="apartmentDescription"
              error={errors.apartmentDescription}
              className="mt-6"
            >
              <div
                className={`p-3 border rounded-xl h-25 md:h-37.5 ${errors.apartmentDescription ? "border-red-500" : "border-text-disabled"}`}
              >
                <textarea
                  id="apartmentDescription"
                  value={formData.apartmentDescription}
                  onChange={(e) => {
                    updateFormData({ apartmentDescription: e.target.value });
                    if (errors.apartmentDescription)
                      setErrors((prev) => ({
                        ...prev,
                        apartmentDescription: undefined,
                      }));
                  }}
                  placeholder="Start typing..."
                  className="outline-none text-[12px] w-full h-full resize-none"
                />
              </div>
            </FormField>
          </>
        )}

        <div className="mt-6">
          <p>Upload Photos & Videos</p>

          <div className="mt-5 mx-4">
            <div>
              <UploadImages
                value={formData.images}
                onChange={(files) => {
                  updateFormData({ images: files });
                  if (errors.images)
                    setErrors((prev) => ({ ...prev, images: undefined }));
                }}
              />
              {errors.images && (
                <p className="text-red-500 text-[11px] leading-4 mt-1">
                  {errors.images}
                </p>
              )}
            </div>

            {!isApartment && (
              <div className="mt-12">
                <UploadDocuments
                  value={formData.documents}
                  onChange={(files) => {
                    updateFormData({ documents: files });
                    if (errors.documents)
                      setErrors((prev) => ({ ...prev, documents: undefined }));
                  }}
                />
                {errors.documents && (
                  <p className="text-red-500 text-[11px] leading-4 mt-1">
                    {errors.documents}
                  </p>
                )}
              </div>
            )}

            <div className="mt-12">
              <UploadVideo
                value={formData.video}
                onChange={(file) => {
                  updateFormData({ video: file });
                  if (errors.video)
                    setErrors((prev) => ({ ...prev, video: undefined }));
                }}
              />
              {errors.video && (
                <p className="text-red-500 text-[11px] leading-4 mt-1">
                  {errors.video}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-[14px] font-raleway font-semibold tracking-[1px] space-y-4 mt-11">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg h-[45px] button-style text-white w-full disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            className="rounded-lg border border-text-secondary bg-button-disabled h-[45px] w-full cursor-pointer"
          >
            Save as draft
          </button>
        </div>
      </form>
    </div>
  );
}
