import api from "@/services/api"

export type ActivityRecordType = "transaction" | "escrow"
export type TransactionRecordType = "purchase" | "inspection"

export type MergedActivity = {
  _id: string
  recordType: ActivityRecordType
  createdAt: string
  updatedAt?: string
  amount?: number
  status?: string
  type?: string // Transaction.type, e.g. "wallet_funding" | "withdrawal" | "agent_payment"
  property?: {
    _id: string
    title: string
    price?: number
    address?: string
    image?: string
  }
  buyer?: { _id: string; name?: string; email: string } | string
  seller?: string
  from?: { _id: string; name?: string; email: string } | string
  to?: { _id: string; name?: string; email: string } | string
}

export type MergedTransaction = {
  _id: string
  recordType: TransactionRecordType
  status: string
  price?: number // purchase
  fee?: number // inspection
  createdAt: string
  updatedAt: string
  buyer?: { _id: string; name?: string; email: string } | string
  user?: { _id: string; name?: string; email: string } | string
  owner?: { _id: string; name?: string; email: string } | string
  seller?: { _id: string; name?: string; email: string } | string
  property?: {
    _id: string
    title: string
    price?: number
    address?: string
    image?: string
  }
}

export async function getAgentTransactionsAndEscrows() {
  const res = await api.get("/transaction/agent-transactions-activities")
  return res.data as {
    success: boolean
    count: number
    totalEarned: number
    activities: MergedActivity[]
  }
}

export async function getAgentPurchasesAndInspections() {
  const res = await api.get("/transaction/agent-transactions")
  return res.data as {
    success: boolean
    count: number
    activities: MergedTransaction[]
  }
}

// get user transactions (purchases + inspections)
export async function getUserPurchasesAndInspections() {
  const res = await api.get("/transaction/user-transactions")
  return res.data as {
    success: boolean
    count: number
    activities: MergedTransaction[]
  }
}
