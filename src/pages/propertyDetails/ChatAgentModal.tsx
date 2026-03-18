import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatAgentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
};

export default function ChatAgentModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  agentId,
  agentName,
}: ChatAgentModalProps) {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  // navigate to chat with property and agent info
  const handleContinueToChat = () => {
    onClose();
    navigate(`/chat?propertyId=${propertyId}&agentId=${agentId}`, {
      state: { propertyId, propertyTitle, agentId, agentName },
    });
  };

  return (
    <div className="fixed inset-0 z-50 modal-enter">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-white min-h-[40vh] rounded-t-[32px]">
        <div className="mx-6 my-7.5">
          <div className="font-raleway max-w-[281px] text-center mx-auto">
            <p className="text-[14px] font-semibold text-text-primary">
              Before you chat with an agent
            </p>
            <p className="text-[12px] text-black">
              Please read these important points carefully before starting your
              conversation:
            </p>
          </div>

          <div className="mt-4">
            <ul className="list-disc text-[12px] text-text-secondary mx-6 flex flex-col gap-3 items-center justify-center">
              <li>
                FindaHome will never ask for your personal banking details in
                the chat.
              </li>
              <li>
                Avoid making direct payments to agents. Always fund your escrow
                account inside the platform for security.
              </li>
              <li>
                Inspection fees are fixed and paid only through the FindaHome
                system.
              </li>
              <li>
                Verify the agent’s identity — only chat with agents that have
                the NIN verification badge.
              </li>
              <li>
                Keep all communications within FindaHome — avoid external links,
                calls, or messages until payment and inspection are verified.
              </li>
              <li>
                Report suspicious behavior immediately using the “Report Agent”
                option in chat
              </li>
              <li>
                Be respectful and professional — FindaHome promotes safe,
                transparent communication between buyers and agents.
              </li>
            </ul>

            <div className="mt-4 flex items-center justify-center py-1 px-4 gap-4">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-[14px] text-black font-semibold cursor-pointer"
              >
                I have read and understand these tips
              </label>
            </div>

            <button
              type="button"
              onClick={handleContinueToChat}
              disabled={!acceptedTerms}
              className="font-raleway font-semibold text-[14px] tracking-[1px] text-white h-[45px] rounded-lg flex items-center justify-center w-full mt-4 button-style"
            >
              Continue to chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
