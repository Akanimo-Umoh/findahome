import { useMemo } from "react"
import { buildPendingPayments } from "./pendingPayments"
import type { EscrowRow } from "./types"
import { useEscrowData } from "./useEscrow"

// The deal is finished and the funds are still held, so the admin has to release them.
export const needsRelease = (row: EscrowRow) =>
  row.releaseReady && !row.released && row.status !== "refunded"

// What needs the admin on the escrow page: payments to confirm and funds to release.
export function useEscrowAttention() {
  const { data } = useEscrowData({ background: true })

  return useMemo(() => {
    const pendingPayments = buildPendingPayments(
      data?.inspections,
      data?.purchases
    ).length
    const readyToRelease = (data?.rows ?? []).filter(needsRelease).length
    return {
      pendingPayments,
      readyToRelease,
      total: pendingPayments + readyToRelease,
    }
  }, [data])
}
