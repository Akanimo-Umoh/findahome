import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import ninIcon from "@/assets/images/icon-cardholder.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import yellowStar from "@/assets/images/icon-yellow-star.svg";
import starIcon from "@/assets/images/icon-normal-star.svg";
import locationIcon from "@/assets/images/icon-location.svg";
import houseIcon from "@/assets/images/icon-building.svg";
import ActiveListings from "./ActiveListings";
import AgentReviews from "./AgentReviews";

export default function AgentProfile() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative mx-6">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Agents Details
        </p>
      </div>

      {/* agent details */}
      <main className="mt-6">
        <section className="space-y-4 px-6">
          <div className="flex items-center gap-4">
            <img
              src={agentAvatar}
              alt=""
              className="w-[73px] h-20 rounded-lg object-cover"
            />

            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-semibold">Maryann Kikomu</p>
              <div className="flex items-center gap-1">
                <img src={ninIcon} alt="" className="w-4 h-4" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  NIN Verified Agent
                </p>
              </div>
              <p className="text-[12px] leading-4">Luxury Properties Limited</p>

              <div className="flex items-center">
                <div className="flex items-center gap-1">
                  <img src={yellowStar} alt="" />
                  <img src={yellowStar} alt="" />
                  <img src={yellowStar} alt="" />
                  <img src={yellowStar} alt="" />
                  <img src={starIcon} alt="" />
                </div>

                <p className="text-[12px] leading-4 text-text-secondary">
                  (140 reviews)
                </p>
              </div>
            </div>
          </div>

          <div className="text-[12px] leading-4 text-text-secondary flex items-center gap-2">
            <div className="flex items-center gap-1">
              <img src={locationIcon} alt="" />
              <p>Lagos, Nigeria</p>
            </div>

            <div className="flex items-center gap-1">
              <img src={houseIcon} alt="" />
              <p>12 active listngs</p>
            </div>
          </div>
        </section>

        {/* about section */}
        <section className="mt-2 px-6">
          <div className="flex flex-col gap-1">
            <p>About Maryann</p>
            <p className="text-[12px] leading-4 text-text-secondary">
              With over 8 years of experience in Lagos real estate, I specialize
              in luxury residential properties and investment opportunities. I'm
              passionate about helping clients find their perfect home while
              ensuring secure, transparent transactions through FindaHome's
              escrow platform.
            </p>
          </div>

          {/* experience */}
          <div className="flex items-center justify-between gap-2.5 mt-4">
            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Experience</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                3+ Years
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Languages</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                English, Yoruba, Igbo
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Service Areas</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Lekki, Ikoyi, VI, Ajah
              </p>
            </div>
          </div>
        </section>

        {/* active listings */}
        <section className="mt-6">
          <ActiveListings />
        </section>

        {/* reviews */}
        <section className="mt-6 mx-6">
          <AgentReviews />
        </section>
      </main>
    </div>
  );
}
