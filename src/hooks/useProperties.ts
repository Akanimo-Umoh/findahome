import { useQuery } from "@tanstack/react-query"
import { getAllProperties, getPropertyById } from "@/services/property.service"
import type { Property } from "@/types/property"

export const useProperties = () => {
  const { data, isLoading, error } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const data = await getAllProperties()
      return Array.isArray(data) ? data : []
    },
  })

  return {
    properties: data ?? [],
    loading: isLoading,
    error: error ? "Failed to fetch properties" : null,
  }
}

export const useProperty = (id: string) => {
  const { data, isLoading, error } = useQuery<Property>({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  })

  return {
    property: data ?? null,
    loading: isLoading,
    error: error ? "Failed to fetch property" : null,
  }
}
