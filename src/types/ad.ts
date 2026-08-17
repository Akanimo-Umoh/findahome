export type AdObjective = "views" | "leads" | "sales"
export type AdStatus =
  | "pending"
  | "active"
  | "paused"
  | "completed"
  | "rejected"
export type PauseReason = "budget" | "manual"

export type Ad = {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    profilePicture?: string | string[] | null
  }
  property: {
    _id: string
    title: string
    images: string[]
    price: number
    address: string
  }
  objective: AdObjective
  dailyBudget: number
  duration: number
  adBudget: number
  status: AdStatus
  isPaid: boolean
  paymentReference: string | null
  createdAt: string
  // TODO: not in schema yet — needed for the "paused" pill's message
  pauseReason?: PauseReason
  // TODO: confirm exact field names for these once analytics/tracking exists on the backend
  views?: number
  clicks?: number
  spent?: number
}

export type AdDraft = {
  propertyId: string
  propertyTitle: string
  propertyImage: string | null
  propertyPrice: number
  objective: AdObjective | null
  dailyBudget: number
  duration: number
}

// kept for backward compat with AdCampaignConfirmed — same shape as Ad
export type CreatedAd = Ad
