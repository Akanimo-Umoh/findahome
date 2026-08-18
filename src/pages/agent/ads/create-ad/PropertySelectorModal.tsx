import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAgentListings, type AgentListing } from "@/hooks/useAgentListings"
import Spinner from "@/components/Spinner"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useAgentAds } from "@/hooks/useAgentAds"

type PropertySelectorModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (property: AgentListing) => void
}

export default function PropertySelectorModal({
  isOpen,
  onClose,
  onSelect,
}: PropertySelectorModalProps) {
  const {
    listings,
    isLoading: isLoadingListings,
    error: listingsError,
  } = useAgentListings()
  const { ads, isLoading: isLoadingAds } = useAgentAds()

  const isLoading = isLoadingListings || isLoadingAds
  const error = listingsError

  // properties that already have a non-completed/non-rejected ad running
  // (i.e. still occupying the "one active ad per property" slot)
  const advertisedPropertyIds = new Set(
    ads
      .filter(
        (ad) =>
          ad.status === "pending" ||
          ad.status === "active" ||
          ad.status === "paused"
      )
      .map((ad) => ad.property._id)
  )

  const approvedListings = listings.filter(
    (listing) => listing.status === "approved"
  )

  const eligibleListings = approvedListings.filter(
    (listing) => !advertisedPropertyIds.has(listing._id)
  )

  const hasNoApprovedListings = approvedListings.length === 0
  const allListingsAlreadyAdvertised =
    approvedListings.length > 0 && eligibleListings.length === 0

  const handleSelect = (property: AgentListing) => {
    onSelect(property)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[80vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
        <DialogTitle className="px-6 pt-3 font-raleway text-[16px] font-semibold tracking-[1px]">
          Select a Property
        </DialogTitle>

        <div className="mt-4 flex-1 overflow-y-auto px-6 pb-6">
          {isLoading && (
            <div className="py-10">
              <Spinner />
            </div>
          )}

          {error && (
            <p className="py-10 text-center text-[14px] text-text-secondary">
              {error}
            </p>
          )}

          {!isLoading && !error && hasNoApprovedListings && (
            <p className="py-10 text-center text-[14px] text-text-secondary">
              You don't have any active listings yet.
            </p>
          )}

          {!isLoading && !error && allListingsAlreadyAdvertised && (
            <p className="py-10 text-center text-[14px] text-text-secondary">
              All your listings already have an ad running. Pause or finish an
              existing campaign to advertise a different property.
            </p>
          )}

          {!isLoading && !error && eligibleListings.length > 0 && (
            <div className="flex flex-col gap-3">
              {eligibleListings.map((property) => (
                <button
                  key={property._id}
                  type="button"
                  onClick={() => handleSelect(property)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-bg-accent p-2 text-left transition-colors hover:border-button-bg"
                >
                  <img
                    src={property.images?.[0]}
                    alt={property.title}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-[13px] font-semibold">
                      {property.title}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-text-secondary">
                      {property.address}
                    </p>
                    <p className="mt-0.5 flex items-center text-[12px] font-semibold text-button-bg">
                      <img src={nairaIcon} alt="" className="h-3 w-3" />
                      {property.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
