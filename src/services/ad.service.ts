import api from "./api"
import type { Ad, AdDraft } from "@/types/ad"

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
