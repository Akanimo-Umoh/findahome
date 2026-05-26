import agentAvatar from "@/assets/images/agentAvatar.jpg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"
import ellipseIcon from "@/assets/images/icon-ellipse.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import houseIcon from "@/assets/images/icon-nav-apartments.svg"

export default function AgentsCard() {
  return (
    <div>
      {/* number of agents available */}
      <p className="text-[14px]">14 agents found</p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-1 sm:gap-4">
        <div className="agent-card flex w-40 flex-col gap-4 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-[36px] items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="h-7.5 w-7.5 min-w-7.5 rounded-full object-cover"
              />

              <p className="line-clamp-2 text-[12px] font-semibold">
                Maryann Kikomu
              </p>
            </div>

            <p className="line-clamp-1 text-[12px] leading-4">
              Luxury Properties Limited
            </p>

            <div className="flex w-fit items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
              <img src={verifiedIcon} alt="" className="h-4 w-4" />
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

              <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
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
          <button className="h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            View Profile
          </button>
        </div>

        <div className="agent-card flex w-40 flex-col gap-4 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-[36px] items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="h-7.5 w-7.5 min-w-7.5 rounded-full object-cover"
              />

              <p className="line-clamp-2 text-[12px] font-semibold">
                Maryann Kikomu
              </p>
            </div>

            <p className="line-clamp-1 text-[12px] leading-4">
              Luxury Properties Limited
            </p>

            <div className="flex w-fit items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
              <img src={verifiedIcon} alt="" className="h-4 w-4" />
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

              <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
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
          <button className="h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            View Profile
          </button>
        </div>
        <div className="agent-card flex w-40 flex-col gap-4 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-[36px] items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="h-7.5 w-7.5 min-w-7.5 rounded-full object-cover"
              />

              <p className="line-clamp-2 text-[12px] font-semibold">
                Maryann Kikomu
              </p>
            </div>

            <p className="line-clamp-1 text-[12px] leading-4">
              Luxury Properties Limited
            </p>

            <div className="flex w-fit items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
              <img src={verifiedIcon} alt="" className="h-4 w-4" />
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

              <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
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
          <button className="h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            View Profile
          </button>
        </div>
        <div className="agent-card flex w-40 flex-col gap-4 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-[36px] items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="h-7.5 w-7.5 min-w-7.5 rounded-full object-cover"
              />

              <p className="line-clamp-2 text-[12px] font-semibold">
                Maryann Kikomu
              </p>
            </div>

            <p className="line-clamp-1 text-[12px] leading-4">
              Luxury Properties Limited
            </p>

            <div className="flex w-fit items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
              <img src={verifiedIcon} alt="" className="h-4 w-4" />
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

              <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
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
          <button className="h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            View Profile
          </button>
        </div>
        <div className="agent-card flex w-40 flex-col gap-4 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-[36px] items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="h-7.5 w-7.5 min-w-7.5 rounded-full object-cover"
              />

              <p className="line-clamp-2 text-[12px] font-semibold">
                Maryann Kikomu
              </p>
            </div>

            <p className="line-clamp-1 text-[12px] leading-4">
              Luxury Properties Limited
            </p>

            <div className="flex w-fit items-center justify-center gap-0.5 rounded-lg bg-bg-accent px-1 py-0.5">
              <img src={verifiedIcon} alt="" className="h-4 w-4" />
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

              <div className="flex items-center gap-1 text-[12px] leading-4 text-text-secondary">
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
          <button className="h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            View Profile
          </button>
        </div>
      </div>

      <p className="mx-auto mt-8 w-fit rounded-lg bg-bg-accent p-2 font-raleway text-[14px] font-semibold tracking-[1px]">
        Load More...
      </p>
    </div>
  )
}
