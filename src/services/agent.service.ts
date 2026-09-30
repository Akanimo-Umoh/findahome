import api from "@/services/api"
import type { Agent } from "@/types/agent"
import type { Property } from "@/types/property"

export async function getAgents() {
  const res = await api.get("/user/agents")
  return res.data.data as Agent[]
}

export async function getAgentProfile(agentId: string) {
  const res = await api.get(`/user/agents/${agentId}`)
  return res.data.data as Agent
}

export async function getAgentListings(agentId: string) {
  const res = await api.get(`/property/agent/${agentId}`)
  return res.data.properties as Property[]
}
