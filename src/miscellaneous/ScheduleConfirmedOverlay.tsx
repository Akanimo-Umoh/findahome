import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import greenCalendar from "@/assets/images/icon-calendar-check.svg"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// TODO: swap for the real per-property/agent chat route once that endpoint exists
const AGENT_CHAT_PATH = "/chat"

interface ScheduleConfirmedOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  viewDetailsLabel: string
  viewDetailsTo: string
}

export default function ScheduleConfirmedOverlay({
  open,
  onOpenChange,
  title,
  description,
  viewDetailsLabel,
  viewDetailsTo,
}: ScheduleConfirmedOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full rounded-2xl px-6 py-8 font-ssPro text-text-primary [&]:gap-0 [&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B98133]">
            <img src={greenCalendar} alt="" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
            {title}
          </p>
          <p className="mt-1 text-[12px] text-text-secondary">{description}</p>
        </div>

        <div className="mt-4 space-y-2 rounded-xl bg-bg-accent px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px]">Date & Time:</p>
            <p className="text-[12px] text-text-secondary">
              20th Oct, 2025 at 10 AM
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px]">Visit Type:</p>
            <p className="text-[12px] text-text-secondary">Physical Visit</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px]">Agent:</p>
            <p className="text-[12px] text-text-secondary">Maryann Kikomu</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="app-primary" size="full" asChild>
            <Link to={viewDetailsTo}>{viewDetailsLabel}</Link>
          </Button>

          <Button variant="app-secondary" size="full" asChild>
            <Link to={AGENT_CHAT_PATH}>Back to chat</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
