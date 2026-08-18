import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import editIcon from "@/assets/agentImages/icon-edit-ad.svg"
import extendIcon from "@/assets/agentImages/icon-magnifying-glass.svg"
import rocketIcon from "@/assets/agentImages/icon-pause-ad.svg" // TODO: swap for a proper "launch" icon asset
import { payForAd } from "@/services/ad.service"
import type { Ad } from "@/types/ad"

type ManageAdProps = {
  ad: Ad
}

export default function ManageAd({ ad }: ManageAdProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isLaunching, setIsLaunching] = useState(false)

  const handleLaunch = async () => {
    setIsLaunching(true)
    try {
      await payForAd(ad._id)
      queryClient.invalidateQueries({ queryKey: ["ad", ad._id] })
      queryClient.invalidateQueries({ queryKey: ["agentAds"] })
      toast.success("Your ad is now live!")
    } catch (err) {
      toast.error(
        "Couldn't launch your ad. Please check your wallet balance and try again."
      )
      console.error("payForAd error:", err)
    } finally {
      setIsLaunching(false)
    }
  }

  const handleEditBudget = () => {
    navigate(`/agent/edit-ad/${ad._id}`)
  }

  const handleExtend = () => {
    navigate(`/agent/edit-ad/${ad._id}`)
  }

  if (ad.status === "pending") {
    return (
      <div>
        <p>Manage Ad</p>
        <button
          type="button"
          onClick={handleLaunch}
          disabled={isLaunching}
          className="button-style mt-2 h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white disabled:opacity-50"
        >
          {isLaunching ? "Launching..." : "Launch Ad"}
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>Manage Ad</p>

      <div className="mt-2 grid grid-cols-3 gap-5">
        <button
          type="button"
          onClick={() =>
            toast.error("Pausing ads isn't available yet — check back soon.")
          }
          className="manage-ad flex cursor-pointer flex-col items-center justify-center gap-1 bg-button-sec py-3"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F8B400]">
            <img src={rocketIcon} alt="" />
          </div>
          <p className="text-[12px] font-semibold text-text-secondary">
            {ad.status === "paused" ? "Resume Ad" : "Pause Ad"}
          </p>
        </button>

        <button
          type="button"
          onClick={handleEditBudget}
          className="manage-ad flex cursor-pointer flex-col items-center justify-center gap-1 bg-button-sec py-3"
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
          className="manage-ad flex cursor-pointer flex-col items-center justify-center gap-1 bg-button-sec py-3"
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
