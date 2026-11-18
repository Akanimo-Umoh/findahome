import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import Spinner from "@/components/Spinner"
import type { PaymentConfirmationStatus } from "@/hooks/usePaymentConfirmation"

type Copy = { title: string; description: string }

type PaymentResultDialogProps = {
  status: PaymentConfirmationStatus
  // the server's reason when the payment failed, shown under the failed copy
  message?: string | null
  copy: Record<Exclude<PaymentConfirmationStatus, "confirming">, Copy>
  children: ReactNode
}

// The screen a user lands on when Paystack sends them back: a spinner while
// we confirm with the server, then one dialog with what happened and the
// page's own buttons.
export default function PaymentResultDialog({
  status,
  message,
  copy,
  children,
}: PaymentResultDialogProps) {
  if (status === "confirming") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 font-ssPro">
        <Spinner />
        <p className="text-[14px] text-text-secondary">
          Confirming your payment...
        </p>
      </div>
    )
  }

  const { title, description } = copy[status]
  const showImage = status === "received" || status === "processing"

  return (
    <Dialog open={true}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] max-w-[340px] flex-col gap-0 overflow-y-auto rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
        {showImage && <img src={successImg} alt="" className="mx-auto" />}

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              {description}
              {status === "failed" && message && (
                <span className="mt-2 block text-[12px]">{message}</span>
              )}
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-3">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
