import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
// import SubmissionSuccessful from "./SubmissionSuccessful";

export type PropertyType = "apartment" | "land";
export type ListingType = "sale" | "rent";

export type AddPropertyFormData = {
  // Step 1
  propertyName: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: string;
  serviceCharge: string;
  // Land-only Step 1
  plotSize: string;
  plotUnit: string;
  landCondition: string;
  documentTitle: string;
  // Step 2
  state: string;
  city: string;
  landmarks: string[];
  // Land-only Step 2
  description: string;
  // Step 3 — Apartment-only
  bedrooms: string;
  bathrooms: string;
  apartmentDescription: string;
  // Step 3 — shared
  images: File[];
  documents: File[];
  video: File | null;
};

const initialFormData: AddPropertyFormData = {
  propertyName: "",
  propertyType: "apartment",
  listingType: "sale",
  price: "",
  serviceCharge: "",
  plotSize: "",
  plotUnit: "",
  landCondition: "",
  documentTitle: "",
  state: "",
  city: "",
  landmarks: [""],
  description: "",
  bedrooms: "",
  bathrooms: "",
  apartmentDescription: "",
  images: [],
  documents: [],
  video: null,
};

export default function AddProperty() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<AddPropertyFormData>(initialFormData);

  const updateFormData = (fields: Partial<AddPropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // basic fields
      formDataToSend.append("title", formData.propertyName);
      formDataToSend.append("propertyType", formData.propertyType);
      formDataToSend.append("listingType", formData.listingType); // now supported
      formDataToSend.append("inspectionFee", "5000");
      formDataToSend.append("serviceCharge", formData.serviceCharge);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("address", `${formData.city}, ${formData.state}`);

      // description
      const description =
        formData.propertyType === "apartment"
          ? formData.apartmentDescription
          : formData.description;
      formDataToSend.append("description", description);

      // nearby places
      formData.landmarks
        .filter((l) => l.trim())
        .forEach((landmark) => {
          formDataToSend.append("nearbyPlaces", landmark);
        });

      // land-only fields
      if (formData.propertyType === "land") {
        formDataToSend.append("landSize", formData.plotSize); // CHANGED: landType → landSize
        formDataToSend.append("landUnit", formData.plotUnit);
        formDataToSend.append("landCondition", formData.landCondition);
        formDataToSend.append("landDocTitle", formData.documentTitle);

        // land documents
        formData.documents.forEach((file) => {
          formDataToSend.append("landDocuments", file);
        });
      }

      // apartment-only fields
      if (formData.propertyType === "apartment") {
        formDataToSend.append("bedroom", formData.bedrooms);
        formDataToSend.append("bathroom", formData.bathrooms);

        // TEMP: satisfy backend required fields until BE makes them optional
        formDataToSend.append("landSize", "");
        formDataToSend.append("landUnit", "");
        formDataToSend.append("landCondition", "");
        formDataToSend.append("landDocTitle", "");
      }

      // images
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // video
      if (formData.video) {
        formDataToSend.append("videos", formData.video);
      }

      // add this just before the api.post() call
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      // CHANGED: updated endpoint
      const response = await api.post("/property", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Property listed successfully!");
        navigate("/agent/my-listings");
      }
    } catch (err) {
      toast.error("Failed to create property. Please try again.");
      console.error("createProperty error:", err);
    }
  };

  return (
    <div className="text-text-primary mb-10 px-6 md:mt-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button
          onClick={currentStep === 1 ? () => navigate(-1) : goToPrevStep}
          className="absolute left-0"
        >
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px] md:font-medium md:text-[28px]">
          Add Property
        </p>

        {/* <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          Save Draft
        </button> */}
      </div>

      {/* progress for the steps (1 to 3) */}
      <div className="mt-6 md:flex md:items-center md:justify-center md:flex-col md:gap-4">
        <div className="w-full h-1.5 bg-bg-accent rounded-full overflow-hidden max-w-[473px] mx-auto md:h-2.5">
          <div
            className="h-full bg-button-bg rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        <p className="text-black text-center mt-2">Step {currentStep} of 3</p>
      </div>

      <p className="text-[14px] text-text-secondary text-center mt-6 md:text-[16px] md:font-semibold md:tracking-[1px]">
        Create a compelling listing to attract potential buyers
      </p>

      {/* form for step 1 */}
      <section className="mt-6">
        {currentStep === 1 && (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        )}
      </section>

      {/* form for step 2 */}
      <section className="mt-6">
        {currentStep === 2 && (
          <Step2
            formData={formData}
            updateFormData={updateFormData}
            onNext={goToNextStep}
          />
        )}
      </section>

      {/* form for step 3 */}
      <section className="mt-6">
        {currentStep === 3 && (
          <Step3
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
          />
        )}
      </section>
    </div>
  );
}
