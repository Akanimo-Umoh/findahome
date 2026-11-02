import { motion, useReducedMotion, type Variants } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

// Icons: white versions (they sit on the solid blue tile).
import protect from "@/assets/images/icon-protected.svg"
import verified from "@/assets/images/icon-verified-why.svg"
import noUpfront from "@/assets/images/icon-no-upfront.svg"
import message from "@/assets/images/icon-chat-why.svg"

const reasons = [
  {
    icon: protect,
    title: "Escrow Protected Payment",
    description:
      "Your inspection fee is held safely and only released when you are satisfied.",
  },
  {
    icon: verified,
    title: "Verified Agents",
    description:
      "Every agent on Findahome is identity-checked so you can browse with confidence.",
  },
  {
    icon: noUpfront,
    title: "No Upfront Full Payment",
    description:
      "Never pay the full price before seeing the property. Inspect first, then decide.",
  },
  {
    icon: message,
    title: "Direct Agent Messaging",
    description:
      "Chat directly with listing agents. Ask questions and negotiate on your terms.",
  },
]

export default function Why() {
  const reduceMotion = useReducedMotion()
  const isFourCols = useMediaQuery("(min-width: 1024px)")
  const isTwoCols = useMediaQuery("(min-width: 640px)")

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    }),
  }

  // Icon tile: springs in right after its card (inherits the card's state)
  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.6 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: delay + 0.15,
      },
    }),
  }

  return (
    <div className="max-w-7xl px-6 text-text-primary md:px-8">
      <motion.div
        className="mx-auto flex max-w-md flex-col items-center gap-1 text-center"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-raleway text-[24px] font-semibold tracking-[1px] md:text-[36px]">
          Why Choose Us
        </h2>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          Built on trust, designed for the Nigerian market
        </p>
      </motion.div>

      {/* 1 col on mobile, 2 on sm, 4 on lg. Grid rows stretch to equal height. */}
      <ul className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-4 sm:max-w-3xl sm:grid-cols-2 md:mt-12 lg:max-w-full lg:grid-cols-4">
        {reasons.map((reason, index) => {
          // Stagger by position within the visible row; no delay when stacked
          const columns = isFourCols ? 4 : isTwoCols ? 2 : 1
          const delay = columns === 1 ? 0 : (index % columns) * 0.1

          return (
            <motion.li
              key={reason.title}
              custom={delay}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
                margin: "0px 0px -40px 0px",
              }}
              className="rounded-2xl bg-bg-accent p-4"
            >
              <motion.div
                variants={iconVariants}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-button-bg"
              >
                <img src={reason.icon} alt="" className="h-5 w-5" />
              </motion.div>

              <h3 className="mt-3 text-[12px] font-semibold text-text-primary md:text-[14px]">
                {reason.title}
              </h3>
              <p className="mt-1 text-[12px] leading-4.5 text-text-secondary md:text-[13px]">
                {reason.description}
              </p>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
