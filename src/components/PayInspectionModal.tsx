import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import blueNairaIcon from "@/assets/images/naira.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

type PayInspectionProps = {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyAddress: string
  propertyPrice: number
  propertyImage: string
}

export default function PayInspectionModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyAddress,
  propertyPrice,
  propertyImage,
}: PayInspectionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
        <DialogTitle className="sr-only">Pay Inspection Fee</DialogTitle>

        {/* header */}
        <div className="shrink-0 px-6 pt-8">
          <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
            Pay Inspection Fee
          </p>
        </div>

        {/* scrollable content */}
        <div className="flex-1 space-y-2 overflow-y-auto px-6 pt-6">
          {/* property details */}
          <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
            <img
              src={propertyImage}
              alt={propertyTitle}
              className="h-15 w-15 rounded-lg object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                {propertyTitle}
              </p>
              <div className="flex items-center text-[12px] leading-4 text-text-secondary">
                {propertyAddress ?? (
                  <p className="line-clamp-1 flex-1">{propertyAddress}</p>
                )}

                <p className="flex items-center">
                  <img src={nairaIcon} alt="" className="h-4 w-4" />
                  <span>{propertyPrice?.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>

          {/* payment summary */}
          <div className="flex flex-col gap-2 rounded-xl bg-bg-accent px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-text-primary">Inspection fee</p>
              <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                <span>5,000</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
              <p>Payment Reference</p>
              <p>FH-PAY-2472-001</p>
            </div>

            <div className="flex items-center gap-1">
              <img src={infoIcon} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                Payment is held securely by FindaHome until inspection is
                complete
              </p>
            </div>
          </div>
        </div>

        {/* sticky footer */}
        <div className="shrink-0 px-6 pt-4 pb-6">
          <Button variant="app-primary" size="full">
            Pay with Paystack
          </Button>

          <p className="mt-2 text-center text-[12px] leading-4 text-text-secondary">
            By proceeding, you agree to FindaHome's escrow policy
          </p>

          <div className="mt-3 text-center">
            <Link
              to=""
              className="border-b border-b-button-bg text-center text-[12px] leading-4 text-text-secondary"
            >
              Having issues with agent? Open a dispute
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
