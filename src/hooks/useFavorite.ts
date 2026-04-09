import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useFavorite(propertyId: string) {
  const { user, token } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // On mount, if user is logged in, check if this property is already saved
  useEffect(() => {
    if (!user || !token) return;

    async function checkIfSaved() {
      try {
        const response = await api.get("/api/favorite");
        const favorites = response.data; // adjust based on your API response shape
        const alreadySaved = favorites.some(
          (fav: any) =>
            fav.property._id === propertyId || fav.property === propertyId,
        );
        setIsSaved(alreadySaved);
      } catch (error) {
        // silently fail — not critical
      }
    }

    checkIfSaved();
  }, [user, token, propertyId]);

  async function toggleFavorite() {
    if (!user || !token) {
      toast.error("Please login to save properties");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await api.delete("/api/favorite", { data: { propertyId } });
        toast.success("Removed from saved properties");
        setIsSaved(false);
      } else {
        await api.post("/api/favorite", { propertyId });
        toast.success("Property saved");
        setIsSaved(true);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return { isSaved, isLoading, toggleFavorite };
}
