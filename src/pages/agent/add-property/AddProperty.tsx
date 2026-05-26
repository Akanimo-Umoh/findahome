import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { useState } from "react"
import { toast } from "sonner"
import api from "@/services/api"
import SubmissionSuccessful from "./SubmissionSuccessful"
// import SubmissionSuccessful from "./SubmissionSuccessful";

export type PropertyType = "apartment" | "land"
export type ListingType = "sale" | "rent"

export type AddPropertyFormData = {
  // Step 1
  propertyName: string
  propertyType: PropertyType
  listingType: ListingType
  price: string
  serviceCharge: string
  // Land-only Step 1
  plotSize: string
  plotUnit: string
  landCondition: string
  landDocType: string
  // Step 2
  state: string
  city: string
  landmarks: string[]
  // Land-only Step 2
  description: string
  // Step 3 — Apartment-only
  bedrooms: string
  bathrooms: string
  apartmentDescription: string
  // Step 3 — shared
  images: File[]
  documents: File[]
  video: File | null
}

const initialFormData: AddPropertyFormData = {
  propertyName: "",
  propertyType: "apartment",
  listingType: "sale",
  price: "",
  serviceCharge: "",
  plotSize: "",
  plotUnit: "",
  landCondition: "",
  landDocType: "",
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
}

export default function AddProperty() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [propertyId, setPropertyId] = useState<string | null>(null)
  const [formData, setFormData] = useState<AddPropertyFormData>(initialFormData)

  const updateFormData = (fields: Partial<AddPropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData()

      // basic fields
      formDataToSend.append("title", formData.propertyName)
      formDataToSend.append("propertyType", formData.propertyType)
      formDataToSend.append("listingType", formData.listingType) // now supported
      formDataToSend.append("inspectionFee", "5000")
      formDataToSend.append("serviceCharge", formData.serviceCharge)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("address", `${formData.city}, ${formData.state}`)

      // description
      const description =
        formData.propertyType === "apartment"
          ? formData.apartmentDescription
          : formData.description
      formDataToSend.append("description", description)

      // nearby places
      formData.landmarks
        .filter((l) => l.trim())
        .forEach((landmark) => {
          formDataToSend.append("nearbyPlaces", landmark)
        })

      // land-only fields
      if (formData.propertyType === "land") {
        formDataToSend.append("landSize", formData.plotSize) // CHANGED: landType → landSize
        formDataToSend.append("landUnit", formData.plotUnit)
        formDataToSend.append("landCondition", formData.landCondition)
        formDataToSend.append("landDocType", formData.landDocType)

        // land documents
        formData.documents.forEach((file) => {
          formDataToSend.append("landDocuments", file)
        })
      }

      // apartment-only fields
      if (formData.propertyType === "apartment") {
        formDataToSend.append("bedroom", formData.bedrooms)
        formDataToSend.append("bathroom", formData.bathrooms)
      }

      // images
      formData.images.forEach((file) => {
        formDataToSend.append("images", file)
      })

      // video
      if (formData.video) {
        formDataToSend.append("videos", formData.video)
      }

      // add this just before the api.post() call
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value)
      }
      // CHANGED: updated endpoint
      const response = await api.post("/property", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (response.data.success) {
        setPropertyId(response.data.property._id)
        setIsSuccessOpen(true)
        // toast.success("Property listed successfully!");
        // navigate("/agent/my-listings");
      }
    } catch (err) {
      toast.error("Failed to create property. Please try again.")
      console.error("createProperty error:", err)
    }
  }

  return (
    <div className="mb-10 px-6 text-text-primary md:mt-6">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={currentStep === 1 ? () => navigate(-1) : goToPrevStep}
          className="absolute left-0"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[28px] md:font-medium">
          Add Property
        </p>

        {/* <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          Save Draft
        </button> */}
      </div>

      {/* progress for the steps (1 to 3) */}
      <div className="mt-6 md:flex md:flex-col md:items-center md:justify-center md:gap-4">
        <div className="mx-auto h-1.5 w-full max-w-[473px] overflow-hidden rounded-full bg-bg-accent md:h-2.5">
          <div
            className="h-full rounded-full bg-button-bg transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-center text-black">Step {currentStep} of 3</p>
      </div>

      <p className="mt-6 text-center text-[14px] text-text-secondary md:text-[16px] md:font-semibold md:tracking-[1px]">
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

      {isSuccessOpen && propertyId && (
        <SubmissionSuccessful
          propertyId={propertyId}
          onDashboard={() => navigate("/agent/dashboard")}
        />
      )}
    </div>
  )
}
