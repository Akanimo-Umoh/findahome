import type { Agent } from "@/types/agent"

export type AgentSortOption =
  | "top-rated"
  | "most-reviews"
  | "most-listings"
  | "location"
  | ""

export function getAgentAvatar(
  pic: string[] | string | null | undefined
): string | undefined {
  return Array.isArray(pic) ? pic[0] : (pic ?? undefined)
}

export function getAgentLocation(agent: Agent): string {
  return [agent.officeAddress, ...agent.serviceArea].filter(Boolean).join(", ")
}

export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  const units: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ]
  for (const [secs, label] of units) {
    const value = Math.floor(seconds / secs)
    if (value >= 1) return `${value} ${label}${value > 1 ? "s" : ""} ago`
  }
  return "Just now"
}

// client-side search + sort, as agreed
export function filterAndSortAgents(
  agents: Agent[],
  search: string,
  sort: AgentSortOption
): Agent[] {
  const q = search.trim().toLowerCase()
  const filtered = q
    ? agents.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          getAgentLocation(a).toLowerCase().includes(q)
      )
    : [...agents]

  switch (sort) {
    case "top-rated":
      return filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case "most-reviews":
      return filtered.sort(
        (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
      )
    case "most-listings":
      return filtered.sort(
        (a, b) => (b.activeListings ?? 0) - (a.activeListings ?? 0)
      )
    case "location":
      return filtered.sort((a, b) => {
        const la = getAgentLocation(a)
        const lb = getAgentLocation(b)
        if (!la) return 1
        if (!lb) return -1
        return la.localeCompare(lb)
      })
    default:
      return filtered
  }
}
