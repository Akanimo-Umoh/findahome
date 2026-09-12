import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
// import RequestSuccessful from "@/components/shared/RequestSuccessful"
import ScheduleConfirmedOverlay from "@/components/transaction-details/ScheduleConfirmedOverlay"
import type { TransactionStatus } from "@/types/transactions"

interface TransactionActionsProps {
  status: TransactionStatus
  transactionId: string
  isRequestSuccessOpen: boolean
  onRequestSuccessOpenChange: (open: boolean) => void
  isConfirmedOverlayOpen: boolean
  isConfirming?: boolean
  onConfirmedOverlayOpenChange: (open: boolean) => void
  onRequestAction: () => void
  onConfirmAction: () => void
  onSuggestNewTime: () => void
  onGoToDashboard: () => void
}

export default function TransactionActions({
  status,
  transactionId,
  // isRequestSuccessOpen,
  // onRequestSuccessOpenChange,
  isConfirmedOverlayOpen,
  isConfirming,
  onConfirmedOverlayOpenChange,
  // onRequestAction,
  onConfirmAction,
  onSuggestNewTime,
  // onGoToDashboard,
}: TransactionActionsProps) {
  // const showRequestInspection = status === "inspection_requested"
  const showConfirmInspection = status === "inspection_scheduled"
  const showViewVisitDetails = status === "inspection_confirmed"
  const showSecureProperty = status === "inspection_completed"
  // const showRequestHandover = status === "handover_requested"
  const showConfirmHandover = status === "handover_scheduled"
  const showViewHandoverDetails = status === "handover_confirmed"
  const showViewReceipt = status === "funds_released"

  return (
    <div className="mt-6 mb-8 lg:mt-0 lg:mb-0">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Phase 1 — waiting for agent to schedule */}
        {/* {showRequestInspection && (
          <>
            <Button variant="app-primary" size="full" onClick={onRequestAction}>
              Request Inspection Schedule
            </Button>

            <RequestSuccessful
              open={isRequestSuccessOpen}
              onOpenChange={onRequestSuccessOpenChange}
              onGoToDashboard={onGoToDashboard}
              title="Your agent has received your inspection request"
              description="You will receive a notification for an inspection schedule"
            />
          </>
        )} */}

        {/* Phase 2 — agent scheduled, user confirms or reschedules */}
        {showConfirmInspection && (
          <>
            <Button
              variant="app-primary"
              size="full"
              onClick={onConfirmAction}
              disabled={isConfirming}
            >
              {isConfirming ? "Confirming..." : "Confirm Inspection Schedule"}
            </Button>

            <ScheduleConfirmedOverlay
              open={isConfirmedOverlayOpen}
              onOpenChange={onConfirmedOverlayOpenChange}
              title="Visit Scheduled!"
              description="Your property visit has been confirmed"
              viewDetailsLabel="View Visit Details"
              viewDetailsTo={`/transactions/${transactionId}/visit`}
            />
            <Button
              variant="app-secondary"
              size="full"
              onClick={onSuggestNewTime}
            >
              Suggest New Time
            </Button>
          </>
        )}

        {/* Phase 3 — confirmed, visit upcoming */}
        {showViewVisitDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/transactions/${transactionId}/visit`}>
              View Visit Details
            </Link>
          </Button>
        )}

        {/* Phase 4 — inspection done, prompt to secure property */}
        {showSecureProperty && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/transactions/${transactionId}/payment`}>
              Secure Property
            </Link>
          </Button>
        )}

        {/* Phase 6 — waiting for agent to schedule handover */}
        {/* {showRequestHandover && (
          <>
            <Button variant="app-primary" size="full" onClick={onRequestAction}>
              Request Handover Schedule
            </Button>
            <RequestSuccessful
              open={isRequestSuccessOpen}
              onOpenChange={onRequestSuccessOpenChange}
              onGoToDashboard={onGoToDashboard}
              title="Your agent has received your handover request"
              description="You will receive a notification for a handover schedule"
            />
          </>
        )} */}

        {/* Phase 7 — agent scheduled handover, user confirms or reschedules */}
        {showConfirmHandover && (
          <>
            <Button variant="app-primary" size="full" onClick={onConfirmAction}>
              Confirm Handover Schedule
            </Button>
            <ScheduleConfirmedOverlay
              open={isConfirmedOverlayOpen}
              onOpenChange={onConfirmedOverlayOpenChange}
              title="Handover Scheduled!"
              description="Your property handover has been confirmed"
              viewDetailsLabel="View Handover Details"
              viewDetailsTo={`/transactions/${transactionId}/visit`}
            />
            <Button
              variant="app-secondary"
              size="full"
              onClick={onSuggestNewTime}
            >
              Suggest New Time
            </Button>
          </>
        )}

        {/* Phase 8 — confirmed, handover upcoming */}
        {showViewHandoverDetails && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/transactions/${transactionId}/visit`}>
              View Handover Details
            </Link>
          </Button>
        )}

        {/* Phase 10 — funds released, receipt available */}
        {showViewReceipt && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/transactions/${transactionId}/receipt`}>
              View Receipt
            </Link>
          </Button>
        )}
      </div>

      <p className="mt-3 text-center text-[12px] leading-4 text-text-secondary">
        Having issues with agent?{" "}
        <Link to="/dispute" className="font-bold hover:text-button-bg">
          Open a dispute
        </Link>
      </p>
    </div>
  )
}
