// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import rightIcon from "@/assets/agentImages/icon-right-arrow.svg";
// import type {
//   AddPropertyFormData,
//   ListingType,
//   PropertyType,
// } from "./AddProperty";

// type Step1Props = {
//   formData: AddPropertyFormData;
//   updateFormData: (fields: Partial<AddPropertyFormData>) => void;
//   onNext: () => void;
// };

// export default function Step1({
//   formData,
//   updateFormData,
//   onNext,
// }: Step1Props) {
//   const isLand = formData.propertyType === "land";

//   const handleNext = () => {
//     if (!formData.propertyName.trim() || !formData.price.trim()) return;
//     onNext();
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleNext();
//         }}
//       >
//         {/* property details */}
//         <div className="flex flex-col gap-1">
//           <label htmlFor="propertyName" className="app-property-label">
//             Property Name
//           </label>

//           <input
//             type="text"
//             id="propertyName"
//             value={formData.propertyName}
//             onChange={(e) => updateFormData({ propertyName: e.target.value })}
//             className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
//             placeholder="3-Bedroom Apartment"
//           />
//         </div>

//         {/* property type */}
//         <div className="flex flex-col gap-1 mt-6">
//           <label htmlFor="property type" className="app-property-label">
//             Property Type
//           </label>

//           {/* property type */}
//           <Select
//             value={formData.propertyType}
//             onValueChange={(val) =>
//               updateFormData({ propertyType: val as PropertyType })
//             }
//           >
//             <SelectTrigger className="addPropType">
//               <SelectValue
//                 placeholder="Property Type"
//                 defaultValue="Apartment"
//               />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="apartment">Apartment</SelectItem>
//               <SelectItem value="land">Land</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* listing type */}
//         <div className="mt-6">
//           <label htmlFor="listing type" className="app-property-label">
//             Listing Type
//           </label>

//           <div className="flex items-center gap-6 mt-3">
//             <div className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 name="listingType"
//                 id="sale"
//                 checked={formData.listingType === "sale"}
//                 onChange={() =>
//                   updateFormData({ listingType: "sale" as ListingType })
//                 }
//                 className="w-5 h-5"
//               />
//               <label htmlFor="sale" className="text-[14px]">
//                 For Sale
//               </label>
//             </div>

//             <div className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 name="listingType"
//                 id="sale"
//                 checked={formData.listingType === "rent"}
//                 onChange={() =>
//                   updateFormData({ listingType: "rent" as ListingType })
//                 }
//                 className="w-5 h-5"
//               />
//               <label htmlFor="rent" className="text-[14px]">
//                 For Rent
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* land only fields */}
//         {isLand && (
//           <>
//             <div className="flex items-center justify-between gap-6 mt-6">
//               <div className="flex-1">
//                 <label htmlFor="plotSize" className="app-property-label">
//                   Plot Size
//                 </label>
//                 <input
//                   type="text"
//                   id="plotSize"
//                   value={formData.plotSize}
//                   onChange={(e) => updateFormData({ plotSize: e.target.value })}
//                   className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
//                   placeholder="e.g. 500"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="unit" className="app-property-label">
//                   Unit
//                 </label>
//                 <Select
//                   value={formData.plotUnit}
//                   onValueChange={(val) => updateFormData({ plotUnit: val })}
//                 >
//                   <SelectTrigger className="addPropType">
//                     <SelectValue placeholder="Select Unit" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="sqm">Sqm</SelectItem>
//                     <SelectItem value="acres">Acres</SelectItem>
//                     <SelectItem value="hectares">Hectares</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Select
//                 value={formData.landCondition}
//                 onValueChange={(val) => updateFormData({ landCondition: val })}
//               >
//                 <SelectTrigger className="addPropType">
//                   <SelectValue placeholder="Land Condition" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="bare">Bare Land</SelectItem>
//                   <SelectItem value="fenced">Fenced</SelectItem>
//                   <SelectItem value="developed">Developed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="mt-6">
//               <Select
//                 value={formData.documentTitle}
//                 onValueChange={(val) => updateFormData({ documentTitle: val })}
//               >
//                 <SelectTrigger className="addPropType">
//                   <SelectValue placeholder="Document Title" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="cOfO">C of O</SelectItem>
//                   <SelectItem value="deed">Deed of Assignment</SelectItem>
//                   <SelectItem value="gazette">Gazette</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </>
//         )}

