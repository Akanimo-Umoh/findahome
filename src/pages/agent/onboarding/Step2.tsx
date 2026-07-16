import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type Step2Props = {
  onNext: () => void
  onBack: () => void
}

export default function Step2({ onNext, onBack }: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* business name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="businessName">Business Name</label>

          <input
            type="text"
            id="businessName"
            placeholder="Enter Business Name"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* license number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="licenseNum">License Number (Optional)</label>

          <input
            type="text"
            id="licenseNum"
            placeholder="Enter License Number"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* office address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="officeAddress">Office Address</label>

          <input
            type="text"
            id="officeAddress"
            placeholder="Enter Office Address"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* website or link */}
        <div className="flex flex-col gap-2">
          <label htmlFor="link">Website or social media link (Optional)</label>

          <input
            type="text"
            id="link"
            placeholder="Enter website or social media link"
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
          className="flex-1"
        >
          Next <ArrowRight />
        </Button>
      </div>
    </form>
  )
}
