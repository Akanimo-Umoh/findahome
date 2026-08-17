import { useQuery } from "@tanstack/react-query"
import { getAgentAds } from "@/services/ad.service"
import type { Ad } from "@/types/ad"

export function useAgentAds() {
  const { data, isLoading, error } = useQuery<Ad[]>({
    queryKey: ["agentAds"],
    queryFn: getAgentAds,
  })

  return {
    ads: data ?? [],
    isLoading,
    error: error ? "Failed to load ads" : null,
  }
}
