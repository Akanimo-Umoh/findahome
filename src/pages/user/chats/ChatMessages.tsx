import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useProperty } from "@/hooks/useProperties";
import { useAgent } from "@/hooks/useAgents";
import iconVerified from "@/assets/images/icon-verified-green.svg";
import goBack from "@/assets/images/icon-back.svg";
import iconOptions from "@/assets/images/icon-chat-options.svg";
import propertyImg from "@/assets/images/property.jpg";
import iconNaira from "@/assets/images/icon-chat-naira.svg";
import iconSent from "@/assets/images/icon-chat-sent.svg";
// import iconRead from "@/assets/images/icon-chat-read.svg";
import iconPay from "@/assets/images/icon-chat-inspection-fee.svg";
import iconVisit from "@/assets/images/icon-chat-visit.svg";
import iconEscrow from "@/assets/images/icon-chat-escrow.svg";
import iconEmoji from "@/assets/images/icon-chat-emoji.svg";
import iconAttach from "@/assets/images/icon-chat-attach-files.svg";
import iconSend from "@/assets/images/icon-chat-sendMessage.svg";
import PayInspectionModal from "./PayInspectionModal";
import { useState } from "react";

export default function ChatMessages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ✅ Extract propertyId and agentId from URL query params
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const miniLinks = [
    {
      icon: iconPay,
      title: "Pay inspection fee",
      bg: "bg-[#DCFBE9]",
      color: "text-[#237142]",
      link: "/inspection-fee",
    },
    {
      icon: iconVisit,
      title: "Schedule visit",
      bg: "bg-[#E2EEFF]",
      color: "text-[#274AD0]",
      link: "",
    },
    {
      icon: iconEscrow,
      title: "Escrow terms",
      bg: "bg-[#F8E8FE]",
      color: "text-[#8453A9]",
      link: "",
    },
  ];

  // Get from URL: /chat?propertyId=1&agentId=agent_1
  const propertyIdFromUrl = searchParams.get("propertyId");
  const agentIdFromUrl = searchParams.get("agentId");

  // Get from navigation state (passed from ChatAgentModal)
  const state = location.state as {
    propertyId?: string;
    propertyTitle?: string;
    agentId?: string;
    agentName?: string;
  } | null;

  // ✅ Priority: URL params first, then state
  const propertyId = propertyIdFromUrl || state?.propertyId || "";
  const agentId = agentIdFromUrl || state?.agentId || "";

  // ✅ Fetch full property and agent data
  const { property, loading: propertyLoading } = useProperty(propertyId);
  const { agent, loading: agentLoading } = useAgent(agentId);

  if (propertyLoading || agentLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading chat...</p>
      </div>
    );
  }

  if (!property || !agent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chat not found</p>
      </div>
    );
  }

  return (
    <div className="font-ssPro h-[calc(100vh-72px)] flex flex-col justify-between">
      {/* chat header */}
      <div className="flex py-2 px-4 items-center justify-between chat-header h-[56px] gap-1">
        <div className="flex items-center justify-start gap-1 w-full">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={goBack} alt="" className="" />
          </button>

          <div className="flex items-center justify-start gap-1 flex-1">
            <img
              src={agent.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col items-start justify-center gap-1 flex-1">
              <div className="flex items-center justify-start gap-0.5 w-full">
                <p className="text-[12px] text-text-primary font-semibold flex">
                  {agent.name}
                </p>
                {agent.is_verified && (
                  <div className="flex items-center justify-start gap-0.5 flex-1">
                    <img src={iconVerified} alt="" className="w-4 h-4" />
                    <p className="text-[12px] text-text-secondary line-clamp-1">
                      Verified Agent
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-text-secondary text-[12px]">
                  Ref: FH - 2862
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="cursor-pointer">
          <img src={iconOptions} alt="" />
        </button>
      </div>

      {/* chat ctn */}
      <section className="px-[21.5px] pt-4 space-y-4 flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <img
            src={propertyImg}
            alt=""
            className="w-10 h-10 object-cover rounded-lg"
          />

          {/* property name and location */}
          <div className="flex flex-col">
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary line-clamp-1">
              {property.title}
            </p>
            <div className="text-[12px] text-text-secondary flex items-center gap-0.5 line-clamp-1">
              <p className="line-clamp-1">Lekki Phase 1, Lagos.</p>
              <p className="flex items-center">
                <img src={iconNaira} alt="" />
                <span>{property.price.toLocaleString()}/yr</span>
              </p>
            </div>
          </div>
        </div>

        {/* main chat ctn */}
        <div className="flex-1">
          <p>Today</p>

          {/* chats */}
          <div className="space-y-[13px]">
            {/* agents chat */}
            <div className="p-1">
              <p className="text-[12px] text-text-primary leading-4">
                Hello! I'm John, your verified agent for this property. I'm here
                to help with any questions you have.
              </p>
              {/* time */}
              <p className="text-[12px] text-text-secondary leading-4 h-5 flex items-center">
                11:00 AM
              </p>
            </div>

            {/* users chat */}
            <div className="rounded-xl px-2 py-1 bg-bg-accent">
              <p className="text-[12px] text-text-primary leading-4">
                Hi John! I'm interested in viewing this apartment. When would be
                a good time?
              </p>
              {/* time */}
              <p className="text-[12px] text-text-secondary leading-4 flex h-5 items-center justify-end gap-0.5">
                <span>11:10 AM</span>
                <img src={iconSent} alt="" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6 pb-2">
        <div className="flex items-center justify-center gap-1">
          {miniLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center justify-center gap-1 py-1 px-1 opacity-90 ${link.bg} cursor-pointer`}
            >
              <img src={link.icon} alt="" />
              <p className={`${link.color} text-[12px] leading-4`}>
                {link.title}
              </p>
            </button>
          ))}

          <PayInspectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Message Input */}
        <div className="flex items-center justify-between gap-4 px-[21.5px] h-10">
          <div className="flex items-center justify-between flex-1 gap-2 h-full">
            <img src={iconEmoji} alt="" />

            <div className="relative flex-1 h-full">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full bg-[#F5F5F5] h-full rounded-2xl pl-2 pr-8 text-[12px] leading-4 placeholder:text-text-secondary outline-none"
              />

              <button className="absolute top-1/2 -translate-y-1/2 right-3">
                <img src={iconAttach} alt="" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-button-bg flex items-center justify-center"
          >
            <img src={iconSend} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
