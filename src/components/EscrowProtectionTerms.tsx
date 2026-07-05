import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

type EscrowProtectionTermsProps = {
  isOpen: boolean
  onClose: () => void
}

const terms = [
  "Funds held securely until both parties confirm successful handover",
  "Full refund if property conditions are not met",
  "24/7 dispute resolution support available",
  "Legal documentation verified before release",
  "Full refund if property conditions are not met",
]

const notes = [
  "Funds will be released within 24 hours of confirmed handover",
  "Any disputes must be reported within 48 hours",
  "Transaction cannot be cancelled after handover confirmation",
]

export default function EscrowProtectionTerms({
  isOpen,
  onClose,
}: EscrowProtectionTermsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-48px)] max-w-[665px] gap-0 rounded-2xl px-6 py-8 font-ssPro text-text-primary sm:px-10 sm:py-10">
        <DialogTitle className="font-raleway text-[16px] font-semibold tracking-[1px]">
          Escrow Protection Terms
        </DialogTitle>

        <div className="mt-4 flex flex-col gap-4">
          {/* protection */}
          <section className="rounded-xl bg-bg-accent p-3">
            <p className="mb-3 text-[14px] font-medium">Your Protection</p>
            <ul className="space-y-2">
              {terms.map((term, index) => (
                <li key={index} className="flex items-start gap-2">
                  <img
                    src={verifiedIcon}
                    alt=""
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                  <span className="text-[12px] leading-5 text-text-secondary">
                    {term}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* important notes */}
          <section className="rounded-xl border border-bg-accent bg-[#FAF3E0] p-3">
            <p className="mb-3 text-[14px] font-medium">Important Notes</p>
            <ul className="list-disc space-y-2 pl-5">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="text-[12px] leading-5 text-text-secondary"
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
