import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Spinner from "@/components/Spinner"
import { useAd } from "@/hooks/useAd"
import { updateAd } from "@/services/ad.service"
import type { AdObjective } from "@/types/ad"
import Step2 from "../create-ad/Step2"
import Step3 from "../create-ad/Step3"
import { useQueryClient } from "@tanstack/react-query"

const OBJECTIVE_MAP: Record<number, AdObjective> = {
  1: "views",
  2: "leads",
  3: "sales",
}

export default function EditAd() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { ad, isLoading, error } = useAd(id ?? "")

  const [objective, setObjective] = useState<AdObjective | null>(null)
  const [dailyBudget, setDailyBudget] = useState(3000)
  const [duration, setDuration] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasPrefilled, setHasPrefilled] = useState(false)

  useEffect(() => {
    if (ad && !hasPrefilled) {
      setObjective(ad.objective)
      setDailyBudget(ad.dailyBudget)
      setDuration(ad.duration)
      setHasPrefilled(true)
    }
  }, [ad, hasPrefilled])

  if (isLoading) return <Spinner />

  if (error || !ad) {
    return (
      <div className="flex min-h-screen items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            {error ?? "Ad not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  // paid ads can't be edited — bounce back to details with an explanation
  if (ad.isPaid) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center font-ssPro">
        <div>
          <p className="text-[14px] text-text-secondary">
            This ad has already been paid for and can't be edited.
          </p>
          <button
            onClick={() =>
              navigate(`/agent/ad-details/${ad._id}`, { replace: true })
            }
            className="mt-4 text-[#274AD0] underline"
          >
            Back to ad details
          </button>
        </div>
      </div>
    )
  }

  const selectedObjectiveId = Object.entries(OBJECTIVE_MAP).find(
    ([, v]) => v === objective
  )?.[0]
  const selectedObjective = selectedObjectiveId
    ? Number(selectedObjectiveId)
    : null

  const handleSave = async () => {
    if (!objective) {
      toast.error("Please choose a campaign objective")
      return
    }

    setIsSubmitting(true)
    try {
      await updateAd(ad._id, {
        objective,
        dailyBudget,
        duration,
        adBudget: dailyBudget * duration,
      })
      queryClient.invalidateQueries({ queryKey: ["ad", ad._id] })
      queryClient.invalidateQueries({ queryKey: ["agentAds"] })
      toast.success("Ad updated successfully")
      navigate(`/agent/ad-details/${ad._id}`, { replace: true })
    } catch (err) {
      toast.error("Failed to update ad. Please try again.")
      console.error("updateAd error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
      <header>
        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={goBack} alt="" />
          </button>
          <p className="font-raleway text-[18px] font-semibold">Edit Ad</p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <Step2
            selectedObjective={selectedObjective}
            onSelect={(idNum) => setObjective(OBJECTIVE_MAP[idNum])}
          />
        </div>

        <div className="mt-8">
          <Step3
            dailyBudget={dailyBudget}
            duration={duration}
            onChangeDailyBudget={setDailyBudget}
            onChangeDuration={setDuration}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button
            variant="app-primary"
            size="full"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  )
}
