import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAgentListings, type AgentListing } from "@/hooks/useAgentListings"
import Spinner from "@/components/Spinner"
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg"

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
  const { listings, isLoading, error } = useAgentListings()

  const activeListings = listings.filter(
    (listing) => listing.status === "approved"
  )

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

          {!isLoading && !error && activeListings.length === 0 && (
            <p className="py-10 text-center text-[14px] text-text-secondary">
              You don't have any active listings yet.
            </p>
          )}

          {!isLoading && !error && activeListings.length > 0 && (
            <div className="flex flex-col gap-3">
              {activeListings.map((property) => (
                <button
                  key={property._id}
                  type="button"
                  onClick={() => handleSelect(property)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-bg-accent p-2 text-left transition-colors hover:border-button-bg"
                >
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 shrink-0 rounded-lg bg-bg-accent" />
                  )}

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
