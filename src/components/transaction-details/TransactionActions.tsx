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
  // where the receipt lives, set once the payment has been made
  receiptTo?: string
  // real details for the "schedule confirmed" overlay
  chatTo: string
  scheduledAtLabel?: string
  agentName: string
  // another buyer has paid for the property, so "Secure Property" is closed
  propertyTaken?: boolean
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
  receiptTo,
  chatTo,
  scheduledAtLabel,
  agentName,
  propertyTaken,
}: TransactionActionsProps) {
  // const showRequestInspection = status === "inspection_requested"
  const showConfirmInspection = status === "inspection_scheduled"
  const showViewVisitDetails = status === "inspection_confirmed"
  const showSecureProperty = status === "inspection_completed"
  // const showRequestHandover = status === "handover_requested"
  const showConfirmHandover = status === "handover_scheduled"
  const isHandover = status.startsWith("handover")
  const showViewHandoverDetails = status === "handover_confirmed"
  const showViewReceipt = status === "funds_released"
  const disputeType =
    status.startsWith("handover") || showViewReceipt ? "purchase" : "inspection"

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

        {/* Phase 4 — inspection done, prompt to secure property. closed while
            another buyer's offer stands; the page shows a notice for that */}
        {showSecureProperty && !propertyTaken && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={`/property-payment/${transactionId}`}>
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
            <Link to={`/transactions/${transactionId}/visit?type=purchase`}>
              View Handover Details
            </Link>
          </Button>
        )}

        {/* Phase 10 — funds released, receipt available */}
        {showViewReceipt && receiptTo && (
          <Button variant="app-primary" size="full" asChild>
            <Link to={receiptTo}>View Receipt</Link>
          </Button>
        )}

        {/* inspection or handover completed, funds not released yet */}
        {!showViewReceipt && receiptTo && (
          <Button variant="app-secondary" size="full" asChild>
            <Link to={receiptTo}>View Receipt</Link>
          </Button>
        )}
      </div>

      <p className="mt-3 text-center text-[12px] leading-4 text-text-secondary">
        Having issues with agent?{" "}
        <Link
          to={`/open-dispute/${transactionId}?type=${disputeType}`}
          className="font-bold hover:text-button-bg"
        >
          Open a dispute
        </Link>
      </p>

      <ScheduleConfirmedOverlay
        open={isConfirmedOverlayOpen}
        onOpenChange={onConfirmedOverlayOpenChange}
        // from the deal type, not "scheduled": after confirming, the page
        // refreshes to the confirmed status while this is still open
        title={isHandover ? "Handover Scheduled!" : "Visit Scheduled!"}
        description={
          isHandover
            ? "Your property handover has been confirmed"
            : "Your property visit has been confirmed"
        }
        viewDetailsLabel={
          isHandover ? "View Handover Details" : "View Visit Details"
        }
        viewDetailsTo={`/transactions/${transactionId}/visit${
          isHandover ? "?type=purchase" : ""
        }`}
        chatTo={chatTo}
        scheduledAtLabel={scheduledAtLabel}
        agentName={agentName}
      />
    </div>
  )
}
