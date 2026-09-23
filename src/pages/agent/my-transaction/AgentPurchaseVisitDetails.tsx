import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentVisitActions from "../my-transaction/AgentVisitActions"
import Spinner from "@/components/Spinner"
import { getPurchaseDetails } from "@/services/purchase.service"
import { getPersonDisplay } from "@/lib/personDisplay"

export default function AgentPurchaseVisitDetails() {
  const { transactionId } = useParams()

  const {
    data: purchase,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["purchaseDetails", transactionId],
    queryFn: () => getPurchaseDetails(transactionId ?? ""),
    enabled: !!transactionId,
    staleTime: 0,
    refetchOnMount: "always",
  })

  if (isLoading || isFetching) return <Spinner />

  if (!purchase) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  const property =
    typeof purchase.property === "string" ? undefined : purchase.property
  const buyer = getPersonDisplay(
    typeof purchase.buyer === "string" ? undefined : purchase.buyer,
    "Buyer"
  )

  const canMarkComplete = purchase.status === "handover_completed"

  return (
    <div className="md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Handover Details" responsive />

        <main className="mt-4 space-y-4 md:mt-6 md:space-y-6 lg:flex lg:gap-6 lg:space-y-0">
          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitPropertyCard
              image={property?.image}
              title={property?.title ?? ""}
              location={property?.address ?? ""}
              price={purchase.price.toLocaleString()}
              referenceId={purchase.reference ?? "--"}
            />

            <VisitBanner
              title={
                canMarkComplete ? "Handover Completed" : "Handover Scheduled"
              }
              subtitle={
                canMarkComplete
                  ? "The buyer has confirmed this handover is complete."
                  : "The handover has been scheduled successfully"
              }
            />

            <div className="hidden lg:block">
              <PropertyLocation address={property?.address ?? ""} />
            </div>

            <div className="hidden lg:block">
              <AgentVisitActions
                status={purchase.status}
                canMarkComplete={canMarkComplete}
                isHandover={true}
              />
            </div>
          </section>

          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitSummary
              dateTime={
                purchase.scheduledDate
                  ? new Date(purchase.scheduledDate).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"
              }
              visitType="In-Person Handover"
              transactionId={purchase._id}
              paymentStatus={purchase.feePaid ? "Paid" : "Pending"}
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
              status={purchase.status}
              canMarkComplete={canMarkComplete}
              isHandover={true}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
