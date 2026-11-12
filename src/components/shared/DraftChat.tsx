import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import api from "@/services/api"
import goBack from "@/assets/images/icon-back.svg"
import iconNaira from "@/assets/images/icon-chat-naira.svg"
import iconSend from "@/assets/images/icon-chat-sendMessage.svg"
import Avatar from "@/components/Avatar"
import { useCreateOrGetChat } from "@/hooks/useCreateOrGetChat"

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

// A chat that doesn't exist yet. Nothing is saved while the buyer is here: the
// chat is created, and shows up for both people, only when the first message
// is sent. Leaving without sending leaves no trace.
export default function DraftChat({ draft }: { draft: DraftChatInfo }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { createChat } = useCreateOrGetChat()
  const [text, setText] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    const message = text.trim()
    if (!message || isSending) return

    setIsSending(true)
    try {
      const chatId = await createChat(draft.propertyId, draft.agentId)
      if (!chatId) throw new Error("The chat could not be created")
      await api.post("/message/send", { chatId, text: message })

      queryClient.invalidateQueries({ queryKey: ["chats"] })
      // replace, so Back doesn't return to the empty draft
      navigate(`/messages/${chatId}`, { replace: true })
    } catch {
      toast.error("Couldn't send your message. Please try again.")
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

        <p className="mt-10 text-center text-[12px] leading-4 text-text-secondary">
          Say hello to {draft.agentName}. This conversation will appear in your
          chats, and in theirs, once you send your first message.
        </p>
      </div>

      {/* message input */}
      <div className="shrink-0 px-5.5 pb-4 md:px-8">
        <div className="mx-auto flex h-10 max-w-247.5 items-center gap-4 md:gap-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
