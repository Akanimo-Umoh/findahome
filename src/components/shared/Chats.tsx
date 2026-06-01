import { useNavigate, useParams } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
// import iconOptions from "@/assets/images/icon-chat-options.svg"
import iconSearch from "@/assets/images/icon-messages-search.svg"
// import propertyImg from "@/assets/images/property.jpg";
// import iconInspection from "@/assets/images/icon-chats-inspection-scheduled.svg";
// import iconAwaiting from "@/assets/images/icon-chats-awaiting-handover.svg";
// import iconEscrow from "@/assets/images/icon-chats-in-escrow.svg";
// import iconCompleted from "@/assets/images/icon-chats-completed.svg";
import imgMessages from "@/assets/images/img-chats-messages.png"
import { useAuthContext } from "@/context/AuthContext"
import { useChatList } from "@/hooks/useChat"
import Spinner from "../Spinner"
import { useState } from "react"
import ChatMessages from "./ChatMessages"

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

export default function Chats() {
  const navigate = useNavigate()
  const { chatId: selectedChatId } = useParams<{ chatId: string }>()
  const { user } = useAuthContext()
  const { chats, isLoading, error } = useChatList()
  const [searchQuery, setSearchQuery] = useState("")
  const isAgent = user?.role === "agent" || user?.role === "admin"

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

  const handleChatClick = (chatId: string) => {
    navigate(`/messages/${chatId}`)
  }

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden font-ssPro lg:h-[calc(100vh-66px)]">
      {/* left panel */}
      <div
        className={`flex w-full flex-col lg:max-w-[420px] lg:min-w-[280px] lg:shrink-0 lg:basis-[35%] lg:border-r lg:border-bg-accent ${selectedChatId ? "hidden lg:flex" : "flex"}`}
      >
        <header className="mx-6 shrink-0 lg:pt-3">
          {/* header */}
          <div className="relative flex items-center justify-center lg:justify-start">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 lg:hidden"
            >
              <img src={goBack} alt="" />
            </button>

            <p className="font-raleway text-[18px] font-semibold">Messages</p>

            {/* <button className="cursor-pointer">
              <img src={iconOptions} alt="" />
            </button> */}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
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
              {/* search */}
              <div className="relative mx-6 mt-6 flex h-8 shrink-0 items-center">
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

              {/* chats list */}
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
                    const isSelected = selectedChatId === chat._id
                    return (
                      <div
                        key={chat._id}
                        onClick={() => handleChatClick(chat._id)}
                        className={`flex cursor-pointer justify-between gap-2 rounded-xl border p-2 transition-colors ${isSelected ? "border-button-bg bg-bg-accent" : "border-bg-accent"}`}
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
                              <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px] text-text-primary">
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

                            <div className="flex flex-col items-end justify-between">
                              <p className="text-[12px] leading-4 text-text-secondary">
                                {chat.lastMessage
                                  ? formatTime(chat.lastMessage.createdAt)
                                  : ""}
                              </p>

                              <p className="flex h-3.75 w-3.75 items-center justify-center rounded-full bg-[#149D18] text-[10px] text-white">
                                1
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* right panel */}
      <div
        className={`min-w-0 flex-1 ${selectedChatId ? "flex flex-col" : "hidden lg:flex lg:flex-col"}`}
      >
        {selectedChatId ? (
          <ChatMessages chatId={selectedChatId} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <img src={imgMessages} alt="" className="h-30.5 w-38" />
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                No chat selected.
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Select a conversation to start chatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
