import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestError } from "@/lib/requestError"
import {
  confirmWalletFunding,
  getAdminBanks,
  getFinanceTransactions,
  setTransactionStatus,
} from "@/services/admin/finance.service"
import type { AdminBank, FinanceTx } from "@/types/adminFinance"

export const financeKey = ["admin", "finance"] as const

export type FinanceData = {
  transactions: FinanceTx[]
  // undefined when the bank request failed
  banks?: AdminBank[]
}

export function useFinanceData() {
  return useQuery({
    queryKey: financeKey,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    queryFn: async (): Promise<FinanceData> => {
      const [transactions, banks] = await Promise.allSettled([
        getFinanceTransactions(),
        getAdminBanks(),
      ])
      if (transactions.status === "rejected") throw transactions.reason
      return {
        transactions: transactions.value,
        banks: banks.status === "fulfilled" ? banks.value : undefined,
      }
    },
  })
}

// "approved" = the payout was paid. Payouts are sent by hand, outside the platform; this only records that it was done.
export function useSetPayoutStatus() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: "pending" | "approved" | "failed"
    }) => setTransactionStatus(id, status),
    onSuccess: (_res, { id, status }) => {
      const now = new Date().toISOString()
      qc.setQueryData<FinanceData>(financeKey, (old) =>
        old
          ? {
              ...old,
              transactions: old.transactions.map((t) =>
                t._id === id
                  ? {
                      ...t,
                      status,
                      updatedAt: now,
                      approvedAt: status === "approved" ? now : t.approvedAt,
                    }
                  : t
              ),
            }
          : old
      )
      toast.success("Payout marked as paid")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update the payout. Please try again.")
      ),
  })
}

// Confirms a wallet funding payment: the person's wallet is credited.
export function useConfirmFunding() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ reference }: { id: string; reference: string }) =>
      confirmWalletFunding(reference),
    onSuccess: (_res, { id }) => {
      const now = new Date().toISOString()
      qc.setQueryData<FinanceData>(financeKey, (old) =>
        old
          ? {
              ...old,
              transactions: old.transactions.map((t) =>
                t._id === id
                  ? {
                      ...t,
                      status: "approved",
                      approvedAt: now,
                      updatedAt: now,
                    }
                  : t
              ),
            }
          : old
      )
      toast.success("Payment confirmed and wallet credited")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't confirm the payment. Please try again.")
      ),
  })
}
