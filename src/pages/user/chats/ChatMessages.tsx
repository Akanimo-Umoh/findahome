// import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
// import { useProperty } from "@/hooks/useProperties";
// import { useAgent } from "@/hooks/useAgents";
// import iconVerified from "@/assets/images/icon-verified-green.svg";
// import goBack from "@/assets/images/icon-back.svg";
// import iconOptions from "@/assets/images/icon-chat-options.svg";
// import propertyImg from "@/assets/images/property.jpg";
// import iconNaira from "@/assets/images/icon-chat-naira.svg";
// import iconSent from "@/assets/images/icon-chat-sent.svg";
// // import iconRead from "@/assets/images/icon-chat-read.svg";
// import iconPay from "@/assets/images/icon-chat-inspection-fee.svg";
// import iconVisit from "@/assets/images/icon-chat-visit.svg";
// import iconEscrow from "@/assets/images/icon-chat-escrow.svg";
// import iconEmoji from "@/assets/images/icon-chat-emoji.svg";
// import iconAttach from "@/assets/images/icon-chat-attach-files.svg";
// import iconSend from "@/assets/images/icon-chat-sendMessage.svg";
// import PayInspectionModal from "./PayInspectionModal";
// import { useState } from "react";

// export default function ChatMessages() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // ✅ Extract propertyId and agentId from URL query params
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const miniLinks = [
//     {
//       icon: iconPay,
//       title: "Pay inspection fee",
//       bg: "bg-[#DCFBE9]",
//       color: "text-[#237142]",
//       link: "/inspection-fee",
//     },
//     {
//       icon: iconVisit,
//       title: "Schedule visit",
//       bg: "bg-[#E2EEFF]",
//       color: "text-[#274AD0]",
//       link: "",
//     },
//     {
//       icon: iconEscrow,
//       title: "Escrow terms",
//       bg: "bg-[#F8E8FE]",
//       color: "text-[#8453A9]",
//       link: "",
//     },
//   ];

//   // Get from URL: /chat?propertyId=1&agentId=agent_1
//   const propertyIdFromUrl = searchParams.get("propertyId");
//   const agentIdFromUrl = searchParams.get("agentId");

//   // Get from navigation state (passed from ChatAgentModal)
//   const state = location.state as {
//     propertyId?: string;
//     propertyTitle?: string;
//     agentId?: string;
//     agentName?: string;
//   } | null;

//   // ✅ Priority: URL params first, then state
//   const propertyId = propertyIdFromUrl || state?.propertyId || "";
//   const agentId = agentIdFromUrl || state?.agentId || "";

//   // ✅ Fetch full property and agent data
//   const { property, loading: propertyLoading } = useProperty(propertyId);
//   const { agent, loading: agentLoading } = useAgent(agentId);

//   if (propertyLoading || agentLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Loading chat...</p>
//       </div>
//     );
//   }

//   if (!property || !agent) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Chat not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="font-ssPro h-[calc(100vh-72px)] flex flex-col justify-between">
//       {/* chat header */}
//       <div className="flex py-2 px-4 items-center justify-between chat-header h-[56px] gap-1">
//         <div className="flex items-center justify-start gap-1 w-full">
//           <button onClick={() => navigate(-1)} className="cursor-pointer">
//             <img src={goBack} alt="" className="" />
//           </button>

//           <div className="flex items-center justify-start gap-1 flex-1">
//             <img
//               src={agent.avatar}
//               alt=""
//               className="w-10 h-10 rounded-full object-cover"
//             />

//             <div className="flex flex-col items-start justify-center gap-1 flex-1">
//               <div className="flex items-center justify-start gap-0.5 w-full">
//                 <p className="text-[12px] text-text-primary font-semibold flex">
//                   {agent.name}
//                 </p>
//                 {agent.is_verified && (
//                   <div className="flex items-center justify-start gap-0.5 flex-1">
//                     <img src={iconVerified} alt="" className="w-4 h-4" />
//                     <p className="text-[12px] text-text-secondary line-clamp-1">
//                       Verified Agent
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <p className="text-text-secondary text-[12px]">
//                   Ref: FH - 2862
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button className="cursor-pointer">
//           <img src={iconOptions} alt="" />
//         </button>
//       </div>

//       {/* chat ctn */}
//       <section className="px-[21.5px] pt-4 space-y-4 flex flex-col flex-1">
//         <div className="flex items-center gap-2">
//           <img
//             src={propertyImg}
//             alt=""
//             className="w-10 h-10 object-cover rounded-lg"
//           />

//           {/* property name and location */}
//           <div className="flex flex-col">
//             <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary line-clamp-1">
//               {property.title}
//             </p>
//             <div className="text-[12px] text-text-secondary flex items-center gap-0.5 line-clamp-1">
//               <p className="line-clamp-1">Lekki Phase 1, Lagos.</p>
//               <p className="flex items-center">
//                 <img src={iconNaira} alt="" />
//                 <span>{property.price.toLocaleString()}/yr</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* main chat ctn */}
//         <div className="flex-1">
//           <p>Today</p>

//           {/* chats */}
//           <div className="space-y-[13px]">
//             {/* agents chat */}
//             <div className="p-1">
//               <p className="text-[12px] text-text-primary leading-4">
//                 Hello! I'm John, your verified agent for this property. I'm here
//                 to help with any questions you have.
//               </p>
//               {/* time */}
//               <p className="text-[12px] text-text-secondary leading-4 h-5 flex items-center">
//                 11:00 AM
//               </p>
//             </div>

//             {/* users chat */}
//             <div className="rounded-xl px-2 py-1 bg-bg-accent">
//               <p className="text-[12px] text-text-primary leading-4">
//                 Hi John! I'm interested in viewing this apartment. When would be
//                 a good time?
//               </p>
//               {/* time */}
//               <p className="text-[12px] text-text-secondary leading-4 flex h-5 items-center justify-end gap-0.5">
//                 <span>11:10 AM</span>
//                 <img src={iconSent} alt="" />
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="space-y-6 pb-2">
//         <div className="flex items-center justify-center gap-1">
//           {miniLinks.map((link, index) => (
//             <button
//               key={index}
//               onClick={() => setIsModalOpen(true)}
//               className={`flex items-center justify-center gap-1 py-1 px-1 opacity-90 ${link.bg} cursor-pointer`}
//             >
//               <img src={link.icon} alt="" />
//               <p className={`${link.color} text-[12px] leading-4`}>
//                 {link.title}
//               </p>
//             </button>
//           ))}

//           <PayInspectionModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//           />
//         </div>

//         {/* Message Input */}
//         <div className="flex items-center justify-between gap-4 px-[21.5px] h-10">
//           <div className="flex items-center justify-between flex-1 gap-2 h-full">
//             <img src={iconEmoji} alt="" />

//             <div className="relative flex-1 h-full">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="w-full bg-[#F5F5F5] h-full rounded-2xl pl-2 pr-8 text-[12px] leading-4 placeholder:text-text-secondary outline-none"
//               />

//               <button className="absolute top-1/2 -translate-y-1/2 right-3">
//                 <img src={iconAttach} alt="" />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-10 h-10 rounded-full bg-button-bg flex items-center justify-center"
//           >
//             <img src={iconSend} alt="" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import iconVerified from "@/assets/images/icon-verified-green.svg";
import goBack from "@/assets/images/icon-back.svg";
import iconOptions from "@/assets/images/icon-chat-options.svg";
import iconNaira from "@/assets/images/icon-chat-naira.svg";
import iconSent from "@/assets/images/icon-chat-sent.svg";
import iconPay from "@/assets/images/icon-chat-inspection-fee.svg";
import iconVisit from "@/assets/images/icon-chat-visit.svg";
import iconEscrow from "@/assets/images/icon-chat-escrow.svg";
import iconEmoji from "@/assets/images/icon-chat-emoji.svg";
import iconAttach from "@/assets/images/icon-chat-attach-files.svg";
import iconSend from "@/assets/images/icon-chat-sendMessage.svg";
import PayInspectionModal from "./PayInspectionModal";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import { useEffect, useRef, useState } from "react";
import EscrowProtectionTerms from "@/components/EscrowProtectionTerms";

type ChatState = {
  propertyId: string;
  propertyTitle: string;
  propertyImage?: string;
  propertyPrice?: number;
  propertyAddress?: string;
  agentId: string;
  agentName: string;
  agentAvatar?: string | null;
  agentIsVerified?: boolean;
};

type Message = {
  id: string;
  text: string;
  sender: "user" | "agent";
  time: string;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatMessages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your verified agent for this property. I'm here to help with any questions you have.",
      sender: "agent",
      time: "11:00 AM",
    },
  ]);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const miniLinks = [
    {
      icon: iconPay,
      title: "Pay inspection fee",
      bg: "bg-[#DCFBE9]",
      color: "text-[#237142]",
      action: "pay",
    },
    {
      icon: iconVisit,
      title: "Schedule visit",
      bg: "bg-[#E2EEFF]",
      color: "text-[#274AD0]",
      action: "visit",
    },
    {
      icon: iconEscrow,
      title: "Escrow terms",
      bg: "bg-[#F8E8FE]",
      color: "text-[#8453A9]",
      action: "escrow",
    },
  ];

  // get from navigation state — passed from ChatAgentModal
  const state = location.state as ChatState | null;

  // fallback to URL params if state is missing (e.g. user refreshes)
  const propertyId = state?.propertyId || searchParams.get("propertyId") || "";
  const agentId = state?.agentId || searchParams.get("agentId") || "";

  // scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      time: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // if neither state nor URL params exist, something went wrong
  if (!propertyId || !agentId) {
    return (
      <div className="flex items-center justify-center h-screen font-ssPro">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">Chat not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline text-[14px]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const chatState = state!;

  return (
    <div className="font-ssPro h-[calc(100vh-72px)] flex flex-col justify-between">
      {/* chat header */}
      <div className="flex py-2 px-4 items-center justify-between chat-header h-[56px] gap-1 shrink-0">
        <div className="flex items-center justify-start gap-1 w-full">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={goBack} alt="" />
          </button>

          <div className="flex items-center justify-start gap-1 flex-1">
            <img
              src={state?.agentAvatar ?? agentAvatar}
              alt={state?.agentName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col items-start justify-center gap-1 flex-1">
              <div className="flex items-center justify-start gap-0.5 w-full">
                <p className="text-[12px] text-text-primary font-semibold">
                  {state?.agentName}
                </p>
                {state?.agentIsVerified && (
                  <div className="flex items-center justify-start gap-0.5 flex-1">
                    <img src={iconVerified} alt="" className="w-4 h-4" />
                    <p className="text-[12px] text-text-secondary line-clamp-1">
                      Verified Agent
                    </p>
                  </div>
                )}
              </div>
              <p className="text-text-secondary text-[12px]">
                Ref: FH - {propertyId.slice(-4).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <button className="cursor-pointer">
          <img src={iconOptions} alt="" />
        </button>
      </div>

      {/* property info bar */}
      <div className="px-[21.5px] py-4 flex items-center gap-2">
        {state?.propertyImage ? (
          <img
            src={state.propertyImage}
            alt={state.propertyTitle}
            className="w-10 h-10 object-cover rounded-lg shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-bg-accent shrink-0" />
        )}

        <div className="flex flex-col min-w-0">
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary line-clamp-1">
            {state?.propertyTitle}
          </p>
          <div className="text-[12px] text-text-secondary flex items-center gap-0.5">
            <p className="line-clamp-1">{state?.propertyAddress}</p>
            {state?.propertyPrice && (
              <p className="flex items-center shrink-0">
                <img src={iconNaira} alt="" />
                <span>{state.propertyPrice.toLocaleString()}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* messages area */}
      <section className="px-[21.5px] py-4 space-y-3 flex flex-col flex-1 overflow-y-auto">
        {/* messages */}
        <p className="text-[14px] text-text-secondary text-center font-raleway font-semibold tracking-[1px] mb-2">
          Today
        </p>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[75%]">
              <div
                className={`px-3 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-button-bg rounded-tr-sm"
                    : "bg-bg-accent rounded-tl-sm"
                }`}
              >
                <p
                  className={`text-[12px] leading-5 wrap-break-word ${
                    message.sender === "user"
                      ? "text-white"
                      : "text-text-primary"
                  }`}
                >
                  {message.text}
                </p>
              </div>
              <div
                className={`flex items-center gap-0.5 mt-0.5 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p className="text-[10px] text-text-secondary">
                  {message.time}
                </p>
                {message.sender === "user" && (
                  <img src={iconSent} alt="" className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* scroll anchor */}
        <div ref={messagesEndRef} />
      </section>

      {/* bottom actions */}
      <div className="space-y-6 pb-2 shrink-0">
        <div className="flex items-center justify-center gap-1">
          {miniLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => {
                if (link.action === "pay") setIsModalOpen(true);
                if (link.action === "escrow") setIsEscrowOpen(true);
                if (link.action === "visit")
                  navigate("/inspection", {
                    state: {
                      propertyId,
                      propertyTitle: state?.propertyTitle,
                      agentId,
                    },
                  });
              }}
              className={`flex items-center justify-center gap-1 py-1 px-1 opacity-90 ${link.bg} cursor-pointer`}
            >
              <img src={link.icon} alt="" />
              <p className={`${link.color} text-[12px] leading-4`}>
                {link.title}
              </p>
            </button>
          ))}
        </div>

        <PayInspectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyTitle={chatState.propertyTitle}
          propertyAddress={chatState.propertyAddress ?? ""}
          propertyPrice={chatState.propertyPrice ?? 0}
          propertyImage={chatState.propertyImage ?? ""}
        />

        <EscrowProtectionTerms
          isOpen={isEscrowOpen}
          onClose={() => setIsEscrowOpen(false)}
        />

        {/* message input */}
        <div className="flex items-center justify-between gap-4 px-[21.5px] h-10">
          <div className="flex items-center flex-1 gap-2 h-full">
            <img src={iconEmoji} alt="" className="shrink-0" />

            <div className="relative flex-1 h-full">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full bg-[#F5F5F5] h-full rounded-2xl pl-2 pr-8 text-[12px] leading-4 placeholder:text-text-secondary outline-none"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-3">
                <img src={iconAttach} alt="" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-button-bg flex items-center justify-center"
          >
            <img src={iconSend} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
