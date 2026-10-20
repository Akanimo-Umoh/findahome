import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle2, RotateCcw, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EscrowActionDialog } from "../components/EscrowActionDialog"
import { DisputePanel } from "./components/DisputePanel"
import { LinkedRecord } from "./components/LinkedRecord"
import { MoneyPanel } from "./components/MoneyPanel"
import { PartiesPanel } from "./components/PartiesPanel"
import { ReleaseReadiness } from "./components/ReleaseReadiness"
import { formatDate, KIND_LABEL } from "../format"
import type { EscrowAction } from "../types"
import { useEscrowData } from "../useEscrow"

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
        </div>

        <div className="flex flex-wrap gap-2">
          {row.status === "refunded" ? null : !row.released ? (
            <>
              <Button
                variant="outline"
                disabled
                title="Needs a refund endpoint on the backend"
              >
                <RotateCcw className="mr-2 size-4" /> Refund buyer
              </Button>
              <Button
                onClick={() =>
                  setAction(row.status === "pending" ? "approve" : "release")
                }
                className="bg-[#274ad0] text-white hover:bg-[#274ad0]/90"
              >
                <CheckCircle2 className="mr-2 size-4" />{" "}
                {row.status === "pending" ? "Approve payment" : "Release funds"}
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
    </div>
  )
}
