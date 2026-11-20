// When the admin releases a purchase's escrow, the backend sets
// feeReleased: true and leaves the status at "handover_completed"; it never
// moves to "funds_released". Read a released purchase as "funds_released" so
// labels, lists and the receipt say the money has gone to the agent.
export function purchaseStatusOf<S extends string>(record: {
  status: S
  feeReleased?: boolean
}): S | "funds_released" {
  return record.status === "handover_completed" && record.feeReleased
    ? "funds_released"
    : record.status
}
