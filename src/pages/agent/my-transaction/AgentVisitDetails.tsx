import { useParams, useSearchParams } from "react-router-dom"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentVisitActions from "./AgentVisitActions"
import { useQuery } from "@tanstack/react-query"
import {
  getInspectionDetails,
  type Inspection,
} from "@/services/inspection.service"
import Spinner from "@/components/Spinner"
import { getPersonDisplay } from "@/lib/personDisplay"
import { getPurchaseDetails, type Purchase } from "@/services/purchase.service"

export default function AgentVisitDetails() {
  const { transactionId } = useParams()
  const [searchParams] = useSearchParams()
  const isHandover = searchParams.get("type") === "purchase"

  const {
    data: transaction,
    isLoading,
    isFetching,
  } = useQuery<Inspection | Purchase>({
    queryKey: [
      "agentVisitDetails",
      transactionId,
      isHandover ? "purchase" : "inspection",
    ],
    queryFn: () =>
      isHandover
        ? getPurchaseDetails(transactionId ?? "")
        : getInspectionDetails(transactionId ?? ""),
    enabled: !!transactionId,
    staleTime: 0,
    refetchOnMount: "always",
  })

  if (isLoading || isFetching) return <Spinner />

  if (!transaction) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  const property =
    typeof transaction.property === "string" ? undefined : transaction.property
  const buyer = getPersonDisplay(
    isHandover
      ? typeof (transaction as Purchase).buyer === "string"
        ? undefined
        : (transaction as Purchase).buyer
      : typeof (transaction as Inspection).user === "string"
        ? undefined
        : (transaction as Inspection).user,
    "Buyer"
  )
  const scheduledDate = transaction.scheduledDate
  const canMarkComplete = isHandover
    ? (transaction as Purchase).status === "handover_completed"
    : (transaction as Inspection).status === "inspection_completed"

  return (
    <div className="md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title={isHandover ? "Handover Details" : "Visit Details"}
          responsive
        />

        <main className="mt-4 space-y-4 md:mt-6 md:space-y-6 lg:flex lg:gap-6 lg:space-y-0">
          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitPropertyCard
              image={property?.image}
              title={property?.title ?? ""}
              location={property?.address ?? ""}
              price={(isHandover
                ? (transaction as Purchase).price
                : (transaction as Inspection).fee
              ).toLocaleString()}
              referenceId={transaction.reference ?? ""}
            />
            <VisitBanner
              title={
                canMarkComplete
                  ? isHandover
                    ? "Handover Completed"
                    : "Inspection Completed"
                  : isHandover
                    ? "Handover Scheduled"
                    : "Inspection Scheduled"
              }
              subtitle={
                canMarkComplete
                  ? `The buyer has confirmed this ${isHandover ? "handover" : "inspection"} is complete.`
                  : `The ${isHandover ? "handover" : "visit"} has been scheduled successfully`
              }
            />

            <div className="hidden lg:block">
              <PropertyLocation address={property?.address ?? ""} />
            </div>
            <div className="hidden lg:block">
              <AgentVisitActions
                confirmRoute={`/agent/transactions/${transactionId}?type=${
                  isHandover ? "purchase" : "inspection"
                }`}
                markCompletedLabel={
                  canMarkComplete
                    ? "Buyer Confirmed — View Details"
                    : isHandover
                      ? "Mark Handover as Completed"
                      : "Mark Visit as Completed"
                }
                canMarkComplete={canMarkComplete}
                isHandover={isHandover}
              />
            </div>
          </section>

          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitSummary
              dateTime={
                scheduledDate
                  ? new Date(scheduledDate).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"
              }
              visitType={isHandover ? "In-Person Handover" : "Physical Visit"}
              transactionId={transaction.reference ?? transaction._id}
              paymentStatus={transaction.feePaid ? "Paid" : "Pending"}
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
              confirmRoute={`/agent/transactions/${transactionId}?type=${
                isHandover ? "purchase" : "inspection"
              }`}
              markCompletedLabel={
                canMarkComplete
                  ? "Buyer Confirmed — View Details"
                  : isHandover
                    ? "Mark Handover as Completed"
                    : "Mark Visit as Completed"
              }
              canMarkComplete={canMarkComplete}
              isHandover={isHandover}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
