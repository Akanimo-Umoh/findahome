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
import { usePropertyTaken } from "@/hooks/usePropertyTaken"
import {
  confirmInspection,
  rescheduleInspection,
  type Inspection,
} from "@/services/inspection.service"
import { useTransactionDetails } from "@/hooks/useTransactionDetails"
import Spinner from "@/components/Spinner"
import RescheduleConfirmModal from "@/components/transaction-details/RescheduleConfirmModal"
import { getPersonDisplay } from "@/lib/personDisplay"
import { cancelledLabel } from "@/lib/refundStatus"
import { isReceiptReady } from "@/lib/receipt"
import { purchaseStatusOf } from "@/lib/purchaseStatus"
import { isPropertyTakenCancel } from "@/lib/refundFee"
import { usePropertyDeal } from "@/hooks/usePropertyDeal"
import { useQueryClient } from "@tanstack/react-query"
import {
  BANNER_CONFIG,
  getBuyerInspectionBanner,
  getInspectionPaymentStatusLabel,
  getPurchasePaymentStatusLabel,
  getTimelineSteps,
  getUnderOfferNotice,
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

const formatSchedule = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : undefined

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

  // someone has paid for it. isTaken doesn't say who, so check whether it's
  // this buyer's own purchase holding it before calling it "another buyer"
  const { isTaken, isSold, soldLabel } = usePropertyTaken(property?._id)
  const { purchase: ownPurchase } = usePropertyDeal({
    propertyId: property?._id,
    isAgent: false,
  })
  const ownOffer =
    !!ownPurchase &&
    ownPurchase.status !== "none" &&
    ownPurchase.status !== "purchase_cancelled"

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
    ? mapPurchaseStatusToTransactionStatus(
        purchaseStatusOf(transaction as Purchase)
      )
    : mapInspectionStatusToTransactionStatus((transaction as Inspection).status)

  const timelineSteps = getTimelineSteps(
    isPurchase ? "purchase" : "inspection",
    isPurchase ? (transaction as Purchase) : (transaction as Inspection)
  )
  const banner =
    (!isPurchase && getBuyerInspectionBanner(transaction as Inspection)) ||
    BANNER_CONFIG[status]
  // another buyer has paid for it: say so at every stage, except when this
  // inspection was already cancelled for that reason (its banner says so)
  const propertyTaken =
    isTaken && !ownOffer && !isPropertyTakenCancel(transaction as Inspection)
  const underOfferNotice = propertyTaken
    ? getUnderOfferNotice(transaction, isSold ? soldLabel : undefined)
    : undefined
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

  // a cancelled deal shows where its refund stands (pending / refunded)
  const paymentStatusLabel =
    cancelledLabel(transaction) ??
    (isPurchase
      ? getPurchasePaymentStatusLabel(purchaseStatusOf(transaction as Purchase))
      : getInspectionPaymentStatusLabel((transaction as Inspection).status))

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
    // a receipt exists only once the buyer has finished their side: the
    // inspection is completed, or the handover is marked completed
    receiptTo: isReceiptReady(recordType, transaction.status)
      ? `/transactions/${transactionId}/receipt?type=${recordType}`
      : undefined,
    chatTo: agentChatPath,
    scheduledAtLabel: formatSchedule(transaction.scheduledDate),
    agentName: agent.name,
    propertyTaken,
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

            {underOfferNotice && (
              <section>
                <TransactionBanner
                  title={underOfferNotice.title}
                  subtitle={underOfferNotice.subtitle}
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
              datePaid={
                transaction.paidAt
                  ? new Date(transaction.paidAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"
              }
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