//         {/* price: the price shows for both */}
//         <div className="mt-6">
//           <label htmlFor="serviceCharge" className="app-property-label">
//             Property Price
//           </label>

//           <input
//             type="text"
//             value={formData.price}
//             onChange={(e) => updateFormData({ price: e.target.value })}
//             className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
//             placeholder={`Price ₦`}
//           />
//         </div>

//         <div className="mt-6">
//           <label htmlFor="serviceCharge" className="app-property-label">
//             Service Charge
//           </label>

//           <input
//             type="text"
//             id="serviceCharge"
//             value={formData.serviceCharge}
//             onChange={(e) => updateFormData({ serviceCharge: e.target.value })}
//             className="text-[14px] w-full rounded-lg h-[45px] border border-text-secondary px-2"
//             placeholder={`Service Charge ₦`}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-button-bg flex items-center gap-2 h-[45px] px-2 rounded-lg mt-[37px] ml-auto cursor-pointer"
//         >
//           <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white md:text-[16px]">
//             Next
//           </p>
//           <img src={rightIcon} alt="" />
//         </button>
//       </form>
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
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg";
import type {
  AddPropertyFormData,
  ListingType,
  PropertyType,
} from "./AddProperty";
import FormField from "./FormField";
import { useState } from "react";

type Step1Props = {
  formData: AddPropertyFormData;
  updateFormData: (fields: Partial<AddPropertyFormData>) => void;
  onNext: () => void;
};

type Step1Errors = {
  propertyName?: string;
  propertyType?: string;
  listingType?: string;
  plotSize?: string;
  plotUnit?: string;
  landCondition?: string;
  landDocType?: string;
  price?: string;
  serviceCharge?: string;
};

