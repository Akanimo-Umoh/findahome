import type {
  AdminProperty,
  ListingKind,
  PropertyKind,
  PropertyStatus,
} from "@/types/adminProperty"

export const TYPE_LABEL: Record<PropertyKind, string> = {
  land: "Land",
  apartment: "Apartment",
  duplex: "Duplex",
  bungalow: "Bungalow",
}

export const LISTING_LABEL: Record<ListingKind, string> = {
  sale: "For sale",
  rent: "For rent",
}

// the backend says "approved"; admins say "Active"
export const STATUS_LABEL: Record<PropertyStatus, string> = {
  approved: "Active",
  pending: "Pending",
  rejected: "Rejected",
}

export const STATUS_LABEL_LONG: Record<PropertyStatus, string> = {
  approved: "Active",
  pending: "Pending review",
  rejected: "Rejected",
}

// There is no human-readable id on the backend yet, so derive a stable one.
export const propertyCode = (p: Pick<AdminProperty, "_id" | "code">) =>
  p.code ?? `PROP-${p._id.slice(-6).toUpperCase()}`

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const ordinal = (n: number) => {
  const v = n % 100
  const suffix = ["th", "st", "nd", "rd"]
  return `${n}${suffix[(v - 20) % 10] ?? suffix[v] ?? suffix[0]}`
}

// 27th Dec, 2025
export function formatDate(iso?: string) {
  const d = iso ? new Date(iso) : null
  if (!d || isNaN(d.getTime())) return "—"
  return `${ordinal(d.getDate())} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`
}

// Jan 20, 2026, 9:40am
export function formatDateTime(iso?: string) {
  const d = iso ? new Date(iso) : null
  if (!d || isNaN(d.getTime())) return "—"
  const h = d.getHours()
  const time = `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}${h < 12 ? "am" : "pm"}`
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${time}`
}

// ---- CSV export of whatever the filters currently match ----

// stop spreadsheet apps from running user-supplied text as a formula
const cell = (value: string | number) => {
  const text = String(value)
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safe.replace(/"/g, '""')}"`
}

export function downloadListingsCsv(rows: AdminProperty[]) {
  const header = [
    "Code",
    "Title",
    "Type",
    "Listing",
    "Agent",
    "Price (NGN)",
    "Status",
    "Date listed",
    "Address",
  ]
  const lines = rows.map((p) =>
    [
      propertyCode(p),
      p.title,
      TYPE_LABEL[p.propertyType] ?? p.propertyType,
      LISTING_LABEL[p.listingType] ?? p.listingType,
      p.owner?.name ?? "",
      p.price,
      STATUS_LABEL[p.status] ?? p.status,
      formatDate(p.createdAt),
      p.address,
    ]
      .map(cell)
      .join(",")
  )
  const csv = "\uFEFF" + [header.map(cell).join(","), ...lines].join("\r\n")
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" })
  )
  const link = document.createElement("a")
  link.href = url
  link.download = `listings-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
