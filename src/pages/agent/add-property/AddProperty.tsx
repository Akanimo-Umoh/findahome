import { useNavigate, useParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { useEffect, useState } from "react"
import SubmissionSuccessful from "./SubmissionSuccessful"
import type { AddPropertyFormData } from "@/types/addProperty"
import { useAddProperty } from "@/hooks/useAddProperty"
import { useEditProperty } from "@/hooks/useEditProperty"
import { useProperty } from "@/hooks/useProperties"
import Spinner from "@/components/Spinner"

const initialFormData: AddPropertyFormData = {
  propertyName: "",
  propertyType: "apartment",
  listingType: "sale",
  price: "",
  serviceCharge: "",
  plotSize: "",
  plotUnit: "",
  landCondition: "",
  landDocTitle: "",
  landType: "",
  state: "",
  city: "",
  landmarks: [""],
  description: "",
  bedrooms: "",
  bathrooms: "",
  apartmentDescription: "",
  images: [],
  legalDocuments: [],
  video: null,
}

export default function AddProperty() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = !!id

  const { addProperty, isSubmitting: isAdding } = useAddProperty()
  const { editProperty, isSubmitting: isEditing } = useEditProperty()
  const { property, loading: isLoadingProperty } = useProperty(id || "")

  const [currentStep, setCurrentStep] = useState(1)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [propertyId, setPropertyId] = useState<string | null>(null)
  const [formData, setFormData] = useState<AddPropertyFormData>(initialFormData)
  const [hasPrefilled, setHasPrefilled] = useState(false)

  const isSubmitting = isEditMode ? isEditing : isAdding

  // prefill form when editing, once property data arrives
  useEffect(() => {
    if (isEditMode && property && !hasPrefilled) {
      const isLand = property.propertyType === "land"

      setFormData({
        propertyName: property.title,
        propertyType: isLand ? "land" : "apartment",
        listingType: property.listingType as "sale" | "rent",
        price: String(property.price),
        serviceCharge: String(property.serviceCharge ?? ""),
        plotSize: isLand ? (property.landSize ?? "") : "",
        plotUnit: isLand ? (property.landUnit ?? "") : "",
        landCondition: isLand ? (property.landCondition ?? "") : "",
        landDocTitle: isLand ? (property.landDocTitle ?? "") : "",
        landType: isLand ? property.landType : "",
        state: property.address?.split(",")[1]?.trim() ?? "",
        city: property.address?.split(",")[0]?.trim() ?? "",
        landmarks: property.nearbyPlaces?.length ? property.nearbyPlaces : [""],
        description: isLand ? (property.description ?? "") : "",
        bedrooms: !isLand ? String(property.bedroom) : "",
        bathrooms: !isLand ? String(property.bathroom) : "",
        apartmentDescription: !isLand ? (property.description ?? "") : "",
        images: [],
        legalDocuments: [],
        video: null,
      })
      setHasPrefilled(true)
    }
  }, [isEditMode, property, hasPrefilled])

  const updateFormData = (fields: Partial<AddPropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (isEditMode && id) {
      const success = await editProperty(id, formData)
      if (success) navigate(`/agent/property-preview/${id}`)
      return
    }

    const newId = await addProperty(formData)
    if (newId) {
      setPropertyId(newId)
      setIsSuccessOpen(true)
    }
  }

  if (isEditMode && isLoadingProperty) {
    return <Spinner />
  }

  return (
    <div className="pb-10 text-text-primary md:pt-6 lg:pt-8">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={currentStep === 1 ? () => navigate(-1) : goToPrevStep}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
          {isEditMode ? "Edit Property" : "Add Property"}
        </p>

        {/* <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          Save Draft
        </button> */}
      </div>

      {/* progress for the steps (1 to 3) */}
      <div className="mt-6 md:flex md:flex-col md:items-center md:justify-center md:gap-4">
        <div className="mx-auto h-2.5 w-full max-w-[473px] overflow-hidden rounded-full bg-bg-accent md:h-2.5">
          <div
            className="h-full rounded-full bg-button-bg transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <p className="mt-2 text-center text-black">Step {currentStep} of 3</p>
      </div>

      <div className="mx-auto mt-6 max-w-137.5">
        <p className="text-center text-[14px] text-text-secondary md:text-[16px] md:font-semibold md:tracking-[1px]">
          {isEditMode
            ? "Update your listing details"
            : "Create a compelling listing to attract potential buyers"}
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
              isSubmitting={isSubmitting}
              isEditMode={isEditMode}
              existingImages={property?.images ?? []}
              existingLegalDocuments={property?.legalDocuments ?? []}
              existingVideo={property?.videos?.[0] ?? null}
            />
          )}
        </section>
      </div>

      {isSuccessOpen && propertyId && (
        <SubmissionSuccessful
          propertyId={propertyId}
          onDashboard={() => navigate("/agent/dashboard")}
        />
      )}
    </div>
  )
}
