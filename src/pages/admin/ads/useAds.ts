import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import {
  getAdminAdList,
  removeAd,
  setAdStatus,
} from "@/services/admin/ads.service"
import type { AdminAd } from "@/types/adminAd"

export const adsKey = ["admin", "ads"] as const

export function useAdminAds() {
  return useQuery({
    queryKey: adsKey,
    queryFn: getAdminAdList,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
}

export type AdAction = "approve" | "reject" | "pause" | "resume"

const PLAN = {
  approve: { status: "active", done: "Ad published" },
  reject: { status: "rejected", done: "Ad rejected" },
  pause: { status: "paused", done: "Ad paused" },
  resume: { status: "active", done: "Ad resumed" },
} as const

// Update the cached ad from what we just did, so the page never needs a refetch.
export function useAdAction() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      action,
      note,
    }: {
      id: string
      action: AdAction
      note?: string
    }) =>
      setAdStatus(
        id,
        PLAN[action].status,
        // "admin" marks a pause made by the admin; the agent app only checks for "budget", so it can't break it
        action === "pause"
          ? { pauseReason: "admin", adminNote: note }
          : { adminNote: note }
      ),
    onSuccess: (_res, { id, action, note }) => {
      qc.setQueryData<AdminAd[]>(adsKey, (old) =>
        old?.map((a) =>
          a._id === id
            ? {
                ...a,
                status: PLAN[action].status,
                adminNote: note ?? a.adminNote,
                pauseReason: action === "pause" ? "admin" : null,
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      )
      toast.success(PLAN[action].done)
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update the ad. Please try again.")
      ),
  })
}

export function useRemoveAd() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => removeAd(id),
    onSuccess: (_res, id) => {
      qc.setQueryData<AdminAd[]>(adsKey, (old) =>
        old?.filter((a) => a._id !== id)
      )
      toast.success("Ad removed")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't remove the ad. Please try again.")
      ),
  })
}
