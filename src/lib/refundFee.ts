// The owner's rule: a refunded or cancelled payment costs the buyer a fixed
// processing fee between ₦2,000 and ₦10,000, depending on the amount paid.
// The admin sends refunds offline, so the fee is taken off the amount sent.
// The admin can waive it when the refund isn't the buyer's fault (a rejected
// duplicate payment, a property already taken, an agent who didn't show up).
export const REFUND_FEE_MIN = 2_000
export const REFUND_FEE_MAX = 10_000

const naira = (n: number) => `₦${n.toLocaleString()}`

export const REFUND_FEE_RANGE = `${naira(REFUND_FEE_MIN)}–${naira(REFUND_FEE_MAX)}`

// The fee for refunding `amountPaid`, never more than the amount itself.
//   under ₦100,000           → ₦2,000
//   ₦100,000 to ₦1,000,000   → ₦5,000
//   over ₦1,000,000          → ₦10,000
// Keep in step with the backend's calculateRefundFee.
export function calculateRefundFee(amountPaid: number): number {
  if (!amountPaid || amountPaid <= 0) return 0
  const fee =
    amountPaid < 100_000 ? 2_000 : amountPaid <= 1_000_000 ? 5_000 : 10_000
  return Math.min(fee, amountPaid)
}

// an inspection cancelled because another buyer secured the property: the
// buyer did nothing wrong, so the refund is in full (the server enforces it)
export const PROPERTY_TAKEN = "property_taken"

export const isPropertyTakenCancel = (
  r?: { cancelReason?: string | null } | null
) => r?.cancelReason === PROPERTY_TAKEN

// one wording everywhere the buyer is told about it
export const REFUND_FEE_NOTICE = `If this payment is refunded or cancelled, a processing fee of ${REFUND_FEE_RANGE} (depending on the amount paid) is deducted from the refund.`

// the tiers spelled out, for the escrow terms
export const REFUND_FEE_TIERS = `${naira(2_000)} under ${naira(100_000)}, ${naira(5_000)} up to ${naira(1_000_000)}, ${naira(10_000)} above`
