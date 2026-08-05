import { useEffect, useState } from "react"
import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"
import { getSocket } from "@/services/socket"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chats", user?._id],
    queryFn: async () => {
      const res = await api.get("/chat/all-chats")
      return res.data as ChatItem[]
    },
    enabled: !!user?._id,
  })

  return {
    chats,
    isLoading,
    error: error ? "Failed to load chats" : null,
  }
}

// ---- chat messages ----
export function useChatMessages({ chatId }: { chatId: string }) {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [isSending, setIsSending] = useState(false)

  // fetch chat detail
  const {
    data: chatDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await api.get(`/chat/${chatId}`)
      return res.data as ChatDetail
    },
    enabled: !!chatId,
  })

  // fetch messages
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const res = await api.get(`/message/${chatId}`)
      return res.data as ChatMessage[]
    },
    enabled: !!chatId,
  })

  // socket — append incoming messages directly to the query cache
  useEffect(() => {
    if (!user?._id) return

    const socket = getSocket()
    if (!socket.connected) socket.connect()
    socket.emit("user_connected", user._id)

    socket.on("receive_message", (message: ChatMessage) => {
      queryClient.setQueryData<ChatMessage[]>(
        ["messages", chatId],
        (prev = []) => [...prev, message]
      )
    })

    return () => {
      socket.off("receive_message")
    }
  }, [user?._id, chatId, queryClient])

  async function sendMessage(text: string) {
    if (!chatDetail || !text.trim() || !user?._id) return

    setIsSending(true)
    try {
      const response = await api.post("/message/send", {
        chatId: chatDetail._id,
        text: text.trim(),
      })

      const newMessage: ChatMessage = response.data.data

      // update the cache directly — no re-fetch needed
      queryClient.setQueryData<ChatMessage[]>(
        ["messages", chatId],
        (prev = []) => [...prev, newMessage]
      )

      // also update lastMessage in the chat list cache
      queryClient.setQueryData<ChatItem[]>(["chats", user._id], (prev = []) =>
        prev.map((chat) =>
          chat._id === chatId ? { ...chat, lastMessage: newMessage } : chat
        )
      )

      const socket = getSocket()
      socket.emit("send_message", {
        from: user._id,
        to: chatDetail.participants.find((p) => p._id !== user._id)?._id,
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
    chatDetail: chatDetail ?? null,
    messages,
    isLoading: isLoadingDetail || isLoadingMessages,
    isSending,
    error: detailError || messagesError ? "Failed to load chat" : null,
    sendMessage,
    currentUserId: user?._id,
  }
}
