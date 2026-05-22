import chats from "@/assets/images/icon-chat.svg";
import search from "@/assets/images/search.svg";
import dashboard from "@/assets/images/icon-dashboard.svg";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const works = [
    {
      icon: search,
      title: "Search Properties",
      details: "Browse verified listings across Nigeria with detailed filters",
      direction: "left",
    },
    {
      icon: chats,
      title: "Connect with agents",
      details: "Chat directly with trusted agents and schedule viewings.",
      direction: "right",
    },
    {
      icon: dashboard,
      title: "Move in safely",
      details: "Complete transactions with  our escrow protection.",
      direction: "bottom",
    },
  ];

  // ✅ ADDED: animation variants
  const variants = {
    left: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    bottom: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
  };

  return (
    <div className="px-6 md:px-8 max-w-7xl">
      <div className="text-center text-text-primary md:flex md:flex-col md:gap-1">
        <p className="font-raleway font-semibold text-[24px] tracking-[1px] md:text-[36px]">
          How it works
        </p>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          3 simple steps to your dream apartment
        </p>
      </div>

      <div className="flex flex-col items-start justify-center mt-6 max-w-60 mx-auto md:mt-12 md:flex-row md:max-w-full md:gap-12">
        {works.map((work, index) => (
          <motion.div
            key={index}
            className="flex justify-center gap-1 w-full md:w-50 md:h-50 md:flex-col md:items-center md:justify-center md:border md:border-button-bg md:rounded-full md:gap-2"
            variants={variants[work.direction as keyof typeof variants]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="w-6 flex flex-col items-center md:w-8">
              <div className="bg-button-bg flex items-center justify-center rounded-full w-6 h-6 md:w-8 md:h-8 md:rounded-2xl">
                <img
                  src={work.icon}
                  alt="search properties"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
              {/* dashed border */}
              {index !== works.length - 1 && (
                <div className="border-l border-dashed border-text-secondary w-[1px] h-[59px] md:hidden"></div>
              )}
            </div>

            <div className="w-full md:text-center md:w-[151px]">
              <p className="text-text-primary font-semibold text-[12px] md:text-[14px] md:tracking-[1px]">
                {work.title}
              </p>
              <p className="text-[12px] text-text-secondary md:text-[12px]">
                {work.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
