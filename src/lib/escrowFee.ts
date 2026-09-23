import type { ListingType } from "@/types/addProperty"

export function calculateEscrowFee(
  price: number,
  listingType: ListingType
): number {
  if (listingType === "sale") {
    // Purchase: 1.0% under ₦200m, 0.75% at/above ₦200m (midpoint of the quoted 0.5–1.0% range)
    // TODO: confirm exact breakpoint/rate for the high-value bracket with the owner
    const rate = price >= 200_000_000 ? 0.0075 : 0.01
    return Math.round(price * rate)
  }

  // listingType === "rent"
  // TODO: the form has no way to distinguish annual vs short-term rent, so this
  // treats every rent listing as annual rent (2%), with the flat ₦5k band for
  // ₦200k–₦400k as given. Short-term rent (3–5%) is NOT handled — if the
  // platform needs to charge short-term listings differently, the form needs
  // a duration/rent-type field added first, otherwise every rental gets the
  // annual rate regardless of how it's actually let out.
  if (price >= 200_000 && price <= 400_000) {
    return 5_000
  }
  const rate = 0.02
  return Math.round(price * rate)
}
