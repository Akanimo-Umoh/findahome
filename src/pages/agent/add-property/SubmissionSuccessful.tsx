import successImg from "@/assets/images/img-inspection-fee-successful.png";
import { useNavigate } from "react-router-dom";

type Props = {
  propertyId: string;
  onDashboard?: () => void;
};

export default function SubmissionSuccessful({
  propertyId,
  onDashboard,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary">
      {/* modal */}
      <div className="bg-white w-full min-h-screen py-[43px] px-6 flex flex-col items-center justify-center">
        <div>
          <img
            src={successImg}
            alt=""
            className="mx-auto h-[191px] w-[191px]"
          />
        </div>

        <div className="flex flex-col gap-6 mt-4 md:max-w-90.5">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="font-raleway font-medium text-[24px] tracking-[1px] text-center md:text-[22px]">
              Your listing has been submitted!
            </p>

            <div>
              <p className="text-center">Our team is reviewing it.</p>
              <p className="text-[12px] text-text-secondary leading-4 text-center md:text-[14px]">
                Approval typically takes about 12 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(`/agent/property-preview/${propertyId}`)}
              className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white"
            >
              View Listing Preview
            </button>

            <button
              onClick={onDashboard}
              className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-11.25 rounded-lg border border-text-secondary"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
