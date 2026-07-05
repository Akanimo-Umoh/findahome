import type { TransactionStatus, TimelineStep } from "@/types/transactions"

// Inspection-only phases show steps 0–4 (no property payment or handover steps)
// Handover phases show all steps
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

// How many steps are complete at each status
const COMPLETED_COUNT: Record<TransactionStatus, number> = {
  inspection_requested: 1, // Payment Made by Buyer
  inspection_scheduled: 2, // + Funds held in Escrow (agent has scheduled)
  inspection_confirmed: 3, // + Agent scheduled an inspection
  inspection_completed: 4, // + Inspection schedule confirmed
  property_payment_pending: 5, // + Inspection Completed
  handover_requested: 6, // + Property Payment Made
  handover_scheduled: 6, // same — agent scheduled but user hasn't confirmed
  handover_confirmed: 7, // + Agent scheduled handover
  handover_completed: 8, // + Handover schedule confirmed
  funds_released: 9, // + Property Handover Completed (all done)
}

// Inspection phases only show the first 5 steps — no property payment / handover noise
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
    // TODO: replace hardcoded date with real timestamp from API
  }))
}

export type BannerConfig = {
  title: string
  subtitle: string
}

// CHANGED banners — review notes below:
// • inspection_requested: NEW — lets user know they're waiting on the agent
// • inspection_scheduled: EDITED — was "Awaiting Your Confirmation", now more action-oriented
// • inspection_confirmed: NEW — reminds user their visit is coming up
// • handover_requested: NEW — lets user know they're waiting on the agent
// • handover_scheduled: EDITED — was "Awaiting Your Confirmation", now more action-oriented
// • handover_confirmed: NEW — reminds user their handover is coming up
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

// No entry for inspection_requested / handover_requested — at those
// statuses no schedule exists yet (agent hasn't picked a date), so the
// schedule details section should not render. Absence of a key here is
// the signal TransactionDetails uses to hide the section.
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
