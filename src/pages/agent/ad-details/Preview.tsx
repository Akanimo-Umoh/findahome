import apartmentImg from "@/assets/images/property.jpg";
import agentImg from "@/assets/images/agentAvatar.jpg";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";

export default function Preview() {
  return (
    <div>
      <div className="relative rounded-xl pb-[19px]">
        <img
          src={apartmentImg}
          alt=""
          className="h-75 object-cover rounded-xl"
        />

        <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-xl py-1 px-2 bg-button-bg absolute top-0 left-0">
          Sponsored
        </p>

        <img
          src={agentImg}
          alt=""
          className="w-12.5 h-12.5 object-cover rounded-full absolute top-[269px] right-6"
        />
      </div>

      <div className="space-y-2">
        <p className="font-raleway font-semibold tracking-[1px] line-clamp-2">
          3 Bed-room Apartment, Lekki phase 1
        </p>
        <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-text-secondary">
          Lekki, Lagos State
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
              3,000,000
            </p>
          </div>

          <button className="font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg p-2 border border-button-bg">
            View Listing
          </button>
        </div>
      </div>
    </div>
  );
}
