import { Link } from "react-router-dom"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
import { Button } from "@/components/ui/button"

interface VisitActionsProps {
  confirmRoute: string
  markCompletedLabel: string
}

export default function VisitActions({
  confirmRoute,
  markCompletedLabel,
}: VisitActionsProps) {
  return (
    <div className="mt-6 mb-10 space-y-3 md:mt-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button variant="app-primary" size="full" asChild>
          <Link to={confirmRoute}>
            <img src={checkIcon} alt="" className="h-6 w-6" />
            <span>{markCompletedLabel}</span>
          </Link>
        </Button>
        <Button variant="app-secondary" size="full" asChild>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
      <p className="text-center text-[12px] leading-4 text-text-secondary">
        Having issues with agent?&nbsp;
        <Link to="/dispute" className="font-semibold hover:text-button-bg">
          Open a dispute
        </Link>
      </p>
    </div>
  )
}
