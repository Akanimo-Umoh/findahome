import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import type { AxiosError } from "axios";
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
        const response = await api.get("/favorite");
        const favorites = response.data.favorites;
        const alreadySaved = favorites.some(
          (fav: any) => fav.property._id === propertyId,
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

    if (!propertyId) return;

    // update the UI immediately
    const previousState = isSaved;
    setIsSaved(!isSaved);
    setIsLoading(true);

    // console.log("sending propertyId:", propertyId);
    try {
      if (previousState) {
        await api.delete("/favorite", { data: { propertyId } });
        toast.success("Removed from saved properties");
      } else {
        await api.post("/favorite", { propertyId });
        toast.success("Property saved");
      }
    } catch (error) {
      // if the api call fails, revert back
      setIsSaved(previousState);
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message;
      if (message === "Already in favorites") {
        setIsSaved(true);
        return;
      }
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return { isSaved, isLoading, toggleFavorite };
}
