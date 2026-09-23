import api from "@/services/api"

export async function createDispute(payload: {
  propertyId: string
  agentId?: string
  purchaseId?: string
  inspectionId?: string
  description: string
}) {
  const res = await api.post("/dispute", payload)
  return res.data as {
    success: boolean
    message: string
    dispute: { _id: string }
  }
}
