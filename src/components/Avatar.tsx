import { useState } from "react"

const COLOR_PALETTE = [
  { bg: "#DCFBE9", text: "#237142" },
  { bg: "#F8E8FE", text: "#8453A9" },
  { bg: "#FEF3E2", text: "#B45309" },
  { bg: "#FFE4E4", text: "#B91C1C" },
  { bg: "#E0F2FE", text: "#0369A1" },
  { bg: "#F0FDF4", text: "#15803D" },
  { bg: "#FDF4FF", text: "#7E22CE" },
]

function getColorFromName(name: string) {
  // hash the name to a number, pick a color from the palette
  // same name always returns same color
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length]
}

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const sizeMap = {
  xs: { container: "w-5 h-5 md:w-12.5 md:h-12.5", text: "text-[10px]" },
  sm: { container: "w-8 h-8", text: "text-[11px]" },
  md: { container: "w-10 h-10", text: "text-[13px]" },
  lg: { container: "w-[70px] h-[70px]", text: "text-[24px]" },
}

type AvatarProps = {
  name: string
  src?: string | null
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

export default function Avatar({
  name,
  src,
  size = "md",
  className = "",
}: AvatarProps) {
  const { container, text } = sizeMap[size]
  const { bg, text: textColor } = getColorFromName(name || "?")
  const initials = getInitials(name || "?")

  const [imgError, setImgError] = useState(false)

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className={`shrink-0 rounded-full object-cover ${container} ${className}`}
      />
    )
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${text} ${container} ${className}`}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {initials}
    </div>
  )
}
