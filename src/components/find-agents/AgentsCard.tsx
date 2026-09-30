import { Link } from "react-router-dom"
import ninIcon from "@/assets/images/icon-cardholder.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import houseIcon from "@/assets/images/icon-building.svg"
import StarRatingDisplay from "@/components/shared/StarRatingDisplay"
import Skeleton from "@/components/ui/Skeleton"
import { useAgentDirectory } from "@/hooks/useAgentDirectory"
import {
  getAgentAvatar,
  getAgentLocation,
  type AgentSortOption,
} from "@/lib/agents"
import type { Agent } from "@/types/agent"
import Avatar from "../Avatar"

function AgentCard({ agent }: { agent: Agent }) {
  const avatar = getAgentAvatar(agent.profilePicture)
  const location = getAgentLocation(agent)

  return (
    <Link
      to={`/agents/${agent._id}`}
      className="overflow-hidden rounded-2xl border border-bg-accent hover:shadow-xl"
    >
      <div className="h-32.5 w-full overflow-hidden rounded-t-2xl md:h-42.5">
        <Avatar
          name={agent.name}
          src={avatar}
          className="h-full w-full rounded-none"
        />
      </div>

      <div className="p-3">
        <div className="space-y-2">
          <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-black">
            {agent.name}
          </p>

          {agent.isVerified && (
            <div className="flex items-center gap-1 text-[12px] text-text-secondary">
              <img src={ninIcon} alt="" className="h-4 w-4" />
              <p>NIN Verified Agent</p>
            </div>
          )}

          <div className="flex items-center gap-1">
            <StarRatingDisplay rating={agent.rating ?? 0} size="h-3.5 w-3.5" />
            <p className="text-[12px] text-text-secondary">
              {(agent.reviewCount ?? 0) > 0
                ? `(${agent.reviewCount})`
                : "(No reviews)"}
            </p>
          </div>

          <div className="flex flex-col gap-2 font-ssPro text-[12px] text-text-secondary">
            {location && (
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="line-clamp-1">{location}</p>
              </div>
            )}
            <div className="flex items-center gap-1">
              <img src={houseIcon} alt="" />
              <p>
                {agent.activeListings ?? 0} active listing
                {(agent.activeListings ?? 0) === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>

        <span className="mt-2 flex h-11.25 w-full cursor-pointer items-center justify-center rounded-lg border border-button-bg bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary hover:bg-bg-accent">
          View Profile
        </span>
      </div>
    </Link>
  )
}

function AgentCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-bg-accent">
      <Skeleton className="h-32.5 w-full rounded-t-2xl md:h-42.5" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-2 h-11.25 w-full rounded-lg" />
      </div>
    </div>
  )
}

type AgentsCardProps = {
  searchQuery: string
  sortOption: AgentSortOption
}

export default function AgentsCard({
  searchQuery,
  sortOption,
}: AgentsCardProps) {
  const { agents, isLoading, error } = useAgentDirectory(
    searchQuery,
    sortOption
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <AgentCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error)
    return (
      <p className="mt-10 text-center text-[14px] text-text-secondary">
        {error}
      </p>
    )
  if (agents.length === 0)
    return (
      <p className="mt-10 text-center text-[14px] text-text-secondary">
        No agents found.
      </p>
    )

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  )
}
