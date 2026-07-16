import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type React from "react"

type Step1Props = {
  onNext: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* about me */}
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutMe">About me</label>

          <textarea
            name=""
            id="aboutMe"
            rows={4}
            placeholder="Enter here"
            className="w-full rounded-xl border border-text-disabled bg-white px-2 py-3 text-[14px] outline-none"
          />
        </div>

        {/* experience */}
        <div className="flex flex-col gap-2">
          <label htmlFor="experience">Years of experience</label>

          <input
            type="text"
            id="experience"
            placeholder="Enter here"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* service areas */}
        <div className="flex flex-col gap-2">
          <label htmlFor="service">Service areas</label>

          <input
            type="text"
            id="service"
            placeholder="Enter here"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>

        {/* languages */}
        <div className="flex flex-col gap-2">
          <label htmlFor="languages">Languages</label>

          <input
            type="text"
            id="languages"
            placeholder="Enter here"
            className="h-11.25 w-full rounded-xl border border-text-disabled bg-white px-2 text-[14px] outline-none"
          />
        </div>
      </div>

      <Button variant="app-primary" size="full" className="mt-6" type="submit">
        Next <ArrowRight />
      </Button>
    </form>
  )
}
