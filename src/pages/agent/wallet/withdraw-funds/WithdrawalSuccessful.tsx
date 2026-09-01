import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"
import type { BankAccount } from "@/services/bank.service"
import { Button } from "@/components/ui/button"

type WithdrawalSuccessfulProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  account?: BankAccount
}

export default function WithdrawalSuccessful({
  open,
  onOpenChange,
  amount,
  account,
}: WithdrawalSuccessfulProps) {
  const navigate = useNavigate()

  const goToWallet = () => {
    onOpenChange(false)
    navigate("/agent/wallet")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-h-[90vh] w-[calc(100%-48px)] max-w-[340px] gap-0 overflow-y-auto rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden"
      >
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Withdrawal Requested!
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              Your request is being reviewed. Funds will reach your bank account
              once approved.
            </DialogDescription>
          </div>

          <div className="rounded-lg border border-bg-accent p-2">
            <div className="flex flex-col border-b border-text-secondary pb-2">
              <p className="text-[14px] text-text-secondary">
                Amount Withdrawn
              </p>
              <div className="mt-1 flex items-center">
                <img src={blackNaira} alt="" />
                <p>{amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Bank Account</p>
                <p>
                  {account
                    ? `${account.bankName} ****${account.accountNumber.slice(-4)}`
                    : "—"}
                </p>
              </div>
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Account Name</p>
                <p>{account?.accountName ?? "—"}</p>
              </div>
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Date & time</p>
                <p>
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                  ,{" "}
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="app-primary" size="full" onClick={goToWallet}>
              View Wallet
            </Button>

            <Button
              variant="app-secondary"
              size="full"
              onClick={() => navigate("/agent/dashboard")}
            >
              Go to dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
