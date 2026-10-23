import api from "@/services/api"
import type { AdminAd } from "@/types/adminAd"

export const getAdminAdList = async (): Promise<AdminAd[]> => {
  const { data } = await api.get("/ads")
  return data.data ?? []
}

// "rejected" and adminNote are not on the backend yet: until they are, the server answers 400 "Invalid status value" and the admin sees that message.
export const setAdStatus = async (
  id: string,
  status: "active" | "paused" | "rejected",
  extra: { pauseReason?: string; adminNote?: string } = {}
) => {
  const { data } = await api.patch(`/ads/${id}`, { status, ...extra })
  return data
}

export const removeAd = async (id: string) => {
  const { data } = await api.delete(`/ads/${id}`)
  return data
}
