import protect from "@/assets/images/protected.svg"
import verified from "@/assets/images/verified.svg"
import legal from "@/assets/images/legal.svg"

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
  ]

  return (
    <div className="flex flex-col items-center justify-center px-6 text-text-primary">
      <div className="flex max-w-[308px] flex-col items-center justify-center gap-1 text-center">
        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Why Choose Findahome?
        </p>
        <p className="text-[12px] leading-4.5 text-text-secondary">
          We've built our platform with your safety and peace of mind as the top
          priority
        </p>
      </div>

      <div className="mt-4 w-full space-y-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`${detail.bg} why-shadow flex h-[174px] flex-col items-center justify-center gap-1 text-center`}
          >
            <div
              className={`h-14 w-14 rounded-2xl ${detail.iconBg} flex items-center justify-center`}
            >
              <img src={detail.icon} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5">
              <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
                {detail.title}
              </p>
              <p className="max-w-[259px] font-ssPro text-[12px] text-text-secondary">
                {detail.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
