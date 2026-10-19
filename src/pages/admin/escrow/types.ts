import type { RawDispute, RawLinkedRecord } from "@/types/adminEscrow"

export type EscrowKind = "inspection" | "purchase"
export type EscrowState = "in_escrow" | "released" | "disputed"
export type EscrowTab = "all" | EscrowState
export type EscrowAction = "release" | "hold"

export interface Party {
  id: string | null
  name: string
  email: string
  phone: string | null
}

export interface EscrowRow {
  id: string
  code: string
  reference: string
  kind: EscrowKind
  status: EscrowState
  released: boolean
  amount: number
  createdAt: string
  propertyId: string | null
  propertyTitle: string
  propertyAddress: string | null
  buyer: Party
  agent: Party
  linked: RawLinkedRecord | null
  dispute: RawDispute | null
  openDispute: boolean
}

export interface EscrowStatsData {
  total: number
  inEscrow: number
  released: number
  disputed: number
  count: Record<EscrowTab, number>
}
