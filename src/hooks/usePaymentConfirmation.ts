import { useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { requestError } from "@/lib/requestError"

// What happened when we told the server about a payment the user just made on Paystack.
//  - confirming: waiting on the server
//  - received:   the server checked it with Paystack and recorded it (it now waits for an admin)
//  - processing: Paystack couldn't be reached; the server's webhook will finish it, so don't pay again
//  - failed:     Paystack says the payment didn't go through (a 4xx from the server)
//  - error:      we couldn't reach our server, so we don't know yet
export type PaymentConfirmationStatus =
  | "confirming"
  | "received"
  | "processing"
  | "failed"
  | "error"

type Confirm = () => Promise<{ status?: string }>

// Runs `confirm` once on mount. The server is idempotent, so a repeat call
// (React StrictMode in dev, a refresh) only reads the current state back.
export function usePaymentConfirmation(confirm: Confirm | null) {
  const [status, setStatus] = useState<PaymentConfirmationStatus>(
    confirm ? "confirming" : "error"
  )
  const [message, setMessage] = useState<string | null>(null)
  const confirmRef = useRef(confirm)

  useEffect(() => {
    const run = confirmRef.current
    if (!run) return
    let cancelled = false

    run()
      .then((res) => {
        if (cancelled) return
        setStatus(res.status === "processing" ? "processing" : "received")
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const isClientError =
          isAxiosError(err) &&
          !!err.response &&
          err.response.status >= 400 &&
          err.response.status < 500
        setStatus(isClientError ? "failed" : "error")
        setMessage(
          requestError(err, "We couldn't confirm your payment right now.")
        )
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { status, message }
}

// Paystack sends the buyer back with ?reference=...&trxref=...
export function referenceFromUrl(searchParams: URLSearchParams) {
  return (
    searchParams.get("reference") ?? searchParams.get("trxref") ?? undefined
  )
}
