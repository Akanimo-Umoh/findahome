import { useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import { toast } from "sonner"
import { useState } from "react"
import type { AddPropertyFormData } from "@/types/addProperty"

export function useEditProperty() {
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function editProperty(
    propertyId: string,
    formData: AddPropertyFormData
  ): Promise<boolean> {
    setIsSubmitting(true)
    try {
      const payload = {
        title: formData.propertyName,
        propertyType: formData.propertyType,
        price: formData.price,
        serviceCharge: formData.serviceCharge,
        address: `${formData.city}, ${formData.state}`,
        description:
          formData.propertyType === "apartment"
            ? formData.apartmentDescription
            : formData.description,
        nearbyPlaces: formData.landmarks.filter((l) => l.trim()),
        ...(formData.propertyType === "land"
          ? { landType: formData.landType }
          : {
              bedroom: formData.bedrooms,
              bathroom: formData.bathrooms,
            }),
      }

      const response = await api.put(`/property/${propertyId}`, payload)

      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["agentListings"] })
        queryClient.invalidateQueries({ queryKey: ["properties"] })
        queryClient.invalidateQueries({ queryKey: ["property", propertyId] })
        toast.success("Listing updated successfully")
        return true
      }
      return false
    } catch (err) {
      toast.error("Failed to update property. Please try again.")
      console.error("editProperty error:", err)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { editProperty, isSubmitting }
}
