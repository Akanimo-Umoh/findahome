import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { getSocket } from "@/services/socket";

type ChatMessage = {
  _id: string;
  text: string;
  sender: {
    _id: string;
    email: string;
  };
  attachments: string[];
  createdAt: string;
};

type Chat = {
  _id: string;
  participants: { _id: string; email: string }[];
  property: string;
};

export function useAgentChat(chatId: string) {
  const { user } = useAuthContext();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // connect socket
  useEffect(() => {
    if (!user?.id) return;
    const socket = getSocket();
    if (!socket.connected) socket.connect();
    socket.emit("user_connected", user.id);

    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user?.id]);

  // fetch chat + messages
  useEffect(() => {
    if (!chatId) return;

    async function initChat() {
      setIsLoading(true);
      try {
        const chatResponse = await api.get(`/chat/${chatId}`);
        setChat(chatResponse.data);

        const messagesResponse = await api.get(`/message/${chatId}`);
        setMessages(messagesResponse.data);
      } catch {
        setError("Failed to load chat");
      } finally {
        setIsLoading(false);
      }
    }

    initChat();
  }, [chatId]);

  async function sendMessage(text: string) {
    if (!chat || !text.trim() || !user?.id) return;

    setIsSending(true);
    try {
      const response = await api.post("/message/send", {
        chatId: chat._id,
        text: text.trim(),
      });

      const newMessage: ChatMessage = response.data.data;
      setMessages((prev) => [...prev, newMessage]);

      const socket = getSocket();
      socket.emit("send_message", {
        from: user.id,
        to: chat.participants.find((p) => p._id !== user.id)?._id,
        text: text.trim(),
        attachments: [],
      });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }

  return {
    chat,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
    currentUserId: user?.id,
  };
}
