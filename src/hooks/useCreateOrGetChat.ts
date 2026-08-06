import { useState } from "react"
import api from "@/services/api"
import { toast } from "sonner"
import { AxiosError } from "axios"

export function useCreateOrGetChat() {
  const [isCreating, setIsCreating] = useState(false)

  async function createOrGetChat(propertyId: string, agentId: string) {
    setIsCreating(true)
    try {
      const res = await api.post("/chat/create-or-get", {
        agentId,
        propertyId,
      })
      return res.data._id as string
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

  return { createOrGetChat, isCreating }
}
