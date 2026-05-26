import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import closeIcon from "@/assets/images/closeMenu.svg"
import { useEffect } from "react"

type EscrowProtectionTermsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EscrowProtectionTerms({
  isOpen,
  onClose,
}: EscrowProtectionTermsProps) {
  const terms = [
    {
      text: "Funds held securely until both parties confirm successful handover",
    },
    {
      text: "Full refund if property conditions are not met",
    },
    {
      text: "24/7 dispute resolution support available",
    },
    {
      text: "Legal documentation verified before release",
    },
    {
      text: "Full refund if property conditions are not met",
    },
  ]

  const notes = [
    {
      text: "Funds will be released within 24 hours of confirmed handover",
    },
    {
      text: "Any disputes must be reported within 48 hours",
    },
    {
      text: "Transaction cannot be cancelled after handover confirmation",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-enter fixed inset-0 z-50 flex h-full items-center justify-center font-ssPro text-text-primary">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute flex max-h-[80vh] w-full max-w-83 flex-col items-center justify-center rounded-2xl bg-white py-10 text-text-primary">
        <div className="flex w-73.5 flex-col items-center justify-center gap-4">
          {/* header — ADD close button */}
          <div className="flex w-full items-center justify-between">
            <p className="font-raleway text-[16px] font-semibold tracking-[1px] text-text-primary">
              Escrow Protection Terms
            </p>
            <button onClick={onClose} className="shrink-0 cursor-pointer">
              <img src={closeIcon} alt="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            <div className="flex flex-col gap-1 rounded-xl bg-bg-accent p-2">
              <p className="text-[14px]">Your Protection</p>

              <div className="flex flex-col gap-2">
                {terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <img src={verifiedIcon} alt="" className="h-4 w-4" />
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {term.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl border border-bg-accent bg-[#FAF3E0] p-2">
              <p className="text-[14px]">Important Notes</p>

              <div className="flex flex-col gap-2">
                {notes.map((note, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <ul className="list-disc pl-5">
                      <li className="text-[12px] leading-4 text-text-secondary">
                        {note.text}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
