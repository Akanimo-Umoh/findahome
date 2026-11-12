export interface RawUser {
  _id: string
  name?: string
  email?: string
  phoneNumber?: string | null
}

export interface RawProperty {
  _id: string
  title?: string
  price?: number
  address?: string
  escrowFee?: number
  serviceCharge?: number
}

export interface RawEscrow {
  code?: string
  _id: string
  property?: RawProperty | null
  buyer?: RawUser | null
  seller?: RawUser | null
  amount: number
  platformFee?: number
  netPayout?: number
  status: "on_hold" | "released" | "refunded"
  type?: string // inspection | purchase
  reference?: string
  createdAt: string
  releasedAt?: string | null
  releasedBy?: RawUser | string | null
  reason?: string | null
}

// A Purchase or an Inspection (same reference as the escrow)
export interface RawLinkedRecord {
  _id: string
  code?: string
  reference?: string
  status: string
  property?: RawProperty | null
  buyer?: RawUser | null // purchase
  user?: RawUser | null // inspection
  owner?: RawUser | null
  feePaid?: boolean
  feeReleased?: boolean
  platformFee?: number
  fee?: number // inspection fee
  price?: number // purchase amount
  initializedAt?: string
  paidAt?: string
  scheduledAt?: string
  confirmedAt?: string
  completedAt?: string
}

type Ref = string | { _id: string } | null | undefined

export interface RawDispute {
  _id: string
  referenceId: string
  user?: { _id: string; name?: string; email?: string } | string | null
  property?: { _id: string; title?: string } | null
  status: string // opened | under_review | resolved | closed | escalated
  category: string
  description: string
  createdAt: string
  purchase?: Ref
  inspection?: Ref
}
