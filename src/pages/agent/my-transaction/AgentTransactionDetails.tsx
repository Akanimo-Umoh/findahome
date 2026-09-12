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
  getTimelineSteps,
  mapInspectionStatusToTransactionStatus,
  PAYMENT_TYPE_LABEL,
  SCHEDULE_SECTION_LABEL,
} from "@/components/transaction-details/transactionConfig"

export default function AgentTransactionDetails() {
  const { transactionId } = useParams()
  const { transaction, recordType, isLoading, error } =
    useAgentTransactionDetails(transactionId ?? "")

  if (isLoading) return <Spinner />

  if (error || !transaction) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  const status =
    recordType === "inspection"
      ? mapInspectionStatusToTransactionStatus(
          (transaction as Inspection).status
        )
      : "property_payment_pending" // purchase path not wired yet

  const timelineSteps = getTimelineSteps(
    status,
    recordType === "inspection" ? (transaction as Inspection) : undefined
  )
  const banner = AGENT_BANNER_CONFIG[status]
  const scheduleLabel = SCHEDULE_SECTION_LABEL[status]
  const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

  const property =
    typeof transaction.property === "string" ? undefined : transaction.property
  const buyer = getPersonDisplay(
    recordType === "inspection" ? (transaction as Inspection).user : undefined,
    "Buyer"
  )
  const amount =
    recordType === "inspection" ? (transaction as Inspection).fee : 0

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
              image={
                property && "image" in property ? property.image : undefined
              }
              price={amount.toLocaleString()}
              paymentStatus={
                recordType === "inspection"
                  ? getInspectionPaymentStatusLabel(
                      (transaction as Inspection).status
                    )
                  : undefined
              }
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
              referenceNumber={
                recordType === "inspection"
                  ? ((transaction as Inspection).reference ?? "")
                  : ""
              }
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

            {scheduleLabel && recordType === "inspection" && (
              <ScheduleDetails
                label={scheduleLabel}
                date={
                  (transaction as Inspection).scheduledDate
                    ? new Date(
                        (transaction as Inspection).scheduledDate as string
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"
                }
                time={
                  (transaction as Inspection).scheduledDate
                    ? new Date(
                        (transaction as Inspection).scheduledDate as string
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "—"
                }
                location={
                  property && "address" in property
                    ? (property.address ?? "—")
                    : "—"
                }
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
