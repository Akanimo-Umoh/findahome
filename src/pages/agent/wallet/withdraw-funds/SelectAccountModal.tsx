import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import { Check } from "lucide-react"
import type { BankAccount } from "@/services/bank.service"

type SelectAccountModalProps = {
  isOpen: boolean
  onClose: () => void
  accounts: BankAccount[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function SelectAccountModal({
  isOpen,
  onClose,
  accounts,
  selectedId,
  onSelect,
}: SelectAccountModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[80vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
        <DialogTitle className="px-6 pt-6 font-raleway text-[16px] font-semibold tracking-[1px]">
          Choose an account
        </DialogTitle>
        <DialogDescription className="px-6 text-[12px] text-text-secondary">
          Select which bank account to withdraw to.
        </DialogDescription>

        <div className="mt-4 flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-3">
            {accounts.map((account) => {
              const isSelected = account._id === selectedId
              return (
                <button
                  key={account._id}
                  type="button"
                  onClick={() => onSelect(account._id)}
                  aria-pressed={isSelected}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-button-bg bg-bg-accent"
                      : "border-bg-accent hover:border-button-bg"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button-bg">
                    <img src={creditIcon} alt="" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-[14px] font-semibold">
                        {account.bankName}
                      </p>
                      {account.isDefault && (
                        <span className="shrink-0 rounded-full bg-button-bg px-2 py-0.5 text-[10px] text-white">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-text-secondary">
                      ****{account.accountNumber.slice(-4)} &middot;{" "}
                      {account.accountName}
                    </p>
                  </div>

                  {isSelected && (
                    <Check
                      className="h-5 w-5 shrink-0 text-button-bg"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
