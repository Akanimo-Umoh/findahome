import { useCreateOrGetChat } from "@/hooks/useCreateOrGetChat"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type ChatAgentModalProps = {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  agentId: string
  agentIsVerified?: boolean
}

export default function ChatAgentModal({
  isOpen,
  onClose,
  propertyId,
  agentId,
}: ChatAgentModalProps) {
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { createOrGetChat, isCreating } = useCreateOrGetChat()

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

  const handleContinueToChat = async () => {
    const chatId = await createOrGetChat(propertyId, agentId)
    if (!chatId) return
    onClose()
    navigate(`/messages/${chatId}`)
  }

  return (
    <div className="modal-enter fixed inset-0 z-50 md:flex md:items-center md:justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal — everything lives inside here */}
      <div className="absolute right-0 bottom-0 left-0 flex max-h-[90vh] flex-col rounded-t-[32px] bg-white md:relative md:mx-8 md:w-full md:max-w-200 md:rounded-2xl">
        {/* scrollable content */}
        <div className="mx-6 mt-6 flex-1 overflow-y-auto md:mx-auto md:max-w-124.5">
          <div className="mx-auto max-w-70.25 text-center font-raleway md:max-w-108 md:space-y-1">
            <p className="text-[14px] font-semibold text-text-primary md:text-[22px] md:tracking-[1px]">
              Before you chat with an agent
            </p>
            <p className="text-[12px] text-black">
              Please read these important points carefully before starting your
              conversation:
            </p>
          </div>

          <div className="mt-4 md:mt-10">
            <ul className="mx-6 flex list-disc flex-col justify-center gap-3 text-[12px] text-text-secondary md:text-[16px]">
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
                Verify the agent's identity — only chat with agents that have
                the NIN verification badge.
              </li>
              <li>
                Keep all communications within FindaHome — avoid external links,
                calls, or messages until payment and inspection are verified.
              </li>
              <li>
                Report suspicious behavior immediately using the "Report Agent"
                option in chat.
              </li>
              <li>
                Be respectful and professional — FindaHome promotes safe,
                transparent communication between buyers and agents.
              </li>
            </ul>

            <div className="mt-4 flex items-center justify-center gap-4 px-4 py-1 md:mt-6">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-6 w-6 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="cursor-pointer text-[14px] font-semibold text-black md:text-[16px]"
              >
                I have read and understand these tips
              </label>
            </div>
          </div>
        </div>

        {/* button — pinned inside modal, never scrolls */}
        <div className="mx-6 shrink-0 py-6">
          <button
            type="button"
            onClick={handleContinueToChat}
            disabled={!acceptedTerms || isCreating}
            className="button-style flex h-[45px] w-full items-center justify-center rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white disabled:opacity-50 md:mx-auto md:w-85.5"
          >
            {isCreating ? "Starting chat..." : "Continue to chat"}
          </button>
        </div>
      </div>
    </div>
  )
}
