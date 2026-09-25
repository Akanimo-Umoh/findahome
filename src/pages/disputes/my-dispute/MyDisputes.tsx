import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import PageHeader from "@/components/shared/PageHeader"
import DisputeDetails, {
  DisputeDetailsEmpty,
} from "@/pages/disputes/dispute-details/DisputeDetails"
import DisputeCard, {
  DisputeCardSkeleton,
} from "@/components/disputes/DisputeCard"
import { getMyDisputes, getAgentDisputes } from "@/services/dispute.service"
import { useAuthContext } from "@/context/AuthContext"

type Tab = "active" | "resolved"

export default function MyDisputes() {
  const { disputeId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const isAgent = user?.role === "agent"
  const [activeTab, setActiveTab] = useState<Tab>("active")

  const { data, isLoading } = useQuery({
    queryKey: ["myDisputes", user?._id, isAgent],
    queryFn: () => (isAgent ? getAgentDisputes() : getMyDisputes()),
    enabled: !!user?._id,
  })

  const allDisputes = data?.disputes ?? []
  const activeDisputes = allDisputes.filter(
    (d) => d.status !== "resolved" && d.status !== "closed"
  )
  const resolvedDisputes = allDisputes.filter(
    (d) => d.status === "resolved" || d.status === "closed"
  )
  const disputes = activeTab === "active" ? activeDisputes : resolvedDisputes

  const selectedDispute = allDisputes.find((d) => d._id === disputeId) ?? null

  const handleSelectDispute = (id: string) => navigate(`/disputes/${id}`)

  const showListOnly = !disputeId
  const showDetailsOnly = !!disputeId

  const tabs = (
    <div className="flex items-center justify-center gap-2.5">
      <button
        onClick={() => setActiveTab("active")}
        className={`flex cursor-pointer items-center justify-center px-4 py-2 md:text-[18px] ${
          activeTab === "active"
            ? "border-b border-button-bg"
            : "text-text-secondary"
        }`}
      >
        Active Disputes
      </button>
      <button
        onClick={() => setActiveTab("resolved")}
        className={`flex cursor-pointer items-center justify-center px-4 py-2 md:text-[18px] ${
          activeTab === "resolved"
            ? "border-b border-button-bg"
            : "text-text-secondary"
        }`}
      >
        Resolved Disputes
      </button>
    </div>
  )

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="My Dispute"
          responsive
          onBack={showDetailsOnly ? () => navigate(-1) : undefined}
        />

        {!showDetailsOnly && (
          <div className="mt-6 md:mt-8 lg:hidden">{tabs}</div>
        )}

        <div className="mt-6 lg:flex lg:gap-6">
          <section
            className={`lg:block lg:w-[380px] lg:shrink-0 ${showListOnly ? "block" : "hidden lg:block"}`}
          >
            <div className="mb-4 hidden lg:block">{tabs}</div>

            {isLoading ? (
              <DisputeCardSkeleton />
            ) : disputes.length === 0 ? (
              <p className="text-center text-[14px] text-text-secondary">
                No {activeTab === "active" ? "active" : "resolved"} disputes
              </p>
            ) : (
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <DisputeCard
                    key={dispute._id}
                    dispute={dispute}
                    isSelected={selectedDispute?._id === dispute._id}
                    onClick={() => handleSelectDispute(dispute._id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section
            className={`lg:flex-1 ${showDetailsOnly ? "block" : "hidden lg:block"}`}
          >
            <div className="lg:sticky lg:top-6 lg:rounded-xl lg:border lg:border-bg-accent lg:p-6">
              {selectedDispute ? (
                <DisputeDetails dispute={selectedDispute} />
              ) : (
                <DisputeDetailsEmpty />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
