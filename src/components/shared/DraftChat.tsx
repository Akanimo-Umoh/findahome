import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import goBack from "@/assets/images/icon-back.svg"
import iconNaira from "@/assets/images/icon-chat-naira.svg"
import iconSend from "@/assets/images/icon-chat-sendMessage.svg"
import Avatar from "@/components/Avatar"
import { useAuthContext } from "@/context/AuthContext"
import { useCreateOrGetChat } from "@/hooks/useCreateOrGetChat"
import { requestError } from "@/lib/requestError"
import type { ChatDetail, ChatItem, ChatParticipant } from "@/hooks/useChat"

export type DraftChatInfo = {
  propertyId: string
  agentId: string
  agentName: string
  agentAvatar?: string
  propertyTitle: string
  propertyImage?: string
  propertyPrice?: number
  propertyAddress?: string
}

// A chat is only created when the buyer sends the first message.
export default function DraftChat({ draft }: { draft: DraftChatInfo }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const { createChat } = useCreateOrGetChat()

  const [text, setText] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    const messageText = text.trim()

    if (!messageText || isSending) return

    if (!user?._id) {
      toast.error("Please log in to send a message.")
      return
    }

    setIsSending(true)

    try {
      // Create the chat and first message in one backend request.
      const result = await createChat(
        draft.propertyId,
        draft.agentId,
        messageText
      )

      const { chatId, message, createdAt, updatedAt } = result

      // Build the chat detail using the draft information we already have.
      const currentUser: ChatParticipant = {
        _id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
      }

      const agent: ChatParticipant = {
        _id: draft.agentId,
        email: "",
        name: draft.agentName,
        profilePicture: draft.agentAvatar ?? null,
      }

      const chatDetail: ChatDetail = {
        _id: chatId,
        participants: [currentUser, agent],
        property: {
          _id: draft.propertyId,
          title: draft.propertyTitle,
          price: draft.propertyPrice ?? 0,
          images: draft.propertyImage ? [draft.propertyImage] : [],
          address: draft.propertyAddress,
        },
        lastMessage: message,
        createdAt,
        updatedAt,
      }

      // Seed the chat detail cache before navigating.
      queryClient.setQueryData<ChatDetail>(["chat", chatId], chatDetail)

      // Seed the messages cache with the first message.
      queryClient.setQueryData(["messages", chatId], [message])

      // Immediately update the existing chat list cache.
      const existingChats = queryClient.getQueryData<ChatItem[]>([
        "chats",
        user._id,
      ])

      if (existingChats) {
        const newChat: ChatItem = {
          ...chatDetail,
          unreadCount: 0,
        }

        queryClient.setQueryData<ChatItem[]>(
          ["chats", user._id],
          [newChat, ...existingChats.filter((chat) => chat._id !== chatId)]
        )
      }

      // Navigate only after the cache is ready.
      // ChatMessages will render immediately using the cached data.
      navigate(`/messages/${chatId}`, { replace: true })
    } catch (error) {
      console.error("First message error:", error)
      toast.error(
        requestError(error, "Couldn't send your message. Please try again.")
      )
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col justify-between font-ssPro md:h-[calc(100vh-66px)] lg:h-full">
      {/* header */}
      <div className="flex h-14 shrink-0 items-center gap-1 px-5.5 py-2 shadow-sm md:px-8">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer lg:hidden"
          aria-label="Back"
        >
          <img src={goBack} alt="" />
        </button>

        <Avatar name={draft.agentName} src={draft.agentAvatar} size="md" />

        <p className="text-[12px] font-semibold text-text-primary">
          {draft.agentName}
        </p>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto px-5.5 py-4 md:px-8">
        <div className="mx-auto flex max-w-247.5 items-center gap-2 rounded-xl border border-bg-accent p-2">
          {draft.propertyImage ? (
            <img
              src={draft.propertyImage}
              alt=""
              className="h-15 w-15 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
          )}

          <div className="min-w-0">
            <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px]">
              {draft.propertyTitle}
            </p>

            {draft.propertyAddress && (
              <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                {draft.propertyAddress}
              </p>
            )}

            {draft.propertyPrice != null && (
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={iconNaira} alt="" className="h-4 w-4" />
                <span>{draft.propertyPrice.toLocaleString()}</span>
              </p>
            )}
          </div>
        </div>

        {/* first-message preview while sending */}
        {isSending && text.trim() && (
          <div className="mx-auto mt-6 flex max-w-247.5 justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-button-bg px-3 py-2">
              <p className="text-[12px] leading-5 wrap-break-word text-white md:text-[16px] md:leading-6">
                {text}
              </p>

              <p className="mt-1 text-right text-[10px] text-white/70">
                Sending...
              </p>
            </div>
          </div>
        )}

        {!isSending && (
          <p className="mt-10 text-center text-[12px] leading-4 text-text-secondary">
            Say hello to {draft.agentName}. This conversation will appear in
            your chats, and in theirs, once you send your first message.
          </p>
        )}
      </div>

      {/* message input */}
      <div className="shrink-0 px-5.5 pb-4 md:px-8">
        <div className="mx-auto flex h-10 max-w-247.5 items-center gap-4 md:gap-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Type your message..."
            disabled={isSending}
            className="h-full w-full flex-1 rounded-2xl bg-[#F5F5F5] px-3 text-[12px] leading-4 outline-none placeholder:text-text-secondary disabled:opacity-50"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-button-bg disabled:opacity-50"
          >
            <img src={iconSend} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
