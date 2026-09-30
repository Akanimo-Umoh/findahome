import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getAgents,
  getAgentProfile,
  getAgentListings,
} from "@/services/agent.service"
import {
  getAgentRatings,
  getAgentEligibleDeals,
} from "@/services/rating.service"
import { filterAgents, type AgentSortOption } from "@/lib/agents"
import type { Agent } from "@/types/agent"

// Fetches the agent list, then merges each agent's rating/reviewCount/
// activeListings before sorting — done here, once, instead of per-card,
// so the sort dropdown actually has real numbers to sort against.
export function useAgentDirectory(search: string, sort: AgentSortOption) {
  const {
    data: agents,
    isLoading: agentsLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  })

  const { data: merged, isLoading: mergeLoading } = useQuery({
    queryKey: ["agentsWithSummary", agents?.map((a) => a._id)],
    queryFn: async () => {
      if (!agents) return []
      const results = await Promise.all(
        agents.map(async (agent) => {
          const [ratings, listings] = await Promise.all([
            getAgentRatings(agent._id),
            getAgentListings(agent._id),
          ])
          return {
            ...agent,
            rating: ratings.averageRating,
            reviewCount: ratings.totalRatings,
            activeListings: listings.filter((l) => l.status === "approved")
              .length,
          } as Agent
        })
      )
      return results
    },
    enabled: !!agents,
  })

  const visible = filterAgents(merged ?? [], search, sort)

  return {
    agents: visible,
    isLoading: agentsLoading || mergeLoading,
    error: error ? "Failed to load agents" : null,
  }
}

export function useAgentProfile(agentId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => getAgentProfile(agentId),
    enabled: !!agentId,
  })
  return { agent: data, isLoading }
}

export function useAgentListingsQuery(agentId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["agentApprovedListings", agentId],
    queryFn: async () => {
      const listings = await getAgentListings(agentId)
      return listings.filter((listing) => listing.status === "approved")
    },
    enabled: !!agentId,
  })
  return { listings: data ?? [], isLoading }
}

export function useAgentReviews(agentId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["agentReviews", agentId],
    queryFn: () => getAgentRatings(agentId),
    enabled: !!agentId,
  })
  return {
    reviews: data?.ratings ?? [],
    averageRating: data?.averageRating ?? 0,
    totalRatings: data?.totalRatings ?? 0,
    isLoading,
  }
}

export function useEligibleDeals(agentId: string, enabled: boolean) {
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ["eligibleDeals", agentId, user?._id],
    queryFn: () => getAgentEligibleDeals(agentId),
    enabled: enabled && !!agentId && !!user?._id,
  })
  return { deals: data ?? [] }
}
