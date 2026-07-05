import type { TransactionStatus } from "@/types/transactions"

export type MockTransaction = {
  transactionId: string
  status: TransactionStatus
}

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  { transactionId: "txn-001", status: "inspection_requested" },
  { transactionId: "txn-002", status: "inspection_scheduled" },
  { transactionId: "txn-003", status: "inspection_confirmed" },
  { transactionId: "txn-004", status: "inspection_completed" },
  { transactionId: "txn-005", status: "property_payment_pending" },
  { transactionId: "txn-006", status: "handover_requested" },
  { transactionId: "txn-007", status: "handover_scheduled" },
  { transactionId: "txn-008", status: "handover_confirmed" },
  { transactionId: "txn-009", status: "handover_completed" },
  { transactionId: "txn-010", status: "funds_released" },
]

export function getMockTransaction(
  transactionId: string
): MockTransaction | undefined {
  return MOCK_TRANSACTIONS.find((t) => t.transactionId === transactionId)
}
