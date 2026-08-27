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
import { useRefreshUser } from "@/hooks/useRefreshUser"

export default function FundWalletCallback() {
  const navigate = useNavigate()
  const { refreshUser } = useRefreshUser()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "success" | "pending">(
    "verifying"
  )
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    const verify = async () => {
      const reference =
        searchParams.get("reference") ??
        sessionStorage.getItem("pending-wallet-funding-reference")

      if (!reference) {
        setStatus("pending")
        return
      }

      try {
        const res = await verifyWalletFunding(reference)
        sessionStorage.removeItem("pending-wallet-funding-reference")
        setBalance(res.balance)
        setStatus("success")
        await refreshUser()
      } catch (err) {
        // agents can't self-verify right now — payment likely went through,
        // it's just waiting on an admin to confirm and credit it
        console.error("verifyWalletFunding error:", err)
        sessionStorage.removeItem("pending-wallet-funding-reference")
        setStatus("pending")
      }
    }

    verify()
  }, [searchParams, refreshUser])

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

  if (status === "pending") {
    return (
      <Dialog open={true}>
        <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
          <img src={successImg} alt="" className="mx-auto" />

          <div className="mt-2 flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
                Payment received
              </DialogTitle>
              <DialogDescription className="text-center text-[14px] text-text-secondary">
                Your payment was successful. It's being confirmed and will be
                credited to your wallet within 20–30 minutes.
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/agent/wallet", { replace: true })}
                className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
              >
                View Wallet
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
