export type DisputeStatus =
  | "opened"
  | "under_review"
  | "escalated"
  | "resolved"
  | "closed"

export type DisputeParty = {
  _id: string
  name?: string
  email?: string
  // the admin list populates "phone", which is not a User field, so this is empty until the backend populates phoneNumber
  phoneNumber?: string | null
}

// One row of GET /dispute/admin/all.
export type AdminDispute = {
  _id: string
  referenceId: string
  status: DisputeStatus
  category: string
  description: string
  disputeFiles?: string[]
  resolutionNotes?: string
  property?: { _id: string; title?: string } | null
  user?: DisputeParty | null // the buyer who raised it
  agent?: DisputeParty | null
  admin?: DisputeParty | null
  purchase?: { _id: string; price?: number } | null
  inspection?: { _id: string; fee?: number } | null
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  closedAt?: string
}
