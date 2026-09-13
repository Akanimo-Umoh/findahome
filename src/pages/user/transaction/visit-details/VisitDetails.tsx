import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import VisitAgentDetails from "@/components/visit-details/VisitAgentDetails"
import PreparationTips from "@/components/visit-details/PreparationTips"
import VisitActions from "@/components/visit-details/VisitActions"
import { useQuery } from "@tanstack/react-query"
import { getInspectionDetails } from "@/services/inspection.service"
import { useAgentChatForProperty } from "@/hooks/useAgentChatForProperty"
import Spinner from "@/components/Spinner"

export default function VisitDetails() {
  const { transactionId } = useParams()
  const navigate = useNavigate()

  const {
    data: inspection,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["inspectionDetails", transactionId],
    queryFn: () => getInspectionDetails(transactionId ?? ""),
    enabled: !!transactionId,
    staleTime: 0,
    refetchOnMount: "always",
  })

  const property =
    inspection && typeof inspection.property !== "string"
      ? inspection.property
      : undefined
  const { chatId } = useAgentChatForProperty(property?._id)

  if (isLoading || isFetching) return <Spinner />

  if (!inspection) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  const owner =
    typeof inspection.owner === "string"
      ? { name: "Agent" }
      : { name: inspection.owner?.name ?? inspection.owner?.email }

  const confirmRoute = `/transactions/${transactionId}/confirm-inspection`

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Visit Details" responsive />

        <main className="mt-4 space-y-4 md:mt-6 md:space-y-6 lg:flex lg:gap-6 lg:space-y-0">
          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitPropertyCard
              image={property?.image}
              title={property?.title ?? ""}
              location={property?.address ?? ""}
              price={inspection.fee.toLocaleString()}
              referenceId={inspection.reference ?? ""}
            />

            <VisitBanner
              title="Inspection Scheduled"
              subtitle="Your visit has been scheduled successfully"
            />

            <div className="hidden lg:block">
              <PropertyLocation address={property?.address ?? ""} />
            </div>

            <div className="hidden lg:block">
              <VisitActions
                confirmRoute={confirmRoute}
                markCompletedLabel="Mark Visit as Completed"
              />
            </div>
          </section>

          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitSummary
              dateTime={
                inspection.scheduledDate
                  ? new Date(inspection.scheduledDate).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"
              }
              visitType="Physical Visit"
              transactionId={inspection._id}
              paymentStatus={inspection.feePaid ? "Paid" : "Pending"}
            />

            <div className="lg:hidden">
              <PropertyLocation address={property?.address ?? ""} />
            </div>

            <VisitAgentDetails
              name={owner.name}
              onChat={() =>
                navigate(chatId ? `/messages/${chatId}` : "/messages")
              }
            />

            <PreparationTips />
          </section>

          <div className="lg:hidden">
            <VisitActions
              confirmRoute={confirmRoute}
              markCompletedLabel="Mark Visit as Completed"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
