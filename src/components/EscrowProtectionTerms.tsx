import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import closeIcon from "@/assets/images/closeMenu.svg";
import { useEffect } from "react";

type EscrowProtectionTermsProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
  ];

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
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary h-full flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="text-text-primary py-10 flex flex-col items-center justify-center bg-white w-full max-w-83 max-h-[80vh] absolute rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-4 w-73.5">
          {/* header — ADD close button */}
          <div className="flex items-center justify-between w-full">
            <p className="font-raleway font-semibold text-[16px] tracking-[1px] text-text-primary">
              Escrow Protection Terms
            </p>
            <button onClick={onClose} className="cursor-pointer shrink-0">
              <img src={closeIcon} alt="close" className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex flex-col gap-4">
            <div className="bg-bg-accent rounded-xl p-2 flex flex-col gap-1">
              <p className="text-[14px]">Your Protection</p>

              <div className="flex flex-col gap-2">
                {terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <img src={verifiedIcon} alt="" className="w-4 h-4" />
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {term.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF3E0] rounded-xl p-2 flex flex-col gap-1 border border-bg-accent">
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
  );
}
