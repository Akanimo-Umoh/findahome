import { useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import { toast } from "sonner"
import { useState } from "react"
import type { AddPropertyFormData } from "@/types/addProperty"

export function useAddProperty() {
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function addProperty(
    formData: AddPropertyFormData
  ): Promise<string | null> {
    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()

      formDataToSend.append("title", formData.propertyName)
      formDataToSend.append("propertyType", formData.propertyType)
      formDataToSend.append("listingType", formData.listingType)
      formDataToSend.append("inspectionFee", "5000")
      formDataToSend.append("serviceCharge", formData.serviceCharge)
      formDataToSend.append("escrowFee", String(formData.escrowFee))
      formDataToSend.append("price", formData.price)
      formDataToSend.append("address", `${formData.city}, ${formData.state}`)

      const description =
        formData.propertyType === "apartment"
          ? formData.apartmentDescription
          : formData.description
      formDataToSend.append("description", description)

      formData.landmarks
        .filter((l) => l.trim())
        .forEach((landmark) => {
          formDataToSend.append("nearbyPlaces", landmark)
        })

      if (formData.propertyType === "land") {
        formDataToSend.append("landSize", formData.plotSize)
        formDataToSend.append("landUnit", formData.plotUnit)
        formDataToSend.append("landCondition", formData.landCondition)
        formDataToSend.append("landDocTitle", formData.landDocTitle)
        formDataToSend.append("landType", formData.landType)
      }

      if (formData.propertyType === "apartment") {
        formDataToSend.append("bedroom", formData.bedrooms)
        formDataToSend.append("bathroom", formData.bathrooms)
      }

      formData.legalDocuments.forEach((file) => {
        formDataToSend.append("legalDocuments", file)
      })

      formData.images.forEach((file) => {
        formDataToSend.append("images", file)
      })

      if (formData.video) {
        formDataToSend.append("videos", formData.video)
      }

      const response = await api.post("/property", formDataToSend, {
        headers: { "Content-Type": undefined },
      })

      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["agentListings"] })
        queryClient.invalidateQueries({ queryKey: ["properties"] })
        return response.data.property._id as string
      }

      return null
    } catch (err) {
      toast.error("Failed to create property. Please try again.")
      console.error("addProperty error:", err)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  return { addProperty, isSubmitting }
}
