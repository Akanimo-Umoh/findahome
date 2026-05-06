import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuthContext } from "@/context/AuthContext";

export type AgentListing = {
  _id: string;
  title: string;
  price: number;
  address: string;
  images: string[];
  videos: string[];
  propertyType: "apartment" | "land";
  listingType: string;
  status: "active" | "pending" | "sold" | "rejected";
  bedroom?: number | null;
  bathroom?: number | null;
  landSize?: string | null;
  landUnit?: string | null;
  description?: string;
  inspectionFee?: number;
  serviceCharge?: number;
  nearbyPlaces?: string[];
  createdAt: string;
  updatedAt: string;
};

export function useAgentListings() {
  const { user } = useAuthContext();
  const [listings, setListings] = useState<AgentListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchListings() {
      setIsLoading(true);
      try {
        const res = await api.get(`/property/agent/${user!.id}`);
        setListings(res.data.properties);
      } catch {
        setError("Failed to load listings");
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
  }, [user?.id]);

  return { listings, isLoading, error };
}
