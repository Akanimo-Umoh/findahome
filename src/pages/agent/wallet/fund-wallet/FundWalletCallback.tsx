import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import Spinner from "@/components/Spinner"
import { verifyWalletFunding } from "@/services/wallet.service"

export default function FundWalletCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  )
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    const reference =
      searchParams.get("reference") ??
      sessionStorage.getItem("pending-wallet-funding-reference")

    if (!reference) {
      setStatus("failed")
      return
    }

    verifyWalletFunding(reference)
      .then((res) => {
        sessionStorage.removeItem("pending-wallet-funding-reference")
        setBalance(res.balance)
        setStatus("success")
      })
      .catch((err) => {
        console.error("verifyWalletFunding error:", err)
        setStatus("failed")
      })
  }, [searchParams])

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 font-ssPro">
        <Spinner />
        <p className="text-[14px] text-text-secondary">
          Confirming your payment...
        </p>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center font-ssPro">
        <p className="text-[14px] font-semibold">
          We couldn't confirm your payment
        </p>
        <p className="text-[12px] text-text-secondary">
          If you were charged, your balance will update shortly. Otherwise,
          please try again.
        </p>
        <button
          onClick={() => navigate("/agent/wallet", { replace: true })}
          className="mt-4 text-[14px] text-button-bg underline"
        >
          Back to wallet
        </button>
      </div>
    )
  }

  return (
    <Dialog open={true}>
      <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Wallet Funded!
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              {balance !== null
                ? `Your new balance is ₦${balance.toLocaleString()}.`
                : "Your wallet has been credited successfully."}
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/agent/wallet", { replace: true })}
              className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
            >
              View Wallet
            </button>
            <button
              onClick={() => navigate("/agent/dashboard", { replace: true })}
              className="h-11.25 w-full rounded-lg border border-text-secondary font-raleway text-[14px] font-semibold tracking-[1px]"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
