import { useState, useEffect } from "react";

export type Property = {
  id: string;
  property_image: string;
  title: string;
  value: string;
  location: string;
  bedroom: string;
  bathroom: string;
  kitchen?: string;
  avatar: string;
  listed_by: string;
  is_verified: boolean;
  propertyType?: string;
  description?: string;
  inspectionFee?: string;
  serviceCharge?: string;
  nearbyPlaces?: string[];
  agentRating?: string;
  agentListings?: string;
  hasVideo?: boolean;
  totalImages?: number;
};

type UsePropertiesOptions = {
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  priceRange?: string;
  limit?: number;
};

export function useProperties(options?: UsePropertiesOptions) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // In development, fetch from public folder
        // In production, replace with your API endpoint
        const response = await fetch("/properties.json");

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        let filteredProperties = data.properties;

        // Apply filters if provided
        if (options) {
          filteredProperties = filteredProperties.filter(
            (property: Property) => {
              // Location filter
              if (
                options.location &&
                !property.location
                  .toLowerCase()
                  .includes(options.location.toLowerCase())
              ) {
                return false;
              }

              // Property type filter
              if (
                options.propertyType &&
                property.propertyType !== options.propertyType
              ) {
                return false;
              }

              // Bedrooms filter
              if (options.bedrooms) {
                if (options.bedrooms === "4+") {
                  if (parseInt(property.bedroom) < 4) return false;
                } else {
                  if (property.bedroom !== options.bedrooms) return false;
                }
              }

              // Price range filter
              if (options.priceRange) {
                // Parse property value: "800k" -> 800, "1.2m" -> 1200
                let propertyPrice: number;
                const valueStr = property.value.toLowerCase();

                if (valueStr.includes("m")) {
                  propertyPrice = parseFloat(valueStr.replace("m", "")) * 1000;
                } else if (valueStr.includes("k")) {
                  propertyPrice = parseFloat(valueStr.replace("k", ""));
                } else {
                  propertyPrice = parseFloat(valueStr);
                }

                if (options.priceRange === "3m+") {
                  if (propertyPrice < 3000) return false;
                } else {
                  const [minStr, maxStr] = options.priceRange.split("-");

                  // Parse min value
                  let min: number;
                  if (minStr.includes("m")) {
                    min = parseFloat(minStr.replace("m", "")) * 1000;
                  } else {
                    min = parseFloat(minStr.replace("k", ""));
                  }

                  // Parse max value
                  let max: number;
                  if (maxStr.includes("m")) {
                    max = parseFloat(maxStr.replace("m", "")) * 1000;
                  } else {
                    max = parseFloat(maxStr.replace("k", ""));
                  }

                  if (propertyPrice < min || propertyPrice > max) return false;
                }
              }

              return true;
            },
          );

          // Apply limit if provided
          if (options.limit) {
            filteredProperties = filteredProperties.slice(0, options.limit);
          }
        }

        setProperties(filteredProperties);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [
    options?.location,
    options?.propertyType,
    options?.bedrooms,
    options?.priceRange,
    options?.limit,
  ]);

  return { properties, loading, error };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch("/properties.json");

        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await response.json();
        const foundProperty = data.properties.find(
          (p: Property) => p.id === id,
        );

        if (!foundProperty) {
          throw new Error("Property not found");
        }

        setProperty(foundProperty);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
}
