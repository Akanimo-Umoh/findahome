import type { Inspection } from "@/services/inspection.service"
import type { Purchase } from "@/services/purchase.service"
import type { TransactionStatus, TimelineStep } from "@/types/transactions"

const INSPECTION_STEPS = [
  "Payment Made by Buyer",
  "Funds held in Escrow",
  "Agent scheduled an inspection",
  "Inspection schedule confirmed",
  "Inspection Completed",
]

// CHANGED: purchase/handover now has its own standalone 4-step timeline, no longer prefixed with inspection steps since they're separate transactions
const HANDOVER_STEPS = [
  "Property Payment Made",
  "Agent scheduled handover",
  "Handover schedule confirmed",
  "Property Handover Completed",
]

const VISIBLE_STEPS: Record<TransactionStatus, string[]> = {
  inspection_requested: INSPECTION_STEPS,
  inspection_scheduled: INSPECTION_STEPS,
  inspection_confirmed: INSPECTION_STEPS,
  inspection_completed: INSPECTION_STEPS,
  property_payment_pending: HANDOVER_STEPS,
  handover_requested: HANDOVER_STEPS,
  handover_scheduled: HANDOVER_STEPS,
  handover_confirmed: HANDOVER_STEPS,
  handover_completed: HANDOVER_STEPS,
  funds_released: HANDOVER_STEPS,
}

