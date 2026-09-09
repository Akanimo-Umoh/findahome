import { useQuery } from "@tanstack/react-query"
import { getAgentPurchasesAndInspections } from "@/services/transaction.service"
import { useAuthContext } from "@/context/AuthContext"

export function useAgentTransactionsList() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery({
    queryKey: ["agentPurchasesAndInspections", user?._id],
    queryFn: getAgentPurchasesAndInspections,
    enabled: !!user?._id,
  })

  return {
    items: data?.activities ?? [],
    isLoading,
    error: error ? "Failed to load transactions" : null,
  }
}
