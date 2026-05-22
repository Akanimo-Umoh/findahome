import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

export function useCreateOrGetChat() {
  const [isCreating, setIsCreating] = useState(false);

  async function createOrGetChat(propertyId: string, agentId: string) {
    setIsCreating(true);
    try {
      const res = await api.post("/chat/create-or-get", {
        agentId,
        propertyId,
      });
      return res.data._id as string;
    } catch {
      toast.error("Failed to start chat. Please try again.");
      return null;
    } finally {
      setIsCreating(false);
    }
  }

  return { createOrGetChat, isCreating };
}
