import imgMessages from "@/assets/images/img-chats-messages.png";

export default function NoChats() {
  return (
    <div className="flex flex-col gap-5 h-full items-center justify-center mt-14">
      <img src={imgMessages} alt="" className="w-38 h-30.5" />

      <div className="flex flex-col items-center justify-center gap-1 w-56.5 text-center">
        <p className="font-raleway txt-[14px] tracking-[1px] text-text-primary font-semibold">
          No active chat yet.
        </p>
        <p className="text-[12px] leading-4 text-text-secondary">
          Once you connect with an agent, your conversations will appear here.
        </p>
      </div>
    </div>
  );
}
