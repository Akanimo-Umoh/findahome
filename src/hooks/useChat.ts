import { useEffect, useState } from "react"
import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"
import { getSocket } from "@/services/socket"

export type ChatMessage = {
  _id: string
  text: string
  sender: {
    _id: string
    email: string
  }
  attachments: string[]
  createdAt: string
}

export type ChatParticipant = {
  _id: string
  email: string
  name?: string
  profilePicture?: string | null
  isVerified?: boolean
}

export type ChatProperty = {
  _id: string
  title: string
  price: number
  images: string[]
  address?: string
}

export type ChatItem = {
  _id: string
  participants: ChatParticipant[]
  property: ChatProperty
  lastMessage?: ChatMessage
  createdAt: string
  updatedAt: string
}

export type ChatDetail = {
  _id: string
  participants: ChatParticipant[]
  property: ChatProperty
  lastMessage?: ChatMessage
  createdAt: string
  updatedAt: string
}

// ---- chat list ----
export function useChatList() {
  const { user } = useAuthContext()
  const [chats, setChats] = useState<ChatItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return

    async function fetchChats() {
      setIsLoading(true)
      try {
        const response = await api.get("/chat/all-chats")
        setChats(response.data)
      } catch {
        setError("Failed to load chats")
      } finally {
        setIsLoading(false)
      }
    }

    fetchChats()
  }, [user?.id])

  return { chats, isLoading, error }
}

type UseChatOptions = {
  chatId: string
}

export function useChatMessages({ chatId }: UseChatOptions) {
  const { user } = useAuthContext()
  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // connect socket and register user once
  useEffect(() => {
    if (!user?.id) return

    const socket = getSocket()
    if (!socket.connected) socket.connect()
    socket.emit("user_connected", user.id)

    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off("receive_message")
    }
  }, [user?.id])

  // create or fetch chat on mount
  useEffect(() => {
    if (!chatId) return

    async function initChat() {
      setIsLoading(true)
      try {
        const res = await api.get(`/chat/${chatId}`)
        setChatDetail(res.data)

        // fetch messages for this chat
        const messagesRes = await api.get(`/message/${chatId}`)
        setMessages(messagesRes.data)
      } catch {
        setError("Failed to load chat")
      } finally {
        setIsLoading(false)
      }
    }

    initChat()
  }, [chatId])

  async function sendMessage(text: string) {
    if (!chatDetail || !text.trim() || !user?.id) return

    setIsSending(true)
    try {
      const response = await api.post("/message/send", {
        chatId: chatDetail._id,
        text: text.trim(),
      })

      const newMessage: ChatMessage = response.data.data
      // append the new message to the list
      setMessages((prev) => [...prev, newMessage])

      // emit via socket so the other user receives it in real time
      const socket = getSocket()
      socket.emit("send_message", {
        from: user.id,
        to: chatDetail.participants.find((p) => p._id !== user.id)?._id,
        text: text.trim(),
        attachments: [],
      })
    } catch {
      toast.error("Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  return {
    chatDetail,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
    currentUserId: user?.id,
  }
}
