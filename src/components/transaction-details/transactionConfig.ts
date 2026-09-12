import type { Inspection } from "@/services/inspection.service"
import type { TransactionStatus, TimelineStep } from "@/types/transactions"

const INSPECTION_STEPS = [
  "Payment Made by Buyer",
  "Funds held in Escrow",
  "Agent scheduled an inspection",
  "Inspection schedule confirmed",
  "Inspection Completed",
]

const ALL_STEPS = [
  ...INSPECTION_STEPS,
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
  property_payment_pending: ALL_STEPS,
  handover_requested: ALL_STEPS,
  handover_scheduled: ALL_STEPS,
  handover_confirmed: ALL_STEPS,
  handover_completed: ALL_STEPS,
  funds_released: ALL_STEPS,
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
  inspection?: Pick<
    Inspection,
    "paidAt" | "scheduledAt" | "confirmedAt" | "completedAt"
  >
): TimelineStep[] {
  const visible = VISIBLE_STEPS[status]

  const inspectionDates = [
    inspection?.paidAt,
    inspection?.paidAt,
    inspection?.scheduledAt,
    inspection?.confirmedAt,
    inspection?.completedAt,
  ]

  return visible.map((label, index) => ({
    label,
    completedAt: formatTimelineDate(
      index < inspectionDates.length ? inspectionDates[index] : undefined
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
    case "inspection_paid":
      return "inspection_requested"
    case "inspection_scheduled":
      return "inspection_scheduled"
    case "inspection_confirmed":
      return "inspection_confirmed"
    case "inspection_completed":
    case "inspection_cancelled":
      return "inspection_completed"
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
