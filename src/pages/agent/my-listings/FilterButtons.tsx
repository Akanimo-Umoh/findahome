import type { FilterStatus } from "./MyListings";

interface FilterButtonsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Sold", value: "sold" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

export default function FilterButtons({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex items-center justify-between">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`rounded-lg py-1 px-2 transition-colors duration-500 ${activeFilter === value ? "text-white bg-button-bg" : "bg-button-sec text-text-primary"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
