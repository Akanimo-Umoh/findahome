import type { MergedTransaction } from "@/services/transaction.service"

export type FilterStatus = "all" | "pending" | "completed"

const PURCHASE_STATUS_LABEL: Record<string, string> = {
  none: "Awaiting Inspection",
  property_payment_made: "Property Payment Made",
  handover_requested: "Awaiting Handover Schedule",
  handover_scheduled: "Awaiting Buyer Confirmation",
  handover_confirmed: "Handover Upcoming",
  handover_completed: "Handover Completed",
  funds_released: "Payment Released",
}

const INSPECTION_STATUS_LABEL: Record<string, string> = {
  none: "Not Started",
  inspection_requested: "Awaiting Payment",
  inspection_initialized: "Payment Under Review",
  inspection_paid: "Awaiting Schedule",
  inspection_scheduled: "Awaiting Buyer Confirmation",
  inspection_confirmed: "Inspection Upcoming",
  inspection_completed: "Completed",
  inspection_cancelled: "Cancelled",
}

export function getStatusLabel(item: MergedTransaction): string {
  const map =
    item.recordType === "purchase"
      ? PURCHASE_STATUS_LABEL
      : INSPECTION_STATUS_LABEL
  return map[item.status] ?? item.status
}

export function getCategory(item: MergedTransaction): "pending" | "completed" {
  if (item.recordType === "purchase") {
    return item.status === "funds_released" ? "completed" : "pending"
  }
  return item.status === "inspection_completed" ? "completed" : "pending"
}

export function getPropertyId(
  property: { _id: string } | string | undefined
): string {
  return typeof property === "string" ? property : (property?._id ?? "")
}

export function getPersonName(
  person: string | { name?: string; email: string } | undefined
): string {
  if (!person) return ""
  return typeof person === "string" ? "" : (person.name ?? person.email)
}

export function getPropertyImage(
  property: { image?: string; firstImage?: string } | string | undefined
): string | undefined {
  if (typeof property === "string" || !property) return undefined
  return property.image ?? property.firstImage
}

export const tabs: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]
