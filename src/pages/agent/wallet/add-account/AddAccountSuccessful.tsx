import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import { Button } from "@/components/ui/button"

type AddAccountSuccessfulProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddAccountSuccessful({
  open,
  onOpenChange,
}: AddAccountSuccessfulProps) {
  const navigate = useNavigate()

  const goToManageAccount = () => {
    onOpenChange(false)
    navigate("/agent/manage-account", { replace: true })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          // any dismissal (outside click, Escape, etc.) should land somewhere real
          goToManageAccount()
          return
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="w-[calc(100%-48px)] max-w-[340px] gap-0 rounded-xl px-[27px] py-[43px] font-ssPro text-text-primary [&>button]:hidden">
        <img src={successImg} alt="" className="mx-auto" />

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <DialogTitle className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Bank Details Saved!
            </DialogTitle>
            <DialogDescription className="text-center text-[14px] text-text-secondary">
              Your bank details has been successfully saved.
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={goToManageAccount}
            >
              Back to Manage Account
            </Button>

            <Button
              variant="app-secondary"
              size="full"
              onClick={() => navigate("/agent/wallet", { replace: true })}
            >
              View Wallet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
