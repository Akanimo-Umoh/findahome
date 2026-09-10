import { useQuery } from "@tanstack/react-query"
import { getInspectionDetails } from "@/services/inspection.service"
import { getPurchaseDetails } from "@/services/purchase.service"
import { useSearchParams } from "react-router-dom"

// recordType comes through the URL as a query param set by Recent.tsx's detailsRoute, since the raw id alone doesn't say which collection it's from
export function useTransactionDetails(id: string) {
  const [searchParams] = useSearchParams()
  const recordType = searchParams.get("type") // "inspection" | "purchase"

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactionDetails", id, recordType],
    queryFn: () =>
      recordType === "purchase"
        ? getPurchaseDetails(id)
        : getInspectionDetails(id),
    enabled: !!id && !!recordType,
  })

  return {
    transaction: data,
    recordType,
    isLoading,
    error: error ? "Failed to load transaction" : null,
  }
}
