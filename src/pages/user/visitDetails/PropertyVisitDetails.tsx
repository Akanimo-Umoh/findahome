import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import iconNotification from "@/assets/images/icon-visit-notification.svg"
import greenCheckIcon from "@/assets/images/icon-inspection-schedule-green-check.svg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import propertyImg from "@/assets/images/property.jpg"
import chatIcon from "@/assets/images/icon-chat.svg"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import keysIcon from "@/assets/images/icon-keys.svg"
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg"
import greyInfo from "@/assets/images/icon-grey-info.svg"
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg"
// import EscrowProtectionTerms from "@/components/EscrowProtectionTerms";

export default function PropertyVisitDetails() {
  const navigate = useNavigate()

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Visit Details
        </p>

        <div className="absolute right-0 flex items-center justify-center gap-4">
          <button>
            <img src={iconNotification} alt="notifications" />
          </button>
        </div>
      </div>

      <main className="mt-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#149D1833] p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#149D1833]">
            <img src={greenCheckIcon} alt="" />
          </div>

          <div className="space-y-1">
            <p className="font-raleway text-[12px] leading-[21px] font-semibold tracking-[1px]">
              Handover Scheduled
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              Your handover has been scheduled successfully
            </p>
          </div>
        </div>

        <section className="mt-6">
          <div className="flex flex-col justify-center gap-3 rounded-xl border border-bg-accent p-2">
            <div className="flex items-center gap-2">
              <img
                src={propertyImg}
                alt=""
                className="h-15 w-15 rounded-lg object-cover"
              />

              <div>
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Luxury 4 Bed-room Apartment
                </p>

                <div className="flex items-center text-[12px] leading-4 text-text-secondary">
                  <p className="">Lekki Phase 1, Lagos.</p>
                  <p className="flex items-center">
                    <img src={nairaIcon} alt="" className="h-4 w-4" />
                    <span>3M/yr</span>
                  </p>
                </div>

                <p className="text-[12px] leading-4 text-text-secondary">
                  Ref: FH - 2862
                </p>
              </div>
            </div>

            {/* visit details */}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between text-[12px] leading-4">
                <p>Date & Time:</p>
                <p className="text-text-secondary">20th Oct, 2025 at 10 AM</p>
              </div>

              <div className="flex items-center justify-between text-[12px] leading-4">
                <p>Transaction ID:</p>
                <p className="text-text-secondary">TXN-89234567</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4">Payment Status</p>
                <p className="font-raleway text-[14px] leading-4 font-semibold text-button-bg">
                  Paid
                </p>
              </div>
            </div>
          </div>

          {/* agent details */}
          <div className="mt-4 space-y-2 rounded-xl border border-bg-accent p-2">
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              Your Agent
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={agentAvatar}
                  alt=""
                  className="h-12.5 w-12.5 rounded-full object-cover"
                />

                <div>
                  <p className="text-[12px] font-semibold">Maryann Kikomu</p>
                  <p className="text-[12px] leading-4">Verified Agent</p>
                </div>
              </div>

              {/* this chat should be linked to the exact property */}
              <button className="button-style flex items-center justify-center gap-2 rounded-lg p-2">
                <img src={chatIcon} alt="" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                  Chat
                </p>
              </button>
            </div>
          </div>

          {/* transaction in progress */}
          <div className="mt-4">
            <p>Handover in progress</p>

            <div className="mt-2">
              {/* progress bar */}
              <div>progress bar</div>

              {/* transaction status */}
              <div className="mt-3 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Payment initiated</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Funds held in Escrow
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Scheduled
                  </p>
                </div>

                {/* if it is not completed */}
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Inspection Completed
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-accent">
                    {/* if it is confirmed, the img icon should show */}
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Property Handover
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-accent">
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Funds released
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1">
              <p className="text-[12px] leading-4 text-button-bg">
                See Escrow Protection Terms
              </p>
              <img src={greyInfo} alt="" />
            </div>
            {/* when the escrow protection terms is clicked, this overlay should show */}
            {/* <EscrowProtectionTerms /> */}
          </div>

          {/* additional notes */}
          <div className="mt-4 flex flex-col gap-1">
            <p>Additional Note(Optional)</p>

            <div className="rounded-xl border border-text-disabled p-2">
              <textarea
                className="h-full w-full text-[12px] leading-4 outline-none"
                placeholder="Any specific questions or requirement for the visit?"
                rows={4}
              />
            </div>
          </div>

          {/* links */}
          <div className="mt-6 mb-10 space-y-3">
            <div className="flex flex-col items-center justify-center gap-3">
              <button className="button-style flex h-[45px] w-full items-center justify-center gap-2 rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                <img src={keysIcon} alt="" />
                <p>Mark Handover as completed</p>
              </button>

              <button className="flex h-[45px] w-full items-center justify-center gap-2 rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
                <img src={homeIcon} alt="" />
                <p>Go to Dashboard</p>
              </button>
            </div>

            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Having issues with agent?&nbsp;
              <span className="text-button-bg">Open a dispute</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
