import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getAdminProperty,
  getAgentProfile,
  getAgentProperties,
} from "@/services/admin/properties.service"
import type { AdminProperty } from "@/types/adminProperty"
import { propertiesKey, propertyKey } from "../shared/useModeration"

export function usePropertyDetails(id: string | undefined) {
  const qc = useQueryClient()

  const property = useQuery({
    queryKey: propertyKey(id),
    queryFn: () => getAdminProperty(id as string),
    enabled: !!id,
    // Opening from the list reuses the row we already have, so there is no
    // second request. (GET /property/:id also notifies the agent on every call,
    // so we avoid refetching it on focus.)
    initialData: () =>
      qc
        .getQueryData<AdminProperty[]>(propertiesKey)
        ?.find((p) => p._id === id),
    initialDataUpdatedAt: () => qc.getQueryState(propertiesKey)?.dataUpdatedAt,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const ownerId = property.data?.owner?._id

  const agent = useQuery({
    queryKey: ["admin", "agent", ownerId],
    queryFn: () => getAgentProfile(ownerId as string),
    enabled: !!ownerId,
    staleTime: 5 * 60_000,
    retry: false,
  })

  // exact live counts, instead of the possibly stale copy embedded in the listing
  const agentListings = useQuery({
    queryKey: ["admin", "agent-properties", ownerId],
    queryFn: () => getAgentProperties(ownerId as string),
    enabled: !!ownerId,
    staleTime: 60_000,
    retry: false,
  })

  return { property, agent, agentListings }
}
