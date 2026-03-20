// import { useState, useEffect } from "react";

// export type Property = {
//   id: string;
//   property_image: string;
//   title: string;
//   value: string;
//   location: string;
//   bedroom: string;
//   bathroom: string;
//   kitchen?: string;
//   agentId: string;
//   agent_avatar: string;
//   listed_by: string;
//   is_verified: boolean;
//   propertyType?: string;
//   description?: string;
//   inspectionFee?: string;
//   serviceCharge?: string;
//   nearbyPlaces?: string[];
//   agentRating?: string;
//   agentListings?: string;
//   hasVideo?: boolean;
//   totalImages?: number;
// };

// type UsePropertiesOptions = {
//   location?: string;
//   propertyType?: string;
//   bedrooms?: string;
//   priceRange?: string;
//   limit?: number;
// };

// export function useProperties(options?: UsePropertiesOptions) {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         // In development, fetch from public folder
//         // In production, replace with your API endpoint
//         const response = await fetch("/properties.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch properties");
//         }

//         const data = await response.json();
//         let filteredProperties = data.properties;

//         // Apply filters if provided
//         if (options) {
//           filteredProperties = filteredProperties.filter(
//             (property: Property) => {
//               // Location filter
//               if (
//                 options.location &&
//                 !property.location
//                   .toLowerCase()
//                   .includes(options.location.toLowerCase())
//               ) {
//                 return false;
//               }

//               // Property type filter
//               if (
//                 options.propertyType &&
//                 property.propertyType !== options.propertyType
//               ) {
//                 return false;
//               }

//               // Bedrooms filter
//               if (options.bedrooms) {
//                 if (options.bedrooms === "4+") {
//                   if (parseInt(property.bedroom) < 4) return false;
//                 } else {
//                   if (property.bedroom !== options.bedrooms) return false;
//                 }
//               }

//               // Price range filter
//               if (options.priceRange) {
//                 // Parse property value: "800k" -> 800, "1.2m" -> 1200
//                 let propertyPrice: number;
//                 const valueStr = property.value.toLowerCase();

//                 if (valueStr.includes("m")) {
//                   propertyPrice = parseFloat(valueStr.replace("m", "")) * 1000;
//                 } else if (valueStr.includes("k")) {
//                   propertyPrice = parseFloat(valueStr.replace("k", ""));
//                 } else {
//                   propertyPrice = parseFloat(valueStr);
//                 }

//                 if (options.priceRange === "3m+") {
//                   if (propertyPrice < 3000) return false;
//                 } else {
//                   const [minStr, maxStr] = options.priceRange.split("-");

//                   // Parse min value
//                   let min: number;
//                   if (minStr.includes("m")) {
//                     min = parseFloat(minStr.replace("m", "")) * 1000;
//                   } else {
//                     min = parseFloat(minStr.replace("k", ""));
//                   }

//                   // Parse max value
//                   let max: number;
//                   if (maxStr.includes("m")) {
//                     max = parseFloat(maxStr.replace("m", "")) * 1000;
//                   } else {
//                     max = parseFloat(maxStr.replace("k", ""));
//                   }

//                   if (propertyPrice < min || propertyPrice > max) return false;
//                 }
//               }

//               return true;
//             },
//           );

//           // Apply limit if provided
//           if (options.limit) {
//             filteredProperties = filteredProperties.slice(0, options.limit);
//           }
//         }

//         setProperties(filteredProperties);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//         setProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [
//     options?.location,
//     options?.propertyType,
//     options?.bedrooms,
//     options?.priceRange,
//     options?.limit,
//   ]);

//   return { properties, loading, error };
// }

// export function useProperty(id: string) {
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/properties.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch property");
//         }

//         const data = await response.json();
//         const foundProperty = data.properties.find(
//           (p: Property) => p.id === id,
//         );

//         if (!foundProperty) {
//           throw new Error("Property not found");
//         }

//         setProperty(foundProperty);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//         setProperty(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProperty();
//     }
//   }, [id]);

//   return { property, loading, error };
// }

// import { useState, useEffect } from "react";
// import api from "@/services/api";

// export type Property = {
//   id: string;
//   property_image: string;
//   images: string[];
//   title: string;
//   price: number;
//   value: string; // formatted for display
//   address: string;
//   location: string; // mapped from address
//   description?: string;
//   status: string;
//   video?: string;
//   bedroom: string;
//   bathroom: string;
//   kitchen?: string;
//   agentId: string;
//   agent_avatar: string;
//   listed_by: string;
//   is_verified: boolean;
//   propertyType?: string;
//   inspectionFee?: string;
//   serviceCharge?: string;
//   nearbyPlaces?: string[];
//   agentRating?: string;
//   agentListings?: string;
//   hasVideo?: boolean;
//   totalImages?: number;
// };

