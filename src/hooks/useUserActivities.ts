import { useQuery } from "@tanstack/react-query"
import { getUserPurchasesAndInspections } from "@/services/transaction.service"
import { useAuthContext } from "@/context/AuthContext"

export function useUserActivities() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery({
    queryKey: ["userPurchasesAndInspections", user?._id],
    queryFn: getUserPurchasesAndInspections,
    enabled: !!user?._id,
  })

  return {
    items: data?.activities ?? [],
    isLoading,
    error: error ? "Failed to load activities" : null,
  }
}
