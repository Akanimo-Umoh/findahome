// The backend sets a property's status to "sold" once the buyer completes the
// handover (for a rent listing too). It's off the market for good: there is
// no relisting, an agent who wants to list it again creates a new property.
export const isSoldProperty = (p?: { status?: string } | null) =>
  p?.status === "sold"

// "Sold" for a sale, "Rented" for a rent listing
export const soldWord = (listingType?: string) =>
  listingType === "rent" ? "Rented" : "Sold"
