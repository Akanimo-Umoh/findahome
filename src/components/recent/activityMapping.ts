import type { MergedTransaction } from "@/services/transaction.service"
import type { Activity, TransactionStatus } from "@/types/transactions"

// maps a raw inspection/purchase record's backend status onto the existing
// 10-phase TransactionStatus enum ActivityCard/transactionConfig already use
function mapStatus(item: MergedTransaction): TransactionStatus {
  if (item.recordType === "inspection") {
    switch (item.status) {
      case "inspection_requested":
      case "inspection_initialized":
      case "inspection_paid":
        return "inspection_requested"
      case "inspection_scheduled":
        return "inspection_scheduled"
      case "inspection_confirmed":
        return "inspection_confirmed"
      case "inspection_completed":
        return "inspection_completed"
      default:
        return "inspection_requested"
    }
  }

  // purchase
  switch (item.status) {
    case "none":
    case "property_payment_made":
      return "property_payment_pending"
    case "handover_requested":
      return "handover_requested"
    case "handover_scheduled":
      return "handover_scheduled"
    case "handover_confirmed":
      return "handover_confirmed"
    case "handover_completed":
      return "handover_completed"
    case "funds_released":
      return "funds_released"
    default:
      return "property_payment_pending"
  }
}

const TYPE_LABEL: Record<TransactionStatus, string> = {
  inspection_requested: "Inspection Request",
  inspection_scheduled: "Confirm Inspection Schedule",
  inspection_confirmed: "Visit Details",
  inspection_completed: "Inspection Completed",
  property_payment_pending: "Property Payment",
  handover_requested: "Handover Request",
  handover_scheduled: "Confirm Handover Schedule",
  handover_confirmed: "Handover Details",
  handover_completed: "Handover Completed",
  funds_released: "Transaction Receipt",
}

const STATUS_LABEL: Record<TransactionStatus, string> = {
  inspection_requested: "Awaiting Agent",
  inspection_scheduled: "Schedule Visit",
  inspection_confirmed: "Visit Upcoming",
  inspection_completed: "Payment Held by System",
  property_payment_pending: "Awaiting Handover",
  handover_requested: "Schedule Handover",
  handover_scheduled: "Schedule Handover",
  handover_confirmed: "Handover Upcoming",
  handover_completed: "Handover Completed",
  funds_released: "Payment Released",
}

// route pattern reused from the existing /transactions/:transactionId/* pages
function getDetailsRoute(
  id: string,
  status: TransactionStatus,
  recordType: "inspection" | "purchase"
): string {
  const base = (() => {
    switch (status) {
      case "inspection_scheduled":
      case "inspection_confirmed":
        return `/transactions/${id}/visit`
      case "handover_scheduled":
      case "handover_confirmed":
        return `/transactions/${id}/confirm-handover`
      case "funds_released":
        return `/transactions/${id}/receipt`
      default:
        return `/transactions/${id}`
    }
  })()
  return `${base}?type=${recordType}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function getAgentName(item: MergedTransaction): string {
  const person = item.recordType === "purchase" ? item.seller : item.owner
  if (!person || typeof person === "string") return "Agent"
  return (
    (person as { name?: string; email: string }).name ??
    (person as { email: string }).email
  )
}

export function mapToActivity(item: MergedTransaction): Activity {
  const status = mapStatus(item)
  return {
    id: item._id,
    type: TYPE_LABEL[status],
    status,
    statusLabel: STATUS_LABEL[status],
    date: formatDate(item.updatedAt),
    agentName: getAgentName(item),
    agentVerified: false, // not returned by the backend yet
    propertyName: item.property?.title ?? "",
    propertyImg: item.property?.image ?? "",
    detailsRoute: getDetailsRoute(item._id, status, item.recordType),
  }
}
