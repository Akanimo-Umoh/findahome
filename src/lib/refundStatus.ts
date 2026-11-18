type CancellableRecord = {
  status: string
  refundDue?: boolean
  refundSentAt?: string | null
}

// A cancelled inspection or purchase is either waiting for the admin to send
// the money back, already refunded, or just cancelled. Null when it isn't
// cancelled. Refunds are sent offline by the admin and only recorded here.
export function cancelledLabel(record: CancellableRecord): string | null {
  if (
    record.status !== "inspection_cancelled" &&
    record.status !== "purchase_cancelled"
  )
    return null
  if (record.refundDue) return "Refund Pending"
  if (record.refundSentAt) return "Refunded"
  return "Cancelled"
}
