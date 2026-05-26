import { useEffect, useState } from "react"
import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"

type Participant = {
  _id: string
  email: string
}

type Property = {
  _id: string
  title: string
  price: number
  images: string[]
}

type LastMessage = {
  _id: string
  sender: Participant
  text: string
  createdAt: string
}

export type AgentChatItem = {
  _id: string
  participants: Participant[]
  property: Property
  lastMessage: LastMessage
  createdAt: string
  updatedAt: string
}

export function useAgentChats() {
  const { user } = useAuthContext()
  const [chats, setChats] = useState<AgentChatItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChats() {
      setIsLoading(true)
      try {
        const response = await api.get("/chat/agent")
        setChats(response.data)
      } catch {
        setError("Failed to load chats")
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.id) fetchChats()
  }, [user?.id])

  return { chats, isLoading, error }
}
