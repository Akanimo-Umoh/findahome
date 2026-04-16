import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import iconOptions from "@/assets/images/icon-chat-options.svg";
import iconSearch from "@/assets/images/icon-messages-search.svg";
// import propertyImg from "@/assets/images/property.jpg";
// import iconInspection from "@/assets/images/icon-chats-inspection-scheduled.svg";
// import iconAwaiting from "@/assets/images/icon-chats-awaiting-handover.svg";
// import iconEscrow from "@/assets/images/icon-chats-in-escrow.svg";
// import iconCompleted from "@/assets/images/icon-chats-completed.svg";
import imgMessages from "@/assets/images/img-chats-messages.png";
import { useAuthContext } from "@/context/AuthContext";
import { useChatList } from "@/hooks/useChat";
import Spinner from "./Spinner";

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Chats() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { chats, isLoading, error } = useChatList();

  const isAgent = user?.role === "agent" || user?.role === "admin";

  return (
    <div className="font-ssPro flex flex-col mb-10">
      <header className="px-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <img src={goBack} alt="" className="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">Messages</p>

          <button>
            <img src={iconOptions} alt="" />
          </button>
        </div>

        {/* search messages ctn */}
        <div className="relative h-8 flex items-center mt-[27px]">
          <label
            htmlFor="search"
            className="absolute left-1 top-1/2 -translate-y-1/2"
          >
            <img src={iconSearch} alt="" />
          </label>

          <input
            type="search"
            id="search"
            placeholder="Search conversations"
            className="flex-1 h-full outline outline-bg-accent rounded-xl px-1 pl-6 text-[12px] leading-4 placeholder:text-text-secondary"
          />
        </div>
      </header>

      <main className="">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-text-secondary text-[12px] mt-10">
            {error}
          </p>
        ) : chats.length === 0 ? (
          <div className="flex flex-col gap-5 items-center justify-center mt-20">
            <img src={imgMessages} alt="" className="w-38 h-30.5" />
            <div className="flex flex-col items-center justify-center gap-1 w-56.5 text-center">
              <p className="font-raleway text-[14px] tracking-[1px] text-text-primary font-semibold">
                No active chat yet.
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                {isAgent
                  ? "Once you connect with a buyer, your conversations will appear here."
                  : "Start a conversation with an agent to see your chats here."}
              </p>
            </div>
          </div>
        ) : (
          // chats ctn
          <div className="mt-6 px-6 space-y-6">
            {chats.map((chat) => {
              const other = chat.participants.find((p) => p._id !== user?.id);

              return (
                <div
                  key={chat._id}
                  onClick={() =>
                    navigate(`/messages/${chat._id}`, {
                      state: {
                        chatId: chat._id,
                        propertyId: chat.property._id,
                        propertyTitle: chat.property.title,
                        propertyImage: chat.property.images?.[0],
                        propertyPrice: chat.property.price,
                        propertyAddress: chat.property.address,
                        // agent sees buyer info, user sees agent info
                        otherPartyName:
                          other?.name ?? other?.email ?? "Unknown",
                        otherPartyAvatar: other?.profilePicture,
                      },
                    })
                  }
                  className="border border-bg-accent p-2 rounded-xl flex justify-between gap-2"
                >
                  {chat.property.images?.[0] ? (
                    <img
                      src={chat.property.images[0]}
                      alt={chat.property.title}
                      className="w-12.5 h-12.5 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12.5 h-12.5 rounded-lg bg-bg-accent shrink-0" />
                  )}

                  <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between gap-2">
                      <div className="flex-1">
                        <p className="line-clamp-2 text-[12px] text-text-primary font-raleway font-semibold tracking-[1px]">
                          {chat.property.title}
                        </p>
                        <p className="text-[12px] leading-4 text-text-secondary">
                          {isAgent ? "Buyer" : "Agent"}:{" "}
                          {other?.name ?? other?.email ?? "Unknown"}
                        </p>
                        <p className="line-clamp-1 text-text-secondary text-[12px] leading-4">
                          {chat.lastMessage?.text ?? "No messages yet"}
                        </p>
                      </div>
                      <p className="text-[12px] leading-4 text-text-secondary">
                        {chat.lastMessage
                          ? formatTime(chat.lastMessage.createdAt)
                          : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-[61px]">
                      {/* <div
                        className={`${message.status_bg} rounded-2xl px-2 py-1 flex items-center justify-center gap-1`}
                      >
                        <img src={message.current_status_icon} alt="" />
                        <p
                          className={`${message.status_color} text-[12px] leading-4`}
                        >
                          {message.current_status}
                        </p>
                      </div> */}
                      <p className="text-[10px] text-white w-3.75 h-3.75 rounded-full bg-[#149D18] flex items-center justify-center">
                        1
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
