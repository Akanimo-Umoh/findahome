import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import iconOptions from "@/assets/images/icon-chat-options.svg"
import iconSearch from "@/assets/images/icon-messages-search.svg"
// import propertyImg from "@/assets/images/property.jpg";
// import iconInspection from "@/assets/images/icon-chats-inspection-scheduled.svg";
// import iconAwaiting from "@/assets/images/icon-chats-awaiting-handover.svg";
// import iconEscrow from "@/assets/images/icon-chats-in-escrow.svg";
// import iconCompleted from "@/assets/images/icon-chats-completed.svg";
import imgMessages from "@/assets/images/img-chats-messages.png"
import { useAuthContext } from "@/context/AuthContext"
import { useChatList } from "@/hooks/useChat"
import Spinner from "./Spinner"
import { useState } from "react"

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

export default function Chats() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuthContext()
  const { chats, isLoading, error } = useChatList()

  const filteredChats = chats.filter((chat) => {
    const query = searchQuery.toLowerCase()
    if (!query) return true

    const other = chat.participants.find((p) => p._id !== user?.id)
    const otherName = (other?.name ?? other?.email ?? "").toLowerCase()
    const propertyTitle = chat.property.title.toLocaleLowerCase()
    const lastMessage = (chat.lastMessage?.text ?? "").toLowerCase()

    return (
      otherName.includes(query) ||
      propertyTitle.includes(query) ||
      lastMessage.includes(query)
    )
  })

  const isAgent = user?.role === "agent" || user?.role === "admin"

  return (
    <div className="mx-auto mb-10 flex max-w-7xl flex-col font-ssPro">
      <header className="px-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <img src={goBack} alt="" className="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">Messages</p>

          <button className="cursor-pointer">
            <img src={iconOptions} alt="" />
          </button>
        </div>
      </header>

      <main className="">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            {error}
          </p>
        ) : chats.length === 0 ? (
          <div className="mt-20 flex cursor-pointer flex-col items-center justify-center gap-5">
            <img src={imgMessages} alt="" className="h-30.5 w-38" />
            <div className="flex w-56.5 flex-col items-center justify-center gap-1 text-center">
              <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
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
          <>
            {/* search messages ctn */}
            <div className="relative mx-6 mt-[27px] flex h-8 items-center">
              <label
                htmlFor="search"
                className="absolute top-1/2 left-1 -translate-y-1/2"
              >
                <img src={iconSearch} alt="" />
              </label>

              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations"
                className="h-full flex-1 rounded-xl px-1 pl-6 text-[12px] leading-4 outline outline-bg-accent placeholder:text-text-secondary"
              />
            </div>

            {/*chats ctn*/}
            <div className="mx-6 mt-6 space-y-6">
              {filteredChats.length === 0 ? (
                <p className="mt-10 text-center text-[12px] text-text-secondary">
                  No conversations match your search.
                </p>
              ) : (
                filteredChats.map((chat) => {
                  const other = chat.participants.find(
                    (p) => p._id !== user?.id
                  )
                  return (
                    <div
                      key={chat._id}
                      onClick={() => navigate(`/messages/${chat._id}`)}
                      className="flex justify-between gap-2 rounded-xl border border-bg-accent p-2"
                    >
                      {chat.property.images?.[0] ? (
                        <img
                          src={chat.property.images[0]}
                          alt={chat.property.title}
                          className="h-12.5 w-12.5 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12.5 w-12.5 shrink-0 rounded-lg bg-bg-accent" />
                      )}

                      <div className="flex w-full flex-col gap-2">
                        <div className="flex justify-between gap-2">
                          <div className="flex-1">
                            <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px] text-text-primary">
                              {chat.property.title}
                            </p>
                            <p className="text-[12px] leading-4 text-text-secondary">
                              {isAgent ? "Buyer" : "Agent"}:{" "}
                              {other?.name ?? other?.email ?? "Unknown"}
                            </p>
                            <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
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
                          <p className="flex h-3.75 w-3.75 items-center justify-center rounded-full bg-[#149D18] text-[10px] text-white">
                            1
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
