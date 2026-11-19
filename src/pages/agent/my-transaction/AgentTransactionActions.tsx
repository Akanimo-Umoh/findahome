import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { TransactionStatus } from "@/types/transactions"

interface AgentTransactionActionsProps {
  status: TransactionStatus
  transactionId: string
  canSchedule?: boolean
  // the buyer has paid for the property and an admin hasn't approved it yet
  paymentUnderReview?: boolean
}

export default function AgentTransactionActions({
  status,
  transactionId,
  canSchedule = true,
  paymentUnderReview = false,
}: AgentTransactionActionsProps) {
  const showScheduleInspection = status === "inspection_requested"
  const showInspectionVisitDetails =
    status === "inspection_scheduled" ||
    status === "inspection_confirmed" ||
    status === "inspection_completed"
  const showScheduleHandover = status === "property_payment_pending"
  const showHandoverVisitDetails =
    status === "handover_scheduled" ||
    status === "handover_confirmed" ||
    status === "handover_completed"
  const showViewReceipt = status === "funds_released"

  return (
    <div className="mt-6 mb-8 lg:mt-0 lg:mb-0">
      <div className="flex flex-col items-center justify-center gap-4">
        {showScheduleInspection && canSchedule && (
          <Button variant="app-primary" size="full" asChild>
            <Link
              to={`/agent/transactions/${transactionId}/schedule-inspection`}
            >
              Schedule Inspection
            </Link>
          </Button>
        )}

        {showScheduleInspection && !canSchedule && (
          <>
            <Button variant="app-primary" size="full" disabled>
              Schedule Inspection
            </Button>
            <p className="text-center text-[12px] leading-4 text-text-secondary">
              You can schedule once the buyer&apos;s payment is confirmed.
            </p>
          </>
        )}

        {showInspectionVisitDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link
              to={`/agent/transactions/${transactionId}/visit?type=inspection`}
            >
              Visit Details
            </Link>
          </Button>
        )}

        {showScheduleHandover && canSchedule && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/agent/transactions/${transactionId}/schedule-handover`}>
              Schedule Handover
            </Link>
          </Button>
        )}

        {showScheduleHandover && paymentUnderReview && (
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            The buyer&apos;s payment is under review. You can schedule the
            handover once an admin approves it.
          </p>
        )}

        {showHandoverVisitDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link
              to={`/agent/transactions/${transactionId}/visit?type=purchase`}
            >
              Handover Details
            </Link>
          </Button>
        )}

        {showViewReceipt && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/agent/transactions/${transactionId}/receipt`}>
              View Receipt
            </Link>
          </Button>
        )}
      </div>

      <p className="mt-3 text-center text-[12px] leading-4 text-text-secondary">
        Having issues with buyer?{" "}
        <Link
          to={`/open-dispute/${transactionId}?type=${status.startsWith("handover") || status === "property_payment_pending" || status === "funds_released" ? "purchase" : "inspection"}`}
          className="font-bold hover:text-button-bg"
        >
          Open a dispute
        </Link>
      </p>
    </div>
  )
}
