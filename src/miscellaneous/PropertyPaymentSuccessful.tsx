import successImg from "@/assets/images/img-pay-inspection-fee.png"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type PropertyPaymentSuccessfulProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PropertyPaymentSuccessful({
  open,
  onOpenChange,
}: PropertyPaymentSuccessfulProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Payment Completed</DialogTitle>

        <div>
          <img src={successImg} alt="" className="mx-auto" />
        </div>

        <div className="mt-2 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              Payment Completed
            </p>
            <p className="text-[14px] text-text-secondary">
              Your payment has been received and the agent has been notified.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            {/* this button would show a toast that the agent has been notified and then navigate them to the transaction details page */}
            <Button variant="app-primary" size="full" asChild>
              <Link to="/transaction-details">Request Property Handover</Link>
            </Button>

            <Button variant="app-secondary" size="full" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
