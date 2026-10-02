import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import FileUpload from "./FileUpload"
import { ArrowLeft } from "lucide-react"
import { AxiosError } from "axios"

type Step3Props = {
  governmentId: File | null
  licenseDoc: File | null
  setGovernmentId: (file: File | null) => void
  setLicenseDoc: (file: File | null) => void
  onBack: () => void
  onSubmit: () => Promise<void>
}

export default function Step3({
  governmentId,
  licenseDoc,
  setGovernmentId,
  setLicenseDoc,
  onBack,
  onSubmit,
}: Step3Props) {
  const [errors, setErrors] = useState<{ governmentId?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = governmentId !== null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!governmentId) {
      setErrors({ governmentId: "Can't be empty" })
      return
    }
    setErrors({})
    setIsSubmitting(true)
    try {
      await onSubmit()
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            "Submission failed. Please try again."
          : "Submission failed. Please try again."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 md:rounded-2xl md:bg-gray-50 md:p-8 md:shadow-sm"
    >
      <FileUpload
        id="governmentId"
        label="Government ID"
        hint="E.g drivers license, National ID"
        value={governmentId}
        onChange={(file) => {
          setGovernmentId(file)
          if (file) setErrors((prev) => ({ ...prev, governmentId: undefined }))
        }}
        error={errors.governmentId}
      />

      <FileUpload
        id="businessRegistration"
        label="Proof of Agency/Business Registration"
        hint="E.g Business License, Certificate of incorporation"
        optional
        value={licenseDoc}
        onChange={setLicenseDoc}
      />

      <div className="mt-2 flex gap-3">
        <Button
          variant="app-secondary"
          size="full"
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1"
        >
          <ArrowLeft /> Back
        </Button>

        <Button
          type="submit"
          variant="app-primary"
          size="full"
          disabled={isSubmitting || !isValid}
          className="flex-1"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
