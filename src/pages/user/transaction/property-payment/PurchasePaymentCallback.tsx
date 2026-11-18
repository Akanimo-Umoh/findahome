import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import PaymentResultDialog from "@/components/shared/PaymentResultDialog"
import {
  referenceFromUrl,
  usePaymentConfirmation,
} from "@/hooks/usePaymentConfirmation"
import { invalidateDealQueries } from "@/hooks/useRealtimeSync"
import { confirmPurchasePayment } from "@/services/purchase.service"

const DRAFT_KEY = "pending-purchase-payment"

type PurchaseDraft = { purchaseId: string; reference: string }

function readDraft(): PurchaseDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as PurchaseDraft) : null
  } catch {
    return null
  }
}

export default function PurchasePaymentCallback() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const [draft] = useState(readDraft)

  const { status, message } = usePaymentConfirmation(
    draft
      ? () =>
          confirmPurchasePayment(
            draft.purchaseId,
            referenceFromUrl(searchParams) ?? draft.reference
          )
      : null
  )

  useEffect(() => {
    if (!draft) navigate("/dashboard", { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (status === "confirming") return
    // keep the draft after an error so a refresh can try confirming again
    if (status !== "error") sessionStorage.removeItem(DRAFT_KEY)
    invalidateDealQueries(queryClient)
  }, [status, queryClient])

  if (!draft) return null

  const viewTransaction = () =>
    navigate(`/transactions/${draft.purchaseId}?type=purchase`, {
      replace: true,
    })

  return (
    <PaymentResultDialog
      status={status}
      message={message}
      copy={{
        received: {
          title: "Payment received",
          description:
            "Your property payment has been received and is waiting for an admin to approve it. Once approved, the funds are held in escrow and your agent will be asked to schedule the handover.",
        },
        processing: {
          title: "Payment being confirmed",
          description:
            "We're still confirming your payment with Paystack. It will update on its own shortly. Please don't pay again.",
        },
        failed: {
          title: "Payment not completed",
          description:
            "Paystack didn't confirm this payment, so the property hasn't been paid for. You can try again from the transaction page.",
        },
        error: {
          title: "We couldn't confirm yet",
          description:
            "If you completed the payment on Paystack, it's safe. Refresh this page in a moment to check again. Please don't pay twice.",
        },
      }}
    >
      <Button variant="app-primary" size="full" onClick={viewTransaction}>
        View Transaction
      </Button>
    </PaymentResultDialog>
  )
}
