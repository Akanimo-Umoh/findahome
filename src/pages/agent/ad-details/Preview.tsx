import apartmentImg from "@/assets/images/property.jpg"
import agentImg from "@/assets/images/agentAvatar.jpg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"

export default function Preview() {
  return (
    <div>
      <div className="relative rounded-xl pb-[19px]">
        <img
          src={apartmentImg}
          alt=""
          className="h-75 rounded-xl object-cover"
        />

        <p className="absolute top-0 left-0 rounded-xl bg-button-bg px-2 py-1 font-raleway text-[14px] font-semibold tracking-[1px] text-white">
          Sponsored
        </p>

        <img
          src={agentImg}
          alt=""
          className="absolute top-[269px] right-6 h-12.5 w-12.5 rounded-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <p className="line-clamp-2 font-raleway font-semibold tracking-[1px]">
          3 Bed-room Apartment, Lekki phase 1
        </p>
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary">
          Lekki, Lagos State
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              3,000,000
            </p>
          </div>

          <button className="rounded-lg border border-button-bg p-2 font-raleway text-[14px] font-semibold tracking-[1px]">
            View Listing
          </button>
        </div>
      </div>
    </div>
  )
}
