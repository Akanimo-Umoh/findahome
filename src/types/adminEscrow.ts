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
  // refund_pending: the admin approved a refund but hasn't sent the money yet
  status: "on_hold" | "refund_pending" | "released" | "refunded"
  type?: string // inspection | purchase
  reference?: string
  createdAt: string
  releasedAt?: string | null
  releasedBy?: RawUser | string | null
  reason?: string | null
  // recorded when the admin marks an offline refund as sent
  refundApprovedAt?: string | null
  refundedAt?: string | null
  refundedAmount?: number | null
  transferReference?: string | null
  refundNote?: string | null
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
  // Paystack's amount differed from the expected one; paidAmount is what Paystack received
  amountMismatch?: boolean
  paidAmount?: number
  // a rejected payment (or refunded deal) whose money hasn't been sent back yet
  refundDue?: boolean
  refundAmount?: number
  refundSentAt?: string | null
  initializedAt?: string
  paidAt?: string
  paystackPaidAt?: string
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
