import { useQuery } from "@tanstack/react-query"
import { getAgentTransactionsAndEscrows } from "@/services/transaction.service"
import { useAuthContext } from "@/context/AuthContext"

export function useAgentActivities() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery({
    queryKey: ["agentActivities", user?._id],
    queryFn: getAgentTransactionsAndEscrows,
    enabled: !!user?._id,
  })

  return {
    activities: data?.activities ?? [],
    totalEarned: data?.totalEarned ?? 0,
    isLoading,
    error: error ? "Failed to load activities" : null,
  }
}
