import { useQuery } from "@tanstack/react-query"
import { getAgentInspections } from "@/services/inspection.service"
import { useAuthContext } from "@/context/AuthContext"

export function useAgentInspections() {
  const { user } = useAuthContext()
  const { data, isLoading, error } = useQuery({
    queryKey: ["agentInspections", user?._id],
    queryFn: getAgentInspections,
    enabled: !!user?._id,
  })
  return {
    inspections: data?.inspections ?? [],
    isLoading,
    error: error ? "Failed to load inspections" : null,
  }
}
