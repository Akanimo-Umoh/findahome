import { useState } from "react"
import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import { toast } from "sonner"
import { useWithdrawalDraft } from "@/hooks/useWithdrawalDraft"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { useBankAccounts } from "@/hooks/useBankAccounts"
import Skeleton from "@/components/ui/Skeleton"
import SelectAccountModal from "./SelectAccountModal"

const MIN_WITHDRAWAL = 1000

export default function WithdrawFunds() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { updateDraft } = useWithdrawalDraft()
  const { accounts, isLoading } = useBankAccounts()
  const [amountInput, setAmountInput] = useState("")
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  )

  const walletBalance = user?.balance ?? 0
  const amount = Number(amountInput) || 0

  const defaultAccount =
    accounts.find((a) => a.isDefault) ?? accounts[0] ?? null
  const selectedAccount =
    accounts.find((a) => a._id === selectedAccountId) ?? defaultAccount

  const handleContinue = () => {
    if (!selectedAccount) {
      toast.error("Please add a bank account first")
      return
    }
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
    updateDraft({ amount, accountId: selectedAccount._id })
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

              {isLoading && (
                <div className="mt-2 flex items-center gap-4 rounded-lg border border-bg-accent px-2 py-3">
                  <Skeleton className="h-7.5 w-7.5 shrink-0 rounded-full" />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              )}

              {!isLoading && !selectedAccount && (
                <div className="mt-2 flex flex-col items-center gap-2 rounded-lg border border-dashed border-bg-accent px-2 py-4 text-center">
                  <p className="text-[13px] text-text-secondary">
                    You haven't added a withdrawal account yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/agent/add-account")}
                    className="text-[13px] font-semibold text-button-bg underline"
                  >
                    Add a bank account
                  </button>
                </div>
              )}

              {!isLoading && selectedAccount && (
                <div className="mt-2 flex items-center justify-between gap-4 rounded-lg border border-bg-accent px-2 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
                      <img src={creditIcon} alt="" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="line-clamp-1 text-[14px]">
                        {selectedAccount.bankName}
                      </p>
                      <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                        ****{selectedAccount.accountNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  {accounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setIsSelectModalOpen(true)}
                      className="cursor-pointer text-[12px] leading-4 text-button-bg"
                    >
                      Change
                    </button>
                  )}
                </div>
              )}
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

      <SelectAccountModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        accounts={accounts}
        selectedId={selectedAccount?._id ?? null}
        onSelect={(id) => {
          setSelectedAccountId(id)
          setIsSelectModalOpen(false)
        }}
      />
    </div>
  )
}
