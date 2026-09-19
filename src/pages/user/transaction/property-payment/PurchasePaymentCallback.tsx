import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import { Button } from "@/components/ui/button"

type PurchaseDraft = { purchaseId: string; reference: string }

export default function PurchasePaymentCallback() {
  const navigate = useNavigate()
  const [draft] = useState<PurchaseDraft | null>(() => {
    const raw = sessionStorage.getItem("pending-purchase-payment")
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (!draft) {
      navigate("/dashboard", { replace: true })
      return
    }
    sessionStorage.removeItem("pending-purchase-payment")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!draft) return null

  return (
    <Dialog open={true}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] max-w-[340px] flex-col gap-0 overflow-y-auto rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
        <img src={successImg} alt="" className="mx-auto" />
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Payment received
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              Your property payment is being confirmed. Once verified, funds
              will be held in escrow and your agent will be notified to schedule
              the handover.
            </DialogDescription>
          </div>
          <Button
            variant="app-primary"
            size="full"
            onClick={() =>
              navigate(`/transactions/${draft.purchaseId}?type=purchase`, {
                replace: true,
              })
            }
          >
            View Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
