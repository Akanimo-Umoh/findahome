import greyNaira from "@/assets/images/icon-chat-naira.svg";
import propertyImg from "@/assets/images/property.jpg";

export default function ActiveTransactions() {
  return (
    <div>
      <p className="">Active Escrow Transactions</p>

      {/* active ctn */}
      <div className="mt-3 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-bg-accent">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="flex flex-col justify-center gap-1 w-full">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
              4 Bed-room Apartment, Lekki phase 1
            </p>
            <div className="text-[12px] leading-4 text-text-secondary flex items-center justify-between">
              <p className="">FH-PAY-2472-001</p>
              <p className="flex items-center">
                <img src={greyNaira} alt="" />
                <span>3M/yr</span>
              </p>
            </div>
            <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit">
              Inspection Pending
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-xl border border-bg-accent">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="flex flex-col justify-center gap-1 w-full">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
              2 Bed-room Duplex, Victoria Island
            </p>
            <div className="text-[12px] leading-4 text-text-secondary flex items-center justify-between">
              <p className="">FH-PAY-2472-001</p>
              <p className="flex items-center">
                <img src={greyNaira} alt="" />
                <span>7M/yr</span>
              </p>
            </div>
            <p className="text-[12px] leading-4 bg-button-bg text-white py-1 px-2 rounded-2xl w-fit">
              Payment held in escrow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
