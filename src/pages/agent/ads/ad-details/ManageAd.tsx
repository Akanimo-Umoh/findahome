import pauseIcon from "@/assets/agentImages/icon-pause-ad.svg"
import editIcon from "@/assets/agentImages/icon-edit-ad.svg"
import extendIcon from "@/assets/agentImages/icon-magnifying-glass.svg"
import type { Ad } from "@/types/ad"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

type ManageAdProps = {
  ad: Ad
}

export default function ManageAd({ ad }: ManageAdProps) {
  const navigate = useNavigate()
  const [isPausing, setIsPausing] = useState(false)

  const handlePauseToggle = async () => {
    // TODO: no pause/resume endpoint exists yet — "paused" isn't even in the
    // status enum server-side. Wire this up once the backend supports it.
    toast.error("Pausing ads isn't available yet — check back soon.")
  }

  const handleEditBudget = () => {
    navigate(`/agent/edit-ad/${ad._id}`)
  }

  const handleExtend = () => {
    // TODO: no distinct "extend duration" flow defined yet — likely reuses
    // the edit-ad flow with duration pre-focused, pending product decision
    navigate(`/agent/edit-ad/${ad._id}`)
  }

  const pauseLabel = ad.status === "paused" ? "Resume Ad" : "Pause Ad"

  return (
    <div>
      <p>Manage Ad</p>

      <div className="mt-2 grid grid-cols-3 gap-5">
        <button
          type="button"
          onClick={handlePauseToggle}
          disabled={isPausing}
          className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3 disabled:opacity-50"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F8B400]">
            <img src={pauseIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            {pauseLabel}
          </p>
        </button>

        <button
          type="button"
          onClick={handleEditBudget}
          className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#149D18]">
            <img src={editIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Edit Budget
          </p>
        </button>

        <button
          type="button"
          onClick={handleExtend}
          className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#4F95FF]">
            <img src={extendIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Extend
          </p>
        </button>
      </div>
    </div>
  )
}
