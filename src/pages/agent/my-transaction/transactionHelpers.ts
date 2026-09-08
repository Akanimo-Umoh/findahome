import type { Purchase, PurchaseStatus } from "@/types/purchase"
import type { Inspection } from "@/services/inspection.service"

export type FilterStatus = "all" | "pending" | "completed"

export const PURCHASE_STATUS_LABEL: Record<PurchaseStatus, string> = {
  none: "Awaiting Inspection",
  property_payment_made: "Property Payment Made",
  handover_requested: "Awaiting Handover Schedule",
  handover_scheduled: "Awaiting Buyer Confirmation",
  handover_confirmed: "Handover Upcoming",
  handover_completed: "Handover Completed",
  funds_released: "Payment Released",
}

export const INSPECTION_STATUS_LABEL: Record<Inspection["status"], string> = {
  none: "Not Started",
  inspection_requested: "Awaiting Payment",
  inspection_initialized: "Payment Under Review",
  inspection_paid: "Awaiting Schedule",
  inspection_scheduled: "Awaiting Buyer Confirmation",
  inspection_confirmed: "Inspection Upcoming",
  inspection_completed: "Awaiting Purchase Decision",
  inspection_cancelled: "Cancelled",
}

export function getPurchaseCategory(
  status: PurchaseStatus
): "pending" | "completed" {
  return status === "funds_released" ? "completed" : "pending"
}

export function getInspectionCategory(): "pending" | "completed" {
  return "pending"
}

export function getPropertyId(
  property: string | { _id: string } | undefined
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
  property: string | Record<string, unknown> | undefined
): string | undefined {
  if (typeof property === "string" || !property) return undefined
  const firstImage = property.firstImage
  const image = property.image
  return (
    (typeof firstImage === "string" ? firstImage : undefined) ??
    (typeof image === "string" ? image : undefined)
  )
}

export type MergedItem =
  | { kind: "inspection"; data: Inspection }
  | { kind: "purchase"; data: Purchase }

export const tabs: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]
