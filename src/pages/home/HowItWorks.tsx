import chats from "@/assets/images/icon-chat.svg";
import search from "@/assets/images/search.svg";
import dashboard from "@/assets/images/icon-dashboard.svg";

export default function HowItWorks() {
  const works = [
    {
      icon: search,
      title: "Search Properties",
      details: "Browse verified listings across Nigeria with detailed filters",
    },
    {
      icon: chats,
      title: "Connect with agents",
      details: "Chat directly with trusted agents and schedule viewings.",
    },
    {
      icon: dashboard,
      title: "Move in safely",
      details: "Complete transactions with  our escrow protection.",
    },
  ];

  return (
    <div className="px-6">
      <div className="text-center text-text-primary">
        <p className="font-raleway font-semibold text-[24px] tracking-[1px]">
          How it works
        </p>
        <p className="text-[12px] text-text-secondary">
          3 simple steps to your dream apartment
        </p>
      </div>

      <div className="flex flex-col items-start justify-center mt-6 max-w-60 mx-auto">
        {works.map((work, index) => (
          <div key={index} className="flex justify-center gap-1 w-full">
            <div className="w-6 flex flex-col items-center">
              <div className="bg-button-bg flex items-center justify-center rounded-full w-6 h-6">
                <img
                  src={work.icon}
                  alt="search properties"
                  className="w-4 h-4"
                />
              </div>
              {/* dashed border */}
              {index !== works.length - 1 && (
                <div className="border-l border-dashed border-text-secondary w-[1px] h-[59px]"></div>
              )}
            </div>

            <div className="w-full">
              <p className="text-text-primary font-semibold text-[12px]">
                {work.title}
              </p>
              <p className="text-[12px] text-text-secondary">{work.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
