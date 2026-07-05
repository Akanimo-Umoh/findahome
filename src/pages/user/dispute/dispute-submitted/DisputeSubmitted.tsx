import { Link } from "react-router-dom"
import successImg from "@/assets/images/img-pay-inspection-fee.png"
import bellIcon from "@/assets/images/icon-blue-notification.svg"
import trackIcon from "@/assets/images/icon-blue-track.svg"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"

export default function DisputeSubmitted() {
  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      {/* header */}
      <PageHeader title="Dispute Submitted" responsive />

      <main className="mt-6">
        <div className="mt-4 flex flex-col items-center justify-center">
          <img src={successImg} alt="" className="h-25 w-25 md:h-50 md:w-50" />

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-raleway text-[24px] font-medium tracking-[1px] md:text-[28px]">
              Dispute Sent For Review
            </p>

            <p className="max-w-74.5 text-[12px] leading-4 text-text-secondary">
              We've received your dispute regarding transaction ID
              FH-TRX-002834. Our team will review it shortly.
            </p>
          </div>
        </div>

        {/* dispute details */}
        <div className="mt-9 space-y-2">
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Reference ID:</p>

            <p className="text-text-secondary">FH-TRX-002834</p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Expected Resolution</p>
            <p className="text-text-secondary">Within 2-3 days</p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Tracking Status</p>
            <p className="rounded-2xl bg-[#D02727] px-2 py-0.5 text-center text-bg-tertiary">
              Pending Review
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Date Issued</p>
            <p className="text-text-secondary">15th Nov, 2025</p>
          </div>
        </div>

        <div className="mt-8 flex max-w-[305px] flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-bg-accent">
              <img src={bellIcon} alt="" />
            </div>

            <p className="text-[12px] text-text-secondary md:text-[14px]">
              You will receive an email and an in-app notification with update
              on your dispute status
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-bg-accent">
              <img src={trackIcon} alt="" />
            </div>

            <p className="text-[12px] text-text-secondary md:text-[14px]">
              You can track this disputes in your my disputes section.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <Button variant="app-primary" size="full" asChild>
            <Link to="/">Go to HomePage</Link>
          </Button>

          <Link
            to="/my-dispute"
            className="mx-auto font-raleway font-semibold tracking-[1px] text-button-bg"
          >
            View my Disputes
          </Link>
        </div>
      </main>
    </div>
  )
}
