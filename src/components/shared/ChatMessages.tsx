import { useNavigate, useParams } from "react-router-dom"
import iconVerified from "@/assets/images/icon-verified-green.svg"
import goBack from "@/assets/images/icon-back.svg"
import iconOptions from "@/assets/images/icon-chat-options.svg"
import iconNaira from "@/assets/images/icon-chat-naira.svg"
// import iconSent from "@/assets/images/icon-chat-sent.svg";
import iconPay from "@/assets/images/icon-chat-inspection-fee.svg"
import iconVisit from "@/assets/images/icon-chat-visit.svg"
import iconEscrow from "@/assets/images/icon-chat-escrow.svg"
import iconEmoji from "@/assets/images/icon-chat-emoji.svg"
import iconAttach from "@/assets/images/icon-chat-attach-files.svg"
import iconSend from "@/assets/images/icon-chat-sendMessage.svg"
import PayInspectionModal from "../PayInspectionModal"
// import agentAvatarFallback from "@/assets/images/agentAvatar.jpg";
import { useEffect, useRef, useState } from "react"
import EscrowProtectionTerms from "@/components/EscrowProtectionTerms"
import { useChatMessages } from "@/hooks/useChat"
import Spinner from "@/components/Spinner"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "../Avatar"

type ChatMessagesProps = {
  chatId?: string
}

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

