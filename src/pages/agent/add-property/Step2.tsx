import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import rightIcon from "@/assets/agentImages/icon-right-arrow.svg"
import addIcon from "@/assets/agentImages/icon-add-landmarks.svg"
import { nigerianStates } from "@/types/nigerianStates"
import FormField from "./FormField"
import { useState } from "react"
import type { AddPropertyFormData } from "@/types/addProperty"
import { Button } from "@/components/ui/button"

type Step2Props = {
  formData: AddPropertyFormData
  updateFormData: (fields: Partial<AddPropertyFormData>) => void
  onNext: () => void
}

type Step2Errors = {
  state?: string
  city?: string
  description?: string
}

export default function Step2({
  formData,
  updateFormData,
  onNext,
}: Step2Props) {
  const [errors, setErrors] = useState<Step2Errors>({})
  const isApartment = formData.propertyType === "apartment"

  const validate = (): boolean => {
    const newErrors: Step2Errors = {}

    if (!formData.state) newErrors.state = "Please select a state"
    if (!formData.city.trim()) newErrors.city = "City can't be empty"
    if (!isApartment && !formData.description.trim())
      newErrors.description = "Description can't be empty"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLandmarkChange = (index: number, value: string) => {
    const updated = [...formData.landmarks]
    updated[index] = value
    updateFormData({ landmarks: updated })
  }

  const addLandmark = () => {
    updateFormData({ landmarks: [...formData.landmarks, ""] })
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (validate()) onNext()
        }}
      >
        <p className="md:text-[18px]">Location Info</p>

        <FormField label="State" error={errors.state} className="mt-2 md:mt-4">
          <Select
            value={formData.state}
            onValueChange={(val) => {
              updateFormData({ state: val })
              if (errors.state)
                setErrors((prev) => ({ ...prev, state: undefined }))
            }}
          >
            <SelectTrigger
              className={`addPropType ${errors.state ? "border-red-500" : ""}`}
            >
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
        </FormField>

        <FormField
          label="City"
          htmlFor="city"
          error={errors.city}
          className="mt-4"
        >
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => {
              updateFormData({ city: e.target.value })
              if (errors.city)
                setErrors((prev) => ({ ...prev, city: undefined }))
            }}
            className={`h-[45px] w-full rounded-lg border px-2 text-[14px] ${errors.city ? "border-red-500" : "border-text-secondary"}`}
            placeholder="e.g, Ikoyi, Garki, etc"
          />
        </FormField>

        <div className="mt-4 flex flex-col gap-1">
          <label className="app-property-label">Nearest Landmarks</label>
          {formData.landmarks.map((landmark, index) => (
            <input
              key={index}
              type="text"
              value={landmark}
              onChange={(e) => handleLandmarkChange(index, e.target.value)}
              className="mt-1 h-[45px] w-full rounded-lg border border-text-secondary px-2 text-[14px]"
              placeholder="e.g, 5 mins to Silverbird cinema"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addLandmark}
          className="mt-4 flex h-[45px] items-center justify-center gap-2 rounded-lg border border-bg-accent bg-button-disabled px-2"
        >
          <img src={addIcon} alt="" />
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
            Add more landmarks
          </p>
        </button>

        {!isApartment && (
          <FormField
            label="Description"
            htmlFor="description"
            error={errors.description}
            className="mt-6"
          >
            <div
              className={`h-25 rounded-xl border p-3 md:h-37.5 ${errors.description ? "border-red-500" : "border-text-disabled"}`}
            >
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => {
                  updateFormData({ description: e.target.value })
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: undefined }))
                }}
                placeholder="Start typing..."
                className="h-full w-full resize-none text-[12px] outline-none"
              />
            </div>
          </FormField>
        )}

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
