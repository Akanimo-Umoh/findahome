import { useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, SearchX } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Skeleton from "@/components/ui/Skeleton"
import ReviewDialog, { type ReviewAction } from "../shared/ReviewDialog"
import { useFlagProperty, useReviewProperty } from "../shared/useModeration"
import AdminNotes from "./components/AdminNotes"
import AgentCard from "./components/AgentCard"
import DetailsHeader from "./components/DetailsHeader"
import FactTiles from "./components/FactTiles"
import LegalDocuments from "./components/LegalDocuments"
import MediaGallery from "./components/MediaGallery"
import ModerationChecklist from "./components/ModerationChecklist"
import StatusTimeline from "./components/StatusTimeline"
import VideoTour from "./components/VideoTour"
import { usePropertyDetails } from "./usePropertyDetails"

export default function PropertyDetails() {
  const { propertyId } = useParams<{ propertyId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [action, setAction] = useState<ReviewAction | null>(null)

  const { property, agent, agentListings } = usePropertyDetails(propertyId)
  const reviewMutation = useReviewProperty()
  const flagMutation = useFlagProperty()

  // Back keeps the list's search / filters / page; a direct visit falls back to the list
  const goBack = () =>
    location.key !== "default" ? navigate(-1) : navigate("/admin/properties")

  const BackButton = (
    <button
      type="button"
      onClick={goBack}
      className="flex w-fit cursor-pointer items-center gap-2 rounded-lg py-1 pr-2 text-[14px] font-semibold text-text-primary outline-none hover:text-button-bg focus-visible:ring-2 focus-visible:ring-button-bg/40"
    >
      <ArrowLeft size={17} aria-hidden />
      Back to Listings
    </button>
  )

  if (property.isError || (!property.isLoading && !property.data)) {
    return (
      <div className="space-y-5">
        {BackButton}
        <div className="mx-auto flex max-w-sm flex-col items-center py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <SearchX size={22} aria-hidden />
          </span>
          <h2 className="mt-4 font-raleway text-[18px] font-bold text-text-primary">
            Listing not found
          </h2>
          <p className="mt-1 text-[14px] text-text-secondary">
            It may have been deleted.
          </p>
          <Link
            to="/admin/properties"
            className="mt-4 text-[14px] font-semibold text-button-bg underline-offset-4 hover:underline"
          >
            See all listings
          </Link>
        </div>
      </div>
    )
  }

  const p = property.data

  if (!p) {
    return (
      <div className="space-y-5">
        {BackButton}
        <Skeleton className="h-32 rounded-xl" />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22.5rem]">
          <Skeleton className="aspect-16/10 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    )
  }

  const confirm = (reason?: string) => {
    if (!action) return
    const done = { onSuccess: () => setAction(null) }
    if (action === "approved" || action === "rejected") {
      reviewMutation.mutate({ id: p._id, status: action }, done)
    } else {
      flagMutation.mutate(
        { id: p._id, flagged: action === "flagged", reason },
        done
      )
    }
  }

  const listings = agentListings.data
  const images = p.images ?? []
  const videos = p.videos ?? []

  return (
    <div className="space-y-5">
      {BackButton}

      <DetailsHeader property={p} onAction={setAction} />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="min-w-0 space-y-5">
          <MediaGallery
            images={images}
            title={p.title}
            hasVideo={videos.length > 0}
          />
          <FactTiles property={p} />
          <VideoTour videos={videos} />
          <LegalDocuments documents={p.legalDocuments ?? []} />
          <AdminSection title="Description">
            <p className="text-[14px] leading-6 whitespace-pre-line text-text-primary">
              {p.description?.trim() || "The agent didn’t add a description."}
            </p>
          </AdminSection>
          <AdminNotes property={p} />
        </div>

        <aside className="min-w-0 space-y-5">
          <AgentCard
            owner={p.owner}
            agent={agent.data}
            loading={agent.isLoading}
            totalListings={listings?.length}
            activeListings={
              listings?.filter((l) => l.status === "approved").length
            }
          />
          <StatusTimeline property={p} />
          <ModerationChecklist />
        </aside>
      </div>

      {action && (
        <ReviewDialog
          action={action}
          propertyTitle={p.title}
          pending={reviewMutation.isPending || flagMutation.isPending}
          onConfirm={confirm}
          onClose={() => setAction(null)}
        />
      )}
    </div>
  )
}
