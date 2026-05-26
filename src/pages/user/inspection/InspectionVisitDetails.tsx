import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import iconNotification from "@/assets/images/icon-visit-notification.svg"
import greenCheckIcon from "@/assets/images/icon-inspection-schedule-green-check.svg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import propertyImg from "@/assets/images/property.jpg"
import chatIcon from "@/assets/images/icon-chat.svg"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import locationImg from "@/assets/images/img-location.png"
// import locationIcon from "@/assets/images/icon-inspection-visit-location.svg";
import blackLocation from "@/assets/images/icon-inspection-visit-black-location.svg"
import idIcon from "@/assets/images/icon-inspection-visit-id.svg"
import listsIcon from "@/assets/images/icon-inspection-visit-list.svg"
import pictureIcon from "@/assets/images/icon-inspection-visit-camera.svg"
import timeIcon from "@/assets/images/icon-inspection-visit-time.svg"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"

export default function InspectionVisitDetails() {
  const navigate = useNavigate()

  const prepTips = [
    {
      icon: idIcon,
      tip: "Bring a valid ID for verification",
    },
    {
      icon: listsIcon,
      tip: "Prepare a list of questions about the property",
    },
    {
      icon: pictureIcon,
      tip: "Take photos and notes during the visit",
    },
    {
      icon: timeIcon,
      tip: "Arrive 5-10 minutes early",
    },
  ]
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
              Inspection Scheduled
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              Your visit has been scheduled successfully
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
                <p>Visit Type:</p>
                <p className="text-text-secondary">Physical Visit</p>
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

              <button className="button-style flex items-center justify-center gap-2 rounded-lg p-2">
                <img src={chatIcon} alt="" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                  Chat
                </p>
              </button>
            </div>
          </div>

          {/* property location */}
          <div className="mt-4 flex flex-col justify-center gap-2 rounded-xl border border-bg-accent p-2">
            <p>Property Location</p>

            <div className="flex flex-col gap-2">
              <img src={locationImg} alt="" className="h-30.5" />

              <div className="flex items-center justify-between">
                <div className="max-w-[145px] text-[12px] leading-4">
                  <p className="line-clamp-2">Lekki Phase 1, Lagos State</p>
                  <p className="line-clamp-2 text-text-secondary">
                    15 min from your location
                  </p>
                </div>

                <div className="flex h-10 min-w-[155px] items-center justify-center gap-2 rounded-lg bg-bg-accent p-2">
                  <img src={blackLocation} alt="" />
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary">
                    Get Directions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* preparation tips */}
          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-bg-accent p-2">
            <p>Preparation Tips</p>

            <div className="flex flex-col justify-center gap-2">
              {prepTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-accent">
                    <img src={tip.icon} alt="" />
                  </div>

                  <p className="text-[12px] leading-4">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="mt-6 mb-10 space-y-3">
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="button-style flex h-[45px] w-full items-center justify-center gap-2 rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                <img src={checkIcon} alt="" className="h-6 w-6" />
                <span>Mark Visit as completed</span>
              </button>

              <button className="h-[45px] w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
                Go to Dashboard
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
