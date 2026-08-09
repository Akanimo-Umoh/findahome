import api from "@/services/api"
import { useAuthContext } from "@/context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export type AgentListing = {
  _id: string
  title: string
  price: number
  address: string
  images: string[]
  videos: string[]
  propertyType: "apartment" | "land"
  listingType: string
  status: "approved" | "pending" | "sold" | "rejected"
  bedroom?: number | null
  bathroom?: number | null
  landSize?: string | null
  landUnit?: string | null
  description?: string
  inspectionFee?: number
  serviceCharge?: number
  nearbyPlaces?: string[]
  createdAt: string
  updatedAt: string
}

export function useAgentListings() {
  const { user } = useAuthContext()

  const { data, isLoading, error } = useQuery({
    queryKey: ["agentListings", user?._id],
    queryFn: async () => {
      const res = await api.get(`/property/agent/${user!._id}`)
      console.log(res)
      return res.data.properties as AgentListing[]
    },
    enabled: !!user?._id,
  })

  const activeListingsCount = useMemo(
    () =>
      (data ?? []).filter((listing) => listing.status === "approved").length,
    [data]
  )

  return {
    listings: data ?? [],
    activeListingsCount,
    isLoading,
    error: error ? "Failed to load agent listings" : null,
  }
}
