import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { AgentListing } from "@/hooks/useAgentListings"
import PropertySelectorModal from "./PropertySelectorModal"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"

export default function CreateAd() {
  const navigate = useNavigate()
  const [selectedObjective, setSelectedObjective] = useState<number | null>(
    null
  )
  const [selectedProperty, setSelectedProperty] = useState<AgentListing | null>(
    null
  )
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false)

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
      <header className="">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">Create Ad</p>
        </div>
      </header>

      <main className="mt-6">
        {/* step 1 */}
        <div className="">
          <p className="">Step 1: Select Property</p>

          <div className="mt-2">
            {selectedProperty ? (
              <button
                type="button"
                onClick={() => setIsPropertyModalOpen(true)}
                className="flex w-full items-center gap-3 rounded-lg border border-bg-accent px-2 py-2 text-left"
              >
                {selectedProperty.images?.[0] ? (
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-bg-accent" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-[13px] font-semibold">
                    {selectedProperty.title}
                  </p>
                  <p className="flex items-center text-[12px] font-semibold text-button-bg">
                    <img src={nairaIcon} alt="" className="h-3 w-3" />
                    {selectedProperty.price.toLocaleString()}
                  </p>
                </div>

                <span className="shrink-0 text-[12px] font-semibold text-button-bg underline">
                  Change
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsPropertyModalOpen(true)}
                className="w-full cursor-pointer rounded-lg border border-dashed border-text-secondary px-2 py-4 text-[14px]"
              >
                Select Property
              </button>
            )}
          </div>
        </div>

        {/* step 2 */}
        <div className="mt-8">
          <Step2
            selectedObjective={selectedObjective}
            onSelect={setSelectedObjective}
          />
        </div>

        {/* step 3 */}
        <div className="mt-8">
          <Step3 />
        </div>

        {/* buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <Button variant="app-primary" size="full">
            Create Ad
          </Button>

          <Button variant="app-secondary" size="full">
            Preview Ad
          </Button>
        </div>
      </main>

      <PropertySelectorModal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
        onSelect={setSelectedProperty}
      />
    </div>
  )
}
