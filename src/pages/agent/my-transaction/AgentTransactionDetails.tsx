import { useParams } from "react-router-dom"
import EscrowTimeline from "@/components/transaction-details/EscrowTimeline"
import TransactionPropertyCard from "@/components/transaction-details/TransactionPropertyCard"
import TransactionBanner from "@/components/transaction-details/TransactionBanner"
import PaymentSummary from "@/components/transaction-details/PaymentSummary"
import ScheduleDetails from "@/components/transaction-details/ScheduleDetails"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentTransactionActions from "./AgentTransactionActions"
import {
  getTimelineSteps,
  BANNER_CONFIG,
  SCHEDULE_SECTION_LABEL,
  PAYMENT_TYPE_LABEL,
} from "./transactionConfig"
import { getMockTransaction } from "@/data/mockTransactions"
import type { TransactionStatus } from "@/types/transactions"
import PageHeader from "@/components/shared/PageHeader"

export default function AgentTransactionDetails() {
  const { transactionId } = useParams()

  // TODO: replace with useQuery(["agentTransaction", transactionId]) once endpoint exists
  const transaction = getMockTransaction(transactionId ?? "")
  const status: TransactionStatus =
    transaction?.status ?? "inspection_requested"

  const timelineSteps = getTimelineSteps(status)
  const banner = BANNER_CONFIG[status]
  const scheduleLabel = SCHEDULE_SECTION_LABEL[status]
  const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

  const actionsProps = {
    status,
    transactionId: transactionId ?? "",
  }

  return (
    <div className="px-6 md:px-8 md:pt-6 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Transaction Details" responsive />

        <div className="lg:mt-6 lg:flex lg:justify-between lg:gap-6">
          <section className="mt-6 space-y-6 lg:mt-0 lg:flex-1">
            <TransactionPropertyCard
              variant="default"
              title="Luxury 4 Bed-room Apartment"
              price="3,000,000"
              paymentStatus="Paid"
              lastUpdated="2hrs ago"
            />

            {banner && (
              <section>
                <TransactionBanner
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </section>
            )}

            <div className="hidden lg:block">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            <div className="hidden lg:block">
              <AgentTransactionActions {...actionsProps} />
            </div>
          </section>

          <section className="mt-8 space-y-6 lg:mt-0 lg:flex-1">
            <PaymentSummary
              amountInEscrow="3,000,000"
              paymentType={paymentTypeLabel}
              referenceNumber="FH-TRX-002834"
              datePaid="15th Nov, 2025"
            />

            <div className="lg:hidden">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            <ContactDetails
              label="Buyer Details"
              name="Victoria Ntekim"
              phone="08167288115"
              email="victoria.ntekim@gmail.com"
            />

            {scheduleLabel && (
              <ScheduleDetails
                label={scheduleLabel}
                date="14th Nov, 2025"
                time="10:00am"
                location="Lekki Toll Gate"
              />
            )}
          </section>
        </div>

        <div className="lg:hidden">
          <AgentTransactionActions {...actionsProps} />
        </div>
      </div>
    </div>
  )
}
