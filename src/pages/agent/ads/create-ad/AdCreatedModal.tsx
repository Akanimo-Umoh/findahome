import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"

type AdCreatedModalProps = {
  open: boolean
  adId: string
  onNavigate: () => void
}

export default function AdCreatedModal({
  open,
  adId,
  onNavigate,
}: AdCreatedModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      onNavigate()
      navigate(`/agent/ad-details/${adId}`, { replace: true })
    }, 4000)
    return () => clearTimeout(timer)
  }, [open, adId, navigate, onNavigate])

  return (
    <Dialog open={open}>
      <DialogContent
        className="w-full gap-0 rounded-2xl border-none bg-white px-6 py-[43px] font-ssPro text-text-primary [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <img src={successImg} alt="" className="mx-auto h-25 w-25" />

        <div className="mx-auto mt-4 flex max-w-[317px] flex-col items-center justify-center gap-2 text-center">
          <DialogTitle className="font-raleway text-[20px] font-medium tracking-[1px]">
            Ad Created!
          </DialogTitle>
          <DialogDescription className="text-[12px] leading-4 text-text-secondary">
            Taking you to your ad details...
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
