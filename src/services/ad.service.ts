import api from "./api"
import type { Ad, AdDraft, AdObjective } from "@/types/ad"

export const createAd = async (draft: AdDraft): Promise<Ad> => {
  const { data } = await api.post("/ads", {
    property: draft.propertyId,
    objective: draft.objective,
    dailyBudget: draft.dailyBudget,
    duration: draft.duration,
    adBudget: draft.dailyBudget * draft.duration,
  })
  return data.data
}

export const getAgentAds = async (): Promise<Ad[]> => {
  const { data } = await api.get("/ads")
  return data.data
}

export const getAdById = async (id: string): Promise<Ad> => {
  const { data } = await api.get(`/ads/${id}`)
  return data.data
}

export const payForAd = async (id: string): Promise<Ad> => {
  const { data } = await api.post(`/ads/${id}/pay`)
  return data.data
}

type UpdateAdFields = Partial<{
  objective: AdObjective
  dailyBudget: number
  duration: number
  adBudget: number
  status: "active" | "paused"
  pauseReason: "budget" | "manual"
}>

export const updateAd = async (
  id: string,
  fields: UpdateAdFields
): Promise<Ad> => {
  const { data } = await api.patch(`/ads/${id}`, fields)
  return data.data
}
