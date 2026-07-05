import agentAvatar from "@/assets/images/agentAvatar.jpg"
import chatIcon from "@/assets/images/icon-chat.svg"

interface VisitAgentDetailsProps {
  name: string
  isVerified?: boolean
  avatar?: string
  onChat?: () => void
}

export default function VisitAgentDetails({
  name,
  isVerified = false,
  avatar = agentAvatar,
  onChat,
}: VisitAgentDetailsProps) {
  return (
    <div className="space-y-2 rounded-xl border border-bg-accent p-2">
      <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
        Your Agent
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt=""
            className="h-12.5 w-12.5 shrink-0 rounded-full object-cover md:h-25 md:w-25"
          />
          <div>
            <p className="line-clamp-2 text-[12px] font-semibold md:text-[14px]">
              {name}
            </p>
            {isVerified && (
              <p className="text-[12px] md:text-[14px]">Verified Agent</p>
            )}
          </div>
        </div>
        <button
          onClick={onChat}
          className="button-style flex shrink-0 items-center justify-center gap-2 rounded-lg p-2"
        >
          <img src={chatIcon} alt="" />
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white md:text-[16px]">
            Chat
          </p>
        </button>
      </div>
    </div>
  )
}
