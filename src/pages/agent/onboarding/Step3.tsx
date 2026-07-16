import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import FileUpload from "./FileUpload"
import { ArrowLeft } from "lucide-react"

type Step3Props = {
  onBack: () => void
  onSuccess: () => void
}

export default function Step3({ onBack, onSuccess }: Step3Props) {
  const [governmentId, setGovernmentId] = useState<File | null>(null)
  const [businessReg, setBusinessReg] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ governmentId?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // validate required field
    if (!governmentId) {
      setErrors({ governmentId: "Government ID is required." })
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("governmentId", governmentId)
      if (businessReg) {
        formData.append("businessRegistration", businessReg)
      }

      // TODO: replace with real upload endpoint once backend is ready.
      // await uploadDocuments(formData)
      await new Promise((resolve) => setTimeout(resolve, 800))

      //   toast.success("Documents uploaded successfully.")
      onSuccess()
    } catch {
      toast.error("Upload failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        value={businessReg}
        onChange={setBusinessReg}
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
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
