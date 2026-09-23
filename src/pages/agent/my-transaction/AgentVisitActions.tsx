import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface AgentVisitActionsProps {
  status: string
  canMarkComplete: boolean
  isHandover: boolean
  transactionId: string
}

export default function AgentVisitActions({
  status,
  canMarkComplete,
  isHandover,
  transactionId,
}: AgentVisitActionsProps) {
  const transactionName = isHandover ? "handover" : "inspection"
  const statusMessage = canMarkComplete
    ? `Buyer confirmed this ${transactionName} is complete.`
    : status === (isHandover ? "handover_scheduled" : "inspection_scheduled")
      ? `Waiting for the buyer to confirm the scheduled ${transactionName}.`
      : `The buyer confirmed the schedule. Waiting for the buyer to mark this ${transactionName} as complete.`

  return (
    <div className="mt-6 mb-10 space-y-3 md:mt-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-[13px] text-text-secondary">
          {statusMessage}
        </p>

        <Button variant="app-secondary" size="full" asChild>
          <Link
            to={`/open-dispute/${transactionId}?type=${isHandover ? "purchase" : "inspection"}`}
            className="font-semibold hover:text-button-bg"
          >
            Open a dispute
          </Link>
        </Button>
      </div>

      <p className="text-center text-[12px] leading-4 text-text-secondary">
        Having issues with buyer?&nbsp;
        <Link to="/dispute" className="font-semibold hover:text-button-bg">
          Open a dispute
        </Link>
      </p>
    </div>
  )
}
