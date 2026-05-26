import api from "./api"
import type { Property } from "@/types/property"

export const getAllProperties = async (): Promise<Property[]> => {
  const { data } = await api.get("/property")
  console.log("API response:", data)
  return data.properties
}

export const getPropertyById = async (id: string): Promise<Property> => {
  const { data } = await api.get(`/property/${id}`)
  console.log("Api response:", data)
  return data.property
}
