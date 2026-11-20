import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  RotateCcw,
  Undo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatNaira } from "@/lib/adminFormat"
import { calculateRefundFee } from "@/lib/refundFee"
import { EscrowActionDialog } from "../components/EscrowActionDialog"
import { EscrowRefundDialog } from "../components/EscrowRefundDialog"
import { RefundSentDialog } from "../components/RefundSentDialog"
import { OtherOfferNote } from "../components/OtherOfferNote"
import { escrowOfferState } from "../propertyOffers"
import { DisputePanel } from "./components/DisputePanel"
import { LinkedRecord } from "./components/LinkedRecord"
import { MoneyPanel } from "./components/MoneyPanel"
import { PartiesPanel } from "./components/PartiesPanel"
import { ReleaseReadiness } from "./components/ReleaseReadiness"
import { formatDate, KIND_LABEL } from "../format"
import {
  isEscrowReleaseReady,
  isRefundAwaitingTransfer,
  type EscrowAction,
} from "../types"
import { useCompleteRefund, useEscrowData } from "../useEscrow"

const BACK = "/admin/transactions"

function BackLink() {
  return (
    <Link
      to={BACK}
      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
    >
      <ArrowLeft className="size-4" /> Escrow transactions
    </Link>
  )
}

export default function EscrowDetails() {
  const { escrowId } = useParams<{ escrowId: string }>()
  const { data, isLoading, isError, refetch } = useEscrowData()
  const [action, setAction] = useState<EscrowAction | null>(null)
  const completeRefund = useCompleteRefund()
  const row = data?.rows.find((r) => r.id === escrowId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-100" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="h-72 animate-pulse rounded-xl bg-slate-100 lg:col-span-2" />
          <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !row) {
    return (
      <div className="space-y-4">
        <BackLink />
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-14 text-center">
          <p className="text-sm text-slate-600">
            {isError
              ? "Could not load this escrow record."
              : "Escrow record not found."}
          </p>
          {isError && (
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <BackLink />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-raleway text-xl font-semibold text-slate-900">
            {row.propertyTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            <span className="tabular-nums">{row.code}</span> ·{" "}
            {KIND_LABEL[row.kind]} · {formatDate(row.createdAt)}
          </p>
          <p className="mt-0.5 truncate text-xs text-slate-400">
            Reference: {row.reference}
          </p>
          <OtherOfferNote
            offer={row.otherOffer}
            kind={row.kind}
            state={escrowOfferState(row)}
            className="mt-2"
          />
          {row.status === "refund_pending" && row.refundFeeWaived && (
            <p className="mt-2 text-sm text-amber-700">
              Refund approved: another buyer secured this property. Send the
              full {formatNaira(row.amount)} to {row.buyer.name} (no processing
              fee), then mark it as sent.
            </p>
          )}
          {row.status === "refund_pending" && !row.refundFeeWaived && (
            <p className="mt-2 text-sm text-amber-700">
              Refund approved. Send{" "}
              {formatNaira(row.amount - calculateRefundFee(row.amount))} to{" "}
              {row.buyer.name} ({formatNaira(row.amount)} paid, less the{" "}
              {formatNaira(calculateRefundFee(row.amount))} processing fee),
              then mark it as sent.
            </p>
          )}
          {row.status === "refunded" && row.refundedAt && (
            <p className="mt-2 text-sm text-slate-600">
              Refund of {formatNaira(row.refundedAmount ?? row.amount)} sent on{" "}
              {formatDate(row.refundedAt)}
              {row.transferReference && ` · Transfer ${row.transferReference}`}
              {row.refundNote && ` · ${row.refundNote}`}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {row.status === "refunded" ? null : isRefundAwaitingTransfer(row) ? (
            <Button
              onClick={() => setAction("complete_refund")}
              className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
            >
              <Banknote className="mr-2 size-4" /> Mark refund sent
            </Button>
          ) : !row.released ? (
            <>
              <Button variant="outline" onClick={() => setAction("refund")}>
                <RotateCcw className="mr-2 size-4" /> Refund buyer
              </Button>
              <Button
                disabled={!isEscrowReleaseReady(row)}
                title={
                  row.netPayoutConfirmed
                    ? isEscrowReleaseReady(row)
                      ? undefined
                      : "Payment, completion, and dispute checks must all pass before release"
                    : "Release is disabled until the backend returns a confirmed net payout."
                }
                onClick={() => setAction("release")}
                className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
              >
                <CheckCircle2 className="mr-2 size-4" /> Release funds
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setAction("hold")}>
              <Undo2 className="mr-2 size-4" /> Move back to hold
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <MoneyPanel row={row} />
          <PartiesPanel row={row} />
        </div>
        <div className="space-y-4">
          <ReleaseReadiness row={row} />
          <LinkedRecord row={row} />
          <DisputePanel row={row} />
        </div>
      </div>

      <EscrowActionDialog
        row={row}
        action={action}
        onClose={() => setAction(null)}
      />
      {action === "refund" && (
        <EscrowRefundDialog row={row} onClose={() => setAction(null)} />
      )}
      {action === "complete_refund" && (
        <RefundSentDialog
          amountPaid={row.amount}
          feeWaived={row.refundFeeWaived}
          buyerName={row.buyer.name}
          propertyTitle={row.propertyTitle}
          pending={completeRefund.isPending}
          onConfirm={(sent) =>
            completeRefund.mutate(
              { id: row.id, sent },
              { onSuccess: () => setAction(null) }
            )
          }
          onClose={() => setAction(null)}
        />
      )}
    </div>
  )
}
