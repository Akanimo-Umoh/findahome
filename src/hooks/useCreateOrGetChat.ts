import { useState } from "react"
import api from "@/services/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import type { ChatMessage } from "@/hooks/useChat"

type ChatLookup = { exists: boolean; chatId: string | null }

export function useCreateOrGetChat() {
  const [isCreating, setIsCreating] = useState(false)

  // Looks for an existing chat. It never creates one: the chat is only created
  // when the buyer sends their first message (see DraftChat).
  async function findChat(
    propertyId: string,
    agentId: string
  ): Promise<ChatLookup | null> {
    setIsCreating(true)
    try {
      const res = await api.post("/chat/create-or-get", {
        agentId,
        propertyId,
      })
      const chatId = (res.data.chat?._id ?? null) as string | null
      return { exists: !!res.data.exists && !!chatId, chatId }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        throw err
      }
      toast.error("Failed to start chat. Please try again.")
      return null
    } finally {
      setIsCreating(false)
    }
  }

  // Creates the chat and first message together.
  async function createChat(
    propertyId: string,
    agentId: string,
    text: string
  ): Promise<{
    chatId: string
    createdAt: string
    updatedAt: string
    message: ChatMessage
  }> {
    const res = await api.post("/chat/create-or-get", {
      agentId,
      propertyId,
      createIfMissing: true,
      text: text.trim(),
    })

    const chat = res.data.chat
    const message = res.data.data

    if (!chat?._id || !message?._id) {
      throw new Error("The chat or initial message was not created")
    }

    return {
      chatId: chat._id,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      message: message as ChatMessage,
    }
  }

  return { findChat, createChat, isCreating }
}
