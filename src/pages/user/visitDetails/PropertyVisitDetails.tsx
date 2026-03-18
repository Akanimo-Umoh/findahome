import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import iconNotification from "@/assets/images/icon-visit-notification.svg";
import greenCheckIcon from "@/assets/images/icon-inspection-schedule-green-check.svg";
import nairaIcon from "@/assets/images/icon-chat-naira.svg";
import propertyImg from "@/assets/images/property.jpg";
import chatIcon from "@/assets/images/icon-chat.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import keysIcon from "@/assets/images/icon-keys.svg";
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg";
import greyInfo from "@/assets/images/icon-grey-info.svg";
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg";
// import EscrowProtectionTerms from "@/components/EscrowProtectionTerms";

export default function PropertyVisitDetails() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Visit Details
        </p>

        <div className="flex items-center justify-center gap-4 absolute right-0">
          <button>
            <img src={iconNotification} alt="notifications" />
          </button>
        </div>
      </div>

      <main className="mt-4">
        <div className="flex items-center bg-[#149D1833] p-2 gap-3 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#149D1833] flex items-center justify-center">
            <img src={greenCheckIcon} alt="" />
          </div>

          <div className="space-y-1">
            <p className="font-raleway font-semibold tracking-[1px] text-[12px] leading-[21px]">
              Handover Scheduled
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              Your handover has been scheduled successfully
            </p>
          </div>
        </div>

        <section className="mt-6">
          <div className="flex flex-col justify-center gap-3 p-2 border border-bg-accent rounded-xl">
            <div className="flex items-center gap-2">
              <img
                src={propertyImg}
                alt=""
                className="w-15 h-15 rounded-lg object-cover"
              />

              <div>
                <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
                  Luxury 4 Bed-room Apartment
                </p>

                <div className="text-[12px] leading-4 text-text-secondary flex items-center">
                  <p className="">Lekki Phase 1, Lagos.</p>
                  <p className="flex items-center">
                    <img src={nairaIcon} alt="" className="w-4 h-4" />
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
                <p className="font-raleway font-semibold text-[14px] leading-4 text-button-bg">
                  Paid
                </p>
              </div>
            </div>
          </div>

          {/* agent details */}
          <div className="space-y-2 p-2 rounded-xl border border-bg-accent mt-4">
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              Your Agent
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={agentAvatar}
                  alt=""
                  className="w-12.5 h-12.5 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-[12px]">Maryann Kikomu</p>
                  <p className="text-[12px] leading-4">Verified Agent</p>
                </div>
              </div>

              {/* this chat should be linked to the exact property */}
              <button className="button-style p-2 flex items-center justify-center gap-2 rounded-lg">
                <img src={chatIcon} alt="" />
                <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
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
              <div className="flex flex-col justify-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Payment initiated</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Funds held in Escrow
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Scheduled
                  </p>
                </div>

                {/* if it is not completed */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Inspection Completed
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
                    {/* if it is confirmed, the img icon should show */}
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Property Handover
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
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
          <div className="flex flex-col gap-1 mt-4">
            <p>Additional Note(Optional)</p>

            <div className="border border-text-disabled rounded-xl p-2">
              <textarea
                className="w-full text-[12px] leading-4 h-full outline-none"
                placeholder="Any specific questions or requirement for the visit?"
                rows={4}
              />
            </div>
          </div>

          {/* links */}
          <div className="mt-6 space-y-3 mb-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white flex items-center justify-center gap-2">
                <img src={keysIcon} alt="" />
                <p>Mark Handover as completed</p>
              </button>

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] bg-button-disabled border border-text-secondary h-[45px] w-full rounded-lg flex items-center justify-center gap-2">
                <img src={homeIcon} alt="" />
                <p>Go to Dashboard</p>
              </button>
            </div>

            <p className="text-[12px] leading-4 text-text-secondary text-center">
              Having issues with agent?&nbsp;
              <span className="text-button-bg">Open a dispute</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
