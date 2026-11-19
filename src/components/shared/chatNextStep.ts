import type { DealStage } from "@/hooks/usePropertyDeal"

export type NextStep = {
  title: string
  icon: "pay" | "visit"
  // "pay" opens the inspection fee modal, "link" goes to `to`,
  // "status" is a read-only label for when the other side has to act
  kind: "pay" | "link" | "status"
  to?: string
}

type Ids = {
  inspectionId?: string
  purchaseId?: string
  // another buyer has paid for the property (or their payment is under
  // review), so this buyer can't buy it; inspections stay open
  propertyTaken?: boolean
}

const status = (title: string, icon: NextStep["icon"]): NextStep => ({
  title,
  icon,
  kind: "status",
})

// a link needs a real record id, without one there is nothing to open
const link = (
  title: string,
  icon: NextStep["icon"],
  to?: string
): NextStep | null => (to ? { title, icon, kind: "link", to } : null)

export function getNextStep(
  stage: DealStage,
  isAgent: boolean,
  ids: Ids
): NextStep | null {
  return isAgent ? getAgentStep(stage, ids) : getBuyerStep(stage, ids)
}

function getBuyerStep(
  stage: DealStage,
  { inspectionId, purchaseId, propertyTaken }: Ids
): NextStep | null {
  // the buying steps close once someone else has paid for the property
  if (
    propertyTaken &&
    (stage === "inspection_completed" || stage === "purchase_unpaid")
  )
    return status("Property under offer", "pay")

  switch (stage) {
    case "none":
    case "inspection_unpaid":
      return { title: "Pay inspection fee", icon: "pay", kind: "pay" }

    case "inspection_review":
      return status("Payment under review", "pay")

    case "inspection_awaiting_schedule":
      return status("Awaiting agent schedule", "visit")

    case "inspection_scheduled":
      return link(
        "Confirm inspection date",
        "visit",
        inspectionId && `/transactions/${inspectionId}`
      )

    case "inspection_confirmed":
      return link(
        "View visit details",
        "visit",
        inspectionId && `/transactions/${inspectionId}/visit`
      )

    case "inspection_completed":
      // the payment page starts from the completed inspection
      return link(
        "Purchase property",
        "pay",
        inspectionId && `/property-payment/${inspectionId}`
      )

    case "inspection_cancelled":
      // refunded (or never paid), so the buyer may start over; the server
      // ignores cancelled requests and creates a fresh one
      return {
        title: "Request inspection again",
        icon: "pay",
        kind: "pay",
      }

    case "inspection_refund_pending":
      return status("Refund in progress", "pay")

    case "purchase_unpaid":
      // same page as above, it resumes the unpaid purchase
      return link(
        "Pay for property",
        "pay",
        inspectionId && `/property-payment/${inspectionId}`
      )

    case "purchase_review":
      return status("Payment under review", "pay")

    case "handover_awaiting_schedule":
      return status("Awaiting handover schedule", "visit")

    case "handover_scheduled":
      return link(
        "Confirm handover date",
        "visit",
        purchaseId && `/transactions/${purchaseId}?type=purchase`
      )

    case "handover_confirmed":
      return link(
        "View handover details",
        "visit",
        purchaseId && `/transactions/${purchaseId}/visit?type=purchase`
      )

    case "handover_completed":
    case "funds_released":
      return link(
        "View receipt",
        "pay",
        purchaseId && `/transactions/${purchaseId}/receipt?type=purchase`
      )
  }
}

function getAgentStep(
  stage: DealStage,
  { inspectionId, purchaseId }: Ids
): NextStep | null {
  switch (stage) {
    case "none":
      return null

    case "inspection_unpaid":
      return status("Awaiting inspection payment", "pay")

    // the buyer has paid; an admin still has to approve it before the agent
    // can schedule
    case "inspection_review":
      return status("Payment under review", "pay")

    case "inspection_awaiting_schedule":
      return link(
        "Schedule visit",
        "visit",
        inspectionId &&
          `/agent/transactions/${inspectionId}/schedule-inspection`
      )

    case "inspection_scheduled":
    case "inspection_confirmed":
    case "inspection_completed":
      return link(
        "Visit details",
        "visit",
        inspectionId &&
          `/agent/transactions/${inspectionId}/visit?type=inspection`
      )

    case "inspection_cancelled":
    case "inspection_refund_pending":
      return status("Inspection cancelled", "visit")

    case "purchase_unpaid":
      return status("Awaiting property payment", "pay")

    // same wording as the inspection review and the buyer's side
    case "purchase_review":
      return status("Payment under review", "pay")

    case "handover_awaiting_schedule":
      return link(
        "Schedule handover",
        "visit",
        purchaseId && `/agent/transactions/${purchaseId}/schedule-handover`
      )

    case "handover_scheduled":
    case "handover_confirmed":
    case "handover_completed":
      return link(
        "Handover details",
        "visit",
        purchaseId && `/agent/transactions/${purchaseId}/visit?type=purchase`
      )

    case "funds_released":
      return link(
        "View transaction",
        "pay",
        purchaseId && `/agent/transactions/${purchaseId}?type=purchase`
      )
  }
}
