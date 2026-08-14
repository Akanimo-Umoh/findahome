import type { ReactNode } from "react"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type SuccessModalAction = {
  label: string
  to: string
}

type SuccessModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: ReactNode
  primaryAction: SuccessModalAction
  secondaryAction: SuccessModalAction
  replace?: boolean
}

export default function SuccessModal({
  open,
  onOpenChange,
  title,
  description,
  primaryAction,
  secondaryAction,
  replace = false,
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div>
          <img src={successImg} alt="" className="mx-auto" />
        </div>

        <div className="mt-2 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              {title}
            </p>
            <p className="text-[14px] text-text-secondary">{description}</p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button variant="app-primary" size="full" asChild>
              <Link to={primaryAction.to} replace={replace}>
                {primaryAction.label}
              </Link>
            </Button>

            <Button variant="app-secondary" size="full" asChild>
              <Link to={secondaryAction.to} replace={replace}>
                {secondaryAction.label}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
