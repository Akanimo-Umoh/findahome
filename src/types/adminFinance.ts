export type FinanceTxType = "wallet_funding" | "agent_payment" | "withdrawal"
export type FinanceTxStatus = "pending" | "approved" | "declined" | "failed"

export type FinanceParty = {
  _id: string
  name?: string
  email?: string
  phoneNumber?: string | null
}

// A Transaction from GET /transaction/all-transactions-activities (the recordType "transaction" items; escrows come from GET /escrow instead).
export type FinanceTx = {
  _id: string
  from?: FinanceParty | null
  to?: FinanceParty | null
  amount: number
  reference: string
  type: FinanceTxType
  status: FinanceTxStatus
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

// GET /bank/all
export type AdminBank = {
  _id: string
  user?: { _id: string; name?: string; email?: string } | string | null
  bankName: string
  bankCode: string
  accountNumber: string
  accountName: string
  isDefault?: boolean
}
