import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import closeIcon from "@/assets/images/closeMenu.svg"
import { useEffect, useRef } from "react"

type EscrowProtectionTermsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EscrowProtectionTerms({
  isOpen,
  onClose,
}: EscrowProtectionTermsProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

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
    if (!isOpen) return

    document.body.style.overflow = "hidden"

    // 👇 move focus into modal
    setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key === "Tab") {
        const modal = modalRef.current
        if (!modal) return

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (focusableElements.length === 0) return

        // Shift + Tab
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }

        // Tab forward
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="escrow-protection-title"
      className="fixed inset-0 z-50 h-screen bg-black/40 p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center pt-10 md:items-center md:pt-0">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[665px] rounded-2xl bg-white px-6 py-8 text-text-primary shadow-xl sm:px-10 sm:py-10"
        >
          <div className="mx-auto flex w-full max-w-[308px] flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2
                id="escrow-protection-title"
                className="font-raleway text-[16px] font-semibold tracking-[1px]"
              >
                Escrow Protection Terms
              </h2>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="cursor-pointer"
              >
                <img
                  src={closeIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              {/* Protection */}
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
                        {term.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Notes */}
              <section className="rounded-xl border border-bg-accent bg-[#FAF3E0] p-3">
                <p className="mb-3 text-[14px] font-medium">Important Notes</p>

                <ul className="list-disc space-y-2 pl-5">
                  {notes.map((note, index) => (
                    <li
                      key={index}
                      className="text-[12px] leading-5 text-text-secondary"
                    >
                      {note.text}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
