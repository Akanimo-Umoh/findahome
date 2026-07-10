import successImg from "@/assets/images/img-inspection-fee-successful.png"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

type Props = {
  propertyId: string
  onDashboard?: () => void
}

export default function SubmissionSuccessful({
  propertyId,
  onDashboard,
}: Props) {
  const navigate = useNavigate()

  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro text-text-primary">
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 py-[43px]">
        <img src={successImg} alt="" className="mx-auto h-[191px] w-[191px]" />

        <div className="mt-4 flex flex-col gap-6 md:max-w-90.5">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center font-raleway text-[24px] font-medium tracking-[1px] md:text-[22px]">
              Your listing has been submitted!
            </p>

            <div>
              <p className="text-center">Our team is reviewing it.</p>
              <p className="text-center text-[12px] leading-4 text-text-secondary md:text-[14px]">
                Approval typically takes about 12 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              onClick={() => navigate(`/agent/property-preview/${propertyId}`)}
            >
              View Listing Preview
            </Button>

            <Button variant="app-secondary" size="full" onClick={onDashboard}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
