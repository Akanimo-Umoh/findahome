import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg"
import FormField from "./FormField"
import { useState } from "react"
import type {
  AddPropertyFormData,
  ListingType,
  PropertyType,
} from "@/types/addProperty"
import { Button } from "@/components/ui/button"

type Step1Props = {
  formData: AddPropertyFormData
  updateFormData: (fields: Partial<AddPropertyFormData>) => void
  onNext: () => void
}

type Step1Errors = {
  propertyName?: string
  propertyType?: string
  listingType?: string
  plotSize?: string
  plotUnit?: string
  landCondition?: string
  landDocType?: string
  price?: string
  serviceCharge?: string
  landType?: string
}

export default function Step1({
  formData,
  updateFormData,
  onNext,
}: Step1Props) {
  const [errors, setErrors] = useState<Step1Errors>({})
  const isLand = formData.propertyType === "land"

  const validate = (): boolean => {
    const newErrors: Step1Errors = {}

    if (!formData.propertyName.trim())
      newErrors.propertyName = "Property name can't be empty"
    if (!formData.propertyType)
      newErrors.propertyType = "Please select a property type"
    if (!formData.listingType)
      newErrors.listingType = "Please select a listing type"
    if (!formData.price.trim()) newErrors.price = "Price can't be empty"
    if (!formData.serviceCharge.trim())
      newErrors.serviceCharge = "Service charge can't be empty"

    if (isLand) {
      if (!formData.plotSize.trim())
        newErrors.plotSize = "Plot size can't be empty"
      if (!formData.plotUnit) newErrors.plotUnit = "Please select a unit"
      if (!formData.landCondition)
        newErrors.landCondition = "Please select land condition"
      if (!formData.landDocType)
        newErrors.landDocType = "Please select document title"
      if (!formData.landType) newErrors.landType = "Please select a land type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleNext()
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
              updateFormData({ propertyName: e.target.value })
              if (errors.propertyName)
                setErrors((prev) => ({ ...prev, propertyName: undefined }))
            }}
            className={`h-[45px] w-full rounded-lg border px-2 text-[14px] ${errors.propertyName ? "border-red-500" : "border-text-secondary"}`}
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
              updateFormData({ propertyType: val as PropertyType })
              if (errors.propertyType)
                setErrors((prev) => ({ ...prev, propertyType: undefined }))
            }}
          >
            <SelectTrigger
              className={`addPropType cursor-pointer ${errors.propertyType ? "border-red-500" : ""}`}
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
          <div className="mt-3 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="listingType"
                id="sale"
                checked={formData.listingType === "sale"}
                onChange={() => {
                  updateFormData({ listingType: "sale" as ListingType })
                  if (errors.listingType)
                    setErrors((prev) => ({ ...prev, listingType: undefined }))
                }}
                className="h-5 w-5"
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
                  updateFormData({ listingType: "rent" as ListingType })
                  if (errors.listingType)
                    setErrors((prev) => ({ ...prev, listingType: undefined }))
                }}
                className="h-5 w-5"
              />
              <label htmlFor="rent" className="text-[14px]">
                For Rent
              </label>
            </div>
          </div>
          {errors.listingType && (
            <p className="mt-1 text-[11px] leading-4 text-red-500">
              {errors.listingType}
            </p>
          )}
        </div>

        {isLand && (
          <>
            <FormField
              label="Land Type"
              error={errors.landType}
              className="mt-6"
            >
              <Select
                value={formData.landType}
                onValueChange={(val) => {
                  updateFormData({ landType: val })
                  if (errors.landType)
                    setErrors((prev) => ({ ...prev, landType: undefined }))
                }}
              >
                <SelectTrigger
                  className={`addPropType cursor-pointer ${errors.landType ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Land Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="mt-6 flex items-center justify-between gap-6">
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
                    updateFormData({ plotSize: e.target.value })
                    if (errors.plotSize)
                      setErrors((prev) => ({ ...prev, plotSize: undefined }))
                  }}
                  className={`h-[45px] w-full rounded-lg border px-2 text-[14px] ${errors.plotSize ? "border-red-500" : "border-text-secondary"}`}
                  placeholder="e.g. 500"
                />
              </FormField>

              <FormField label="Unit" error={errors.plotUnit}>
                <Select
                  value={formData.plotUnit}
                  onValueChange={(val) => {
                    updateFormData({ plotUnit: val })
                    if (errors.plotUnit)
                      setErrors((prev) => ({ ...prev, plotUnit: undefined }))
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
                  updateFormData({ landCondition: val })
                  if (errors.landCondition)
                    setErrors((prev) => ({
                      ...prev,
                      landCondition: undefined,
                    }))
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
                  updateFormData({ landDocType: val })
                  if (errors.landDocType)
                    setErrors((prev) => ({
                      ...prev,
                      landDocType: undefined,
                    }))
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
              updateFormData({ price: e.target.value })
              if (errors.price)
                setErrors((prev) => ({ ...prev, price: undefined }))
            }}
            className={`h-[45px] w-full rounded-lg border px-2 text-[14px] ${errors.price ? "border-red-500" : "border-text-secondary"}`}
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
              updateFormData({ serviceCharge: e.target.value })
              if (errors.serviceCharge)
                setErrors((prev) => ({ ...prev, serviceCharge: undefined }))
            }}
            className={`h-[45px] w-full rounded-lg border px-2 text-[14px] ${errors.serviceCharge ? "border-red-500" : "border-text-secondary"}`}
            placeholder="Service Charge ₦"
          />
        </FormField>

        <Button
          variant="app-primary"
          size="full"
          type="submit"
          className="mt-6 ml-auto flex w-35 items-center justify-center gap-2"
        >
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white md:text-[16px]">
            Next
          </p>

          <img src={rightIcon} alt="" />
        </Button>
      </form>
    </div>
  )
}
