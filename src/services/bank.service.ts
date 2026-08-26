import { AxiosError } from "axios"
import api from "./api"

export type ResolvedAccount = {
  accountName: string
  accountNumber: string
  bankName: string
  bankCode: string
}

export type BankAccount = {
  _id: string
  bankName: string
  bankCode: string
  accountNumber: string
  accountName: string
  isDefault: boolean
}

export const resolveBankAccount = async (
  accountNumber: string,
  bankName: string
): Promise<ResolvedAccount> => {
  const { data } = await api.post("/bank/resolve", { accountNumber, bankName })
  return data.data
}

export const addBankAccount = async (
  resolved: ResolvedAccount
): Promise<BankAccount> => {
  const { data } = await api.post("/bank", resolved)
  return data.data
}

export const getBankAccounts = async (
  userId: string
): Promise<BankAccount[]> => {
  try {
    const { data } = await api.get(`/bank/user/${userId}`)
    return data.data
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      return []
    }
    throw err
  }
}

export const setDefaultBankAccount = async (
  id: string
): Promise<BankAccount> => {
  const { data } = await api.put(`/bank/${id}/default`)
  return data.data
}

export const updateBankAccount = async (
  id: string,
  fields: {
    bankName: string
    bankCode: string
    accountNumber: string
    accountName: string
  }
): Promise<BankAccount> => {
  const { data } = await api.put(`/bank/${id}`, fields)
  return data.data
}

export const deleteBankAccount = async (id: string): Promise<void> => {
  await api.delete(`/bank/${id}`)
}
