import { useAuthContext } from "@/context/AuthContext"
import api from "@/services/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { Favorite } from "./useSavedProperties"

export function useFavorite(propertyId: string) {
  const { user, token } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const { data: favorites = [] } = useQuery<Favorite[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/favorite")
      return response.data.favorites
    },
    enabled: !!user && !!token,
  })

  const isSaved = favorites.some((fav) => fav.property._id === propertyId)

  async function toggleFavorite() {
    if (!user || !token) {
      toast.error("Please login to save properties")
      navigate("/login", { state: { from: location.pathname } })
      return
    }

    if (!propertyId) return

    // update cache immediately before api call
    const previousFavorites =
      queryClient.getQueryData<Favorite[]>(["favorites"]) ?? []

    if (isSaved) {
      // optimistically remove from favorites
      queryClient.setQueryData<Favorite[]>(
        ["favorites"],
        previousFavorites.filter((fav) => fav.property._id !== propertyId)
      )
    } else {
      // optimistically add to cache - we don't have the full favorite object here, so we'll just add a placeholder. It will be replaced with the real data when we refetch after the api call
      queryClient.setQueryData<Favorite[]>(
        ["favorites"],
        [
          ...previousFavorites,
          {
            _id: "temp",
            user: user.id,
            property: { _id: propertyId } as Favorite["property"],
            createdAt: "",
            updatedAt: "",
          },
        ]
      )
    }

    try {
      if (isSaved) {
        await api.delete("/favorite", { data: { propertyId } })
        toast.success("Removed from saved properties")
      } else {
        await api.post("/favorite", { propertyId })
        toast.success("Property saved")
      }
      // sync real data from server after api call
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    } catch (error) {
      // if the optimistic update fails, revert back
      queryClient.setQueryData<Favorite[]>(["favorites"], previousFavorites)
      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError.response?.data?.message
      if (message === "Already in favorites") {
        queryClient.invalidateQueries({ queryKey: ["favorites"] })
        return
      }
      toast.error("Something went wrong, please try again")
    }
  }

  return { isSaved, isLoading: false, toggleFavorite }
}
