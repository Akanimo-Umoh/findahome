import type { FilterStatus } from "./MyListings"

interface FilterButtonsProps {
  activeFilter: FilterStatus
  onFilterChange: (filter: FilterStatus) => void
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Sold", value: "sold" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
]

export default function FilterButtons({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex items-center justify-between sm:justify-center sm:gap-4">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`cursor-pointer rounded-lg px-2 py-1 transition-colors duration-500 ${activeFilter === value ? "bg-button-bg text-white" : "bg-button-sec text-text-primary"}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
