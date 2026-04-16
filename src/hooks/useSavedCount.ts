import api from "@/services/api";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export function useSavedCount() {
  const { user, token } = useAuthContext();
  const [savedCount, setSavedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) return;

    async function fetchCount() {
      setIsLoading(true);
      try {
        const response = await api.get("/favorite");
        setSavedCount(response.data.favorites.length);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, [user, token]);

  return { savedCount, isLoading };
}
