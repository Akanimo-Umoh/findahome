import api from "./api"
import type { Purchase } from "@/types/purchase"

export const getAgentPurchases = async (
  agentId: string
): Promise<Purchase[]> => {
  const { data } = await api.get(`/purchase/agent-purchases/${agentId}`)
  return data.purchases
}

export const getPurchaseDetails = async (
  purchaseId: string
): Promise<Purchase> => {
  const { data } = await api.get(`/purchase/${purchaseId}`)
  return data.purchase
}
