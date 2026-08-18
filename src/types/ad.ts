export type AdObjective = "views" | "leads" | "sales"
export type AdStatus = "pending" | "active" | "paused" | "completed"
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
  pauseReason?: PauseReason
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

export type CreatedAd = Ad
