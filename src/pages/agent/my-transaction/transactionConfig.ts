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

const COMPLETED_COUNT: Record<TransactionStatus, number> = {
  inspection_requested: 1,
  inspection_scheduled: 2,
  inspection_confirmed: 3,
  inspection_completed: 4,
  property_payment_pending: 5,
  handover_requested: 6,
  handover_scheduled: 6,
  handover_confirmed: 7,
  handover_completed: 8,
  funds_released: 9,
}

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

export function getTimelineSteps(status: TransactionStatus): TimelineStep[] {
  const visible = VISIBLE_STEPS[status]
  const completedCount = COMPLETED_COUNT[status]

  return visible.map((label, index) => ({
    label,
    completedAt: index < completedCount ? "11 Nov · 3:22 PM" : undefined,
  }))
}

export type BannerConfig = {
  title: string
  subtitle: string
}

// Agent-facing banner copy — mirrors buyer phases but from the agent's vantage point
export const BANNER_CONFIG: Partial<Record<TransactionStatus, BannerConfig>> = {
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
