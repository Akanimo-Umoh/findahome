import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"

interface VisitPropertyCardProps {
  image?: string
  title: string
  location: string
  price: string
  referenceId: string
}

export default function VisitPropertyCard({
  image = propertyImg,
  title,
  location,
  price,
  referenceId,
}: VisitPropertyCardProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
      <img
        src={image}
        alt=""
        className="h-15 w-15 shrink-0 rounded-lg object-cover"
      />
      <div>
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
          {title}
        </p>
        <div className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
          <p>{location}</p>
          <p className="flex items-center font-raleway font-medium tracking-[1px] md:text-[16px] md:font-semibold">
            <img src={nairaIcon} alt="" className="h-4 w-4" />
            <span>{price}</span>
          </p>
        </div>
        <p className="text-[12px] leading-4 text-text-secondary">
          Ref: {referenceId}
        </p>
      </div>
    </div>
  )
}
