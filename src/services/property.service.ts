import api from "./api"
import type { Property } from "@/types/property"

export const getAllProperties = async (): Promise<Property[]> => {
  const { data } = await api.get("/property")
  const properties = (data.properties ?? []) as Property[]
  // sold ones stay in: chats and transactions need to know a property was
  // sold. the public listings drop them (useProperties)
  return properties.filter(
    (property) => property.status === "approved" || property.status === "sold"
  )
}

export const getPropertyById = async (id: string): Promise<Property> => {
  const { data } = await api.get(`/property/${id}`)
  const property = data.property as Property
  // a sold one still opens (from a chat, a transaction or saved properties),
  // with a "sold" banner and no actions
  if (property.status !== "approved" && property.status !== "sold") {
    throw new Error("This property is not available")
  }
  return property
}
