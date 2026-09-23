import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import PageHeader from "@/components/shared/PageHeader"
import VisitPropertyCard from "@/components/visit-details/VisitPropertyCard"
import VisitBanner from "@/components/visit-details/VisitBanner"
import VisitSummary from "@/components/visit-details/VisitSummary"
import PropertyLocation from "@/components/visit-details/PropertyLocation"
import VisitAgentDetails from "@/components/visit-details/VisitAgentDetails"
import PreparationTips from "@/components/visit-details/PreparationTips"
import VisitActions from "@/components/visit-details/VisitActions"
import { useQuery } from "@tanstack/react-query"
import {
  getInspectionDetails,
  type Inspection,
} from "@/services/inspection.service"
import { useAgentChatForProperty } from "@/hooks/useAgentChatForProperty"
import Spinner from "@/components/Spinner"
import idIcon from "@/assets/images/icon-inspection-visit-id.svg"
import listsIcon from "@/assets/images/icon-inspection-visit-list.svg"
import pictureIcon from "@/assets/images/icon-inspection-visit-camera.svg"
import timeIcon from "@/assets/images/icon-inspection-visit-time.svg"
import { getPurchaseDetails, type Purchase } from "@/services/purchase.service"

const HANDOVER_TIPS = [
  { icon: idIcon, tip: "Bring a valid ID and your payment receipt" },
  {
    icon: listsIcon,
    tip: "Verify all agreed fixtures and fittings are present",
  },
  {
    icon: pictureIcon,
    tip: "Take photos of the property's condition on handover",
  },
  {
    icon: timeIcon,
    tip: "Collect all keys, access codes, and relevant documents",
  },
]

export default function VisitDetails() {
  const { transactionId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isHandover = searchParams.get("type") === "purchase"

  const {
    data: transaction,
    isLoading,
    isFetching,
  } = useQuery<Inspection | Purchase>({
    queryKey: [
      "visitDetails",
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

  const property =
    transaction && typeof transaction.property !== "string"
      ? transaction.property
      : undefined
  const { chatId } = useAgentChatForProperty(property?._id)

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

  const owner =
    typeof transaction.owner === "string"
      ? { name: "Agent" }
      : { name: transaction.owner?.name ?? transaction.owner?.email }

  const price = isHandover
    ? (transaction as Purchase).price
    : (transaction as Inspection).fee
  const feePaid = isHandover
    ? (transaction as Purchase).feePaid
    : (transaction as Inspection).feePaid
  const isCompleted = isHandover
    ? (transaction as Purchase).status === "handover_completed"
    : (transaction as Inspection).status === "inspection_completed"

  const pageTitle = isHandover ? "Handover Details" : "Visit Details"
  const bannerTitle = isCompleted
    ? isHandover
      ? "Handover Completed"
      : "Inspection Completed"
    : isHandover
      ? "Handover Scheduled"
      : "Inspection Scheduled"
  const bannerSubtitle = isCompleted
    ? isHandover
      ? "Your handover has been marked complete."
      : "Your inspection has been marked complete."
    : isHandover
      ? "Your handover has been scheduled successfully"
      : "Your visit has been scheduled successfully"
  const confirmRoute = isHandover
    ? `/transactions/${transactionId}/confirm-handover`
    : `/transactions/${transactionId}/confirm-inspection`
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
              image={property?.image}
              title={property?.title ?? ""}
              location={property?.address ?? ""}
              price={price.toLocaleString()}
              referenceId={transaction.reference ?? "--"}
            />

            <VisitBanner title={bannerTitle} subtitle={bannerSubtitle} />

            <div className="hidden lg:block">
              <PropertyLocation address={property?.address ?? ""} />
            </div>

            <div className="hidden lg:block">
              <VisitActions
                confirmRoute={confirmRoute}
                markCompletedLabel={markCompletedLabel}
                transactionId={transactionId ?? ""}
                disputeType={isHandover ? "purchase" : "inspection"}
              />
            </div>
          </section>

          <section className="space-y-4 md:space-y-6 lg:flex-1">
            <VisitSummary
              dateTime={
                transaction.scheduledDate
                  ? new Date(transaction.scheduledDate).toLocaleString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )
                  : "—"
              }
              visitType={isHandover ? "In-Person Handover" : "Physical Visit"}
              transactionId={transaction._id}
              paymentStatus={feePaid ? "Paid" : "Pending"}
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

            {!isHandover && <PreparationTips />}
            {isHandover && <PreparationTips tips={HANDOVER_TIPS} />}
          </section>

          <div className="lg:hidden">
            <VisitActions
              confirmRoute={confirmRoute}
              markCompletedLabel={markCompletedLabel}
              transactionId={transactionId ?? ""}
              disputeType={isHandover ? "purchase" : "inspection"}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
