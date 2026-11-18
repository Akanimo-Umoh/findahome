import type { AdminBank, FinanceTxStatus } from "@/types/adminFinance"

export type LedgerKind =
  | "wallet_funding"
  | "agent_payment"
  | "payout"
  | "escrow_payment"
  | "escrow_release"
  | "refund"

export type LedgerStatus =
  | "completed"
  | "pending"
  | "failed"
  | "declined"
  | "in_escrow"
  | "released"
  | "disputed"
  | "refund_pending"
  | "refunded"

export type PartyRole = "user" | "agent" | "admin" | null

export type LedgerParty = {
  id: string | null
  name: string
  email: string
  role: PartyRole
}

export type LedgerRow = {
  id: string
  code: string
  reference: string | null
  kind: LedgerKind
  title: string
  party: LedgerParty
  amount: number
  status: LedgerStatus
  date: string
  // where "View details" goes, when there is somewhere to go
  href: string | null
}

export type PayoutStatus = "pending" | "completed" | "failed" | "declined"

export type PayoutRow = {
  id: string
  code: string
  agent: LedgerParty
  amount: number
  status: PayoutStatus
  rawStatus: FinanceTxStatus
  date: string
  // where to send the money: the account chosen in the request, or for older
  // withdrawals (made before it was saved) the agent's default account
  bank: PayoutBank | null
  // true when `bank` is the account the agent picked for this withdrawal
  bankFromRequest: boolean
  bankCount: number
}

export type PayoutBank = Pick<
  AdminBank,
  "bankName" | "accountNumber" | "accountName" | "isDefault"
>
