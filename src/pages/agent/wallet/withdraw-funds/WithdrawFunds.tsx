import { useState } from "react"
import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import { toast } from "sonner"
import { useWithdrawalDraft } from "@/hooks/useWithdrawalDraft"
import { Button } from "@/components/ui/button"

// TODO: static placeholders — replace with real balance + default account once endpoints exist
const walletBalance = 3000000
const defaultAccount = { bankName: "Access Bank", accountNumber: "****4810" }
const MIN_WITHDRAWAL = 1000

export default function WithdrawFunds() {
  const navigate = useNavigate()
  const { updateDraft } = useWithdrawalDraft()
  const [amountInput, setAmountInput] = useState("")

  const amount = Number(amountInput) || 0

  const handleContinue = () => {
    if (amount < MIN_WITHDRAWAL) {
      toast.error(
        `Minimum withdrawal amount is ₦${MIN_WITHDRAWAL.toLocaleString()}`
      )
      return
    }
    if (amount > walletBalance) {
      toast.error("Amount exceeds your available balance")
      return
    }
    updateDraft({ amount, accountId: "1" })
    navigate("/agent/review-withdrawal")
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
          Withdraw Funds
        </p>
      </div>

      <p className="mt-0.5 text-center text-[12px] leading-4">Step 1 of 2</p>

      <div className="mx-auto mt-6 max-w-125">
        <div className="flex flex-col gap-1 rounded-lg border border-bg-accent px-2 py-3">
          <p>Available Balance</p>
          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-button-bg">
              {walletBalance.toLocaleString()}
            </p>
          </div>
          <p className="text-[12px] leading-4 text-text-secondary">
            You can only withdraw from your available balance
          </p>
        </div>

        <div className="mt-6.5">
          <div>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-[14px]">
                Enter Amount
              </label>
              <div className="relative flex items-center justify-center">
                <img src={greyNaira} alt="" className="absolute left-2" />
                <input
                  type="text"
                  id="amount"
                  value={amountInput}
                  onChange={(e) =>
                    setAmountInput(e.target.value.replace(/\D/g, ""))
                  }
                  className="mt-0.5 h-[45px] w-full rounded-lg border-2 border-bg-accent bg-button-sec pr-2 pl-7 text-[14px] outline-none"
                  placeholder="0.00"
                  inputMode="numeric"
                />
              </div>
            </div>
            <p className="mt-1 text-[12px] leading-4 text-text-secondary">
              Minimum withdrawal amount: ₦{MIN_WITHDRAWAL.toLocaleString()}
            </p>

            <div className="mt-4">
              <p className="text-[14px]">Withdraw to</p>
              <div className="mt-2 flex items-center justify-between gap-4 rounded-lg border border-bg-accent px-2 py-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
                    <img src={creditIcon} alt="" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="line-clamp-1 text-[14px]">
                      {defaultAccount.bankName}
                    </p>
                    <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                      {defaultAccount.accountNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/agent/manage-account")}
                  className="cursor-pointer text-[12px] leading-4 text-button-bg"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="app-primary" size="full" onClick={handleContinue}>
              Continue
            </Button>
            <p className="mt-2 text-center text-[12px] leading-4 text-text-secondary">
              Withdrawal may take a few minutes to reflect.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
