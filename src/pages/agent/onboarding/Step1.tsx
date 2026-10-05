import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { AgentProfileData } from "./AgentOnboarding"
import { useState } from "react"
import TagInput from "./TagInput"

type Step1Props = {
  data: AgentProfileData
  updateField: (
    field:
      | "about"
      | "yearsOfExperience"
      | "businessName"
      | "licenceNumber"
      | "officeAddress"
      | "socialLinkOrWebsite",
    value: string
  ) => void
  updateArrayField: (
    field: "serviceArea" | "languages",
    values: string[]
  ) => void
  onNext: () => void
}

const REQUIRED_STRING_FIELDS: ("about" | "yearsOfExperience")[] = [
  "about",
  "yearsOfExperience",
]

export default function Step1({
  data,
  updateField,
  updateArrayField,
  onNext,
}: Step1Props) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof AgentProfileData, string>>
  >({})

  const isValid =
    data.about.trim() !== "" &&
    data.yearsOfExperience.trim() !== "" &&
    data.serviceArea.length > 0 &&
    data.languages.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof AgentProfileData, string>> = {}
    REQUIRED_STRING_FIELDS.forEach((field) => {
      if (!data[field].trim()) newErrors[field] = "Can't be empty"
    })
    if (!data.serviceArea.length) newErrors.serviceArea = "Can't be empty"
    if (!data.languages.length) newErrors.languages = "Can't be empty"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:rounded-2xl md:bg-gray-50 md:p-8 md:shadow-sm"
    >
      <div className="space-y-4">
        {/* about me */}
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutMe">
            About me <span className="text-red-500">*</span>
          </label>

          <textarea
            id="aboutMe"
            rows={4}
            placeholder="Enter here"
            value={data.about}
            onChange={(e) => updateField("about", e.target.value)}
            className={`w-full rounded-xl border bg-white px-2 py-3 text-[14px] outline-none ${errors.about ? "border-red-500" : "border-text-disabled"}`}
          />

          {errors.about && (
            <p className="text-[12px] text-red-500">{errors.about}</p>
          )}
        </div>

        {/* experience */}
        <div className="flex flex-col gap-2">
          <label htmlFor="experience">
            Years of experience <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="experience"
            placeholder="Enter here"
            value={data.yearsOfExperience}
            onChange={(e) => updateField("yearsOfExperience", e.target.value)}
            className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.yearsOfExperience ? "border-red-500" : "border-text-disabled"}`}
          />

          {errors.yearsOfExperience && (
            <p className="text-[12px] text-red-500">
              {errors.yearsOfExperience}
            </p>
          )}
        </div>

        {/* service areas */}
        <div className="flex flex-col gap-2">
          <label htmlFor="service">
            Service areas <span className="text-red-500">*</span>
          </label>

          <TagInput
            id="service"
            values={data.serviceArea}
            onChange={(values) => updateArrayField("serviceArea", values)}
            placeholder="Type an area and press Enter"
            error={errors.serviceArea}
          />
        </div>

        {/* languages */}
        <div className="flex flex-col gap-2">
          <label htmlFor="languages">
            Languages <span className="text-red-500">*</span>
          </label>

          <TagInput
            id="languages"
            values={data.languages}
            onChange={(values) => updateArrayField("languages", values)}
            placeholder="Type a language and press Enter"
            error={errors.languages}
          />
        </div>
      </div>

      <Button
        variant="app-primary"
        size="full"
        className="mt-6 disabled:bg-button-bg disabled:text-white disabled:opacity-50"
        type="submit"
        disabled={!isValid}
      >
        Next <ArrowRight />
      </Button>
    </form>
  )
}
