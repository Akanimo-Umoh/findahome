import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import uploadedFile from "@/assets/images/icon-evidence-uploaded.svg";
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg";

export default function DisputeDetail() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Dispute
        </p>
      </div>

      <main className="mt-2">
        <p className="text-[12px] leading-4 text-center">
          Dispute: REF ID: FH-TRX-002834
        </p>

        <div className="mt-8 space-y-2">
          <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
            Agent Description
          </p>

          <p className="text-[12px] leading-4 text-text-secondary">
            Buyer claims the property has issues that were not stated during
            inspection. I have video evidence from the inspection showing the
            bathroom and parking space were functional. Please review and step
            in.
          </p>
        </div>

        <div className="mt-8">
          <p>Issue Details</p>

          {/* dispute details */}
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-[12px] leading-4">
              <p>Buyer Name</p>
              <p className="text-text-secondary">Victoria Ntekim</p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4">
              <p>Tracking Status</p>
              <p className="text-bg-tertiary bg-[#D02727] py-0.5 px-2 rounded-2xl text-center">
                Pending Review
              </p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4">
              <p>Reference ID:</p>
              <p className="text-text-secondary">FH-TRX-002834</p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4">
              <p>Date Issued</p>
              <p className="text-text-secondary">15th Nov, 2025</p>
            </div>
          </div>
        </div>

        {/* evidence uploaded */}
        <div className="mt-6">
          <p>Evidence Uploaded</p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="py-5 px-2 flex flex-col gap-2 items-center justify-center rounded-lg border border-bg-accent flex-1">
              <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center line-clamp-1">
                <img src={uploadedFile} alt="" />
              </div>
              <p className="text-[12px] leading-4 text-text-secondary text-center">
                imag3_54np
              </p>
            </div>

            <div className="py-5 px-2 flex flex-col gap-2 items-center justify-center rounded-lg border border-bg-accent flex-1">
              <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center">
                <img src={uploadedFile} alt="" />
              </div>
              <p className="text-[12px] leading-4 text-text-secondary text-center line-clamp-1">
                imag3_55nx
              </p>
            </div>
          </div>
        </div>

        {/* activity timeline */}
        <div className="mt-6">
          <p className="text-black">Activity Timeline</p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#149D18] flex items-center justify-center shrink-0">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Dispute submitted</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov, 2026 · 9:22 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#149D18] flex items-center justify-center shrink-0">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Dispute under review</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov, 2026 · 9:28 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
