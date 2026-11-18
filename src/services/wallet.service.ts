import { APP_BASE_URL } from "@/lib/baseUrl"
import api from "./api"

export const fundWallet = async (amount: number) => {
  const { data } = await api.post("/transaction/fund-wallet", {
    amount,
    callback_url: `${APP_BASE_URL}/agent/fund-wallet/callback`,
  })
  return data as {
    success: boolean
    authorizationUrl: string
    reference: string
  }
}

// Called when the agent comes back from Paystack. The server checks the
// payment and records it as a pending funding for the admin to approve.
// Nothing shows in the wallet's activity until this succeeds.
export const confirmWalletFunding = async (reference: string) => {
  const { data } = await api.post("/transaction/confirm-fund-wallet", {
    reference,
  })
  return data as {
    success: boolean
    status: "pending" | "approved" | "completed" | "declined" | "failed"
    message?: string
  }
}

// a snapshot of where the money should go; saved on the withdrawal so the
// admin still sees it if the agent later edits or deletes the account
export type WithdrawalBankDetails = {
  bankName: string
  bankCode?: string
  accountNumber: string
  accountName: string
}

export const withdrawFunds = async (payload: {
  amount: number
  bankDetails: WithdrawalBankDetails
}) => {
  const { data } = await api.post("/transaction/withdraw", {
    amount: payload.amount,
    bankDetails: payload.bankDetails,
  })
  return data as {
    success: boolean
    message: string
    balance: number
    transaction: {
      _id: string
      amount: number
      status: "pending" | "approved" | "declined" | "failed"
      reference: string
    }
  }
}
