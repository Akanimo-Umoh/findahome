import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import iconNotification from "@/assets/images/icon-visit-notification.svg";
import greenCheckIcon from "@/assets/images/icon-inspection-schedule-green-check.svg";
import nairaIcon from "@/assets/images/icon-chat-naira.svg";
import propertyImg from "@/assets/images/property.jpg";
import chatIcon from "@/assets/images/icon-chat.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import locationImg from "@/assets/images/img-location.png";
// import locationIcon from "@/assets/images/icon-inspection-visit-location.svg";
import blackLocation from "@/assets/images/icon-inspection-visit-black-location.svg";
import idIcon from "@/assets/images/icon-inspection-visit-id.svg";
import listsIcon from "@/assets/images/icon-inspection-visit-list.svg";
import pictureIcon from "@/assets/images/icon-inspection-visit-camera.svg";
import timeIcon from "@/assets/images/icon-inspection-visit-time.svg";
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg";

export default function InspectionVisitDetails() {
  const navigate = useNavigate();

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
  ];
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
              Inspection Scheduled
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              Your visit has been scheduled successfully
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
                <p>Visit Type:</p>
                <p className="text-text-secondary">Physical Visit</p>
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

              <button className="button-style p-2 flex items-center justify-center gap-2 rounded-lg">
                <img src={chatIcon} alt="" />
                <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
                  Chat
                </p>
              </button>
            </div>
          </div>

          {/* property location */}
          <div className="flex flex-col gap-2 justify-center p-2 border rounded-xl border-bg-accent mt-4">
            <p>Property Location</p>

            <div className="flex flex-col gap-2">
              <img src={locationImg} alt="" className="h-30.5" />

              <div className="flex items-center justify-between">
                <div className="text-[12px] leading-4 max-w-[145px]">
                  <p className="line-clamp-2">Lekki Phase 1, Lagos State</p>
                  <p className="text-text-secondary line-clamp-2">
                    15 min from your location
                  </p>
                </div>

                <div className="bg-bg-accent p-2 rounded-lg flex items-center justify-center gap-2 h-10 min-w-[155px]">
                  <img src={blackLocation} alt="" />
                  <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-secondary">
                    Get Directions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* preparation tips */}
          <div className="mt-4 flex flex-col gap-2 rounded-xl p-2 border border-bg-accent">
            <p>Preparation Tips</p>

            <div className="flex flex-col justify-center gap-2">
              {prepTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-bg-accent flex items-center justify-center">
                    <img src={tip.icon} alt="" />
                  </div>

                  <p className="text-[12px] leading-4">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="mt-6 space-y-3 mb-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white flex items-center justify-center gap-2">
                <img src={checkIcon} alt="" className="w-6 h-6" />
                <span>Mark Visit as completed</span>
              </button>

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] bg-button-disabled border border-text-secondary h-[45px] w-full rounded-lg">
                Go to Dashboard
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
