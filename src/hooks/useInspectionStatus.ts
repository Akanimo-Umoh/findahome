import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getUserInspections,
  type Inspection,
} from "@/services/inspection.service"

export type InspectionStage =
  | "none" // no inspection requested yet for this property
  | "awaiting_payment" // requested, fee not paid yet
  | "awaiting_confirmation" // Paystack confirmed the payment, waiting on admin approval
  | "awaiting_schedule" // paid, waiting on agent to pick a date
  | "awaiting_buyer_confirm" // agent picked a date, buyer must confirm/reject
  | "confirmed" // buyer confirmed, visit upcoming
  | "completed" // visit done, buyer can purchase
  | "cancelled" // refunded (or never paid): a new request is allowed
  | "refund_pending" // cancelled, money not sent back yet: no new request until it is

function getPropertyId(property: Inspection["property"]): string {
  return typeof property === "string" ? property : property?._id
}

const STAGE_BY_STATUS: Record<Inspection["status"], InspectionStage> = {
  none: "none",
  inspection_requested: "awaiting_payment",
  inspection_initialized: "awaiting_payment",
  inspection_payment_review: "awaiting_confirmation",
  inspection_paid: "awaiting_schedule",
  inspection_scheduled: "awaiting_buyer_confirm",
  inspection_confirmed: "confirmed",
  inspection_completed: "completed",
  inspection_cancelled: "cancelled",
}

export function useInspectionStatus(propertyId?: string) {
  const { user } = useAuthContext()

  const { data: inspections = [], isLoading } = useQuery({
    queryKey: ["user-inspections", user?._id],
    queryFn: getUserInspections,
    enabled: !!user?._id,
  })

  // After a refunded cancellation the buyer can request again, so one
  // property can have old cancelled records and a new one. The live one
  // wins, then a cancellation still waiting for its refund (it blocks a new
  // request), then any other.
  const forProperty = propertyId
    ? inspections.filter((i) => getPropertyId(i.property) === propertyId)
    : []
  const inspection: Inspection | undefined =
    forProperty.find((i) => i.status !== "inspection_cancelled") ??
    forProperty.find((i) => i.refundDue) ??
    forProperty[0]

  const stage: InspectionStage = !inspection
    ? "none"
    : inspection.status === "inspection_cancelled" && inspection.refundDue
      ? "refund_pending"
      : STAGE_BY_STATUS[inspection.status]

  return {
    inspection,
    stage,
    isLoading,
  }
}
