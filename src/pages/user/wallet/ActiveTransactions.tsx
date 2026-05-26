import greyNaira from "@/assets/images/icon-chat-naira.svg"
import propertyImg from "@/assets/images/property.jpg"

export default function ActiveTransactions() {
  return (
    <div>
      <p className="">Active Escrow Transactions</p>

      {/* active ctn */}
      <div className="mt-3 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="flex w-full flex-col justify-center gap-1">
            <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
              4 Bed-room Apartment, Lekki phase 1
            </p>
            <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
              <p className="">FH-PAY-2472-001</p>
              <p className="flex items-center">
                <img src={greyNaira} alt="" />
                <span>3M/yr</span>
              </p>
            </div>
            <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-[12px] leading-4">
              Inspection Pending
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="flex w-full flex-col justify-center gap-1">
            <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
              2 Bed-room Duplex, Victoria Island
            </p>
            <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
              <p className="">FH-PAY-2472-001</p>
              <p className="flex items-center">
                <img src={greyNaira} alt="" />
                <span>7M/yr</span>
              </p>
            </div>
            <p className="w-fit rounded-2xl bg-button-bg px-2 py-1 text-[12px] leading-4 text-white">
              Payment held in escrow
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
