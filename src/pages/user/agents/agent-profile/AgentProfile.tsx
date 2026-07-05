import ninIcon from "@/assets/images/icon-cardholder.svg"
import agentAvatar from "@/assets/images/agentAvatar.jpg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import houseIcon from "@/assets/images/icon-building.svg"
// import ActiveListings from "./ActiveListings"
// import AgentReviews from "./AgentReviews"
import { useState } from "react"
// import ReviewOverlay from "./ReviewOverlay"
import PageHeader from "@/components/shared/PageHeader"
import ReviewOverlay from "@/components/agent-profile/ReviewOverlay"
import AgentReviews from "@/components/agent-profile/AgentReviews"
import ActiveListings from "@/components/agent-profile/ActiveListings"

export default function AgentProfile() {
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleStarClick = (star: number) => {
    setRating(star)
    setReviewOpen(true)
  }

  const handleWriteReview = () => {
    setRating(0)
    setReviewOpen(true)
  }

  return (
    <div className="mb-10 text-text-primary md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="mx-6 md:mx-0">
          <PageHeader title="Agents Details" responsive />
        </div>

        {/* agent details */}
        <main className="mt-6">
          <section className="mx-6 space-y-4 md:mx-0">
            <div className="flex gap-4 md:gap-6">
              <img
                src={agentAvatar}
                alt=""
                className="h-20 w-18.25 rounded-lg object-cover md:h-37.5 md:w-37.5"
              />

              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-semibold">Maryann Kikomu</p>

                <div className="flex items-center gap-1">
                  <img src={ninIcon} alt="" className="h-4 w-4" />

                  <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                    NIN Verified Agent
                  </p>
                </div>

                <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                  Luxury Properties Limited
                </p>

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

                <div className="hidden items-center gap-2 text-[12px] leading-4 text-text-secondary md:flex md:text-[14px] md:leading-5.25">
                  <div className="flex items-center gap-1">
                    <img src={locationIcon} alt="" />
                    <p>Lagos, Nigeria</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src={houseIcon} alt="" />
                    <p>12 active listngs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[12px] leading-4 text-text-secondary md:hidden">
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
          <section className="mx-6 mt-2 md:mx-0 md:mt-4">
            <div className="flex flex-col gap-1">
              <p>About Maryann</p>

              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                With over 8 years of experience in Lagos real estate, I
                specialize in luxury residential properties and investment
                opportunities. I'm passionate about helping clients find their
                perfect home while ensuring secure, transparent transactions
                through FindaHome's escrow platform.
              </p>
            </div>

            {/* experience */}
            <div className="mt-4 flex items-center gap-2.5 md:gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Experience</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  3+ Years
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Languages</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  English, Yoruba, Igbo
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Service Areas</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  Lekki, Ikoyi, VI, Ajah
                </p>
              </div>
            </div>
          </section>

          {/* active listings */}
          <section className="mt-6 md:mt-8">
            <ActiveListings agentId="placeholder" />
          </section>

          {/* write a review */}
          <section className="mx-6 mt-6 md:mx-0">
            <p className="text-[14px]">Rate this agent</p>

            {/* clickable stars */}
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const starIndex = index + 1
                const isActive = starIndex <= hoverRating
                return (
                  <button
                    key={starIndex}
                    onClick={() => handleStarClick(starIndex)}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer"
                  >
                    <img
                      src={isActive ? yellowStar : starIcon}
                      alt={`${starIndex} star`}
                      className="h-6 w-6"
                    />
                  </button>
                )
              })}
            </div>

            <p className="text-[12px] leading-4 text-text-secondary">
              Tell others what you think
            </p>

            <button
              onClick={handleWriteReview}
              className="cursor-pointer text-[12px] leading-4 text-button-bg"
            >
              Write a review
            </button>
          </section>

          {/* reviews */}
          <section className="mx-6 mt-6 md:mx-0">
            <AgentReviews />
          </section>
        </main>

        <ReviewOverlay
          open={reviewOpen}
          onOpenChange={setReviewOpen}
          rating={rating}
          onRatingChange={setRating}
        />
      </div>
    </div>
  )
}
