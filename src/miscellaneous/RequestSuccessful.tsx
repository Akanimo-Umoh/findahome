// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import successImg from "@/assets/images/img-pay-inspection-fee.png"

// interface RequestSuccessfulProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onGoToDashboard: () => void
// }

// export default function RequestSuccessful({
//   open,
//   onOpenChange,
//   onGoToDashboard,
// }: RequestSuccessfulProps) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-full gap-0 rounded-2xl border-none bg-white [&>button]:hidden">
//         <div>
//           <img src={successImg} alt="" className="mx-auto h-25 w-25" />

//           <div className="mx-auto mt-4 flex max-w-[317px] flex-col items-center justify-center gap-2 text-center">
//             <DialogTitle className="font-raleway text-[20px] font-medium tracking-[1px]">
//               Your agent has received your inspection request
//             </DialogTitle>
//             <DialogDescription className="text-[12px] leading-4 text-text-secondary">
//               You will receive a notification for an inspection schedule
//             </DialogDescription>
//           </div>

//           <div className="mt-[34px]">
//             <Button variant="app-primary" size="full" onClick={onGoToDashboard}>
//               Go to HomePage
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import successImg from "@/assets/images/img-pay-inspection-fee.png"

interface RequestSuccessfulProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGoToDashboard: () => void
  title: string
  description: string
}

export default function RequestSuccessful({
  open,
  onOpenChange,
  onGoToDashboard,
  title,
  description,
}: RequestSuccessfulProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full gap-0 rounded-2xl border-none bg-white [&>button]:hidden">
        <div>
          <img src={successImg} alt="" className="mx-auto h-25 w-25" />

          <div className="mx-auto mt-4 flex max-w-[317px] flex-col items-center justify-center gap-2 text-center">
            <DialogTitle className="font-raleway text-[20px] font-medium tracking-[1px]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-[12px] leading-4 text-text-secondary">
              {description}
            </DialogDescription>
          </div>

          <div className="mt-[34px]">
            <Button variant="app-primary" size="full" onClick={onGoToDashboard}>
              Go to HomePage
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
