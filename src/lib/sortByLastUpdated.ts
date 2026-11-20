// Most recently updated first, so a deal that just moved on (paid, scheduled,
// refunded…) comes to the top. Falls back to createdAt when a record has no
// updatedAt. Returns a new array.
//
// Use it where a list is shown, not in the shared data hooks: usePropertyDeal
// picks the latest deal per property from the server's order (newest
// created first), and an old cancelled record touched later (e.g. its refund
// marked sent) must not win over the buyer's new one.
export function sortByLastUpdated<
  T extends { createdAt: string; updatedAt?: string },
>(items: T[]): T[] {
  const time = (item: T) => Date.parse(item.updatedAt ?? item.createdAt) || 0
  return [...items].sort((a, b) => time(b) - time(a))
}
