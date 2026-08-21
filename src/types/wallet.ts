export type BankAccount = {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
  accountType: string
  isDefault: boolean
}

export type WithdrawalDraft = {
  amount: number
  accountId: string
}
