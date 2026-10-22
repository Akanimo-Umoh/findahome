import api from "@/services/api"
import type { AdminBank, FinanceTx } from "@/types/adminFinance"

// Wallet funding, agent payments and withdrawals (payouts), newest first.
export const getFinanceTransactions = async (): Promise<FinanceTx[]> => {
  const { data } = await api.get("/transaction/all-transactions-activities")
  const activities: (FinanceTx & { recordType?: string })[] =
    data.activities ?? []
  return activities.filter((a) => a.recordType === "transaction")
}

// Admin only. Used to show where a payout should be sent.
export const getAdminBanks = async (): Promise<AdminBank[]> => {
  const { data } = await api.get("/bank/all")
  return data.data ?? []
}

export const setTransactionStatus = async (
  transactionId: string,
  status: "pending" | "approved" | "failed"
) => {
  const { data } = await api.post("/transaction/change-transaction-status", {
    transactionId,
    status,
  })
  return data
}
