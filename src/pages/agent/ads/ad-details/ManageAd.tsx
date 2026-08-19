import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import editIcon from "@/assets/agentImages/icon-edit-ad.svg"
import extendIcon from "@/assets/agentImages/icon-magnifying-glass.svg"
import pauseIcon from "@/assets/agentImages/icon-pause-ad.svg"
import { payForAd, updateAd } from "@/services/ad.service"
import type { Ad } from "@/types/ad"
import ExtendAdModal from "./ExtendAdModal"
import PauseAdDialog from "./PauseAdDialog"

type ManageAdProps = {
  ad: Ad
}

export default function ManageAd({ ad }: ManageAdProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isLaunching, setIsLaunching] = useState(false)
  const [isTogglingPause, setIsTogglingPause] = useState(false)
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false)
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false)

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

  const runPauseToggle = async (nextStatus: "active" | "paused") => {
    setIsTogglingPause(true)
    try {
      await updateAd(ad._id, {
        status: nextStatus,
        ...(nextStatus === "paused" ? { pauseReason: "manual" } : {}),
      })
      queryClient.invalidateQueries({ queryKey: ["ad", ad._id] })
      queryClient.invalidateQueries({ queryKey: ["agentAds"] })
      toast.success(nextStatus === "paused" ? "Ad paused" : "Ad resumed")
    } catch (err) {
      toast.error(
        nextStatus === "paused"
          ? "Failed to pause ad. Please try again."
          : "Failed to resume ad. Please try again."
      )
      console.error("pauseToggle error:", err)
    } finally {
      setIsTogglingPause(false)
      setIsPauseDialogOpen(false)
    }
  }

  const handlePauseButtonClick = () => {
    if (ad.status === "paused") {
      runPauseToggle("active") // resume — no confirmation needed
    } else {
      setIsPauseDialogOpen(true) // pause — confirm first
    }
  }

  const handleEditBudget = () => {
    if (ad.isPaid) {
      toast.error("This ad has already been paid for and can't be edited.")
      return
    }
    navigate(`/agent/edit-ad/${ad._id}`)
  }

  const handleExtend = () => {
    if (ad.isPaid) {
      toast.error("This ad has already been paid for and can't be extended.")
      return
    }
    setIsExtendModalOpen(true)
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
          onClick={handlePauseButtonClick}
          disabled={isTogglingPause}
          className="manage-ad flex cursor-pointer flex-col items-center justify-center gap-1 bg-button-sec py-3 disabled:opacity-50"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F8B400]">
            <img src={pauseIcon} alt="" />
          </div>
          <p className="text-[12px] font-semibold text-text-secondary">
            {ad.status === "paused"
              ? isTogglingPause
                ? "Resuming..."
                : "Resume Ad"
              : "Pause Ad"}
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

      <ExtendAdModal
        ad={ad}
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
      />

      <PauseAdDialog
        isOpen={isPauseDialogOpen}
        onClose={() => setIsPauseDialogOpen(false)}
        onConfirm={() => runPauseToggle("paused")}
        isPausing={isTogglingPause}
        propertyTitle={ad.property.title}
      />
    </div>
  )
}
