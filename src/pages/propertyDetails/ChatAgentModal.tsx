import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAuthContext } from "@/context/AuthContext"
import { useCreateOrGetChat } from "@/hooks/useCreateOrGetChat"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

type ChatAgentModalProps = {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  agentId: string
  agentIsVerified?: boolean
}

const TERMS = [
  "FindaHome will never ask for your personal banking details in the chat.",
  "Avoid making direct payments to agents.",
  "Inspection fees are fixed and paid only through the FindaHome system.",
  "Verify the agent's identity — only chat with agents that have the NIN verification badge.",
  "Keep all communications within FindaHome — avoid external links, calls, or messages until payment and inspection are verified.",
  'Report suspicious behavior immediately using the "Report Agent" option in chat.',
  "Be respectful and professional — FindaHome promotes safe, transparent communication between buyers and agents.",
]

export default function ChatAgentModal({
  isOpen,
  onClose,
  propertyId,
  agentId,
}: ChatAgentModalProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuthContext()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { createOrGetChat, isCreating } = useCreateOrGetChat()

  const redirectToLogin = () => {
    onClose()
    toast.error("Please log in to chat with an agent")
    navigate("/login", { state: { from: location.pathname } })
  }

  // catch the case where the modal is opened while logged out
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      redirectToLogin()
    }
  }, [isOpen, isAuthenticated])

  const handleContinueToChat = async () => {
    // in case auth state changes mid-modal(e.g token expired)
    if (!isAuthenticated) {
      redirectToLogin()
      return
    }

    try {
      const chatId = await createOrGetChat(propertyId, agentId)
      if (!chatId) return
      onClose()
      navigate(`/messages/${chatId}`)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        redirectToLogin()
        return
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-48px)] flex-col gap-0 rounded-2xl p-0 font-ssPro text-text-primary">
        <DialogTitle className="sr-only">
          Before you chat with an agent
        </DialogTitle>

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <div className="text-center">
            <p className="font-raleway text-[14px] font-semibold text-text-primary md:text-[22px] md:tracking-[1px]">
              Before you chat with an agent
            </p>
            <p className="mt-1 text-[12px] text-black md:text-[14px]">
              Please read these important points carefully before starting your
              conversation:
            </p>
          </div>

          <ul className="mt-4 flex list-disc flex-col justify-center gap-3 pl-6 text-[12px] text-text-secondary md:mt-6 md:text-[14px]">
            {TERMS.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
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
              className="cursor-pointer text-[12px] font-semibold text-black md:text-[14px]"
            >
              I have read and understand these tips
            </label>
          </div>
        </div>

        {/* sticky button */}
        <div className="shrink-0 px-6 py-6">
          <Button
            variant="app-primary"
            size="full"
            onClick={handleContinueToChat}
            disabled={!acceptedTerms || isCreating}
            className="text-[14px] font-semibold tracking-[1px]"
          >
            {isCreating ? "Starting chat..." : "Continue to chat"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
