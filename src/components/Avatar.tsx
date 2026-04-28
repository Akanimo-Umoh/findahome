const COLOR_PALETTE = [
  { bg: "#DCFBE9", text: "#237142" },
  { bg: "#F8E8FE", text: "#8453A9" },
  { bg: "#FEF3E2", text: "#B45309" },
  { bg: "#FFE4E4", text: "#B91C1C" },
  { bg: "#E0F2FE", text: "#0369A1" },
  { bg: "#F0FDF4", text: "#15803D" },
  { bg: "#FDF4FF", text: "#7E22CE" },
];

function getColorFromName(name: string) {
  // hash the name to a number, pick a color from the palette
  // same name always returns same color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizeMap = {
  sm: { container: "w-8 h-8", text: "text-[11px]" },
  md: { container: "w-10 h-10", text: "text-[13px]" },
  lg: { container: "w-[70px] h-[70px]", text: "text-[24px]" },
};

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Avatar({
  name,
  src,
  size = "md",
  className = "",
}: AvatarProps) {
  const { container, text } = sizeMap[size];
  const { bg, text: textColor } = getColorFromName(name || "?");
  const initials = getInitials(name || "?");

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${container} rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${container} rounded-full shrink-0 flex items-center justify-center font-semibold ${text} ${className}`}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {initials}
    </div>
  );
}
