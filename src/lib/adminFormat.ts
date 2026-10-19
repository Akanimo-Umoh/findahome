const NAIRA = "₦"

export const formatCount = (n: number) => n.toLocaleString("en-NG")

// ₦950K, ₦32.4M, ₦10.5B — compact for dashboards, exact amounts live in tables
export function formatNairaCompact(amount: number): string {
  const abs = Math.abs(amount)
  const sign = amount < 0 ? "-" : ""

  const scaled = (divisor: number, suffix: string) => {
    const value = abs / divisor
    const text = value >= 100 ? value.toFixed(0) : value.toFixed(1)
    return `${sign}${NAIRA}${text.replace(/\.0$/, "")}${suffix}`
  }

  if (abs >= 1e12) return scaled(1e12, "T")
  if (abs >= 1e9) return scaled(1e9, "B")
  if (abs >= 1e6) return scaled(1e6, "M")
  if (abs >= 1e5) return scaled(1e3, "K")
  return `${sign}${NAIRA}${abs.toLocaleString("en-NG")}`
}

export const formatNaira = (amount: number) =>
  `${amount < 0 ? "-" : ""}${NAIRA}${Math.abs(amount).toLocaleString("en-NG")}`

export function timeAgo(iso: string, now: number = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime())
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
  })
}
