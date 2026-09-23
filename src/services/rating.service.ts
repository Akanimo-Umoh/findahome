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
