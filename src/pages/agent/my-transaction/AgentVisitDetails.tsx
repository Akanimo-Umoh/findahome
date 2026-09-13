import { useParams } from "react-router-dom"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentVisitActions from "./AgentVisitActions"
import { useQuery } from "@tanstack/react-query"
import { getInspectionDetails } from "@/services/inspection.service"
import Spinner from "@/components/Spinner"
import { getPersonDisplay } from "@/lib/personDisplay"

export default function AgentVisitDetails() {
  const { transactionId } = useParams()

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

  const property =
    typeof inspection.property === "string" ? undefined : inspection.property
  const buyer = getPersonDisplay(
    typeof inspection.user === "string" ? undefined : inspection.user,
    "Buyer"
  )

  // no agent-side "complete" action exists on the backend — this just reflects whether the buyer has already completed it
  const canMarkComplete = inspection.status === "inspection_completed"

  return (
    <div className="md:pt-6">
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
              subtitle="The visit has been scheduled successfully"
            />

            <div className="hidden lg:block">
              <PropertyLocation address={property?.address ?? ""} />
            </div>
            <div className="hidden lg:block">
              <AgentVisitActions
                confirmRoute={`/agent/transactions/${transactionId}?type=inspection`}
                markCompletedLabel={
                  canMarkComplete
                    ? "Buyer Confirmed — View Details"
                    : "Mark Visit as Completed"
                }
                canMarkComplete={canMarkComplete}
                isHandover={false}
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

            <ContactDetails
              label="Buyer Details"
              name={buyer.name}
              phone={buyer.phone}
              email={buyer.email}
            />
          </section>

          <div className="lg:hidden">
            <AgentVisitActions
              confirmRoute={`/agent/transactions/${transactionId}?type=inspection`}
              markCompletedLabel={
                canMarkComplete
                  ? "Buyer Confirmed — View Details"
                  : "Mark Visit as Completed"
              }
              canMarkComplete={canMarkComplete}
              isHandover={false}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
