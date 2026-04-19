import { useLocation, useNavigate, useParams } from "react-router-dom";
import iconVerified from "@/assets/images/icon-verified-green.svg";
import goBack from "@/assets/images/icon-back.svg";
import iconOptions from "@/assets/images/icon-chat-options.svg";
import iconNaira from "@/assets/images/icon-chat-naira.svg";
// import iconSent from "@/assets/images/icon-chat-sent.svg";
import iconPay from "@/assets/images/icon-chat-inspection-fee.svg";
import iconVisit from "@/assets/images/icon-chat-visit.svg";
import iconEscrow from "@/assets/images/icon-chat-escrow.svg";
import iconEmoji from "@/assets/images/icon-chat-emoji.svg";
import iconAttach from "@/assets/images/icon-chat-attach-files.svg";
import iconSend from "@/assets/images/icon-chat-sendMessage.svg";
import PayInspectionModal from "./PayInspectionModal";
// import agentAvatarFallback from "@/assets/images/agentAvatar.jpg";
import { useEffect, useRef, useState } from "react";
import EscrowProtectionTerms from "@/components/EscrowProtectionTerms";
import { useChatMessages } from "@/hooks/useChat";
import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/context/AuthContext";
import Avatar from "./Avatar";

// state passed via navigate() from both ChatAgentModal and Chats
type ChatRouteState = {
  propertyId: string;
  agentId?: string;
  agentIsVerified?: boolean;
};

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatMessages() {
  const [inputText, setInputText] = useState("");
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);

  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthContext();
  const isAgent = user?.role === "agent" || user?.role === "admin";

  const state = location.state as ChatRouteState | null;

  // - agent: always has a real chatId in the URL
  // - user from chat list: has a real chatId in the URL (/messages/:chatId)
  // - user from ChatAgentModal: lands on /messages/chat with propertyId+agentId in state

  const chatOptions = isAgent
    ? { mode: "agent" as const, chatId: chatId ?? "" }
    : chatId && chatId !== "chat"
      ? { mode: "agent" as const, chatId } //user opened from chat list
      : {
          mode: "user" as const,
          propertyId: state?.propertyId ?? "",
          agentId: state?.agentId ?? "",
        };

  const {
    chatDetail,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
    currentUserId,
  } = useChatMessages(chatOptions);

  // derive display data from chatDetail
  const otherParty = chatDetail?.participants.find(
    (p) => p._id !== currentUserId,
  );
  const property = chatDetail?.property;

  // header display
  const headerName = isAgent
    ? (otherParty?.name ?? otherParty?.email ?? "Buyer")
    : (otherParty?.name ?? otherParty?.email ?? "Agent");

  // header avatar
  // const headerAvatar = !isAgent
  //   ? (otherParty?.profilePicture ?? agentAvatarFallback)
  //   : undefined;

  const refId = property?._id?.slice(-4).toUpperCase();

  // quick action buttons — users get all three, agents skip "Pay inspection fee"
  const miniLinks = [
    ...(!isAgent
      ? [
          {
            icon: iconPay,
            title: "Pay inspection fee",
            bg: "bg-[#DCFBE9]",
            color: "text-[#237142]",
            action: "pay",
          },
        ]
      : []),
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

  // scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const hasRequiredParams = isAgent
    ? !!chatId
    : !!(chatId && chatId !== "chat") ||
      !!(state?.propertyId && state?.agentId);

  // if neither state nor URL params exist, something went wrong
  if (!hasRequiredParams) {
    return (
      <div className="flex items-center justify-center h-screen font-ssPro">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">Chat not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline text-[14px] cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-72px)] font-ssPro">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">{error}</p>
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

  return (
    <div className="font-ssPro h-[calc(100vh-72px)] flex flex-col justify-between">
      {/* chat header */}
      <div className="flex py-2 px-4 items-center justify-between chat-header h-[56px] gap-1 shrink-0">
        <div className="flex items-center justify-start gap-1 w-full">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={goBack} alt="" />
          </button>

          <div className="flex items-center justify-start gap-1 flex-1">
            <Avatar
              name={headerName}
              src={otherParty?.profilePicture}
              size="md"
            />

            <div className="flex flex-col items-start justify-center gap-1 flex-1">
              <div className="flex items-center justify-start gap-0.5 w-full">
                <p className="text-[12px] text-text-primary font-semibold">
                  {headerName}
                </p>
                {!isAgent && state?.agentIsVerified && (
                  <div className="flex items-center justify-start gap-0.5 flex-1">
                    <img src={iconVerified} alt="" className="w-4 h-4" />
                    <p className="text-[12px] text-text-secondary line-clamp-1">
                      Verified Agent
                    </p>
                  </div>
                )}
              </div>
              <p className="text-text-secondary text-[12px]">
                Ref: FH - {refId}
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
        {property?.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-10 h-10 object-cover rounded-lg shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-bg-accent shrink-0" />
        )}

        <div className="flex flex-col min-w-0">
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary line-clamp-1">
            {property?.title}
          </p>
          <div className="text-[12px] text-text-secondary flex items-center gap-0.5">
            <p className="line-clamp-1">{property?.address}</p>
            {property?.price && (
              <p className="flex items-center shrink-0">
                <img src={iconNaira} alt="" />
                <span>{property.price.toLocaleString()}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* messages area */}
      <section className="px-[21.5px] py-4 space-y-3 flex flex-col flex-1 overflow-y-auto scrollbar-hide">
        {/* messages */}
        <p className="text-[14px] text-text-secondary text-center font-raleway font-semibold tracking-[1px] mb-2">
          Today
        </p>

        {messages.length === 0 ? (
          <p className="text-center text-text-secondary text-[12px]">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => {
            const isOwn = message.sender._id === currentUserId;
            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[75%]">
                  <div
                    className={`px-3 py-2 rounded-2xl ${
                      isOwn
                        ? "bg-button-bg rounded-tr-sm"
                        : "bg-bg-accent rounded-tl-sm"
                    }`}
                  >
                    <p
                      className={`text-[12px] leading-5 wrap-break-word ${
                        isOwn ? "text-white" : "text-text-primary"
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>

                  {/* attachments */}
                  {message.attachments?.length > 0 && (
                    <div>
                      {message.attachments.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="attachment"
                          className="rounded-lg max-w-full"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p
                  className={`text-[10px] text-text-secondary ${isOwn ? "text-right" : "text-left"}`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            );
          })
        )}

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
                if (link.action === "pay") setIsPayModalOpen(true);
                if (link.action === "escrow") setIsEscrowOpen(true);
                if (link.action === "visit")
                  navigate("/inspection", {
                    state: {
                      propertyId: property?._id,
                      propertyTitle: property?.title,
                      agentId: isAgent ? user?.id : otherParty?._id,
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

        {!isAgent && (
          <PayInspectionModal
            isOpen={isPayModalOpen}
            onClose={() => setIsPayModalOpen(false)}
            propertyTitle={property?.title ?? ""}
            propertyAddress={property?.address ?? ""}
            propertyPrice={property?.price ?? 0}
            propertyImage={property?.images?.[0] ?? ""}
          />
        )}

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
                disabled={isSending}
                className="w-full bg-[#F5F5F5] h-full rounded-2xl pl-2 pr-8 text-[12px] leading-4 placeholder:text-text-secondary outline-none disabled:opacity-50"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-3">
                <img src={iconAttach} alt="" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() || isSending}
            className="w-10 h-10 rounded-full bg-button-bg flex items-center justify-center disabled:opacity-50"
          >
            <img src={iconSend} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
