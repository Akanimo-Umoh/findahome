import { useParams } from "react-router-dom"
import { getMockTransaction } from "@/data/mockTransactions"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentVisitActions from "./AgentVisitActions"

export default function AgentVisitDetails() {
  const { transactionId } = useParams()

  // TODO: replace with useQuery once endpoint exists
  const transaction = getMockTransaction(transactionId ?? "")
  const status = transaction?.status ?? "inspection_confirmed"

  const isHandover = status === "handover_confirmed"

  // TODO: replace with real "has buyer marked their side complete" flag from API
  // once statuses like "inspection_buyer_completed" exist server-side
  const canMarkComplete = false

  const pageTitle = isHandover ? "Handover Details" : "Visit Details"
  const bannerTitle = isHandover ? "Handover Scheduled" : "Inspection Scheduled"
  const bannerSubtitle = isHandover
    ? "The handover has been scheduled successfully"
    : "The visit has been scheduled successfully"
  const confirmRoute = isHandover
    ? `/agent/transactions/${transactionId}/confirm-handover`
    : `/agent/transactions/${transactionId}/confirm-inspection`
  const markCompletedLabel = isHandover
    ? "Mark Handover as Completed"
    : "Mark Visit as Completed"

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader title={pageTitle} responsive />

        <main className="mt-4 space-y-4 md:mt-6 md:space-y-6 lg:flex lg:gap-6 lg:space-y-0">
          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitPropertyCard
              title="Luxury 4 Bed-room Apartment"
              location="Lekki Phase 1, Lagos."
              price="3,000,000"
              referenceId="FH-2862"
            />

            <VisitBanner title={bannerTitle} subtitle={bannerSubtitle} />

            <div className="hidden lg:block">
              <PropertyLocation address="Lekki Phase 1, Lagos State" />
            </div>

            <div className="hidden lg:block">
              <AgentVisitActions
                confirmRoute={confirmRoute}
                markCompletedLabel={markCompletedLabel}
                canMarkComplete={canMarkComplete}
                isHandover={isHandover}
              />
            </div>
          </section>

          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitSummary
              dateTime="20th Oct, 2025 at 10 AM"
              visitType="Physical Visit"
              transactionId="TXN-89234567"
              paymentStatus="Paid"
            />

            <div className="lg:hidden">
              <PropertyLocation address="Lekki Phase 1, Lagos State" />
            </div>

            <ContactDetails
              label="Buyer Details"
              name="Victoria Ntekim"
              phone="08167288115"
              email="victoria.ntekim@gmail.com"
            />
          </section>

          <div className="lg:hidden">
            <AgentVisitActions
              confirmRoute={confirmRoute}
              markCompletedLabel={markCompletedLabel}
              canMarkComplete={canMarkComplete}
              isHandover={isHandover}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
