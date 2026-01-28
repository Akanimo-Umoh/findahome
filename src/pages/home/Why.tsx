import protect from "@/assets/images/protected.svg";
import verified from "@/assets/images/verified.svg";
import legal from "@/assets/images/legal.svg";

export default function Why() {
  const details = [
    {
      icon: protect,
      iconBg: "bg-[#4F95FF]",
      bg: "bg-[#e2eeff]",
      title: "Escrow-Protected Payment",
      description: "Your money is safe until you get your keys",
    },
    {
      icon: verified,
      iconBg: "bg-[#10B981]",
      bg: "bg-[#EFFDF4]",
      title: "Verified Agents",
      description: "All agents are thoroughly vetted and verified",
    },
    {
      icon: legal,
      iconBg: "bg-[#F59E0B]",
      bg: "bg-[#FEFBE9]",
      title: "Legal Support",
      description:
        "Professional legal document review and digital signing support for all transactions.",
    },
  ];

  return (
    <div className="text-text-primary px-6 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center gap-1 max-w-[308px]">
        <p className="text-[18px] font-raleway tracking-[1px] font-semibold">
          Why Choose Findahome?
        </p>
        <p className="text-[12px] text-text-secondary leading-4.5">
          We've built our platform with your safety and peace of mind as the top
          priority
        </p>
      </div>

      <div className="mt-4 space-y-4 w-full">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`${detail.bg} h-[174px] flex flex-col items-center justify-center gap-1 why-shadow text-center`}
          >
            <div
              className={`w-14 h-14 rounded-2xl ${detail.iconBg} flex items-center justify-center`}
            >
              <img src={detail.icon} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5">
              <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
                {detail.title}
              </p>
              <p className="font-ssPro text-[12px] text-text-secondary max-w-[259px]">
                {detail.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
