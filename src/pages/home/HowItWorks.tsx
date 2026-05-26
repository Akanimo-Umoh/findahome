import chats from "@/assets/images/icon-chat.svg"
import search from "@/assets/images/search.svg"
import dashboard from "@/assets/images/icon-dashboard.svg"
import { motion } from "framer-motion"

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
  ]

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
  }

  return (
    <div className="max-w-7xl px-6 md:px-8">
      <div className="text-center text-text-primary md:flex md:flex-col md:gap-1">
        <p className="font-raleway text-[24px] font-semibold tracking-[1px] md:text-[36px]">
          How it works
        </p>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          3 simple steps to your dream apartment
        </p>
      </div>

      <div className="mx-auto mt-6 flex max-w-60 flex-col items-start justify-center md:mt-12 md:max-w-full md:flex-row md:gap-12">
        {works.map((work, index) => (
          <motion.div
            key={index}
            className="flex w-full justify-center gap-1 md:h-50 md:w-50 md:flex-col md:items-center md:justify-center md:gap-2 md:rounded-full md:border md:border-button-bg"
            variants={variants[work.direction as keyof typeof variants]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="flex w-6 flex-col items-center md:w-8">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-button-bg md:h-8 md:w-8 md:rounded-2xl">
                <img
                  src={work.icon}
                  alt="search properties"
                  className="h-4 w-4 md:h-6 md:w-6"
                />
              </div>
              {/* dashed border */}
              {index !== works.length - 1 && (
                <div className="h-[59px] w-[1px] border-l border-dashed border-text-secondary md:hidden"></div>
              )}
            </div>

            <div className="w-full md:w-[151px] md:text-center">
              <p className="text-[12px] font-semibold text-text-primary md:text-[14px] md:tracking-[1px]">
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
  )
}
