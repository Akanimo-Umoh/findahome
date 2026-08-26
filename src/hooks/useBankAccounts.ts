import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getBankAccounts,
  setDefaultBankAccount,
  deleteBankAccount,
} from "@/services/bank.service"

export function useBankAccounts() {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["bankAccounts", user?._id],
    queryFn: () => getBankAccounts(user!._id),
    enabled: !!user?._id,
  })

  const setDefault = async (id: string) => {
    await setDefaultBankAccount(id)
    queryClient.invalidateQueries({ queryKey: ["bankAccounts", user?._id] })
  }

  const remove = async (id: string) => {
    await deleteBankAccount(id)
    queryClient.invalidateQueries({ queryKey: ["bankAccounts", user?._id] })
  }

  return {
    accounts: data ?? [],
    isLoading,
    error: error ? "Failed to load bank accounts" : null,
    setDefault,
    remove,
  }
}
