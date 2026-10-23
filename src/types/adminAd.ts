import type { AdObjective } from "@/types/ad"

// "rejected" is not on the backend yet; the UI is ready for it.
export type AdminAdStatus =
  | "pending"
  | "active"
  | "paused"
  | "completed"
  | "rejected"

// One row of GET /ads (admin sees every ad).
export type AdminAd = {
  _id: string
  user?: {
    _id: string
    name?: string
    email?: string
    phoneNumber?: string | null
  } | null
  property?: {
    _id: string
    title?: string
    images?: string[]
    price?: number
    address?: string
  } | null
  objective: AdObjective
  dailyBudget: number
  duration: number // days
  adBudget: number
  status: AdminAdStatus
  isPaid: boolean
  paymentReference: string | null
  views?: number
  clicks?: number
  spent?: number
  pauseReason?: string | null
  createdAt: string
  updatedAt: string

  // ---- not on the backend yet ----
  adminNote?: string
  startedAt?: string
  endsAt?: string
}
