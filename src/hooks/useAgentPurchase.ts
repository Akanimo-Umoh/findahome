import { useQuery } from "@tanstack/react-query"
import {
  getAgentPurchases,
  getPurchaseDetails,
} from "@/services/purchase.service"
import type { Purchase } from "@/types/purchase"
import { useAuthContext } from "@/context/AuthContext"

export function useAgentPurchases() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery<Purchase[]>({
    queryKey: ["agentPurchases", user?._id],
    queryFn: () => getAgentPurchases(user!._id),
    enabled: !!user?._id,
  })

  return {
    purchases: data ?? [],
    isLoading,
    error: error ? "Failed to load transactions" : null,
  }
}

export function usePurchase(id: string) {
  const { data, isLoading, error } = useQuery<Purchase>({
    queryKey: ["purchase", id],
    queryFn: () => getPurchaseDetails(id),
    enabled: !!id,
  })

  return {
    purchase: data ?? null,
    isLoading,
    error: error ? "Failed to load transaction" : null,
  }
}
