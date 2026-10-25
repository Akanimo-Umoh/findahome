import {
  getInspectionPaymentStatusLabel,
  getPurchasePaymentStatusLabel,
  getTimelineSteps,
  mapInspectionStatusToTransactionStatus,
  mapPurchaseStatusToTransactionStatus,
} from "@/components/transaction-details/transactionConfig"
import type { Inspection } from "@/services/inspection.service"
import type { Purchase } from "@/services/purchase.service"

export type ReceiptPerson = { name: string; email: string; phone: string }

export type ReceiptStep = { label: string; at: string | null; done: boolean }

export type ReceiptData = {
  kind: "inspection" | "purchase"
  receiptNo: string
  isPaid: boolean
  typeLabel: string
  statusLabel: string
  reference: string | null
  paidAt: string | null
  amount: number
  // what the total is made of; one line when it can't be split up reliably
  lines: { label: string; amount: number }[]
  property: { title: string; address: string; ref: string; image?: string }
  buyer: ReceiptPerson
  agent: ReceiptPerson
  timeline: ReceiptStep[]
  note: string
}

type Viewer = { name?: string; email: string; phoneNumber?: string } | null

const person = (
  raw:
    | string
    | { name?: string; email: string; phoneNumber?: string | null }
    | undefined,
  fallback: ReceiptPerson
): ReceiptPerson =>
  !raw || typeof raw === "string"
    ? fallback
    : {
        name: raw.name ?? raw.email,
        email: raw.email,
        phone: raw.phoneNumber || "—",
      }

export const formatReceiptDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "—"

export const formatNairaAmount = (n: number) => `₦${n.toLocaleString("en-NG")}`

// Receipt number from the record id (the backend has no receipt number).
const receiptNumber = (id: string) => `RCT-${id.slice(-8).toUpperCase()}`

function noteFor(
  kind: "inspection" | "purchase",
  status: string,
  isPaid: boolean
) {
  if (!isPaid) return "No payment has been received for this transaction yet."
  if (status === "inspection_cancelled") return "This inspection was cancelled."
  if (status === "funds_released") {
    return "The funds have been released to the agent. This transaction is complete."
  }
  if (status === "inspection_completed" || status === "handover_completed") {
    return `The ${kind === "inspection" ? "inspection" : "handover"} is complete. The funds will be released to the agent after review.`
  }
  return `Your payment is held securely in escrow. It is only released to the agent after the ${kind === "inspection" ? "inspection" : "handover"} is completed.`
}

// Everything the receipt page and the PDF show, built from the real record.
export function buildReceipt(
  transaction: Inspection | Purchase,
  recordType: "inspection" | "purchase",
  viewer: Viewer
): ReceiptData {
  const isPurchase = recordType === "purchase"
  const t = transaction
  const property = typeof t.property === "string" ? undefined : t.property
  const record = isPurchase ? (t as Purchase) : (t as Inspection)

  const amount = isPurchase ? (t as Purchase).price : (t as Inspection).fee
  const status = record.status

  // Only split the total when the parts really add up to it: the fees are read from the property as it is now, and may have changed since the payment.
  const lines: ReceiptData["lines"] = []
  if (
    isPurchase &&
    property?.price !== undefined &&
    property.price +
      (property.escrowFee ?? 0) +
      (property.serviceCharge ?? 0) ===
      amount
  ) {
    lines.push({ label: "Property price", amount: property.price })
    if (property.escrowFee) {
      lines.push({ label: "Escrow fee", amount: property.escrowFee })
    }
    if (property.serviceCharge) {
      lines.push({ label: "Service charge", amount: property.serviceCharge })
    }
  } else {
    lines.push({
      label: isPurchase ? "Property payment" : "Inspection fee",
      amount,
    })
  }

  const transactionStatus = isPurchase
    ? mapPurchaseStatusToTransactionStatus((t as Purchase).status)
    : mapInspectionStatusToTransactionStatus((t as Inspection).status)
  const steps = getTimelineSteps(transactionStatus, record)
  // same order as getTimelineSteps: the inspection flow lists "paid" twice
  const dates = isPurchase
    ? [
        record.paidAt,
        record.scheduledAt,
        record.confirmedAt,
        record.completedAt,
      ]
    : [
        record.paidAt,
        record.paidAt,
        record.scheduledAt,
        record.confirmedAt,
        record.completedAt,
      ]
  const timeline: ReceiptStep[] = steps.map((s, i) => ({
    label: s.label,
    at: dates[i] ?? null,
    done: !!dates[i],
  }))
  if (isPurchase) {
    timeline.push({
      label: "Funds released to agent",
      at: null,
      done: status === "funds_released",
    })
  }

  const buyerFallback: ReceiptPerson = {
    name: viewer?.name ?? viewer?.email ?? "Buyer",
    email: viewer?.email ?? "",
    phone: viewer?.phoneNumber || "—",
  }
  const agentFallback: ReceiptPerson = { name: "Agent", email: "", phone: "—" }
  const isPaid = !!t.feePaid

  return {
    kind: recordType,
    receiptNo: receiptNumber(t._id),
    isPaid,
    typeLabel: isPurchase ? "Property payment" : "Inspection fee",
    statusLabel: isPurchase
      ? getPurchasePaymentStatusLabel((t as Purchase).status)
      : getInspectionPaymentStatusLabel((t as Inspection).status),
    reference: t.reference ?? null,
    paidAt: t.paidAt ?? null,
    amount,
    lines,
    property: {
      title: property?.title ?? "Property",
      address: property?.address ?? "",
      ref: property?._id ? `FH-${property._id.slice(-4).toUpperCase()}` : "—",
      image: property?.image,
    },
    buyer: person(
      isPurchase ? (t as Purchase).buyer : (t as Inspection).user,
      buyerFallback
    ),
    agent: person(t.owner, agentFallback),
    timeline,
    note: noteFor(recordType, status, isPaid),
  }
}

export const receiptFilename = (r: ReceiptData) =>
  `FindaHome-Receipt-${r.receiptNo}.pdf`

// a short text summary for email and WhatsApp
export const receiptSummary = (r: ReceiptData) =>
  [
    `FindaHome payment receipt ${r.receiptNo}`,
    `${r.typeLabel}: ${formatNairaAmount(r.amount)}`,
    `Property: ${r.property.title}`,
    `Paid: ${formatReceiptDate(r.paidAt)}`,
    r.reference ? `Reference: ${r.reference}` : "",
    `Status: ${r.statusLabel}`,
  ]
    .filter(Boolean)
    .join("\n")
