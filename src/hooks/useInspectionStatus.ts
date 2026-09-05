import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getUserInspections,
  type Inspection,
} from "@/services/inspection.service"

export type InspectionStage =
  | "none" // no inspection requested yet for this property
  | "awaiting_payment" // requested, fee not paid yet
  | "awaiting_confirmation" // Paystack started, waiting on admin verification
  | "awaiting_schedule" // paid, waiting on agent to pick a date
  | "awaiting_buyer_confirm" // agent picked a date, buyer must confirm/reject
  | "confirmed" // buyer confirmed, visit upcoming
  | "completed" // visit done, buyer can purchase
  | "cancelled"

function getPropertyId(property: Inspection["property"]): string {
  return typeof property === "string" ? property : property?._id
}

const STAGE_BY_STATUS: Record<Inspection["status"], InspectionStage> = {
  none: "none",
  inspection_requested: "awaiting_payment",
  inspection_initialized: "awaiting_confirmation",
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

  const inspection: Inspection | undefined = propertyId
    ? inspections.find((i) => getPropertyId(i.property) === propertyId)
    : undefined

  const stage: InspectionStage = inspection
    ? STAGE_BY_STATUS[inspection.status]
    : "none"

  return {
    inspection,
    stage,
    isLoading,
  }
}
