import { useQuery } from "@tanstack/react-query"

export type Agent = {
  id: string
  name: string
  avatar: string
  is_verified: boolean
  rating: string
  total_listings: string
}

const fetchAgents = async (): Promise<Agent[]> => {
  const response = await fetch("/agents.json")
  if (!response.ok) throw new Error("Failed to fetch agents")
  const data = await response.json()
  return data.agents
}

export function useAgents() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  })

  return {
    agents: data ?? [],
    loading: isLoading,
    error: error ? "Failed to fetch agents" : null,
  }
}

export function useAgent(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    select: (agents) => agents.find((a) => a.id === id) ?? null,
    enabled: !!id,
  })

  return {
    agent: data ?? null,
    loading: isLoading,
    error: error ? "Agent not found" : null,
  }
}

// Helper function to get agent by name (for backward compatibility with properties)
export function useAgentByName(name: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    select: (agents) => agents.find((a) => a.name === name) ?? null,
    enabled: !!name,
  })

  return {
    agent: data ?? null,
    loading: isLoading,
    error: error ? "Agent not found" : null,
  }
}
