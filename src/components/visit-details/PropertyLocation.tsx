import { Link } from "react-router-dom"
import blackLocation from "@/assets/images/icon-inspection-visit-black-location.svg"

interface PropertyLocationProps {
  address: string
}

export default function PropertyLocation({ address }: PropertyLocationProps) {
  return (
    <div className="flex flex-col justify-center gap-2 rounded-xl border border-bg-accent p-2 md:gap-4">
      <p className="text-[18px]">Property Location</p>
      <div className="flex flex-col gap-2">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          className="h-30.5 w-full rounded-lg md:h-62.5"
          loading="lazy"
          title="Property location"
        />
        <div className="flex items-center justify-between gap-1">
          <div className="text-[12px] leading-4 md:text-[14px]">
            <p className="line-clamp-2">{address}</p>
          </div>
          <Link
            to={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 min-w-38.75 shrink-0 items-center justify-center gap-2 rounded-lg bg-bg-accent p-2"
          >
            <img src={blackLocation} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary md:text-[16px]">
              Get Directions
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
