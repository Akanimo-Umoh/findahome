export type Property = {
  _id: string;
  title: string;
  price: number;
  address: string;
  images: string[];
  video: string | string[];
  propertyType: "land" | "apartment" | "duplex" | "bungalow";
  landType?: string;
  bedroom?: number;
  bathroom?: number;
  kitchen?: number;
  description: string;
  inspectionFee: number;
  serviceCharge: number;
  nearbyPlaces: string[];
  owner: {
    _id: string;
    name: string;
    profilePicture: string[] | string | null;
    isVerified: boolean;
    rating: number;
    totalListings: number;
  };
  createdAt: string;
  updatedAt: string;
};
