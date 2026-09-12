import successImg from "@/assets/images/img-inspection-fee-successful.png"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type ScheduledSuccessfullyProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  date?: Date
  time: string
  onGoToDetails: () => void
}

export default function ScheduledSuccessfully({
  open,
  onOpenChange,
  title,
  date,
  time,
  onGoToDetails,
}: ScheduledSuccessfullyProps) {
  const formattedDate = date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-full flex-col gap-0 overflow-y-auto rounded-2xl border-none bg-white px-6 py-[43px] font-ssPro text-text-primary [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mx-auto mt-4 flex max-w-[326px] flex-col">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[24px] font-medium tracking-[1px]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-[12px] leading-4 text-text-secondary">
              The buyer will be notified of the time and date scheduled
            </DialogDescription>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <p>Date: {formattedDate}</p>
            <p>Time: {time}</p>
          </div>

          <div className="mt-6 flex max-w-[343px] flex-col gap-3">
            <button
              onClick={onGoToDetails}
              className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
            >
              Go to Transaction Details
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
