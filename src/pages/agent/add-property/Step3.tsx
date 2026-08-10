import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import bedroomIcon from "@/assets/agentImages/icon-bedrooms.svg"
import bathroomIcon from "@/assets/agentImages/icon-bathrooms.svg"
import UploadImages from "./UploadImages"
import UploadDocuments from "./UploadDocuments"
import UploadVideo from "./UploadVideo"
import { toast } from "sonner"
import { useState } from "react"
import FormField from "./FormField"
import type { AddPropertyFormData } from "@/types/addProperty"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type Step3Props = {
  formData: AddPropertyFormData
  updateFormData: (fields: Partial<AddPropertyFormData>) => void
  onSubmit: () => Promise<void>
  onBack: () => void
  isSubmitting: boolean
  isEditMode?: boolean
  existingImages?: string[]
  existingLegalDocuments?: string[]
  existingVideo?: string | null
}

type Step3Errors = {
  bedrooms?: string
  bathrooms?: string
  apartmentDescription?: string
  images?: string
  legalDocuments?: string
  video?: string
}

export default function Step3({
  formData,
  updateFormData,
  onSubmit,
  onBack,
  isSubmitting,
  isEditMode = false,
  existingImages = [],
  existingLegalDocuments = [],
  existingVideo = null,
}: Step3Props) {
  const [errors, setErrors] = useState<Step3Errors>({})
  const isApartment = formData.propertyType === "apartment"

  const validate = (): boolean => {
    const newErrors: Step3Errors = {}

    if (isApartment) {
      if (!formData.bedrooms)
        newErrors.bedrooms = "Please select number of bedrooms"
      if (!formData.bathrooms)
        newErrors.bathrooms = "Please select number of bathrooms"
      if (!formData.apartmentDescription.trim())
        newErrors.apartmentDescription = "Description can't be empty"
    }

    // skip media requirements in edit mode until upload editing is wired up
    if (!isEditMode) {
      if (formData.images.length === 0)
        newErrors.images = "Please upload at least one photo"
      if (!isApartment && formData.legalDocuments.length === 0)
        newErrors.legalDocuments = "Please upload at least one legal document"
      if (!formData.video) newErrors.video = "Please upload a video tour"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error("Please fill in all required fields.")
      return
    }
    await onSubmit()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isApartment && (
          <>
            <p>Property Features</p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div className="w-full">
                <Select
                  value={formData.bedrooms}
                  onValueChange={(val) => {
                    updateFormData({ bedrooms: val })
                    if (errors.bedrooms)
                      setErrors((prev) => ({ ...prev, bedrooms: undefined }))
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
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                      (n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {errors.bedrooms && (
                  <p className="mt-1 text-[11px] leading-4 text-red-500">
                    {errors.bedrooms}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Select
                  value={formData.bathrooms}
                  onValueChange={(val) => {
                    updateFormData({ bathrooms: val })
                    if (errors.bathrooms)
                      setErrors((prev) => ({ ...prev, bathrooms: undefined }))
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
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                      (n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {errors.bathrooms && (
                  <p className="mt-1 text-[11px] leading-4 text-red-500">
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
                className={`h-25 rounded-xl border p-3 md:h-37.5 ${errors.apartmentDescription ? "border-red-500" : "border-text-disabled"}`}
              >
                <textarea
                  id="apartmentDescription"
                  value={formData.apartmentDescription}
                  onChange={(e) => {
                    updateFormData({ apartmentDescription: e.target.value })
                    if (errors.apartmentDescription)
                      setErrors((prev) => ({
                        ...prev,
                        apartmentDescription: undefined,
                      }))
                  }}
                  placeholder="Start typing..."
                  className="h-full w-full resize-none text-[12px] outline-none"
                />
              </div>
            </FormField>
          </>
        )}

        <div className="mt-6">
          <p>Upload Photos & Videos</p>

          {isEditMode ? (
            <div className="mx-4 mt-5 space-y-6">
              <div className="rounded-lg border border-dashed border-text-secondary bg-button-disabled p-4">
                <p className="text-[13px] font-semibold text-text-secondary">
                  Media can't be changed here yet
                </p>
                <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                  To update photos, documents, or the video, delete this listing
                  and create a new one. We're working on making this editable
                  directly.
                </p>
              </div>

              {existingImages.length > 0 && (
                <div>
                  <p className="mb-2 text-[13px] font-semibold">
                    Current Photos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {existingImages.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Property photo ${i + 1}`}
                        className="h-16 w-16 rounded-lg object-cover opacity-70"
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isApartment && existingLegalDocuments.length > 0 && (
                <div>
                  <p className="mb-2 text-[13px] font-semibold">
                    Current Legal Documents
                  </p>
                  <div className="flex flex-col gap-1">
                    {existingLegalDocuments.map((url, i) => (
                      <Link
                        key={i}
                        to={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="line-clamp-1 rounded-lg bg-bg-accent px-3 py-2 text-[12px] text-button-bg underline"
                      >
                        Document {i + 1}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {existingVideo && (
                <div>
                  <p className="mb-2 text-[13px] font-semibold">
                    Current Video
                  </p>
                  <video
                    src={existingVideo}
                    controls
                    className="h-40 w-full rounded-lg bg-black object-contain opacity-70"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="mx-4 mt-5">
              <div>
                <UploadImages
                  value={formData.images}
                  onChange={(files) => {
                    updateFormData({ images: files })
                    if (errors.images)
                      setErrors((prev) => ({ ...prev, images: undefined }))
                  }}
                />
                {errors.images && (
                  <p className="mt-1 text-[11px] leading-4 text-red-500">
                    {errors.images}
                  </p>
                )}
              </div>

              {!isApartment && (
                <div className="mt-12">
                  <UploadDocuments
                    value={formData.legalDocuments}
                    onChange={(files) => {
                      updateFormData({ legalDocuments: files })
                      if (errors.legalDocuments)
                        setErrors((prev) => ({
                          ...prev,
                          legalDocuments: undefined,
                        }))
                    }}
                  />
                  {errors.legalDocuments && (
                    <p className="mt-1 text-[11px] leading-4 text-red-500">
                      {errors.legalDocuments}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-12">
                <UploadVideo
                  value={formData.video}
                  onChange={(file) => {
                    updateFormData({ video: file })
                    if (errors.video)
                      setErrors((prev) => ({ ...prev, video: undefined }))
                  }}
                />
                {errors.video && (
                  <p className="mt-1 text-[11px] leading-4 text-red-500">
                    {errors.video}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-11 space-y-4">
          <Button
            variant="app-primary"
            size="full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isEditMode
                ? "Save Changes"
                : "Submit"}
          </Button>

          <Button
            variant="app-secondary"
            size="full"
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Previous
          </Button>

          {/* type for this is button for now until users can save as draft */}
          {/* <Button variant="app-secondary" size="full" type="button">
            Save as draft
          </Button> */}
        </div>
      </form>
    </div>
  )
}