export default function Step1({
  formData,
  updateFormData,
  onNext,
}: Step1Props) {
  const [errors, setErrors] = useState<Step1Errors>({});
  const isLand = formData.propertyType === "land";

  const validate = (): boolean => {
    const newErrors: Step1Errors = {};

    if (!formData.propertyName.trim())
      newErrors.propertyName = "Property name can't be empty";
    if (!formData.propertyType)
      newErrors.propertyType = "Please select a property type";
    if (!formData.listingType)
      newErrors.listingType = "Please select a listing type";
    if (!formData.price.trim()) newErrors.price = "Price can't be empty";
    if (!formData.serviceCharge.trim())
      newErrors.serviceCharge = "Service charge can't be empty";

    if (isLand) {
      if (!formData.plotSize.trim())
        newErrors.plotSize = "Plot size can't be empty";
      if (!formData.plotUnit) newErrors.plotUnit = "Please select a unit";
      if (!formData.landCondition)
        newErrors.landCondition = "Please select land condition";
      if (!formData.landDocType)
        newErrors.landDocType = "Please select document title";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <FormField
          label="Property Name"
          htmlFor="propertyName"
          error={errors.propertyName}
        >
          <input
            type="text"
            id="propertyName"
            value={formData.propertyName}
            onChange={(e) => {
              updateFormData({ propertyName: e.target.value });
              if (errors.propertyName)
                setErrors((prev) => ({ ...prev, propertyName: undefined }));
            }}
            className={`text-[14px] w-full rounded-lg h-[45px] border px-2 ${errors.propertyName ? "border-red-500" : "border-text-secondary"}`}
            placeholder="3-Bedroom Apartment"
          />
        </FormField>

        <FormField
          label="Property Type"
          error={errors.propertyType}
          className="mt-6"
        >
          <Select
            value={formData.propertyType}
            onValueChange={(val) => {
              updateFormData({ propertyType: val as PropertyType });
              if (errors.propertyType)
                setErrors((prev) => ({ ...prev, propertyType: undefined }));
            }}
          >
            <SelectTrigger
              className={`addPropType ${errors.propertyType ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <div className="mt-6">
          <label className="app-property-label">Listing Type</label>
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="listingType"
                id="sale"
                checked={formData.listingType === "sale"}
                onChange={() => {
                  updateFormData({ listingType: "sale" as ListingType });
                  if (errors.listingType)
                    setErrors((prev) => ({ ...prev, listingType: undefined }));
                }}
                className="w-5 h-5"
              />
              <label htmlFor="sale" className="text-[14px]">
                For Sale
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="listingType"
                id="rent"
                checked={formData.listingType === "rent"}
                onChange={() => {
                  updateFormData({ listingType: "rent" as ListingType });
                  if (errors.listingType)
                    setErrors((prev) => ({ ...prev, listingType: undefined }));
                }}
                className="w-5 h-5"
              />
              <label htmlFor="rent" className="text-[14px]">
                For Rent
              </label>
            </div>
          </div>
          {errors.listingType && (
            <p className="text-red-500 text-[11px] leading-4 mt-1">
              {errors.listingType}
            </p>
          )}
        </div>

        {isLand && (
          <>
            <div className="flex items-center justify-between gap-6 mt-6">
              <FormField
                label="Plot Size"
                htmlFor="plotSize"
                error={errors.plotSize}
                className="flex-1"
              >
                <input
                  type="text"
                  id="plotSize"
                  value={formData.plotSize}
                  onChange={(e) => {
                    updateFormData({ plotSize: e.target.value });
                    if (errors.plotSize)
                      setErrors((prev) => ({ ...prev, plotSize: undefined }));
                  }}
                  className={`text-[14px] w-full rounded-lg h-[45px] border px-2 ${errors.plotSize ? "border-red-500" : "border-text-secondary"}`}
                  placeholder="e.g. 500"
                />
              </FormField>

              <FormField label="Unit" error={errors.plotUnit}>
                <Select
                  value={formData.plotUnit}
                  onValueChange={(val) => {
                    updateFormData({ plotUnit: val });
                    if (errors.plotUnit)
                      setErrors((prev) => ({ ...prev, plotUnit: undefined }));
                  }}
                >
                  <SelectTrigger
                    className={`addPropType ${errors.plotUnit ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">Sqm</SelectItem>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <FormField
              error={errors.landCondition}
              label="Land Condition"
              className="mt-6"
            >
              <Select
                value={formData.landCondition}
                onValueChange={(val) => {
                  updateFormData({ landCondition: val });
                  if (errors.landCondition)
                    setErrors((prev) => ({
                      ...prev,
                      landCondition: undefined,
                    }));
                }}
              >
                <SelectTrigger
                  className={`addPropType ${errors.landCondition ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Land Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bare land">Bare Land</SelectItem>
                  <SelectItem value="fenced land">Fenced</SelectItem>
                  <SelectItem value="land with structure">
                    Land with Structure
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              error={errors.landDocType}
              label="Document Title"
              className="mt-6"
            >
              <Select
                value={formData.landDocType}
                onValueChange={(val) => {
                  updateFormData({ landDocType: val });
                  if (errors.landDocType)
                    setErrors((prev) => ({
                      ...prev,
                      documentTitle: undefined,
                    }));
                }}
              >
                <SelectTrigger
                  className={`addPropType ${errors.landDocType ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Document Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Certificate of Ownership">
                    Certificate of Ownership
                  </SelectItem>
                  <SelectItem value="Governor's Consent">
                    Governor's Consent
                  </SelectItem>
                  <SelectItem value="Deed of Assignment">
                    Deed of Assignment
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </>
        )}

        <FormField
          label="Property Price"
          htmlFor="price"
          error={errors.price}
          className="mt-6"
        >
          <input
            type="text"
            id="price"
            value={formData.price}
            onChange={(e) => {
              updateFormData({ price: e.target.value });
              if (errors.price)
                setErrors((prev) => ({ ...prev, price: undefined }));
            }}
            className={`text-[14px] w-full rounded-lg h-[45px] border px-2 ${errors.price ? "border-red-500" : "border-text-secondary"}`}
            placeholder="Price ₦"
          />
        </FormField>

        <FormField
          label="Service Charge"
          htmlFor="serviceCharge"
          error={errors.serviceCharge}
          className="mt-6"
        >
          <input
            type="text"
            id="serviceCharge"
            value={formData.serviceCharge}
            onChange={(e) => {
              updateFormData({ serviceCharge: e.target.value });
              if (errors.serviceCharge)
                setErrors((prev) => ({ ...prev, serviceCharge: undefined }));
            }}
            className={`text-[14px] w-full rounded-lg h-[45px] border px-2 ${errors.serviceCharge ? "border-red-500" : "border-text-secondary"}`}
            placeholder="Service Charge ₦"
          />
        </FormField>

        <button
          type="submit"
          className="bg-button-bg flex items-center gap-2 h-[45px] px-2 rounded-lg mt-[37px] ml-auto cursor-pointer"
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