function formatTimelineDate(dateStr?: string | null): string | undefined {
  if (!dateStr) return undefined
  return new Date(dateStr).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function getTimelineSteps(
  status: TransactionStatus,
  record?:
    | Pick<Inspection, "paidAt" | "scheduledAt" | "confirmedAt" | "completedAt">
    | Pick<Purchase, "paidAt" | "scheduledAt" | "confirmedAt" | "completedAt">
): TimelineStep[] {
  const visible = VISIBLE_STEPS[status]

  const dates =
    visible === INSPECTION_STEPS
      ? [
          record?.paidAt,
          record?.paidAt,
          record?.scheduledAt,
          record?.confirmedAt,
          record?.completedAt,
        ]
      : [
          record?.paidAt,
          record?.scheduledAt,
          record?.confirmedAt,
          record?.completedAt,
        ]

  return visible.map((label, index) => ({
    label,
    completedAt: formatTimelineDate(
      index < dates.length ? dates[index] : undefined
    ),
  }))
}

export type BannerConfig = {
  title: string
  subtitle: string
}

// buyer-facing banners
export const BANNER_CONFIG: Partial<Record<TransactionStatus, BannerConfig>> = {
  inspection_requested: {
    title: "Inspection Request Sent",
    subtitle: "Waiting for your agent to schedule an inspection date.",
  },
  inspection_scheduled: {
    title: "Inspection Scheduled — Action Required",
    subtitle: "Your agent has set a date. Confirm or suggest a new time below.",
  },
  inspection_confirmed: {
    title: "Visit Confirmed — Get Ready",
    subtitle: "Your inspection visit is coming up. Check the details below.",
  },
  handover_requested: {
    title: "Handover Request Sent",
    subtitle: "Waiting for your agent to schedule a handover date.",
  },
  handover_scheduled: {
    title: "Handover Scheduled — Action Required",
    subtitle: "Your agent has set a date. Confirm or suggest a new time below.",
  },
  handover_confirmed: {
    title: "Handover Confirmed — Get Ready",
    subtitle: "Your property handover is coming up. Check the details below.",
  },
}

// Buyer-facing banner before the payment is confirmed. The UI status
// `inspection_requested` also covers "paid, waiting for the agent".
export function getBuyerInspectionBanner(
  inspection: Pick<
    Inspection,
    "status" | "refundDue" | "refundSentAt" | "refundSentAmount"
  >
): BannerConfig | undefined {
  switch (inspection.status) {
    // a new inspection can only be requested once the refund has been sent
    case "inspection_cancelled":
      if (inspection.refundDue)
        return {
          title: "Inspection Cancelled — Refund in Progress",
          subtitle:
            "Your payment will be sent back to you. You can request a new inspection once the refund has been sent.",
        }
      if (inspection.refundSentAt)
        return {
          title: "Inspection Cancelled — Refunded",
          // the amount sent is the payment less the refund processing fee
          subtitle: `${
            inspection.refundSentAmount
              ? `₦${inspection.refundSentAmount.toLocaleString()} has been sent back to you, after the refund processing fee.`
              : "Your payment has been sent back to you, after the refund processing fee."
          } You can request a new inspection from your chat with the agent.`,
        }
      return {
        title: "Inspection Cancelled",
        subtitle:
          "This inspection was cancelled. You can request a new one from your chat with the agent.",
      }
    case "none":
    case "inspection_requested":
    case "inspection_initialized":
      return {
        title: "Awaiting Payment",
        subtitle: "The inspection fee hasn't been paid yet.",
      }
    case "inspection_payment_review":
      return {
        title: "Payment Under Review",
        subtitle:
          "We're confirming your payment. Your agent can schedule the inspection once it's confirmed.",
      }
    default:
      return undefined
  }
}

// CHANGED: agent-facing banners, added as a second named export in the same
// shared file instead of duplicating the whole config file
export const AGENT_BANNER_CONFIG: Partial<
  Record<TransactionStatus, BannerConfig>
> = {
  inspection_requested: {
    title: "Buyer Paid Inspection Fee",
    subtitle: "Schedule an inspection date for the buyer below.",
  },
  inspection_scheduled: {
    title: "Awaiting Buyer Confirmation",
    subtitle: "The buyer needs to confirm or reschedule the date you set.",
  },
  inspection_confirmed: {
    title: "Inspection Confirmed — Upcoming",
    subtitle: "The buyer has confirmed. Check the visit details below.",
  },
  handover_requested: {
    title: "Buyer Paid for Property",
    subtitle: "Schedule a handover date for the buyer below.",
  },
  handover_scheduled: {
    title: "Awaiting Buyer Confirmation",
    subtitle: "The buyer needs to confirm or reschedule the date you set.",
  },
  handover_confirmed: {
    title: "Handover Confirmed — Upcoming",
    subtitle: "The buyer has confirmed. Check the handover details below.",
  },
}

// What the agent sees once the buyer has completed the inspection or the
// handover: the money stays in escrow until an admin releases it to the
// agent's wallet (feeReleased). Undefined while the deal isn't finished.
export function getAgentPayoutBanner(
  record:
    | Pick<Inspection, "status" | "feeReleased" | "fee">
    | Pick<Purchase, "status" | "feeReleased">,
  kind: "inspection" | "purchase"
): BannerConfig | undefined {
  const finished =
    kind === "inspection"
      ? record.status === "inspection_completed"
      : record.status === "handover_completed" ||
        record.status === "funds_released"
  if (!finished) return undefined

  // inspections pay the agent the full fee; a purchase payout is the price
  // minus the platform fee, which this record doesn't carry
  const amount =
    kind === "inspection" && "fee" in record
      ? `₦${record.fee.toLocaleString()}`
      : "your payout"
  const what = kind === "inspection" ? "inspection" : "handover"

  if (record.feeReleased || record.status === "funds_released")
    return {
      title: "Payment Released",
      subtitle: `${amount === "your payout" ? "Your payout" : amount} for this ${what} has been added to your wallet.`,
    }

  return {
    title: `${kind === "inspection" ? "Inspection" : "Handover"} Completed — Payment Coming`,
    subtitle: `The buyer has confirmed the ${what}. An admin will release ${amount} to your wallet shortly.`,
  }
}

// What the agent sees before they're allowed to schedule. The UI status
// `inspection_requested` covers four backend statuses, and only
// `inspection_paid` (payment confirmed) means the agent can act.
export function getAgentInspectionBanner(
  status: Inspection["status"]
): BannerConfig | undefined {
  switch (status) {
    case "none":
    case "inspection_requested":
    case "inspection_initialized":
      return {
        title: "Awaiting Buyer Payment",
        subtitle: "The buyer hasn't paid the inspection fee yet.",
      }
    case "inspection_payment_review":
      return {
        title: "Payment Under Review",
        subtitle:
          "The buyer's payment is being confirmed. You can schedule the inspection once it's confirmed.",
      }
    default:
      return undefined
  }
}

export const SCHEDULE_SECTION_LABEL: Partial<
  Record<TransactionStatus, string>
> = {
  inspection_scheduled: "Inspection Details",
  inspection_confirmed: "Inspection Details",
  inspection_completed: "Inspection Details",
  property_payment_pending: "Inspection Details",
  handover_scheduled: "Handover Details",
  handover_confirmed: "Handover Details",
  handover_completed: "Handover Details",
  funds_released: "Handover Details",
}

export const PAYMENT_TYPE_LABEL: Partial<Record<TransactionStatus, string>> = {
  inspection_requested: "Inspection Fee",
  inspection_scheduled: "Inspection Fee",
  inspection_confirmed: "Inspection Fee",
  inspection_completed: "Inspection Fee",
  property_payment_pending: "Property Payment",
  handover_requested: "Property Payment",
  handover_scheduled: "Property Payment",
  handover_confirmed: "Property Payment",
  handover_completed: "Property Payment",
  funds_released: "Property Payment",
}

export function mapInspectionStatusToTransactionStatus(
  status: Inspection["status"]
): TransactionStatus {
  switch (status) {
    case "none":
    case "inspection_requested":
    case "inspection_initialized":
    case "inspection_payment_review":
    case "inspection_paid":
      return "inspection_requested"
    case "inspection_scheduled":
      return "inspection_scheduled"
    case "inspection_confirmed":
      return "inspection_confirmed"
    case "inspection_completed":
      return "inspection_completed"
    // not "completed": that would offer the buyer the purchase step. The
    // first stage has no actions, and the banner explains the cancellation.
    case "inspection_cancelled":
      return "inspection_requested"
    default:
      return "inspection_requested"
  }
}

// add this export
export function getInspectionPaymentStatusLabel(
  status: Inspection["status"]
): string {
  switch (status) {
    case "none":
    case "inspection_requested":
    case "inspection_initialized":
      return "Awaiting Payment"
    case "inspection_payment_review":
      return "Payment Under Review"
    case "inspection_paid":
      return "In Escrow"
    case "inspection_scheduled":
    case "inspection_confirmed":
      return "In Escrow"
    case "inspection_completed":
      return "Completed"
    case "inspection_cancelled":
      return "Cancelled"
    default:
      return "Pending"
  }
}

export function mapPurchaseStatusToTransactionStatus(
  status: Purchase["status"]
): TransactionStatus {
  switch (status) {
    case "none":
    case "property_payment_made":
    case "handover_rescheduled":
      return "property_payment_pending"
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

export function getPurchasePaymentStatusLabel(
  status: Purchase["status"]
): string {
  switch (status) {
    case "none":
      return "Awaiting Payment"
    case "property_payment_made":
      return "In Escrow"
    case "handover_requested":
    case "handover_scheduled":
    case "handover_rescheduled":
    case "handover_confirmed":
      return "In Escrow"
    case "handover_completed":
      return "Completed"
    case "funds_released":
      return "Released"
    default:
      return "Pending"
  }
}
