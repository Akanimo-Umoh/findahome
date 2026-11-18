import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import PaymentResultDialog from "@/components/shared/PaymentResultDialog"
import {
  referenceFromUrl,
  usePaymentConfirmation,
} from "@/hooks/usePaymentConfirmation"
import { confirmWalletFunding } from "@/services/wallet.service"

const REFERENCE_KEY = "pending-wallet-funding-reference"

export default function FundWalletCallback() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  const [reference] = useState(
    () =>
      referenceFromUrl(searchParams) ?? sessionStorage.getItem(REFERENCE_KEY)
  )

  // the server records the funding as pending; an admin approves it and only
  // then is the wallet credited
  const { status, message } = usePaymentConfirmation(
    reference ? () => confirmWalletFunding(reference) : null
  )

  useEffect(() => {
    if (status === "confirming") return
    if (status !== "error") sessionStorage.removeItem(REFERENCE_KEY)
    // the pending funding now shows in the wallet's activity
    queryClient.invalidateQueries({ queryKey: ["agentActivities"] })
  }, [status, queryClient])

  const goToWallet = () => navigate("/agent/wallet", { replace: true })

  return (
    <PaymentResultDialog
      status={status}
      message={message}
      copy={{
        received: {
          title: "Payment received",
          description:
            "Your payment was successful and is waiting for an admin to approve it. Your wallet will be credited once it's approved.",
        },
        processing: {
          title: "Payment being confirmed",
          description:
            "We're still confirming your payment with Paystack. It will show in your wallet's activity shortly. Please don't pay again.",
        },
        failed: {
          title: "Payment not completed",
          description:
            "Paystack didn't confirm this payment, so nothing was charged. You can try funding your wallet again.",
        },
        error: {
          title: reference ? "We couldn't confirm yet" : "No payment found",
          description: reference
            ? "If you completed the payment on Paystack, it's safe. Refresh this page in a moment to check again. Please don't pay twice."
            : "We couldn't find a payment to confirm. If you paid, check your wallet's activity shortly.",
        },
      }}
    >
      <button
        onClick={goToWallet}
        className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
      >
        View Wallet
      </button>
    </PaymentResultDialog>
  )
}
