import agentAvatar from "@/assets/images/agentAvatar.jpg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import yellowStar from "@/assets/images/icon-yellow-star.svg";
import starIcon from "@/assets/images/icon-normal-star.svg";
import ellipseIcon from "@/assets/images/icon-ellipse.svg";
import locationIcon from "@/assets/images/icon-location.svg";
import houseIcon from "@/assets/images/icon-nav-apartments.svg";

export default function AgentsCard() {
  return (
    <div>
      {/* number of agents available */}
      <p className="text-[14px]">14 agents found</p>

      <div className="flex items-center justify-center mt-2 gap-1 sm:gap-4 flex-wrap">
        <div className="rounded-xl py-2 px-3 flex flex-col gap-4 border border-bg-accent agent-card w-40">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 h-[36px]">
              <img
                src={agentAvatar}
                alt=""
                className="min-w-7.5 w-7.5 h-7.5 object-cover rounded-full"
              />

              <p className="text-[12px] font-semibold line-clamp-2">
                Maryann Kikomu
              </p>
            </div>

            <p className="text-[12px] leading-4 line-clamp-1">
              Luxury Properties Limited
            </p>

            <div className="bg-bg-accent flex items-center gap-0.5 py-0.5 px-1 rounded-lg justify-center w-fit">
              <img src={verifiedIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4">Verified</p>
            </div>

            {/* ratings */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={starIcon} alt="" />
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-1">
                <p>4.5</p>
                <img src={ellipseIcon} alt="" />
                <p>140 reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* location */}
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-1">
                <img src={houseIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  12 active listngs
                </p>
              </div>
            </div>
          </div>

          {/* view profile */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg w-full">
            View Profile
          </button>
        </div>

        <div className="rounded-xl py-2 px-3 flex flex-col gap-4 border border-bg-accent agent-card w-40">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 h-[36px]">
              <img
                src={agentAvatar}
                alt=""
                className="min-w-7.5 w-7.5 h-7.5 object-cover rounded-full"
              />

              <p className="text-[12px] font-semibold line-clamp-2">
                Maryann Kikomu
              </p>
            </div>

            <p className="text-[12px] leading-4 line-clamp-1">
              Luxury Properties Limited
            </p>

            <div className="bg-bg-accent flex items-center gap-0.5 py-0.5 px-1 rounded-lg justify-center w-fit">
              <img src={verifiedIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4">Verified</p>
            </div>

            {/* ratings */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={starIcon} alt="" />
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-1">
                <p>4.5</p>
                <img src={ellipseIcon} alt="" />
                <p>140 reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* location */}
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-1">
                <img src={houseIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  12 active listngs
                </p>
              </div>
            </div>
          </div>

          {/* view profile */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg w-full">
            View Profile
          </button>
        </div>
        <div className="rounded-xl py-2 px-3 flex flex-col gap-4 border border-bg-accent agent-card w-40">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 h-[36px]">
              <img
                src={agentAvatar}
                alt=""
                className="min-w-7.5 w-7.5 h-7.5 object-cover rounded-full"
              />

              <p className="text-[12px] font-semibold line-clamp-2">
                Maryann Kikomu
              </p>
            </div>

            <p className="text-[12px] leading-4 line-clamp-1">
              Luxury Properties Limited
            </p>

            <div className="bg-bg-accent flex items-center gap-0.5 py-0.5 px-1 rounded-lg justify-center w-fit">
              <img src={verifiedIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4">Verified</p>
            </div>

            {/* ratings */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={starIcon} alt="" />
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-1">
                <p>4.5</p>
                <img src={ellipseIcon} alt="" />
                <p>140 reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* location */}
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-1">
                <img src={houseIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  12 active listngs
                </p>
              </div>
            </div>
          </div>

          {/* view profile */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg w-full">
            View Profile
          </button>
        </div>
        <div className="rounded-xl py-2 px-3 flex flex-col gap-4 border border-bg-accent agent-card w-40">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 h-[36px]">
              <img
                src={agentAvatar}
                alt=""
                className="min-w-7.5 w-7.5 h-7.5 object-cover rounded-full"
              />

              <p className="text-[12px] font-semibold line-clamp-2">
                Maryann Kikomu
              </p>
            </div>

            <p className="text-[12px] leading-4 line-clamp-1">
              Luxury Properties Limited
            </p>

            <div className="bg-bg-accent flex items-center gap-0.5 py-0.5 px-1 rounded-lg justify-center w-fit">
              <img src={verifiedIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4">Verified</p>
            </div>

            {/* ratings */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={starIcon} alt="" />
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-1">
                <p>4.5</p>
                <img src={ellipseIcon} alt="" />
                <p>140 reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* location */}
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-1">
                <img src={houseIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  12 active listngs
                </p>
              </div>
            </div>
          </div>

          {/* view profile */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg w-full">
            View Profile
          </button>
        </div>
        <div className="rounded-xl py-2 px-3 flex flex-col gap-4 border border-bg-accent agent-card w-40">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 h-[36px]">
              <img
                src={agentAvatar}
                alt=""
                className="min-w-7.5 w-7.5 h-7.5 object-cover rounded-full"
              />

              <p className="text-[12px] font-semibold line-clamp-2">
                Maryann Kikomu
              </p>
            </div>

            <p className="text-[12px] leading-4 line-clamp-1">
              Luxury Properties Limited
            </p>

            <div className="bg-bg-accent flex items-center gap-0.5 py-0.5 px-1 rounded-lg justify-center w-fit">
              <img src={verifiedIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4">Verified</p>
            </div>

            {/* ratings */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={yellowStar} alt="" />
                <img src={starIcon} alt="" />
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-1">
                <p>4.5</p>
                <img src={ellipseIcon} alt="" />
                <p>140 reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* location */}
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-1">
                <img src={houseIcon} alt="" />
                <p className="text-[14px] text-text-secondary">
                  12 active listngs
                </p>
              </div>
            </div>
          </div>

          {/* view profile */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg w-full">
            View Profile
          </button>
        </div>
      </div>

      <p className="bg-bg-accent font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg p-2 w-fit mx-auto mt-8">
        Load More...
      </p>
    </div>
  );
}
