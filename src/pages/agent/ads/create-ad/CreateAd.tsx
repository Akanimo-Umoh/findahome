import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { AgentListing } from "@/hooks/useAgentListings"
import PropertySelectorModal from "./PropertySelectorModal"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import type { AdObjective } from "@/types/ad"
import { useAdDraft } from "@/hooks/useAdDraft"
import { toast } from "sonner"

const OBJECTIVE_MAP: Record<number, AdObjective> = {
  1: "views",
  2: "leads",
  3: "sales",
}

export default function CreateAd() {
  const navigate = useNavigate()
  const { draft, updateDraft } = useAdDraft()
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false)

  const selectedObjectiveId = Object.entries(OBJECTIVE_MAP).find(
    ([, v]) => v === draft.objective
  )?.[0]
  const selectedObjective = selectedObjectiveId
    ? Number(selectedObjectiveId)
    : null

  const handleSelectProperty = (property: AgentListing) => {
    updateDraft({
      propertyId: property._id,
      propertyTitle: property.title,
      propertyImage: property.images?.[0] ?? null,
      propertyPrice: property.price,
    })
  }

  const handleSelectObjective = (id: number) => {
    updateDraft({ objective: OBJECTIVE_MAP[id] })
  }

  const validateDraft = () => {
    if (!draft.propertyId) {
      toast.error("Please select a property")
      return false
    }
    if (!draft.objective) {
      toast.error("Please choose a campaign objective")
      return false
    }
    return true
  }

  const handleCreateAd = () => {
    if (!validateDraft()) return
    navigate("/agent/ad-payment-summary")
  }

  const handlePreview = () => {
    if (!validateDraft()) return
    navigate("/agent/ad-preview")
  }

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
      <header className="">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>
          <p className="font-raleway text-[18px] font-semibold">Create Ad</p>
        </div>
      </header>

      <main className="mt-6">
        <div className="">
          <p className="">Step 1: Select Property</p>

          <div className="mt-2">
            {draft.propertyId ? (
              <button
                type="button"
                onClick={() => setIsPropertyModalOpen(true)}
                className="flex w-full items-center gap-3 rounded-lg border border-bg-accent px-2 py-2 text-left"
              >
                <img
                  src={draft.propertyImage ?? undefined}
                  alt={draft.propertyTitle}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-[13px] font-semibold">
                    {draft.propertyTitle}
                  </p>
                  <p className="flex items-center text-[12px] font-semibold text-button-bg">
                    <img src={nairaIcon} alt="" className="h-3 w-3" />
                    {draft.propertyPrice.toLocaleString()}
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

        <div className="mt-8">
          <Step2
            selectedObjective={selectedObjective}
            onSelect={handleSelectObjective}
          />
        </div>

        <div className="mt-8">
          <Step3
            dailyBudget={draft.dailyBudget}
            duration={draft.duration}
            onChangeDailyBudget={(v) => updateDraft({ dailyBudget: v })}
            onChangeDuration={(v) => updateDraft({ duration: v })}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button variant="app-primary" size="full" onClick={handleCreateAd}>
            Create Ad
          </Button>
          <Button variant="app-secondary" size="full" onClick={handlePreview}>
            Ad Preview
          </Button>
        </div>
      </main>

      <PropertySelectorModal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
        onSelect={handleSelectProperty}
      />
    </div>
  )
}
