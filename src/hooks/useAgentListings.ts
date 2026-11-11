import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { Property } from "@/types/property"

export type AgentListing = Property & {
  status: "approved" | "pending" | "sold" | "rejected"
}

export function useAgentListings() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery<AgentListing[]>({
    queryKey: ["agentListings", user?._id],
    queryFn: async () => {
      const res = await api.get(`/property/agent/${user!._id}`)
      console.log(res)
      return res.data.properties as AgentListing[]
    },
    enabled: !!user?._id,
    // TODO(remove-polling): safety net in case a live update is missed. Keep it
    // if the API host can't hold socket connections; otherwise delete both lines.
    staleTime: 30_000,
    refetchInterval: 30_000,
  })

  const activeListingsCount = useMemo(
    () =>
      (data ?? []).filter((listing) => listing.status === "approved").length,
    [data]
  )

  return {
    listings: data ?? [],
    activeListingsCount,
    isLoading,
    error: error ? "Failed to load agent listings" : null,
  }
}
