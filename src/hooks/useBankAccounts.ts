import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getBankAccounts,
  setDefaultBankAccount,
  deleteBankAccount,
} from "@/services/bank.service"

export function useBankAccounts() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: getBankAccounts,
  })

  const setDefault = async (id: string) => {
    await setDefaultBankAccount(id)
    queryClient.invalidateQueries({ queryKey: ["bankAccounts"] })
  }

  const remove = async (id: string) => {
    await deleteBankAccount(id)
    queryClient.invalidateQueries({ queryKey: ["bankAccounts"] })
  }

  return {
    accounts: data ?? [],
    isLoading,
    error: error ? "Failed to load bank accounts" : null,
    setDefault,
    remove,
  }
}
