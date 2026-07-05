import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader"
import DisputeDetails, {
  DisputeDetailsEmpty,
} from "@/components/disputes/DisputeDetails"
import { MOCK_DISPUTES } from "@/components/disputes/mockDisputes"
import DisputeCard, {
  DisputeCardSkeleton,
} from "@/components/disputes/DisputeCard"

type Tab = "active" | "resolved"

export default function MyDisputes() {
  const { disputeId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>("active")

  // TODO: replace with useQuery once endpoint exists
  const isLoading = false
  const activeDisputes = MOCK_DISPUTES.filter((d) => d.status !== "resolved")
  const resolvedDisputes = MOCK_DISPUTES.filter((d) => d.status === "resolved")
  const disputes = activeTab === "active" ? activeDisputes : resolvedDisputes

  const selectedDispute = MOCK_DISPUTES.find((d) => d.id === disputeId) ?? null

  const handleSelectDispute = (id: string) => {
    navigate(`/disputes/${id}`)
  }

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
          onBack={showDetailsOnly ? () => navigate("/disputes") : undefined}
        />

        {/* tabs — mobile/tablet: top of page, hidden when viewing details */}
        {!showDetailsOnly && (
          <div className="mt-6 md:mt-8 lg:hidden">{tabs}</div>
        )}

        {/* layout — stacked on mobile, side by side on lg */}
        <div className="mt-6 lg:flex lg:gap-6">
          {/* left column: tabs (lg only) + card list */}
          <section
            className={`lg:block lg:w-[380px] lg:shrink-0 ${
              showListOnly ? "block" : "hidden lg:block"
            }`}
          >
            {/* tabs — lg only, always visible above the card list */}
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
                    key={dispute.id}
                    dispute={dispute}
                    isSelected={selectedDispute?.id === dispute.id}
                    onClick={() => handleSelectDispute(dispute.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* right column: dispute details */}
          <section
            className={`lg:flex-1 ${
              showDetailsOnly ? "block" : "hidden lg:block"
            }`}
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