export default function ChatMessages({
  chatId: chatIdProp,
}: ChatMessagesProps) {
  const [inputText, setInputText] = useState("")
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)
  const [isEscrowOpen, setIsEscrowOpen] = useState(false)

  const { chatId: chatIdParam } = useParams<{ chatId: string }>()
  const chatId = chatIdProp ?? chatIdParam

  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { user } = useAuthContext()
  const isAgent = user?.role === "agent" || user?.role === "admin"

  // - agent: always has a real chatId in the URL
  // - user from chat list: has a real chatId in the URL (/messages/:chatId)
  // - user from ChatAgentModal: lands on /messages/chat with propertyId+agentId in state

  const {
    chatDetail,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
    currentUserId,
  } = useChatMessages({ chatId: chatId ?? "" })

  // derive display data from chatDetail
  const otherParty = chatDetail?.participants.find(
    (p) => p._id !== currentUserId
  )
  // console.log("chat detail: ", chatDetail?.participants);

  const property = chatDetail?.property

  // header display
  const headerName = isAgent
    ? (otherParty?.name ?? otherParty?.email ?? "Buyer")
    : (otherParty?.name ?? otherParty?.email ?? "Agent")

  // header avatar
  // const headerAvatar = !isAgent
  //   ? (otherParty?.profilePicture ?? agentAvatarFallback)
  //   : undefined;

  const refId = property?._id?.slice(-4).toUpperCase()

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
  ]

  // scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || isSending) return
    const text = inputText
    setInputText("")
    await sendMessage(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  // if neither state nor URL params exist, something went wrong
  if (!chatId) {
    return (
      <div className="flex h-screen items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">Chat not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 cursor-pointer text-[14px] text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center font-ssPro">
        <div className="text-center">
          <p className="text-[14px] text-text-secondary">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[14px] text-[#274AD0] underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col justify-between font-ssPro lg:h-full">
      {/* chat header */}
      <div className="chat-header flex h-14 shrink-0 items-center justify-between gap-1 px-5.5 py-2 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-start gap-1">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer lg:hidden"
          >
            <img src={goBack} alt="" />
          </button>

          <div className="flex flex-1 items-center justify-start gap-1">
            <Avatar
              name={headerName}
              src={
                Array.isArray(otherParty?.profilePicture)
                  ? otherParty?.profilePicture[0]
                  : otherParty?.profilePicture
              }
              size="md"
            />

            <div className="flex flex-1 flex-col items-start justify-center gap-1">
              <div className="flex w-full items-center justify-start gap-0.5">
                <p className="text-[12px] font-semibold text-text-primary">
                  {headerName}
                </p>
                {!isAgent && otherParty?.isVerified && (
                  <div className="flex flex-1 items-center justify-start gap-0.5">
                    <img src={iconVerified} alt="" className="h-4 w-4" />
                  </div>
                )}
              </div>

              <p className="text-[12px] text-text-secondary">
                Ref: FH - {refId}
              </p>
            </div>
          </div>
          <button className="cursor-pointer">
            <img src={iconOptions} alt="" />
          </button>
        </div>
      </div>

      <div className="mx-auto flex flex-1 flex-col justify-between overflow-hidden">
        {/* property info bar */}
        <div className="mx-auto w-full px-5.5 md:px-8 lg:hidden">
          <div className="mx-auto flex items-center gap-2 py-4">
            {property?.images?.[0] ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 shrink-0 rounded-lg bg-bg-accent" />
            )}

            <div className="flex min-w-0 flex-col">
              <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                {property?.title}
              </p>
              <div className="flex items-center gap-0.5 text-[12px] text-text-secondary">
                <p className="line-clamp-1">{property?.address}</p>
                {property?.price && (
                  <p className="flex shrink-0 items-center">
                    <img src={iconNaira} alt="" />
                    <span>{property.price.toLocaleString()}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* messages area */}
        <section className="mx-auto flex flex-col space-y-3 overflow-hidden px-5.5 md:px-8">
          <div className="flex max-w-3xl flex-1 flex-col overflow-y-auto px-2 py-4">
            {/* messages */}
            <p className="mb-2 text-center font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary">
              Today
            </p>

            {messages.length === 0 ? (
              <p className="text-center text-[12px] text-text-secondary">
                No messages yet. Start the conversation!
              </p>
            ) : (
              messages.map((message) => {
                const isOwn = message.sender._id === currentUserId
                return (
                  <div
                    key={message._id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[75%]">
                      <div
                        className={`rounded-2xl px-3 py-2 ${
                          isOwn
                            ? "rounded-tr-sm bg-button-bg"
                            : "rounded-tl-sm bg-bg-accent"
                        }`}
                      >
                        <p
                          className={`text-[12px] leading-5 wrap-break-word md:text-[16px] md:leading-6 ${
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
                              className="max-w-full rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      <p
                        className={`text-[10px] text-text-secondary ${isOwn ? "text-right" : "text-left"}`}
                      >
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                )
              })
            )}

            {/* scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* bottom actions */}
        <div className="mx-auto w-full px-5.5 md:px-8">
          <div className="shrink-0 space-y-6 pb-2">
            <div className="flex items-center justify-center gap-1 sm:gap-10 md:gap-20">
              {miniLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => {
                    if (link.action === "pay") setIsPayModalOpen(true)
                    if (link.action === "escrow") setIsEscrowOpen(true)
                    if (link.action === "visit")
                      navigate("/inspection", {
                        state: {
                          propertyId: property?._id,
                          propertyTitle: property?.title,
                          agentId: isAgent ? user?.id : otherParty?._id,
                        },
                      })
                  }}
                  className={`flex items-center justify-center gap-1 px-1 py-1 opacity-90 ${link.bg} cursor-pointer`}
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
            <div className="mx-auto flex h-10 max-w-247.5 items-center justify-between gap-4 md:gap-6">
              <div className="flex h-full flex-1 items-center gap-2 md:gap-6">
                <img src={iconEmoji} alt="" className="shrink-0" />

                <div className="relative h-full flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={isSending}
                    className="h-full w-full rounded-2xl bg-[#F5F5F5] pr-8 pl-2 text-[12px] leading-4 outline-none placeholder:text-text-secondary disabled:opacity-50"
                  />
                  <button className="absolute top-1/2 right-3 -translate-y-1/2">
                    <img src={iconAttach} alt="" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSend}
                disabled={!inputText.trim() || isSending}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-button-bg disabled:opacity-50"
              >
                <img src={iconSend} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
