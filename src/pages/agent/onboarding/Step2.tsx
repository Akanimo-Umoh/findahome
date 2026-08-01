import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { AgentProfileData } from "./AgentOnboarding"
import { useState } from "react"

type Step2Props = {
  data: AgentProfileData
  updateField: (field: keyof AgentProfileData, value: string) => void
  onNext: () => void
  onBack: () => void
}

const REQUIRED_FIELDS: ("businessName" | "officeAddress")[] = [
  "businessName",
  "officeAddress",
]

export default function Step2({
  data,
  updateField,
  onNext,
  onBack,
}: Step2Props) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof AgentProfileData, string>>
  >({})

  const isValid = REQUIRED_FIELDS.every((field) => data[field].trim() !== "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof AgentProfileData, string>> = {}
    REQUIRED_FIELDS.forEach((field) => {
      if (!data[field].trim()) newErrors[field] = "Can't be empty"
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* business name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="businessName">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            placeholder="Enter Business Name"
            value={data.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.businessName ? "border-red-500" : "border-text-disabled"}`}
          />

          {errors.businessName && (
            <p className="text-[12px] text-red-500">{errors.businessName}</p>
          )}
        </div>

        {/* license number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="licenseNum">License Number (Optional)</label>

          <input
            type="text"
            id="licenseNum"
            placeholder="Enter License Number"
            value={data.licenceNumber}
            onChange={(e) => updateField("licenceNumber", e.target.value)}
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* office address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="officeAddress">
            Office Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="officeAddress"
            placeholder="Enter Office Address"
            value={data.officeAddress}
            onChange={(e) => updateField("officeAddress", e.target.value)}
            className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.officeAddress ? "border-red-500" : "border-text-disabled"}`}
          />

          {errors.officeAddress && (
            <p className="text-[12px] text-red-500">{errors.officeAddress}</p>
          )}
        </div>

        {/* website or link */}
        <div className="flex flex-col gap-2">
          <label htmlFor="link">Website or social media link (Optional)</label>

          <input
            type="text"
            id="link"
            placeholder="Enter website or social media link"
            value={data.socialLinkOrWebsite}
            onChange={(e) => updateField("socialLinkOrWebsite", e.target.value)}
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="app-secondary"
          size="full"
          type="button"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft /> Back
        </Button>

        <Button
          variant="app-primary"
          size="full"
          type="submit"
          disabled={!isValid}
          className="flex-1"
        >
          Next <ArrowRight />
        </Button>
      </div>
    </form>
  )
}
