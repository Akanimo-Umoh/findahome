import verifiedIcon from "@/assets/images/icon-verified-green.svg";

export default function EscrowProtectionTerms() {
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

  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary h-screen">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center px-6">
        <div className="text-text-primary py-10 flex flex-col items-center justify-center bg-white w-full max-w-83">
          <div className="flex flex-col items-center justify-center gap-4 w-73.5">
            <div className="flex flex-col gap-2">
              <p>Escrow Protection Terms</p>

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
