// import { useQueryClient } from "@tanstack/react-query"
// import api from "@/services/api"
// import { toast } from "sonner"
// import { useState } from "react"
// import type { AddPropertyFormData } from "@/types/addProperty"

// export function useAddProperty() {
//   const queryClient = useQueryClient()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   async function addProperty(
//     formData: AddPropertyFormData
//   ): Promise<string | null> {
//     setIsSubmitting(true)
//     try {
//       const formDataToSend = new FormData()

//       formDataToSend.append("title", formData.propertyName)
//       formDataToSend.append("propertyType", formData.propertyType)
//       formDataToSend.append("listingType", formData.listingType)
//       formDataToSend.append("inspectionFee", "5000")
//       formDataToSend.append("serviceCharge", formData.serviceCharge)
//       formDataToSend.append("escrowFee", String(formData.escrowFee))
//       formDataToSend.append("price", formData.price)
//       formDataToSend.append("address", `${formData.city}, ${formData.state}`)

//       const description =
//         formData.propertyType === "apartment"
//           ? formData.apartmentDescription
//           : formData.description
//       formDataToSend.append("description", description)

//       formData.landmarks
//         .filter((l) => l.trim())
//         .forEach((landmark) => {
//           formDataToSend.append("nearbyPlaces", landmark)
//         })

//       if (formData.propertyType === "land") {
//         formDataToSend.append("landSize", formData.plotSize)
//         formDataToSend.append("landUnit", formData.plotUnit)
//         formDataToSend.append("landCondition", formData.landCondition)
//         formDataToSend.append("landDocTitle", formData.landDocTitle)
//         formDataToSend.append("landType", formData.landType)
//       }

//       if (formData.propertyType === "apartment") {
//         formDataToSend.append("bedroom", formData.bedrooms)
//         formDataToSend.append("bathroom", formData.bathrooms)
//       }

//       formData.legalDocuments.forEach((file) => {
//         formDataToSend.append("legalDocuments", file)
//       })

//       formData.images.forEach((file) => {
//         formDataToSend.append("images", file)
//       })

//       if (formData.video) {
//         formDataToSend.append("videos", formData.video)
//       }

//       const response = await api.post("/property", formDataToSend, {
//         headers: { "Content-Type": undefined },
//       })

//       if (response.data.success) {
//         queryClient.invalidateQueries({ queryKey: ["agentListings"] })
//         queryClient.invalidateQueries({ queryKey: ["properties"] })
//         return response.data.property._id as string
//       }

//       return null
//     } catch (err) {
//       toast.error("Failed to create property. Please try again.")
//       console.error("addProperty error:", err)
//       return null
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return { addProperty, isSubmitting }
// }

import { useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import type { AddPropertyFormData } from "@/types/addProperty"

const formatFileSize = (bytes: number) => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

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

      // -----------------------------------------
      // UPLOAD SIZE DIAGNOSTICS
      // -----------------------------------------

      const uploadFiles = [
        ...formData.images.map((file, index) => ({
          field: "images",
          name: `Image ${index + 1}: ${file.name}`,
          size: file.size,
        })),

        ...formData.legalDocuments.map((file, index) => ({
          field: "legalDocuments",
          name: `Document ${index + 1}: ${file.name}`,
          size: file.size,
        })),

        ...(formData.video
          ? [
              {
                field: "videos",
                name: `Video: ${formData.video.name}`,
                size: formData.video.size,
              },
            ]
          : []),
      ]

      const totalUploadSize = uploadFiles.reduce(
        (total, file) => total + file.size,
        0
      )

      console.group("Property Upload Diagnostics")

      console.table(
        uploadFiles.map((file) => ({
          field: file.field,
          name: file.name,
          size: formatFileSize(file.size),
          bytes: file.size,
        }))
      )

      console.log("Total files:", uploadFiles.length)
      console.log("Total file size:", formatFileSize(totalUploadSize))
      console.log("Total file size in bytes:", totalUploadSize)

      console.groupEnd()

      // -----------------------------------------
      // SUBMIT PROPERTY
      // -----------------------------------------

      const response = await api.post("/property", formDataToSend, {
        headers: { "Content-Type": undefined },
      })

      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["agentListings"] })
        queryClient.invalidateQueries({ queryKey: ["properties"] })

        toast.success("Property created successfully.")

        return response.data.property._id as string
      }

      const message =
        response.data.message || "The property could not be created."

      toast.error(message)

      console.error("Property creation unsuccessful:", response.data)

      return null
    } catch (err) {
      console.error("Add property error:", err)

      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const responseData = err.response?.data

        console.error("Property API error details:", {
          status,
          response: responseData,
          message: err.message,
        })

        if (status === 413) {
          toast.error(
            "Your property images and video are too large. Please reduce their sizes and try again."
          )

          return null
        }

        const backendMessage =
          typeof responseData?.message === "string"
            ? responseData.message
            : typeof responseData?.error === "string"
              ? responseData.error
              : null

        if (backendMessage) {
          toast.error(backendMessage)
        } else if (!err.response) {
          toast.error(
            "Unable to reach the server. Please check your internet connection."
          )
        } else {
          toast.error(
            `Failed to create property (${status}). Please try again.`
          )
        }

        return null
      }

      toast.error("An unexpected error occurred while creating the property.")

      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  return { addProperty, isSubmitting }
}
