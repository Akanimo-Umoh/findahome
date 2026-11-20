import { useQuery } from "@tanstack/react-query"
import { getAllProperties } from "@/services/property.service"
import type { Property } from "@/types/property"
import { isSoldProperty, soldWord } from "@/lib/propertySold"

// Whether another buyer has already paid for this property (or their payment
// is under review), so this buyer can't buy it. Read from the property list,
// not GET /property/:id: the details endpoint notifies the agent of a "view"
// on every call, which the chat and transaction pages would repeat.
export function usePropertyTaken(propertyId?: string) {
  const { data, isLoading, refetch } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const list = await getAllProperties()
      return Array.isArray(list) ? list : []
    },
    // another buyer's payment doesn't reach this browser as an event, so
    // check again fairly often; the server still refuses a second purchase
    staleTime: 30_000,
    enabled: !!propertyId,
  })

  const property = data?.find((p) => p._id === propertyId)
  // sold: the handover is done and it's off the market for good
  const isSold = isSoldProperty(property)
  return {
    isTaken: !!property?.isTaken || isSold,
    isSold,
    soldLabel: soldWord(property?.listingType),
    isLoading,
    refetch,
  }
}