// // Maps raw API response to your Property shape
// function mapProperty(raw: any): Property {
//   return {
//     ...raw,
//     id: raw._id,
//     property_image: raw.images?.[0] ?? "",
//     images: raw.images ?? [],
//     location: raw.address ?? "",
//     value: raw.price ? `${(raw.price / 1000).toFixed(0)}k` : "N/A",
//     // owner is null in your data — default these until the API includes agent info
//     agentId: raw.owner?._id ?? "",
//     agent_avatar: raw.owner?.avatar ?? "",
//     listed_by: raw.owner?.name ?? "Unknown Agent",
//     is_verified: raw.owner?.is_verified ?? false,
//     bedroom: raw.bedroom ?? "N/A",
//     bathroom: raw.bathroom ?? "N/A",
//     hasVideo: !!raw.video,
//     totalImages: raw.images?.length ?? 0,
//   };
// }

// type UsePropertiesOptions = {
//   location?: string;
//   propertyType?: string;
//   bedrooms?: string;
//   priceRange?: string;
//   limit?: number;
// };

// export function useProperties(options?: UsePropertiesOptions) {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get("/property");
//         console.log("Properties API response:", response.data);

//         const raw = response.data;
//         const rawList: any[] = Array.isArray(raw)
//           ? raw
//           : (raw.data ?? raw.properties ?? []);
//         let allProperties: Property[] = rawList.map(mapProperty);

//         if (options) {
//           allProperties = allProperties.filter((property) => {
//             if (
//               options.location &&
//               !property.location
//                 .toLowerCase()
//                 .includes(options.location.toLowerCase())
//             )
//               return false;

//             if (
//               options.propertyType &&
//               property.propertyType !== options.propertyType
//             )
//               return false;

//             if (options.bedrooms) {
//               if (options.bedrooms === "4+") {
//                 if (parseInt(property.bedroom) < 4) return false;
//               } else {
//                 if (property.bedroom !== options.bedrooms) return false;
//               }
//             }

//             if (options.priceRange) {
//               const priceInK = property.price / 1000;

//               if (options.priceRange === "3m+") {
//                 if (priceInK < 3000) return false;
//               } else {
//                 const [minStr, maxStr] = options.priceRange.split("-");
//                 const min = minStr.includes("m")
//                   ? parseFloat(minStr) * 1000
//                   : parseFloat(minStr);
//                 const max = maxStr.includes("m")
//                   ? parseFloat(maxStr) * 1000
//                   : parseFloat(maxStr);
//                 if (priceInK < min || priceInK > max) return false;
//               }
//             }

//             return true;
//           });

//           if (options.limit) {
//             allProperties = allProperties.slice(0, options.limit);
//           }
//         }

//         setProperties(allProperties);
//         setError(null);
//       } catch (err: any) {
//         const message =
//           err.response?.data?.message ?? err.message ?? "An error occurred";
//         console.error("Error fetching properties:", err);
//         setError(message);
//         setProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [
//     options?.location,
//     options?.propertyType,
//     options?.bedrooms,
//     options?.priceRange,
//     options?.limit,
//   ]);

//   return { properties, loading, error };
// }

// export function useProperty(id: string) {
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get(`/property/${id}`);
//         console.log("Single property API response:", response.data);

//         const raw = response.data;
//         const rawProperty = raw.data ?? raw.property ?? raw;
//         setProperty(mapProperty(rawProperty));
//         setError(null);
//       } catch (err: any) {
//         const message =
//           err.response?.data?.message ?? err.message ?? "An error occurred";
//         console.error("Error fetching property:", err);
//         setError(message);
//         setProperty(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProperty();
//   }, [id]);

//   return { property, loading, error };
// }

import { useEffect, useMemo, useState } from "react";
import { getAllProperties, getPropertyById } from "@/services/property.service";
import type { Property } from "@/types/property";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getAllProperties();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};

type PropertyFilters = {
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  priceRange?: string;
};

export const useFilteredProperties = (filters: PropertyFilters) => {
  const { properties, loading, error } = useProperties();

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.location) {
      const search = filters.location.toLowerCase();
      result = result.filter((p) => p.address.toLowerCase().includes(search));
    }

    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    if (filters.bedrooms) {
      if (filters.bedrooms === "4+") {
        result = result.filter(
          (p) => p.bedroom !== undefined && p.bedroom >= 4,
        );
      } else {
        result = result.filter((p) => p.bedroom === Number(filters.bedrooms));
      }
    }

    if (filters.priceRange) {
      const ranges: Record<string, [number, number]> = {
        "300k-400k": [300000, 400000],
        "400k-1m": [400000, 1000000],
        "1m-3m": [1000000, 3000000],
        "3m+": [3000000, Infinity],
      };
      const range = ranges[filters.priceRange];
      if (range) {
        result = result.filter(
          (p) => p.price >= range[0] && p.price <= range[1],
        );
      }
    }

    return result;
  }, [
    properties,
    filters.location,
    filters.propertyType,
    filters.bedrooms,
    filters.priceRange,
  ]);

  return { properties: filteredProperties, loading, error };
};
