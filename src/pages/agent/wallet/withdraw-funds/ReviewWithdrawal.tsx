import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import timeIcon from "@/assets/agentImages/icon-time.svg"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import cancelIcon from "@/assets/agentImages/icon-red-cancel.svg"
import { useWithdrawalDraft } from "@/hooks/useWithdrawalDraft"
import WithdrawalSuccessful from "./WithdrawalSuccessful"
import { Button } from "@/components/ui/button"

export default function ReviewWithdrawal() {
  const navigate = useNavigate()
  const { draft, isValid, clearDraft } = useWithdrawalDraft()
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  useEffect(() => {
    if (!isValid) {
      navigate("/agent/withdraw-funds", { replace: true })
    }
  }, [isValid, navigate])

  if (!isValid) return null

  const handleConfirm = () => {
    // TODO: replace with a real mutation (POST /wallet/withdraw) once endpoint exists
    clearDraft()
    setIsSuccessOpen(true)
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>
        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Review Withdrawal
        </p>
      </div>

      <p className="mt-0.5 text-center text-[12px] leading-4">Step 2 of 2</p>

      <div className="mx-auto max-w-125">
        <div className="mt-7.5 rounded-lg border border-bg-accent">
          <div className="flex items-center justify-between gap-1 border-b border-bg-accent px-2 py-3">
            <p className="text-[14px] text-text-secondary">
              Amount to withdraw
            </p>
            <div className="flex items-center justify-center">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <p className="text-button-bg">{draft.amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 border-b border-bg-accent px-2 py-3">
            <p className="text-[14px] text-text-secondary">Withdrawal Fee</p>
            <div className="flex items-center justify-center">₦0.00 (Free)</div>
          </div>

          <div className="flex items-center justify-between gap-1 px-2 py-3">
            <p className="text-[14px] text-text-secondary">
              Total amount received
            </p>
            <div className="flex items-center justify-center">
              <img src={blackNaira} alt="" />
              <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
                {draft.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mt-2 flex items-center justify-between gap-[15px] rounded-lg border border-bg-accent px-2 py-1">
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
              <img src={creditIcon} alt="" />
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-1 space-y-0.5">
                  <p className="line-clamp-1 text-[14px]">Access Bank</p>
                  <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                    ****4810
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4 text-text-secondary">
                  Account Name:
                </p>
                <p className="text-[12px]">Samuel James</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4 text-text-secondary">
                  Account Type:
                </p>
                <p className="text-[12px]">Savings</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 flex w-67.5 items-start gap-2 bg-button-sec p-2">
            <img src={timeIcon} alt="" />
            <p className="text-[12px] leading-4 text-text-secondary">
              Withdrawals are processed instantly and usually reflects in few
              minutes time.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="app-primary" size="full" onClick={handleConfirm}>
            Continue
          </Button>

          <button
            onClick={() => navigate("/agent/wallet")}
            className="mx-auto mt-2 flex h-[45px] cursor-pointer items-center gap-2 px-2"
          >
            <img src={cancelIcon} alt="" />
            <p className="text-center text-[14px] tracking-[1px] text-button-bg">
              Cancel
            </p>
          </button>
        </div>
      </div>

      <WithdrawalSuccessful
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        amount={draft.amount}
      />
    </div>
  )
}
