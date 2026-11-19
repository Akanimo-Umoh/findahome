import chatIcon from "@/assets/images/icon-chat.svg"
import Avatar from "@/components/Avatar"

interface VisitAgentDetailsProps {
  name: string
  isVerified?: boolean
  avatar?: string | null
  onChat?: () => void
}

export default function VisitAgentDetails({
  name,
  isVerified = false,
  avatar,
  onChat,
}: VisitAgentDetailsProps) {
  return (
    <div className="space-y-2 rounded-xl border border-bg-accent p-2">
      <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
        Your Agent
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* the shared Avatar falls back to initials when the picture is
              missing or fails to load, instead of a broken-image icon */}
          <Avatar
            name={name}
            src={avatar}
            size="custom"
            className="h-12.5 w-12.5 font-raleway text-[18px] md:h-25 md:w-25"
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
