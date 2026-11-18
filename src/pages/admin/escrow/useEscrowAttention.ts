import { useMemo } from "react"
import { buildPendingPayments, buildRefundsDue } from "./pendingPayments"
import type { EscrowRow } from "./types"
import { useEscrowData } from "./useEscrow"

// The deal is finished and the funds are still held, so the admin has to release them.
export const needsRelease = (row: EscrowRow) =>
  row.releaseReady && !row.released && row.status === "in_escrow"

// What needs the admin on the escrow page: payments to approve or reject,
// funds to release, and refunds to send (approved escrow refunds plus
// rejected payments).
export function useEscrowAttention() {
  const { data } = useEscrowData({ background: true })

  return useMemo(() => {
    const rows = data?.rows ?? []
    const pendingPayments = buildPendingPayments(
      data?.inspections,
      data?.purchases
    ).length
    const readyToRelease = rows.filter(needsRelease).length
    const refundsToSend =
      rows.filter((r) => r.status === "refund_pending").length +
      buildRefundsDue(
        data?.inspections,
        data?.purchases,
        new Set(rows.map((r) => r.reference))
      ).length
    return {
      pendingPayments,
      readyToRelease,
      refundsToSend,
      total: pendingPayments + readyToRelease + refundsToSend,
    }
  }, [data])
}
