export type PropertyType = "apartment" | "land"
export type ListingType = "sale" | "rent"

export type AddPropertyFormData = {
  // Step 1
  propertyName: string
  propertyType: PropertyType
  listingType: ListingType
  price: string
  serviceCharge: string
  escrowFee: number
  // Land-only Step 1
  plotSize: string
  plotUnit: string
  landCondition: string
  landDocTitle: string
  landType: string
  // Step 2
  state: string
  city: string
  landmarks: string[]
  // Land-only Step 2
  description: string
  // Step 3 — Apartment-only
  bedrooms: string
  bathrooms: string
  apartmentDescription: string
  // Step 3 — shared
  images: File[]
  legalDocuments: File[]
  video: File | null
}
