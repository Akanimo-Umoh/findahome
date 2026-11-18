import api from "@/services/api"
import type { AdminAd } from "@/types/adminAd"

export const getAdminAdList = async (): Promise<AdminAd[]> => {
  const { data } = await api.get("/ads")
  return data.data ?? []
}

export const setAdStatus = async (
  id: string,
  status: "active" | "paused",
  extra: { pauseReason?: string } = {}
) => {
  const { data } = await api.patch(`/ads/${id}`, { status, ...extra })
  return data
}

export const reviewAd = async (id: string, status: "approved" | "rejected") => {
  const { data } = await api.patch(`/ads/${id}/review`, { status })
  return data
}

export const removeAd = async (id: string) => {
  const { data } = await api.delete(`/ads/${id}`)
  return data
}
