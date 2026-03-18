import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import iconOptions from "@/assets/images/icon-chat-options.svg";
import iconSearch from "@/assets/images/icon-messages-search.svg";
import propertyImg from "@/assets/images/property.jpg";
import iconInspection from "@/assets/images/icon-chats-inspection-scheduled.svg";
import iconAwaiting from "@/assets/images/icon-chats-awaiting-handover.svg";
import iconEscrow from "@/assets/images/icon-chats-in-escrow.svg";
import iconCompleted from "@/assets/images/icon-chats-completed.svg";
import imgMessages from "@/assets/images/img-chats-messages.png";

export default function Chats() {
  const navigate = useNavigate();

  const messages = [
    {
      img: propertyImg,
      title: "Luxury 4 Bed-room Apartment, Lekki",
      agent: "Jasmine Properties",
      last_message: "Is this property still available?, I'd love t...",
      last_message_time: "22:00 PM",
      current_status: "Inspection Scheduled",
      current_status_icon: iconInspection,
      status_bg: "bg-bg-accent",
      status_color: "text-[#274AD0]",
      unread_message: "1",
    },
    {
      img: propertyImg,
      title: "Luxury 4 Bed-room Apartment, Lekki",
      agent: "Jasmine Properties",
      last_message: "Is this property still available?, I'd love t...",
      last_message_time: "22:00 PM",
      current_status: "In Escrow",
      current_status_icon: iconEscrow,
      status_bg: "bg-[#D0272733]",
      status_color: "text-[#D02727]",
      unread_message: "4",
    },
    {
      img: propertyImg,
      title: "Luxury 4 Bed-room Apartment, Lekki",
      agent: "Jasmine Properties",
      last_message: "Is this property still available?, I'd love t...",
      last_message_time: "22:00 PM",
      current_status: "Completed",
      current_status_icon: iconCompleted,
      status_bg: "bg-[#149D1833]",
      status_color: "text-[#149D18]",
      unread_message: "1",
    },
    {
      img: propertyImg,
      title: "Luxury 4 Bed-room Apartment, Lekki",
      agent: "Jasmine Properties",
      last_message: "Is this property still available?, I'd love t...",
      last_message_time: "22:00 PM",
      current_status: "Awaiting handover",
      current_status_icon: iconAwaiting,
      status_bg: "bg-bg-accent",
      status_color: "text-[#274AD0]",
      unread_message: "2",
    },
    {
      img: propertyImg,
      title: "Luxury 4 Bed-room Apartment, Lekki",
      agent: "Jasmine Properties",
      last_message: "Is this property still available?, I'd love t...",
      last_message_time: "22:00 PM",
      current_status: "Awaiting handover",
      current_status_icon: iconAwaiting,
      status_bg: "bg-bg-accent",
      status_color: "text-[#274AD0]",
      unread_message: "3",
    },
  ];

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
        {/* chats ctn */}
        <div className="mt-6 px-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="border border-bg-accent p-2 rounded-xl flex justify-between gap-2"
            >
              <img
                src={message.img}
                alt=""
                className="w-12.5 h-12.5 rounded-lg"
              />

              <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between gap-2">
                  <div className="flex-1">
                    <p className="line-clamp-2 text-[12px] text-text-primary font-raleway font-semibold tracking-[1px]">
                      {message.title}
                    </p>
                    <p className="text-[12px] leading-4 text-text-secondary">
                      Agent: {message.agent}
                    </p>
                    <p className="line-clamp-1 text-text-secondary text-[12px] leading-4">
                      {message.last_message}
                    </p>
                  </div>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {message.last_message_time}
                  </p>
                </div>

                <div className="flex items-center gap-[61px]">
                  <div
                    className={`${message.status_bg} rounded-2xl px-2 py-1 flex items-center justify-center gap-1`}
                  >
                    <img src={message.current_status_icon} alt="" />
                    <p
                      className={`${message.status_color} text-[12px] leading-4`}
                    >
                      {message.current_status}
                    </p>
                  </div>
                  <p className="text-[10px] text-white w-3.75 h-3.75 rounded-full bg-[#149D18] flex items-center justify-center">
                    1
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="flex flex-col gap-5 h-full items-center justify-center hidden">
        <img src={imgMessages} alt="" className="w-38 h-30.5 -mt-18" />

        <div className="flex flex-col items-center justify-center gap-1 w-56.5 text-center">
          <p className="font-raleway txt-[14px] tracking-[1px] text-text-primary font-semibold">
            No active chat yet.
          </p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Once you connect with an agent, your conversations will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
