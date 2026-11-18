import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import PaymentResultDialog from "@/components/shared/PaymentResultDialog"
import { useInspectionDraft } from "@/hooks/useInspectionDraft"
import {
  referenceFromUrl,
  usePaymentConfirmation,
} from "@/hooks/usePaymentConfirmation"
import { invalidateDealQueries } from "@/hooks/useRealtimeSync"
import { confirmInspectionPayment } from "@/services/inspection.service"

export default function InspectionPaymentCallback() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { getDraft, clearDraft } = useInspectionDraft()

  // read once, before it gets cleared — this is also how we detect a refresh
  const [draft] = useState(() => getDraft())

  const { status, message } = usePaymentConfirmation(
    draft
      ? () =>
          confirmInspectionPayment(
            draft.inspectionId,
            referenceFromUrl(searchParams) ?? draft.reference
          )
      : null
  )

  useEffect(() => {
    if (!draft) {
      // no draft means this isn't a fresh return from Paystack — likely a
      // refresh of this page. Nothing useful to show, send them back to chat.
      navigate("/messages", { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (status === "confirming") return
    // keep the draft after an error so a refresh can try confirming again
    if (status !== "error") clearDraft()
    // the chat's next-step actions and the transaction lists read the new status
    invalidateDealQueries(queryClient)
  }, [status, clearDraft, queryClient])

  const goToChat = () => {
    navigate(draft?.chatId ? `/messages/${draft.chatId}` : "/messages", {
      replace: true,
    })
  }

  // avoid flashing the dialog before the redirect effect runs
  if (!draft) return null

  return (
    <PaymentResultDialog
      status={status}
      message={message}
      copy={{
        received: {
          title: "Payment received",
          description:
            "Your inspection fee has been received and is waiting for an admin to approve it. Once approved, your agent will be asked to schedule your inspection.",
        },
        processing: {
          title: "Payment being confirmed",
          description:
            "We're still confirming your payment with Paystack. It will update on its own shortly. Please don't pay again.",
        },
        failed: {
          title: "Payment not completed",
          description:
            "Paystack didn't confirm this payment, so you haven't been charged for the inspection. You can try again from the chat.",
        },
        error: {
          title: "We couldn't confirm yet",
          description:
            "If you completed the payment on Paystack, it's safe. Refresh this page in a moment to check again. Please don't pay twice.",
        },
      }}
    >
      <Button variant="app-primary" size="full" onClick={goToChat}>
        Return to chat
      </Button>
    </PaymentResultDialog>
  )
}
