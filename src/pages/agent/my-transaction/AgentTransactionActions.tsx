import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { TransactionStatus } from "@/types/transactions"

interface AgentTransactionActionsProps {
  status: TransactionStatus
  transactionId: string
}

export default function AgentTransactionActions({
  status,
  transactionId,
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
        {showScheduleInspection && (
          <Button variant="app-primary" size="full" asChild>
            <Link
              to={`/agent/transactions/${transactionId}/schedule-inspection`}
            >
              Schedule Inspection
            </Link>
          </Button>
        )}

        {showInspectionVisitDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/agent/transactions/${transactionId}/visit`}>
              Visit Details
            </Link>
          </Button>
        )}

        {showScheduleHandover && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/agent/transactions/${transactionId}/schedule-handover`}>
              Schedule Handover
            </Link>
          </Button>
        )}

        {showHandoverVisitDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/agent/transactions/${transactionId}/visit`}>
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
        <Link to="/dispute" className="font-bold hover:text-button-bg">
          Open a dispute
        </Link>
      </p>
    </div>
  )
}
