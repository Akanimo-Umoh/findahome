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
    transactionId: string
  }
}

export const verifyWalletFunding = async (reference: string) => {
  const { data } = await api.post("/transaction/verify-fund-wallet", {
    reference,
  })
  return data as {
    success: boolean
    message: string
    balance: number
  }
}
