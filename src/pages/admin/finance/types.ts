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
  // the agent's default bank account (the one chosen in the request isn't saved)
  bank: AdminBank | null
  bankCount: number
}
