import { useQuery } from "@tanstack/react-query"
import { getAdById } from "@/services/ad.service"
import type { Ad } from "@/types/ad"

export function useAd(id: string) {
  const { data, isLoading, error } = useQuery<Ad>({
    queryKey: ["ad", id],
    queryFn: () => getAdById(id),
    enabled: !!id,
  })

  return {
    ad: data ?? null,
    isLoading,
    error: error ? "Failed to load ad" : null,
  }
}
