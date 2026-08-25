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

// TODO: backend currently uses Bank.findOne, only returns ONE account even
// though agents can have multiple — flagged to backend dev, awaiting fix
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  const { data } = await api.get("/bank")
  return data.data ? [data.data] : []
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
