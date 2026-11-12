import { useState } from "react"
import api from "@/services/api"
import { toast } from "sonner"
import { AxiosError } from "axios"

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

  // Creates the chat. Called only when the first message is sent.
  async function createChat(
    propertyId: string,
    agentId: string
  ): Promise<string | null> {
    const res = await api.post("/chat/create-or-get", {
      agentId,
      propertyId,
      createIfMissing: true,
    })
    return (res.data.chat?._id ?? null) as string | null
  }

  return { findChat, createChat, isCreating }
}
