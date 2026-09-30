type BaseProperty = {
  _id: string
  title: string
  price: number
  escrowFee: number
  address: string
  images: string[]
  videos: string[]
  legalDocuments: string[]
  description: string
  inspectionFee: number
  serviceCharge: number
  nearbyPlaces: string[]
  listingType: string
  status: "pending" | "approved" | "rejected"
  owner: {
    _id: string
    name: string
    profilePicture: string[] | string | null
    isVerified: boolean
    rating: number
    totalListings: number
  }
  createdAt: string
  updatedAt: string
}

export type LandProperty = BaseProperty & {
  propertyType: "land"
  landType: string
  landSize?: string
  landUnit?: string
  landCondition?: string
  landDocTitle?: string
}

export type BuildingProperty = BaseProperty & {
  propertyType: "apartment" | "duplex" | "bungalow"
  bedroom: number
  bathroom: number
  kitchen?: number
}

export type Property = LandProperty | BuildingProperty
