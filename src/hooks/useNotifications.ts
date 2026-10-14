import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import { getMyNotifications } from "@/services/notification.service"

export const useNotifications = (limit?: number) => {
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    enabled: !!token,
    staleTime: 30_000,
    retry: false,
    // the endpoint has no ?limit yet, so trim on the client
    select: (res) => ({
      ...res,
      data: limit ? res.data.slice(0, limit) : res.data,
    }),
  })
}
