import type { DisputeCategory, DisputeStatus } from "@/services/dispute.service"

export const CATEGORY_LABEL: Record<DisputeCategory, string> = {
  refund_request: "Refund Request",
  property_mismatch: "Property Mismatch",
  agent_misconduct: "Agent Misconduct",
  payment_issue: "Payment Issue",
  other: "Other",
}

export const CATEGORY_OPTIONS: { value: DisputeCategory; label: string }[] = [
  { value: "refund_request", label: CATEGORY_LABEL.refund_request },
  { value: "property_mismatch", label: CATEGORY_LABEL.property_mismatch },
  { value: "agent_misconduct", label: CATEGORY_LABEL.agent_misconduct },
  { value: "payment_issue", label: CATEGORY_LABEL.payment_issue },
  { value: "other", label: CATEGORY_LABEL.other },
]

export const STATUS_LABEL: Record<DisputeStatus, string> = {
  opened: "Pending Review",
  under_review: "Under Review",
  resolved: "Resolved",
  closed: "Closed",
  escalated: "Escalated",
}

export const STATUS_BADGE_BG: Record<DisputeStatus, string> = {
  opened: "bg-[#D02727]",
  under_review: "bg-[#E58A00]",
  resolved: "bg-[#149D18]",
  closed: "bg-text-secondary",
  escalated: "bg-[#D02727]",
}
