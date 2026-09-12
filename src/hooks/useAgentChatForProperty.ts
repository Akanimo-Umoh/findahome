import { useChatList } from "@/hooks/useChat"

export function useAgentChatForProperty(propertyId?: string) {
  const { chats, isLoading } = useChatList()
  const chat = propertyId
    ? chats.find((c) => c.property._id === propertyId)
    : undefined
  return { chatId: chat?._id, isLoading }
}
