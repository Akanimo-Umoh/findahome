import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import ninIcon from "@/assets/images/icon-cardholder.svg"
import yellowStar from "@/assets/images/icon-yellow-star.svg"
import starIcon from "@/assets/images/icon-normal-star.svg"
import locationIcon from "@/assets/images/icon-location.svg"
import houseIcon from "@/assets/images/icon-building.svg"
import PageHeader from "@/components/shared/PageHeader"
import StarRatingDisplay from "@/components/shared/StarRatingDisplay"
import Spinner from "@/components/Spinner"
import ReviewOverlay from "@/components/agent-profile/ReviewOverlay"
import AgentReviews from "@/components/agent-profile/AgentReviews"
import ActiveListings from "@/components/agent-profile/ActiveListings"
import { useAuthContext } from "@/context/AuthContext"
import {
  useAgentProfile,
  useAgentListingsQuery,
  useAgentReviews,
  useEligibleDeals,
} from "@/hooks/useAgentDirectory"

import { getAgentAvatar } from "@/lib/agents"
import type { AgentReview } from "@/services/rating.service"
import Avatar from "@/components/Avatar"

const propertyIdOf = (r: AgentReview) =>
  typeof r.property === "string" ? r.property : (r.property?._id ?? "")
const userIdOf = (r: AgentReview) =>
  typeof r.user === "string" ? r.user : r.user?._id

export default function AgentProfile() {
  const { agentId = "" } = useParams()
  const { user } = useAuthContext()
  const { agent, isLoading } = useAgentProfile(agentId)
  const { listings } = useAgentListingsQuery(agentId)
  const { reviews, averageRating, totalRatings } = useAgentReviews(agentId)

  // rating is only for logged-in buyers who have a paid deal with this agent
  const isBuyer = user?.role === "user"
  const { deals } = useEligibleDeals(agentId, isBuyer)
  const canRate = isBuyer && deals.length > 0

  const [reviewOpen, setReviewOpen] = useState(false)
  const [initialRating, setInitialRating] = useState(0)
  const [initialPropertyId, setInitialPropertyId] = useState<
    string | undefined
  >()
  const [hoverRating, setHoverRating] = useState(0)

  const existingReviews = useMemo(() => {
    const mine = reviews.filter((r) => userIdOf(r) === user?._id)
    return Object.fromEntries(
      mine.map((r) => [
        propertyIdOf(r),
        { rating: r.rating, comment: r.comment },
      ])
    )
  }, [reviews, user?._id])

  if (isLoading) return <Spinner />

  if (!agent) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this agent.
        </p>
      </div>
    )
  }

  const avatar = getAgentAvatar(agent.profilePicture)
  const firstName = agent.name.split(" ")[0]
  const location = agent.officeAddress || agent.serviceArea[0]
  const listingsLabel = `${listings.length} active listing${listings.length === 1 ? "" : "s"}`

  const openReview = (rating: number, propertyId?: string) => {
    setInitialRating(rating)
    setInitialPropertyId(propertyId)
    setReviewOpen(true)
  }

  const details = (
    <>
      {location && (
        <div className="flex items-center gap-1">
          <img src={locationIcon} alt="" />
          <p>{location}</p>
        </div>
      )}
      <div className="flex items-center gap-1">
        <img src={houseIcon} alt="" />
        <p>{listingsLabel}</p>
      </div>
    </>
  )

  return (
    <div className="mb-10 text-text-primary md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-6 md:mx-0">
          <PageHeader title="Agents Details" responsive />
        </div>

        <main className="mt-6">
          <section className="mx-6 space-y-4 md:mx-0">
            <div className="flex gap-4 md:gap-6">
              <Avatar
                name={agent.name}
                src={avatar}
                size="custom"
                className="h-20 w-18.25 rounded-lg md:h-37.5 md:w-37.5"
              />

              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-semibold">{agent.name}</p>

                {agent.isVerified && (
                  <div className="flex items-center gap-1">
                    <img src={ninIcon} alt="" className="h-4 w-4" />
                    <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                      NIN Verified Agent
                    </p>
                  </div>
                )}

                {agent.businessName && (
                  <p className="text-[12px] leading-4 md:text-[14px] md:leading-5.25">
                    {agent.businessName}
                  </p>
                )}

                <div className="flex items-center gap-1">
                  <StarRatingDisplay rating={averageRating} size="h-4 w-4" />
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {totalRatings > 0
                      ? `(${totalRatings} review${totalRatings === 1 ? "" : "s"})`
                      : "(No reviews yet)"}
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-[12px] leading-4 text-text-secondary md:flex md:text-[14px] md:leading-5.25">
                  {details}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[12px] leading-4 text-text-secondary md:hidden">
              {details}
            </div>
          </section>

          <section className="mx-6 mt-2 md:mx-0 md:mt-4">
            <div className="flex flex-col gap-1">
              <p>About {firstName}</p>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                {agent.about || "This agent hasn't added a bio yet."}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-2.5 md:gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Experience</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  {agent.yearsOfExperience > 0
                    ? `${agent.yearsOfExperience}+ Years`
                    : "—"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Languages</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  {agent.languages.join(", ") || "—"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] md:text-[16px]">Service Areas</p>
                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                  {agent.serviceArea.join(", ") || "—"}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-8">
            <ActiveListings agentId={agentId} listings={listings} />
          </section>

          {canRate && (
            <section className="mx-6 mt-6 md:mx-0">
              <p className="text-[14px]">Rate this agent</p>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, index) => {
                  const starIndex = index + 1
                  return (
                    <button
                      key={starIndex}
                      onClick={() => openReview(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="cursor-pointer"
                    >
                      <img
                        src={starIndex <= hoverRating ? yellowStar : starIcon}
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
                onClick={() => openReview(0)}
                className="cursor-pointer text-[12px] leading-4 text-button-bg"
              >
                Write a review
              </button>
            </section>
          )}

          <section className="mx-6 mt-6 md:mx-0">
            <AgentReviews
              reviews={reviews}
              currentUserId={user?._id}
              onEdit={(review) =>
                openReview(review.rating, propertyIdOf(review))
              }
            />
          </section>
        </main>

        {canRate && (
          <ReviewOverlay
            open={reviewOpen}
            onOpenChange={setReviewOpen}
            agentId={agentId}
            agentName={agent.name}
            agentAvatar={avatar}
            isVerified={agent.isVerified}
            deals={deals}
            existingReviews={existingReviews}
            initialRating={initialRating}
            initialPropertyId={initialPropertyId}
          />
        )}
      </div>
    </div>
  )
}
