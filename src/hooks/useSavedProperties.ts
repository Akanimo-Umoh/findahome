import { useAuthContext } from "@/context/AuthContext"
import api from "@/services/api"
import type { Property } from "@/types/property"
import { useQuery } from "@tanstack/react-query"

export type Favorite = {
  _id: string
  user: string
  property: Property
  createdAt: string
  updatedAt: string
}

const fetchFavorites = async (): Promise<Favorite[]> => {
  const response = await api.get("/favorite")
  return response.data.favorites
}

export function useSavedProperties() {
  const { user, token } = useAuthContext()

  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !!user && !!token,
  })

  return {
    favorites: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load saved properties" : null,
  }
}

export function useSavedCount() {
  const { user, token } = useAuthContext()

  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !!user && !!token,
  })

  return {
    savedCount: data?.length ?? 0,
    isLoading,
  }
}
