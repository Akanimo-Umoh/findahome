import { useParams } from "react-router-dom"
import EscrowTimeline from "@/components/transaction-details/EscrowTimeline"
import TransactionPropertyCard from "@/components/transaction-details/TransactionPropertyCard"
import TransactionBanner from "@/components/transaction-details/TransactionBanner"
import PaymentSummary from "@/components/transaction-details/PaymentSummary"
import ScheduleDetails from "@/components/transaction-details/ScheduleDetails"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import AgentTransactionActions from "./AgentTransactionActions"
import PageHeader from "@/components/shared/PageHeader"
import { useAgentTransactionDetails } from "@/hooks/useAgentTransactionDetails"
import Spinner from "@/components/Spinner"
import type { Inspection } from "@/services/inspection.service"
import { getPersonDisplay } from "@/lib/personDisplay"
import {
  AGENT_BANNER_CONFIG,
  getInspectionPaymentStatusLabel,
  getPurchasePaymentStatusLabel,
  getTimelineSteps,
  mapInspectionStatusToTransactionStatus,
  mapPurchaseStatusToTransactionStatus,
  PAYMENT_TYPE_LABEL,
  SCHEDULE_SECTION_LABEL,
} from "@/components/transaction-details/transactionConfig"
import type { Purchase } from "@/services/purchase.service"

export default function AgentTransactionDetails() {
  const { transactionId } = useParams()
  const { transaction, recordType, isLoading, isFetching, error } =
    useAgentTransactionDetails(transactionId ?? "")

  if (isLoading || isFetching) return <Spinner />

  if (error || !transaction) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  const isPurchase = recordType === "purchase"

  const status = isPurchase
    ? mapPurchaseStatusToTransactionStatus((transaction as Purchase).status)
    : mapInspectionStatusToTransactionStatus((transaction as Inspection).status)

  const timelineSteps = getTimelineSteps(
    status,
    isPurchase ? (transaction as Purchase) : (transaction as Inspection)
  )
  const banner = AGENT_BANNER_CONFIG[status]
  const scheduleLabel = SCHEDULE_SECTION_LABEL[status]
  const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

  const property =
    typeof transaction.property === "string" ? undefined : transaction.property
  const buyer = getPersonDisplay(
    isPurchase
      ? (transaction as Purchase).buyer
      : (transaction as Inspection).user,
    "Buyer"
  )
  const amount = isPurchase
    ? (transaction as Purchase).price
    : (transaction as Inspection).fee

  const paymentStatusLabel = isPurchase
    ? getPurchasePaymentStatusLabel((transaction as Purchase).status)
    : getInspectionPaymentStatusLabel((transaction as Inspection).status)

  const scheduledDateValue = isPurchase
    ? (transaction as Purchase).scheduledDate
    : (transaction as Inspection).scheduledDate

  const actionsProps = {
    status,
    transactionId: transactionId ?? "",
  }

  return (
    <div className="md:pt-6 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Transaction Details" responsive />

        <div className="lg:mt-6 lg:flex lg:justify-between lg:gap-6">
          <section className="mt-6 space-y-6 lg:mt-0 lg:flex-1">
            <TransactionPropertyCard
              variant="default"
              title={property?.title ?? ""}
              image={property?.image}
              price={amount.toLocaleString()}
              paymentStatus={paymentStatusLabel}
              lastUpdated={new Date(transaction.updatedAt).toLocaleString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                }
              )}
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
              amountInEscrow={amount.toLocaleString()}
              paymentType={paymentTypeLabel}
              referenceNumber={transaction.reference ?? ""}
              datePaid={new Date(transaction.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            />

            <div className="lg:hidden">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            <ContactDetails
              label="Buyer Details"
              name={buyer.name}
              phone={buyer.phone}
              email={buyer.email}
            />

            {scheduleLabel && (
              <ScheduleDetails
                label={scheduleLabel}
                date={
                  scheduledDateValue
                    ? new Date(scheduledDateValue).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"
                }
                time={
                  scheduledDateValue
                    ? new Date(scheduledDateValue).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "—"
                }
                location={property?.address ?? "—"}
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
