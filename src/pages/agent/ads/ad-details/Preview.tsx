import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import Avatar from "@/components/Avatar"
import type { Ad } from "@/types/ad"
import { useNavigate } from "react-router-dom"

type PreviewProps = {
  ad: Ad
}

export default function Preview({ ad }: PreviewProps) {
  const navigate = useNavigate()

  const agentAvatar = Array.isArray(ad.user.profilePicture)
    ? (ad.user.profilePicture[0] ?? null)
    : (ad.user.profilePicture ?? null)

  return (
    <div>
      <div className="relative rounded-xl pb-[19px]">
        <img
          src={ad.property.images?.[0]}
          alt={ad.property.title}
          className="h-75 w-full rounded-xl object-cover"
        />

        <p className="absolute top-0 left-0 rounded-xl bg-button-bg px-2 py-1 font-raleway text-[14px] font-semibold tracking-[1px] text-white">
          Sponsored
        </p>

        <Avatar
          name={ad.user.name ?? "?"}
          src={agentAvatar}
          className="absolute top-[269px] right-6 h-12.5 w-12.5 rounded-full border border-white object-cover"
        />
      </div>

      <div className="space-y-2">
        <p className="font-raleway font-semibold tracking-[1px]">
          {ad.property.title}
        </p>
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary">
          {ad.property.address}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              {ad.property.price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/agent/property-preview/${ad.property._id}`)
            }
            className="rounded-lg border border-button-bg p-2 font-raleway text-[14px] font-semibold tracking-[1px]"
          >
            View Listing
          </button>
        </div>
      </div>
    </div>
  )
}
