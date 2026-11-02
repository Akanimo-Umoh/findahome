import api from "./api"
import type { Property } from "@/types/property"

export const getAllProperties = async (): Promise<Property[]> => {
  const { data } = await api.get("/property")
  const properties = (data.properties ?? []) as Property[]
  return properties.filter((property) => property.status === "approved")
}

export const getPropertyById = async (id: string): Promise<Property> => {
  const { data } = await api.get(`/property/${id}`)
  const property = data.property as Property
  if (property.status !== "approved") {
    throw new Error("This property is not available")
  }
  return property
}
