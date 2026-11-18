import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatNaira } from "@/lib/adminFormat"
import { KIND_LABEL } from "../format"
import type { RefundDue } from "../pendingPayments"
import { useMarkRefundSent } from "../useEscrow"
import { RefundSentDialog } from "./RefundSentDialog"

// Rejected payments: the buyer paid, the admin turned it down, and the money
// has to go back by bank transfer. Each stays here until it's marked as sent.
export function RefundsDue({ items }: { items: RefundDue[] }) {
  const [selected, setSelected] = useState<RefundDue | null>(null)
  const mutation = useMarkRefundSent()

  if (items.length === 0) return null

  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50/40">
      <header className="px-4 pt-4 pb-2">
        <h2 className="font-raleway text-[15px] font-bold text-text-primary">
          Refunds to send ({items.length})
        </h2>
        <p className="text-[13px] text-text-secondary">
          Payments you rejected. Send each buyer their money, then mark it as
          sent so they are told.
        </p>
      </header>

      <ul className="divide-y divide-rose-100">
        {items.map((r) => (
          <li
            key={`${r.kind}-${r.id}`}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-text-primary">
                {r.propertyTitle}
              </p>
              <p className="truncate text-[12.5px] text-text-secondary">
                {KIND_LABEL[r.kind]} · {r.buyerName}
                {r.buyerEmail && ` (${r.buyerEmail})`}
              </p>
              {r.reference && (
                <p className="text-[12.5px] text-text-secondary">
                  Paystack reference:{" "}
                  <span className="font-mono select-all">{r.reference}</span>
                </p>
              )}
            </div>

            <p className="text-[14px] font-semibold text-text-primary">
              {formatNaira(r.amount)}
            </p>

            <Button variant="outline" onClick={() => setSelected(r)}>
              Mark refund sent
            </Button>
          </li>
        ))}
      </ul>

      {selected && (
        <RefundSentDialog
          expectedAmount={selected.amount}
          buyerName={selected.buyerName}
          propertyTitle={selected.propertyTitle}
          pending={mutation.isPending}
          onConfirm={(sent) =>
            mutation.mutate(
              { kind: selected.kind, id: selected.id, sent },
              { onSuccess: () => setSelected(null) }
            )
          }
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
