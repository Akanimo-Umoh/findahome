import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import pauseIcon from "@/assets/agentImages/icon-pause-ad.svg"
import resumeIcon from "@/assets/agentImages/icon-resume-ad.svg"
import editIcon from "@/assets/agentImages/icon-edit-ad.svg"
import extendIcon from "@/assets/agentImages/icon-magnifying-glass.svg"
import { payForAd, updateAd } from "@/services/ad.service"
import type { Ad } from "@/types/ad"
import PauseAdDialog from "./PauseAdDialog"
import { Button } from "@/components/ui/button"

type ManageAdProps = {
  ad: Ad
}

// single shared button shape — change styling here once, it applies everywhere
function ManageAdActionButton({
  icon,
  iconBg,
  label,
  onClick,
  disabled = false,
}: {
  icon: string
  iconBg: string
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-bg-accent bg-button-sec px-4 py-3 text-left transition-colors hover:bg-bg-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <img src={icon} alt="" className="h-4 w-4" />
      </div>

      <p className="text-[14px] font-semibold text-text-primary">{label}</p>
    </button>
  )
}

export default function ManageAd({ ad }: ManageAdProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isLaunching, setIsLaunching] = useState(false)
  const [isTogglingPause, setIsTogglingPause] = useState(false)
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
      runPauseToggle("active")
    } else {
      setIsPauseDialogOpen(true)
    }
  }

  return (
    <div>
      <p>Manage Ad</p>

      <div className="mt-2 flex flex-col gap-3">
        {ad.status === "pending" && (
          <>
            <ManageAdActionButton
              icon={editIcon}
              iconBg="bg-[#149D18]"
              label="Edit Ad"
              onClick={() => navigate(`/agent/edit-ad/${ad._id}`)}
            />
            <Button
              variant="app-primary"
              size="full"
              type="button"
              onClick={handleLaunch}
              disabled={isLaunching}
            >
              {isLaunching ? "Launching..." : "Launch Ad"}
            </Button>
          </>
        )}

        {(ad.status === "active" || ad.status === "paused") && (
          <ManageAdActionButton
            icon={ad.status === "paused" ? resumeIcon : pauseIcon}
            iconBg={ad.status === "paused" ? "bg-[#149D18]" : "bg-[#F8B400]"}
            label={
              ad.status === "paused"
                ? isTogglingPause
                  ? "Resuming..."
                  : "Resume Ad"
                : "Pause Ad"
            }
            onClick={handlePauseButtonClick}
            disabled={isTogglingPause}
          />
        )}

        {ad.status === "completed" && (
          <ManageAdActionButton
            icon={extendIcon}
            iconBg="bg-[#4F95FF]"
            label="Extend Campaign"
            onClick={() => navigate(`/agent/edit-ad/${ad._id}`)}
          />
        )}
      </div>

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
