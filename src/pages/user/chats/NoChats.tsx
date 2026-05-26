import imgMessages from "@/assets/images/img-chats-messages.png"

export default function NoChats() {
  return (
    <div className="mt-14 flex h-full flex-col items-center justify-center gap-5">
      <img src={imgMessages} alt="" className="h-30.5 w-38" />

      <div className="flex w-56.5 flex-col items-center justify-center gap-1 text-center">
        <p className="txt-[14px] font-raleway font-semibold tracking-[1px] text-text-primary">
          No active chat yet.
        </p>
        <p className="text-[12px] leading-4 text-text-secondary">
          Once you connect with an agent, your conversations will appear here.
        </p>
      </div>
    </div>
  )
}
