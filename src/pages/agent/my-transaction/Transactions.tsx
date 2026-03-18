import modelHouse from "@/assets/agentImages/img-model-house.jpg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";

export default function Transactions() {
  return (
    <div>
      {/* tab buttons */}
      <div className="flex items-center justify-between">
        {/* this is for the active tab */}
        <button className="rounded-lg py-1 px-2 transition-colors duration-500 text-white bg-button-bg">
          All
        </button>
        {/* this is for the inactive tab */}
        <button className="rounded-lg py-1 px-2 transition-colors duration-500 bg-button-sec text-text-primary">
          Pending
        </button>
        <button className="rounded-lg py-1 px-2 transition-colors duration-500 bg-button-sec text-text-primary">
          Completed
        </button>
        <button className="rounded-lg py-1 px-2 transition-colors duration-500 bg-button-sec text-text-primary">
          Dispute
        </button>
      </div>

      {/* transactions */}
      <section className="mt-6 space-y-4">
        {/* scenario 1, when it is in escrow */}
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={apartmentImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    3,000,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit text-white">
                In Escrow
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 2hrs ago
              </p>
            </div>
          </div>
        </div>

        {/* scenario 2, when it is awaiting inspection completion */}
        {/* Note: there are different scenarios for this;
        1. Awaiting inspection completion
        2. Awaiting property handover
        3. Awaiting inspection completion
        4. Awaiting property handover */}
        {/* in general, any other thing apart from payment released (completed) or dispute opened (dispute) goes into pending */}
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={modelHouse}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                4 Bed-room Apartment, Ojota, Lagos
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    2,000,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 bg-[#FF6B6B] py-1 px-2 rounded-2xl w-fit">
                Awaiting inspection completion
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 3hrs ago
              </p>
            </div>
          </div>
        </div>

        {/* scenario 3, when payment has been released, this is for the completed tab */}
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={modelHouse}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                2 Bed-room Apartment, Ikeja
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    1,700,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 bg-[#149D18] py-1 px-2 rounded-2xl w-fit text-white">
                Payment Released
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 5hrs ago
              </p>
            </div>
          </div>
        </div>

        {/* scenario 4, when a dispute has been made */}
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={modelHouse}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                600 SQM, Along airport road, Uyo
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    7,500,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 py-1 px-2 rounded-2xl w-fit border border-text-secondary">
                Dispute opened
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 9hrs ago
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
