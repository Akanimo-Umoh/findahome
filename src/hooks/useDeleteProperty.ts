import { useState } from "react"
import api from "@/services/api"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteProperty() {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  async function deleteProperty(propertyId: string): Promise<boolean> {
    setIsDeleting(true)
    try {
      await api.delete(`/property/${propertyId}`)
      queryClient.invalidateQueries({ queryKey: ["agentListings"] })
      toast.success("Listing deleted successfully")
      return true
    } catch {
      toast.error("Failed to delete listing. Please try again.")
      return false
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteProperty, isDeleting }
}
