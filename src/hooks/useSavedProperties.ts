import api from "@/services/api";
import type { Property } from "@/types/property";
import { useEffect, useState } from "react";

export type Favorite = {
  _id: string;
  user: string;
  property: Property;
  createdAt: string;
  updatedAt: string;
};

export function useSavedProperties() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get("/favorite");
        setFavorites(response.data.favorites);
      } catch {
        setError("Failed to load saved properties");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  return { favorites, loading, error };
}
