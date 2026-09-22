import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface AgentVisitActionsProps {
  canMarkComplete: boolean
  isHandover: boolean
}

export default function AgentVisitActions({
  canMarkComplete,
  isHandover,
}: AgentVisitActionsProps) {
  return (
    <div className="mt-6 mb-10 space-y-3 md:mt-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-[13px] text-text-secondary">
          {canMarkComplete
            ? `Buyer confirmed this ${isHandover ? "handover" : "inspection"}.`
            : `Waiting for the buyer to confirm this ${isHandover ? "handover" : "inspection"}.`}
        </p>

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
