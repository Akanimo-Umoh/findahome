import api from "@/services/api"

export type Rating = {
  _id: string
  property: string
  user: string
  agent: string
  inspection?: string
  purchase?: string
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}

export async function createRating(payload: {
  propertyId: string
  rating: number
  comment?: string
}) {
  const res = await api.post("/rating", payload)
  return res.data as { success: boolean; message: string; rating: Rating }
}

type ReviewProperty = {
  _id: string
  title: string
  address?: string
  images?: string[]
}

export type AgentReview = {
  _id: string
  property: string | ReviewProperty | null
  user: string | { _id: string; name?: string } | null
  inspection?: string
  purchase?: string
  rating: number
  comment?: string
  createdAt: string
}

export type EligibleDeal = {
  property: ReviewProperty
  inspectionId?: string
  purchaseId?: string
}

export async function getAgentRatings(agentId: string) {
  const res = await api.get(`/rating/agent/${agentId}`)
  return res.data as {
    success: boolean
    totalRatings: number
    averageRating: number
    ratings: AgentReview[]
  }
}

export async function getAgentEligibleDeals(agentId: string) {
  const res = await api.get(`/rating/agents/${agentId}/eligible-deals`)
  return res.data.data as EligibleDeal[]
}
