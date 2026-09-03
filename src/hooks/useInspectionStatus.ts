import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getUserInspections,
  type Inspection,
} from "@/services/inspection.service"

type InspectionStage =
  | "none" // no inspection requested yet for this property
  | "awaiting_payment" // requested, fee not paid yet
  | "awaiting_confirmation" // paid, waiting on admin to confirm (agent notified automatically)
  | "scheduled" // agent has moved status past inspection_requested

export function useInspectionStatus(propertyId?: string) {
  const { user } = useAuthContext()

  const { data: inspections = [], isLoading } = useQuery({
    queryKey: ["user-inspections", user?._id],
    queryFn: async () => {
      const list = await getUserInspections()
      return list
    },
    enabled: !!user?._id,
  })

  const inspection: Inspection | undefined = propertyId
    ? inspections.find((i) => i.property === propertyId)
    : undefined

  const stage: InspectionStage = !inspection
    ? "none"
    : !inspection.feePaid
      ? "awaiting_payment"
      : inspection.status === "inspection_requested"
        ? "awaiting_confirmation"
        : "scheduled"

  return {
    inspection,
    stage,
    isLoading,
  }
}
