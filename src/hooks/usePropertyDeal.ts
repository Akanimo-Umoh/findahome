import { useUserActivities } from "@/hooks/useUserActivities"
import { useAgentTransactionsList } from "@/hooks/useAgentTransactionsList"
import type { MergedTransaction } from "@/services/transaction.service"

// where one property deal stands between a buyer and an agent, from the first inspection request to the funds release. the chat mini actions read this and decide what each side should see
export type DealStage =
  | "none" // nothing started for this property
  | "inspection_unpaid" // requested, fee not paid yet
  | "inspection_review" // payment started, waiting to be verified
  | "inspection_awaiting_schedule" // fee paid, agent has to pick a date
  | "inspection_scheduled" // agent picked a date, buyer has to confirm
  | "inspection_confirmed" // buyer confirmed, visit upcoming
  | "inspection_completed" // visit done, buyer can buy
  | "inspection_cancelled"
  | "purchase_unpaid" // purchase started, property not paid for yet
  | "handover_awaiting_schedule" // property paid, agent has to pick a handover date
  | "handover_scheduled" // agent picked a date, buyer has to confirm
  | "handover_confirmed" // buyer confirmed, handover upcoming
  | "handover_completed" // handover done, funds releasing
  | "funds_released"

const INSPECTION_STAGE: Record<string, DealStage> = {
  none: "none",
  inspection_requested: "inspection_unpaid",
  inspection_initialized: "inspection_review",
  inspection_paid: "inspection_awaiting_schedule",
  inspection_scheduled: "inspection_scheduled",
  inspection_confirmed: "inspection_confirmed",
  inspection_completed: "inspection_completed",
  inspection_cancelled: "inspection_cancelled",
}

const PURCHASE_STAGE: Record<string, DealStage> = {
  none: "purchase_unpaid",
  property_payment_made: "handover_awaiting_schedule",
  handover_requested: "handover_awaiting_schedule",
  // the buyer suggested a new time, so the agent has to schedule again
  handover_rescheduled: "handover_awaiting_schedule",
  handover_scheduled: "handover_scheduled",
  handover_confirmed: "handover_confirmed",
  handover_completed: "handover_completed",
  funds_released: "funds_released",
}

function idOf(person: MergedTransaction["buyer"]) {
  return typeof person === "string" ? person : person?._id
}

type UsePropertyDealOptions = {
  propertyId?: string
  // the agent's chat is with the buyer, so the buyer's id is needed to pick the right deal when several buyers are interested in the same property
  buyerId?: string
  isAgent: boolean
}

export function usePropertyDeal({
  propertyId,
  buyerId,
  isAgent,
}: UsePropertyDealOptions) {
  // both are always called (hooks can't be conditional), only one is enabled
  const buyerSide = useUserActivities(!isAgent)
  const agentSide = useAgentTransactionsList(isAgent)
  const { items, isLoading } = isAgent ? agentSide : buyerSide

  const belongsToThisChat = (item: MergedTransaction) => {
    if (!propertyId || item.property?._id !== propertyId) return false
    if (!isAgent) return true
    const itemBuyerId = idOf(
      item.recordType === "purchase" ? item.buyer : item.user
    )
    return !!buyerId && itemBuyerId === buyerId
  }

  // items arrive newest first, so find() gives the latest record of each kind
  const inspection = items.find(
    (item) => item.recordType === "inspection" && belongsToThisChat(item)
  )
  const purchase = items.find(
    (item) => item.recordType === "purchase" && belongsToThisChat(item)
  )

  // once a purchase exists it is further along than the inspection
  const stage: DealStage =
    (purchase && PURCHASE_STAGE[purchase.status]) ||
    (inspection && INSPECTION_STAGE[inspection.status]) ||
    "none"

  return { stage, inspection, purchase, isLoading }
}
