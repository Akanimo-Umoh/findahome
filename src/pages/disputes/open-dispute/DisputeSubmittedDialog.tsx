import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import bellIcon from "@/assets/images/icon-blue-notification.svg"
import trackIcon from "@/assets/images/icon-blue-track.svg"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"

type DisputeSubmittedDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  referenceId: string
  dateIssued: string
}

export default function DisputeSubmittedDialog({
  open,
  onOpenChange,
  referenceId,
  dateIssued,
}: DisputeSubmittedDialogProps) {
  const { user } = useAuthContext()
  const homePath = user?.role === "agent" ? "/agent/dashboard" : "/"
  const homeLabel =
    user?.role === "agent" ? "Go to Dashboard" : "Go to HomePage"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-[calc(100%-48px)] flex-col gap-0 overflow-y-auto rounded-xl px-6 py-8 font-ssPro text-text-primary [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Dispute Submitted</DialogTitle>

        <div className="flex flex-col items-center justify-center">
          <img src={successImg} alt="" className="h-25 w-25 md:h-50 md:w-50" />

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-raleway text-[20px] font-medium tracking-[1px] md:text-[24px]">
              Dispute Sent For Review
            </p>
            <DialogDescription className="max-w-74.5 text-[12px] leading-4 text-text-secondary">
              We've received your dispute regarding reference {referenceId}. Our
              team will review it shortly.
            </DialogDescription>
          </div>
        </div>

        <div className="mt-9 space-y-2">
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Reference ID:</p>
            <p className="text-text-secondary">{referenceId}</p>
          </div>
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Expected Resolution</p>
            <p className="text-text-secondary">Within 2-3 days</p>
          </div>
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Tracking Status</p>
            <p className="rounded-2xl bg-[#D02727] px-2 py-0.5 text-center text-bg-tertiary">
              Pending Review
            </p>
          </div>
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Date Issued</p>
            <p className="text-text-secondary">{dateIssued}</p>
          </div>
        </div>

        <div className="mt-8 flex max-w-[305px] flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-bg-accent">
              <img src={bellIcon} alt="" />
            </div>
            <p className="text-[12px] text-text-secondary md:text-[14px]">
              You will receive an email and an in-app notification with updates
              on your dispute status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-bg-accent">
              <img src={trackIcon} alt="" />
            </div>
            <p className="text-[12px] text-text-secondary md:text-[14px]">
              You can track this dispute in your My Disputes section.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <Button variant="app-primary" size="full" asChild>
            <Link to={homePath}>{homeLabel}</Link>
          </Button>

          <Button variant="app-secondary" size="full" asChild>
            <Link to="/disputes">View my Disputes</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
