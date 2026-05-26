import successImg from "@/assets/images/img-inspection-fee-successful.png"
import { useNavigate } from "react-router-dom"

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
      {/* modal */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 py-[43px]">
        <div>
          <img
            src={successImg}
            alt=""
            className="mx-auto h-[191px] w-[191px]"
          />
        </div>

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
            <button
              onClick={() => navigate(`/agent/property-preview/${propertyId}`)}
              className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white"
            >
              View Listing Preview
            </button>

            <button
              onClick={onDashboard}
              className="h-11.25 w-full rounded-lg border border-text-secondary font-raleway text-[14px] font-semibold tracking-[1px]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
