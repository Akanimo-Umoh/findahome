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
  _id: string
  property?: RawProperty | null
  buyer?: RawUser | null
  seller?: RawUser | null
  amount: number
  status: string // on_hold | released
  type?: string // inspection | purchase
  reference?: string
  createdAt: string
}

// A Purchase or an Inspection (same reference as the escrow)
export interface RawLinkedRecord {
  _id: string
  reference?: string
  status: string
  property?: RawProperty | null
  buyer?: RawUser | null // purchase
  user?: RawUser | null // inspection
  owner?: RawUser | null
  feePaid?: boolean
  feeReleased?: boolean
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
