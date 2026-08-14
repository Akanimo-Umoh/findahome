import { Link } from "react-router-dom"
import { toast } from "sonner"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
import { Button } from "@/components/ui/button"

interface AgentVisitActionsProps {
  confirmRoute: string
  markCompletedLabel: string
  canMarkComplete: boolean
  isHandover: boolean
}

export default function AgentVisitActions({
  confirmRoute,
  markCompletedLabel,
  canMarkComplete,
  isHandover,
}: AgentVisitActionsProps) {
  const handleBlockedClick = () => {
    toast.error(
      isHandover
        ? "The buyer hasn't marked this handover as completed yet."
        : "The buyer hasn't marked this inspection as completed yet."
    )
  }

  return (
    <div className="mt-6 mb-10 space-y-3 md:mt-12">
      <div className="flex flex-col items-center justify-center gap-4">
        {canMarkComplete ? (
          <Button variant="app-primary" size="full" asChild>
            <Link to={confirmRoute}>
              <img src={checkIcon} alt="" className="h-6 w-6" />
              <span>{markCompletedLabel}</span>
            </Link>
          </Button>
        ) : (
          <Button
            variant="app-primary"
            size="full"
            type="button"
            onClick={handleBlockedClick}
          >
            <img src={checkIcon} alt="" className="h-6 w-6" />
            <span>{markCompletedLabel}</span>
          </Button>
        )}

        <Button variant="app-secondary" size="full" asChild>
          <Link to="/agent/dashboard">Go to Dashboard</Link>
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
