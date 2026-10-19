// Raw shapes returned by the backend's admin-facing list endpoints.
// Only the fields the admin screens actually read are typed here — extend a type when a page needs another field, don't mirror the whole schema.

type PersonRef = { _id?: string; name?: string } | string | null

export type AdminUserRecord = {
  _id: string
  name?: string
  role: "user" | "agent" | "admin"
  createdAt?: string
}

export type AdminListingRecord = {
  _id: string
  title?: string
  status: string // "pending" | "approved" | "rejected" on the backend today
  createdAt?: string
  updatedAt?: string
}

export type AdminDisputeEscrowRef = {
  _id: string
  price?: number // purchase
  fee?: number // inspection
  feePaid?: boolean
  feeReleased?: boolean
}

export type AdminDisputeRecord = {
  _id: string
  referenceId: string
  category?: string
  purchase?: AdminDisputeEscrowRef | string | null
  inspection?: AdminDisputeEscrowRef | string | null
  status: "opened" | "under_review" | "resolved" | "closed" | "escalated"
  openedAt?: string
  resolvedAt?: string
  closedAt?: string
  createdAt?: string
}

export type AdminAdRecord = {
  _id: string
  status: "pending" | "active" | "completed" | "paused"
  isPaid: boolean
  adBudget: number
  createdAt?: string
}

export type AdminTransactionRecord = {
  recordType: "transaction"
  _id: string
  type: "wallet_funding" | "agent_payment" | "withdrawal"
  status: "pending" | "approved" | "declined" | "failed"
  amount: number
  createdAt: string
  approvedAt?: string
  from?: PersonRef
  to?: PersonRef
}

export type AdminEscrowRecord = {
  recordType: "escrow"
  _id: string
  status: string
  amount: number
  createdAt: string
}

// GET /transaction/all-transactions-activities returns both kinds, tagged.
export type AdminActivityRecord = AdminTransactionRecord | AdminEscrowRecord
