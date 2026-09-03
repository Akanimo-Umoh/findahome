import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import { Button } from "@/components/ui/button"
import { useInspectionDraft } from "@/hooks/useInspectionDraft"

export default function InspectionPaymentCallback() {
  const navigate = useNavigate()
  const { getDraft, clearDraft } = useInspectionDraft()
  const draft = getDraft()

  // verify-payment is admin-only — the buyer can never self-verify here.
  // Payment confirmation happens out-of-band (admin confirms → user gets
  // emailed, agent gets an automatic inspection schedule request). So this
  // page only clears the draft and shows the pending state — it never
  // claims the inspection is confirmed.
  useEffect(() => {
    clearDraft()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={true}>
      <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Payment received
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              Your inspection fee payment is being confirmed. You'll get an
              email once it's verified — your agent will automatically receive
              your inspection request at that point too.
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={() =>
                navigate(
                  draft?.propertyId
                    ? `/property/${draft.propertyId}`
                    : "/dashboard",
                  { replace: true }
                )
              }
            >
              Back to Property
            </Button>
            <Button
              variant="app-secondary"
              size="full"
              onClick={() => navigate("/dashboard", { replace: true })}
            >
              Go to dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
