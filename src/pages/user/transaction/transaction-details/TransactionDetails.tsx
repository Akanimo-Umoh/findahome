import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import EscrowTimeline from "@/components/transaction-details/EscrowTimeline"
import TransactionPropertyCard from "@/components/transaction-details/TransactionPropertyCard"
import TransactionBanner from "@/components/transaction-details/TransactionBanner"
import PaymentSummary from "@/components/transaction-details/PaymentSummary"
import ScheduleDetails from "@/components/transaction-details/ScheduleDetails"
import ContactDetails from "@/components/transaction-details/ContactDetails"
import TransactionActions from "@/components/transaction-details/TransactionActions"

import PageHeader from "@/components/shared/PageHeader"
import { useAgentChatForProperty } from "@/hooks/useAgentChatForProperty"
import {
  confirmInspection,
  rescheduleInspection,
  type Inspection,
} from "@/services/inspection.service"
import { useTransactionDetails } from "@/hooks/useTransactionDetails"
import Spinner from "@/components/Spinner"
import RescheduleConfirmModal from "@/components/transaction-details/RescheduleConfirmModal"
import { getPersonDisplay } from "@/lib/personDisplay"
import { useQueryClient } from "@tanstack/react-query"
import {
  BANNER_CONFIG,
  getInspectionPaymentStatusLabel,
  getPurchasePaymentStatusLabel,
  getTimelineSteps,
  mapInspectionStatusToTransactionStatus,
  mapPurchaseStatusToTransactionStatus,
  PAYMENT_TYPE_LABEL,
  SCHEDULE_SECTION_LABEL,
} from "@/components/transaction-details/transactionConfig"
import {
  confirmHandover,
  rescheduleHandover,
  type Purchase,
} from "@/services/purchase.service"

export default function TransactionDetails() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isConfirming, setIsConfirming] = useState(false)
  const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false)
  const [isConfirmedOverlayOpen, setIsConfirmedOverlayOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isRescheduling, setIsRescheduling] = useState(false)

  const { transaction, recordType, isLoading, isFetching, error } =
    useTransactionDetails(transactionId ?? "")

  const property =
    transaction && typeof transaction.property !== "string"
      ? transaction.property
      : undefined

  const { chatId } = useAgentChatForProperty(property?._id)
  const agentChatPath = chatId ? `/messages/${chatId}` : "/messages"

  if (isLoading || isFetching) return <Spinner />

  if (error || !transaction) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            Couldn't load this transaction.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[14px] text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
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
  const banner = BANNER_CONFIG[status]
  const scheduleLabel = SCHEDULE_SECTION_LABEL[status]
  const paymentTypeLabel = PAYMENT_TYPE_LABEL[status] ?? "Inspection Fee"

  const agent = getPersonDisplay(
    isPurchase
      ? (transaction as Purchase).owner
      : (transaction as Inspection).owner,
    "Agent"
  )

  const amount = isPurchase
    ? (transaction as Purchase).price
    : (transaction as Inspection).fee

  const paymentStatusLabel = isPurchase
    ? getPurchasePaymentStatusLabel((transaction as Purchase).status)
    : getInspectionPaymentStatusLabel((transaction as Inspection).status)

  const handleConfirmAction = async () => {
    if (!transactionId) return
    setIsConfirming(true)
    try {
      if (isPurchase) {
        await confirmHandover(transactionId)
      } else {
        await confirmInspection(transactionId)
      }
      queryClient.invalidateQueries({
        queryKey: ["transactionDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["userPurchasesAndInspections"],
      })
      setIsConfirmedOverlayOpen(true)
    } catch (err) {
      toast.error("Couldn't confirm the schedule. Please try again.")
      console.error("confirm error:", err)
    } finally {
      setIsConfirming(false)
    }
  }

  const handleSuggestNewTime = () => setIsRescheduleModalOpen(true)

  const handleConfirmReschedule = async () => {
    if (!transactionId) return
    setIsRescheduling(true)
    try {
      if (isPurchase) {
        await rescheduleHandover(transactionId)
      } else {
        await rescheduleInspection(transactionId)
      }
      queryClient.invalidateQueries({
        queryKey: ["transactionDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["userPurchasesAndInspections"],
      })
      setIsRescheduleModalOpen(false)
      navigate(agentChatPath)
      toast.success("Let your agent know a new time that works for you", {
        description: "Suggest a new date and time directly in chat.",
      })
    } catch (err) {
      toast.error("Couldn't reject the schedule. Please try again.")
      console.error("reschedule error:", err)
    } finally {
      setIsRescheduling(false)
    }
  }

  // Shared props for TransactionActions — rendered twice (lg + mobile), once visible at a time via CSS, so state/handlers must come from one source.
  const actionsProps = {
    status,
    transactionId: transactionId ?? "",
    isRequestSuccessOpen,
    onRequestSuccessOpenChange: setIsRequestSuccessOpen,
    isConfirmedOverlayOpen,
    isConfirming,
    onConfirmedOverlayOpenChange: setIsConfirmedOverlayOpen,
    onRequestAction: () => setIsRequestSuccessOpen(true),
    onConfirmAction: handleConfirmAction,
    onSuggestNewTime: handleSuggestNewTime,
    onGoToDashboard: () => navigate("/"),
  }

  const scheduledDateValue = isPurchase
    ? (transaction as Purchase).scheduledDate
    : (transaction as Inspection).scheduledDate

  return (
    <div className="px-6 md:px-8 md:pt-6 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <PageHeader title="Transaction Details" responsive />

        <div className="lg:mt-6 lg:flex lg:justify-between lg:gap-6">
          {/* left column (lg): property card → banner → timeline → actions */}
          <section className="mt-6 space-y-6 lg:mt-0 lg:flex-1">
            <TransactionPropertyCard
              variant="default"
              title={property?.title ?? ""}
              image={property?.image}
              price={amount.toLocaleString()}
              paymentStatus={paymentStatusLabel}
              lastUpdated={new Date(transaction.updatedAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                }
              )}
            />

            {/* banner — only when action needed or info to show */}
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

            {/* actions live here on lg — right after the timeline */}
            <div className="hidden lg:block">
              <TransactionActions {...actionsProps} />
            </div>
          </section>

          {/* right column (lg) / continues below on mobile */}
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

            {/* escrow timeline — mobile only, lg shows it in left column above */}
            <div className="lg:hidden">
              <EscrowTimeline steps={timelineSteps} />
            </div>

            <ContactDetails
              label="Agent Details"
              name={agent.name}
              phone={agent.phone}
              email={agent.email}
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

        {/* actions — mobile only, lg version renders above in left column */}
        <div className="lg:hidden">
          <TransactionActions {...actionsProps} />
        </div>
      </div>

      <RescheduleConfirmModal
        open={isRescheduleModalOpen}
        onOpenChange={setIsRescheduleModalOpen}
        onConfirm={handleConfirmReschedule}
        isSubmitting={isRescheduling}
      />
    </div>
  )
}
