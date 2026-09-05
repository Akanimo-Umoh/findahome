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
import { useInspectionDraft } from "@/hooks/useInspectionDraft"

export default function InspectionPaymentCallback() {
  const navigate = useNavigate()
  const { getDraft, clearDraft } = useInspectionDraft()

  // read once, before it gets cleared — this is also how we detect a refresh
  const [draft] = useState(() => getDraft())

  useEffect(() => {
    if (!draft) {
      // no draft means this isn't a fresh return from Paystack — likely a
      // refresh of this page. Nothing useful to show, send them back to chat.
      navigate("/messages", { replace: true })
      return
    }
    clearDraft()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToChat = () => {
    navigate(draft?.chatId ? `/messages/${draft.chatId}` : "/messages", {
      replace: true,
    })
  }

  // avoid flashing the dialog before the redirect effect runs
  if (!draft) return null

  return (
    <>
      <Dialog open={true}>
        <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
          <img src={successImg} alt="" className="mx-auto" />

          <div className="mt-2 flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
                Payment received
              </DialogTitle>
              <DialogDescription className="text-center text-[14px] text-text-secondary">
                Your inspection fee payment is being confirmed. Once verified,
                your agent will automatically be notified to schedule your
                inspection date.
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="app-primary" size="full" onClick={goToChat}>
                Return to chat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
