import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"

type WithdrawalSuccessfulProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}

export default function WithdrawalSuccessful({
  open,
  onOpenChange,
  amount,
}: WithdrawalSuccessfulProps) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-t-[24px] px-0 py-10 font-ssPro text-text-primary [&>button]:hidden">
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mx-auto mt-2 flex w-64.5 flex-col items-center justify-center gap-2">
          <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
            Withdrawal Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-[14px] text-text-secondary">
            Your funds have been transferred to your bank account.
          </DialogDescription>
        </div>

        <div className="mx-auto mt-6 w-85.5 rounded-lg border border-bg-accent p-2">
          <div className="flex flex-col border-b border-text-secondary pb-2">
            <p className="text-[14px] text-text-secondary">Amount Withdrawn</p>
            <div className="mt-1 flex items-center">
              <img src={blackNaira} alt="" />
              <p>{amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between text-[12px] text-text-secondary">
              <p className="leading-4">Bank Account</p>
              <p>Access Bank ****4810</p>
            </div>
            <div className="flex items-center justify-between text-[12px] text-text-secondary">
              <p className="leading-4">Account Name</p>
              <p>Samuel James</p>
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

        <div className="mx-auto mt-8.5 flex w-85.5 flex-col items-center justify-center gap-3">
          <button
            onClick={() => navigate("/agent/wallet", { replace: true })}
            className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
          >
            View Wallet
          </button>
          <button
            onClick={() => navigate("/agent/dashboard", { replace: true })}
            className="h-11.25 w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]"
          >
            Go to dashboard
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
