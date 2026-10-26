import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import gmailIcon from "@/assets/images/icon-gmail.svg"
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg"
import downloadIcon from "@/assets/images/icon-white-download.svg"
import whatsappIcon from "@/assets/images/icon-whatsapp.svg"
import checkIcon from "@/assets/images/icon-transaction-confirmed.svg"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/PageHeader"
import Spinner from "@/components/Spinner"
import { useAuthContext } from "@/context/AuthContext"
import { useTransactionDetails } from "@/hooks/useTransactionDetails"
import { buildReceipt, formatReceiptDate, receiptSummary } from "@/lib/receipt"
import { downloadReceiptPdf } from "@/lib/receiptPdf"

export default function TransactionReceipt() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [busy, setBusy] = useState<"download" | "share" | null>(null)

  const { transaction, recordType, isLoading, isFetching, error } =
    useTransactionDetails(transactionId ?? "")

  const receipt = useMemo(
    () => (transaction ? buildReceipt(transaction, recordType, user) : null),
    [transaction, recordType, user]
  )

  if (isLoading || isFetching) return <Spinner />

  if (error || !receipt) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">
            Couldn't load this receipt.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[14px] text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const run = async (kind: "download" | "share", work: () => Promise<void>) => {
    setBusy(kind)
    try {
      await work()
    } catch (err) {
      // closing the share sheet is not an error
      if (err instanceof DOMException && err.name === "AbortError") return
      console.error("receipt error:", err)
      toast.error("Couldn't create the receipt. Please try again.")
    } finally {
      setBusy(null)
    }
  }

  const users = [
    { title: "Buyer's Name:", text: receipt.buyer.name },
    { title: "Buyer's Contact:", text: receipt.buyer.phone },
    { title: "Agent's Name:", text: receipt.agent.name },
    { title: "Date & Time:", text: formatReceiptDate(receipt.paidAt) },
    { title: "Receipt No:", text: receipt.receiptNo },
  ]

  const summary = receiptSummary(receipt)
  const subject = `FindaHome receipt ${receipt.receiptNo}`

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* header */}
        <PageHeader title="Transaction Receipt" responsive />

        <main className="mt-6">
          {/* property */}
          <div className="flex items-center gap-2">
            <img
              src={receipt.property.image ?? propertyImg}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />

            <div>
              <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                {receipt.property.title}
              </p>

              {receipt.property.address && (
                <p className="text-[12px] leading-4 text-text-secondary">
                  {receipt.property.address}
                </p>
              )}

              <p className="text-[12px] leading-4 text-text-secondary">
                Ref: {receipt.property.ref}
              </p>
            </div>
          </div>

          {!receipt.isPaid && (
            <p className="mt-4 rounded-lg bg-bg-accent px-3 py-2 text-[12px] leading-4 text-text-secondary">
              {receipt.note} Your receipt will be ready as soon as your payment
              is confirmed.
            </p>
          )}

          {/* parties details */}
          <div className="mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-warm-section p-2">
                {users.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4"
                  >
                    <p className="text-[12px] leading-4 text-text-primary">
                      {item.title}
                    </p>

                    <p className="text-right text-[12px] leading-4 break-all text-text-secondary">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-accent p-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] leading-4 text-text-primary">
                    Payment Type
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {receipt.typeLabel}
                  </p>
                </div>

                {/* the split is only shown when it adds up to the total paid */}
                {receipt.lines.length > 1 &&
                  receipt.lines.map((line) => (
                    <div
                      key={line.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <p className="text-[12px] leading-4 text-text-primary">
                        {line.label}
                      </p>
                      <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                        <img src={nairaIcon} alt="" />
                        <span>{line.amount.toLocaleString("en-NG")}</span>
                      </p>
                    </div>
                  ))}

                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] leading-4 font-semibold text-text-primary">
                    Total Amount Paid
                  </p>
                  <p className="flex items-center text-[12px] leading-4 font-semibold text-text-secondary">
                    <img src={nairaIcon} alt="" />
                    <span>{receipt.amount.toLocaleString("en-NG")}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] leading-4 text-text-primary">
                    Payment Method
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    Paystack
                  </p>
                </div>

                {receipt.reference && (
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[12px] leading-4 text-text-primary">
                      Payment Reference
                    </p>
                    <p className="text-right text-[12px] leading-4 break-all text-text-secondary">
                      {receipt.reference}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] leading-4 text-text-primary">
                    Transaction Status
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {receipt.statusLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* transaction timeline */}
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <p>Transaction timeline</p>

              <div className="flex flex-col gap-2">
                {receipt.timeline.map((step) => (
                  <div key={step.label} className="flex items-center gap-2">
                    {step.done ? (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-button-bg">
                        <img src={checkIcon} alt="" className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 shrink-0 rounded-full border border-bg-accent" />
                    )}

                    <div>
                      <p
                        className={`text-[14px] ${step.done ? "" : "text-text-secondary"}`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[12px] leading-4 text-text-secondary">
                        {step.at
                          ? formatReceiptDate(step.at)
                          : step.done
                            ? "Done"
                            : "Not yet"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 rounded-lg bg-bg-accent px-3 py-2 text-[12px] leading-4 text-text-secondary">
            {receipt.note}
          </p>

          {/* share receipt */}
          <div className="mt-4 space-y-2">
            <p>Share Receipt</p>

            <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-bg-accent px-2 py-4">
              <a
                href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`}
                className="flex w-[85px] items-center gap-0.5 rounded-xl border border-bg-accent p-2"
              >
                <img src={gmailIcon} alt="" />
                <p className="text-[12px] leading-4">Email</p>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(summary)}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-21.25 items-center gap-0.5 rounded-xl border border-bg-accent p-2"
              >
                <img src={whatsappIcon} alt="" />
                <p className="text-[12px] leading-4">Whatsapp</p>
              </a>
            </div>

            <p className="text-[12px] leading-4 text-text-secondary">
              Email and WhatsApp share a short summary. Download the PDF to
              attach the full receipt.
            </p>
          </div>

          {/* links */}
          <div className="mt-8 mb-10 space-y-3">
            <div className="flex flex-col items-center justify-center gap-3">
              <Button
                variant="app-primary"
                size="full"
                disabled={!receipt.isPaid || busy !== null}
                onClick={() =>
                  run("download", () => downloadReceiptPdf(receipt))
                }
              >
                <img src={downloadIcon} alt="" />
                <p>
                  {busy === "download"
                    ? "Preparing receipt…"
                    : "Download Receipt(PDF)"}
                </p>
              </Button>

              <Button variant="app-secondary" size="full" asChild>
                <Link to="/">
                  <img src={homeIcon} alt="" />
                  <p>Go to Homepage</p>
                </Link>
              </Button>
            </div>

            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Having issues with agent?&nbsp;
              <Link
                to={`/open-dispute/${transactionId}?type=${recordType}`}
                className="text-button-bg"
              >
                Open a dispute
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
