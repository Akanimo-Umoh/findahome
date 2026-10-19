// What the admin Listings screens read from the backend. Only fields the
// screens use are typed. Fields marked "not on the backend yet" are optional on
// purpose: the UI works without them and lights up when the backend adds them.

export type PropertyStatus = "pending" | "approved" | "rejected"
export type PropertyKind = "land" | "apartment" | "duplex" | "bungalow"
export type ListingKind = "rent" | "sale"

type PersonRef = { _id?: string; name?: string } | string

export type AdminNote = {
  _id: string
  note: string
  createdAt: string
  author?: PersonRef
}

export type StatusEvent = {
  status: PropertyStatus
  at: string
  by?: PersonRef
}

export type AdminProperty = {
  _id: string
  code?: string // not on the backend yet — the UI derives PROP-XXXXXX from _id
  title: string
  price: number
  address: string
  images: string[]
  videos: string[]
  propertyType: PropertyKind
  listingType: ListingKind
  status: PropertyStatus
  description?: string
  bedroom?: number
  bathroom?: number
  kitchen?: number
  landSize?: string
  landUnit?: string
  landType?: string
  landCondition?: string
  landDocTitle?: string
  legalDocuments?: string[]
  escrowFee?: number
  inspectionFee?: number
  // embedded copy of the agent; verification/listing counts here can go stale
  owner: { _id: string; name: string; profilePicture?: string[] }
  createdAt: string
  updatedAt: string

  // ---- not on the backend yet ----
  isFlagged?: boolean
  flagReason?: string
  adminNotes?: AdminNote[]
  statusHistory?: StatusEvent[]
}

export type RiskLevel = "none" | "low" | "medium" | "high"

// GET /user/agents/:id
export type AdminAgentProfile = {
  _id: string
  name: string
  email: string
  phoneNumber?: string | null
  profilePicture?: string[]
  isVerified?: boolean
  businessName?: string | null
  licenseNumber?: string | null
  createdAt?: string
  riskLevel?: RiskLevel // not on the backend yet
}
